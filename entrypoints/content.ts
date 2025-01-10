import { createApp } from 'vue';
import App from './contents/App.vue';
import './global/styles/theme.css';
import 'uno.css';
import type { PerBrowserOption } from 'wxt';
import packageJson from '../package.json';

const devMatches: PerBrowserOption<string[]> = ['http://localhost:*/*', 'https://www.baidu.com/*'] as const;
const prodMatches: PerBrowserOption<string[]> = ['*://*/*'] as const;
const __DEV__ = import.meta.env.MODE === 'development' as const;
const matches = __DEV__ ? devMatches : prodMatches;

const getIconPath = () => {
  let iconPath = 'favicon.ico';
  const link = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
  if (link && link.href) {
    iconPath = link.href;
  }
  return iconPath;
}

export default defineContentScript({
  matches,
  main() {
    // 欢迎词
    console.log(`Welcome to Json Search, current env mode is ${import.meta.env.MODE}, current version is ${packageJson.version}`);

    const root = document.createElement('div');
    root.id = 'json-search-container';
    document.body.appendChild(root);
    const app = createApp(App);
    app.mount(root);
  },
});

/* globals API_URL */

import '../sass/style.scss';
import shouldBlock from './checkUrlRule';
import blockScroll from './blockScroll';
import checkAdblock from './adblock';
import { sendAdblockAnalytic } from './api';
import settings from '../settings.json';

function onReady() {
  let url = window.location.href;
  if (window.location.hash) {
    url = url.replace(window.location.hash, '');
  }

  if (shouldBlock(url)) {
    checkAdblock({
      window,
      callback({ detected, disabled }) {
        sendAdblockAnalytic({ API_URL: settings.API_URL, url, detected, disabled, window });

        if (detected) {
          blockScroll({
            pixel: settings.pixel,
            uiConfig: settings.uiConfig,
            extraButtonConfig: settings.extraButtonConfig,
            extraButton2Config: settings.extraButton2Config,
            API_URL: settings.API_URL,
            url,
            window,
          });
        }
      },
    });
  }
}

onReady();

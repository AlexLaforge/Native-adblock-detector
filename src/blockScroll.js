import checkAdblock from './adblock';
import { getHTML, handleModalEvents, showModal } from './modal';
import { handleTabs, getTabsHTML } from './tabs';
import { extraButtonClicked } from './api';

function getExtraButtonHTML({
  isEnabled = false,
  buttonText = '',
  buttonBackgroundColor = '',
  destinationURL = '',
  font = 'Lato',
  className = '',
}) {
  if (!isEnabled || !buttonText || !buttonBackgroundColor || !destinationURL) {
    return '';
  }

  return `<a
    class="drizzle--button drizzle--second-button ${className}"
    style="background-color: ${buttonBackgroundColor} !important;
      font-family: '${font}', 'Helvetica Neue', Helvetica, sans-serif !important;"
    href="${destinationURL}"
    target="_blank"
  >${buttonText}</a>`;
}

function getTemplate({
  buttonText = 'OK, I turned off Adblock',
  callToActionText = 'Ads help us create great content. Please turn off Adblock.',
  canClose = false,
  footerBackgroundColor = '#0095e8',
  buttonBackgroundColor = '#4cad41',
  font = 'Lato',
  showDarkScreen = false,
  modalTitle = 'How to turn off',
  mobileModalTitle = 'How to turn off adblocking on',
}, extraButtonConfig, extraButton2Config, window) {
  let closeButton = '';
  let darkScreen = '';

  if (canClose) {
    closeButton = '<span class="drizzle--close-button">&times;</span>';
  }

  if (showDarkScreen) {
    darkScreen = '<div class="drizzle--dark-screen" style="display: none !important;"></div>';
  }

  extraButtonConfig.font = font;

  extraButton2Config.font = font;
  extraButton2Config.className = 'drizzle--second-button2';

  const html = `
  <div
    class="drizzle--footer-bar"
    style="display: none;background-color: ${footerBackgroundColor} !important;"
  >
    <div class="drizzle--action-container">
      <button
        class="drizzle--button drizzle--check-adblock"
        style="background-color: ${buttonBackgroundColor} !important;
          font-family: '${font}', 'Helvetica Neue', Helvetica, sans-serif !important;"
      >${buttonText}</button>
      ${getExtraButtonHTML(extraButtonConfig)}
      ${getExtraButtonHTML(extraButton2Config)}
    </div>

    <div
      class="drizzle--call-to-action-text"
      style="font-family: '${font}', 'Helvetica Neue', Helvetica, sans-serif !important;"
    >
      ${callToActionText}
    </div>

    ${closeButton}

    ${getHTML(getTabsHTML({ window, modalTitle, mobileModalTitle }))}
  </div>${darkScreen}`;

  return html;
}

function render(options, extraButtonConfig, extraButton2Config, window) {
  const div = document.createElement('div');

  window.document.body.appendChild(div);

  div.innerHTML = getTemplate(options, extraButtonConfig, extraButton2Config, window);
}

function block(pixel) {
  const scrollTop = window.document.body.scrollTop || window.document.documentElement.scrollTop;
  const footerBar = document.querySelector('.drizzle--footer-bar');
  const darkScreen = document.querySelector('.drizzle--dark-screen');

  if (!footerBar) {
    return false;
  }


  if (scrollTop >= pixel) {
    window.document.documentElement.classList.add('drizzle--block-scroll');
    window.document.body.classList.add('drizzle--block-scroll');

    footerBar.style.display = 'flex';

    if (darkScreen) {
      darkScreen.style.display = '';
    }

    return true;
  }

  window.document.documentElement.classList.remove('drizzle--block-scroll');
  window.document.documentElement.style.removeProperty('overflow');

  window.document.body.classList.remove('drizzle--block-scroll');
  window.document.body.style.removeProperty('overflow');

  footerBar.style.display = 'none';

  if (darkScreen) {
    darkScreen.style.display = 'none';
  }

  return false;
}

export default function blockScroll({
  pixel = 400,
  uiConfig = {},
  extraButtonConfig = {},
  extraButton2Config = {},
  API_URL,
  url,
  window,
}) {
  render(uiConfig, extraButtonConfig, extraButton2Config, window);

  block(pixel);

  const footerBar = document.querySelector('.drizzle--footer-bar');
  const darkScreen = document.querySelector('.drizzle--dark-screen');
  const checkButton = document.querySelector('.drizzle--check-adblock');
  const extraButton = document.querySelector('.drizzle--second-button');
  const extraButton2 = document.querySelector('.drizzle--second-button2');
  const afterCheckMessage = document.querySelector('.drizzle--call-to-action-text');

  if (checkButton) {
    checkButton.onclick = function onClick() {
      checkAdblock({
        window,
        onlyCheck: true,
        callback({ detected }) {
          if (detected) {
            showModal();
            if (afterCheckMessage) {
              afterCheckMessage.innerText = uiConfig.afterCheckText || 'Your Adblock is still ON. Please see above instructions.';
            }
          } else {
            window.location.reload();
          }
        },
      });
    };
  }

  if (extraButton) {
    extraButton.onclick = function onClick() {
      extraButtonClicked({ API_URL, url });
    };
  }

  if (extraButton2) {
    extraButton2.onclick = function onClick() {
      extraButtonClicked({ API_URL, url });
    };
  }

  function onScroll() {
    block(pixel);
  }

  window.addEventListener('scroll', onScroll, false);

  function onTouchmove(e) {
    if (block(pixel)) {
      e.preventDefault();
    }
  }

  window.addEventListener('touchmove', onTouchmove, false);

  const closeButton = document.querySelector('.drizzle--close-button');
  if (closeButton) {
    closeButton.onclick = function onClick() {
      window.document.documentElement.classList.remove('drizzle--block-scroll');
      window.document.documentElement.style.removeProperty('overflow');

      window.document.body.classList.remove('drizzle--block-scroll');
      window.document.body.style.removeProperty('overflow');

      if (footerBar) {
        footerBar.style.display = 'none';
      }

      if (darkScreen) {
        darkScreen.style.display = 'none';
      }

      window.removeEventListener('scroll', onScroll, false);
      window.removeEventListener('touchmove', onTouchmove, false);
    };
  }

  handleModalEvents(window);
  handleTabs({
    window,
    modalTitle: uiConfig.modalTitle || 'How to turn off',
    mobileModalTitle: uiConfig.mobileModalTitle || 'How to turn off adblocking on',
  });
}

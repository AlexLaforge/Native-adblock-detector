import isMobile from './detectDevice';

export function handleTabs({ window, modalTitle, mobileModalTitle }) {
  const tabItems = [...window.document.querySelectorAll('.drizzle--tab-list li')];

  const title = isMobile({ window }) ? mobileModalTitle : modalTitle;

  tabItems.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      tabItems.forEach(tabItem => tabItem.classList.remove('drizzle--tabs-active'));

      tab.classList.add('drizzle--tabs-active');

      [...document.querySelectorAll('.drizzle--tab-panels > li')].forEach((item) => {
        item.style.display = 'none';
      });

      window.document.querySelector(`.drizzle--tab-panels > li:nth-child(${index + 1})`).style.display = 'block';

      const titleElm = document.querySelector('.drizzle--tab-title');
      if (titleElm) {
        titleElm.innerText = `${title} ${tab.title || ''}`;
      }
    });
  });
}

export function getTabsHTML({ window, modalTitle, mobileModalTitle }) {
  if (isMobile({ window })) {
    return `<div class="drizzle--tabs">
      <div class="drizzle--tab-title">${mobileModalTitle} Adblock Plus Browser</div>
      <ul class="drizzle--tab-list">
        <li class="drizzle--tabs-active" title="Adblock Plus Browser">
          <img src="https://s3-us-west-1.amazonaws.com/zenmarket/blockp.png">
        </li>
        <li title="UC Browser">
          <img src="https://s3-us-west-1.amazonaws.com/zenmarket/ucbrowser.png">
        </li>
        <div style="clear: both;"></div>
      </ul>

      <ul class="drizzle--tab-panels">
        <li>
          <img src="https://s3-us-west-1.amazonaws.com/zenmarket/blockp-mobile.png">
        </li>
        <li style="display: none;">
          <img src="https://s3-us-west-1.amazonaws.com/zenmarket/uc-mobile.png">
        </li>
      </ul>
    </div>`;
  }

  return `<div class="drizzle--tabs">
    <div class="drizzle--tab-title">${modalTitle} Adblock</div>
    <ul class="drizzle--tab-list">
      <li class="drizzle--tabs-active" title="Adblock">
        <img src="https://s3-us-west-1.amazonaws.com/zenmarket/block.png">
      </li>
      <li title="Adblock Plus">
        <img src="https://s3-us-west-1.amazonaws.com/zenmarket/blockp.png">
      </li>
      <li title="Adguard">
        <img src="https://s3-us-west-1.amazonaws.com/zenmarket/guard.png">
      </li>
      <li title="Ublock">
        <img src="https://s3-us-west-1.amazonaws.com/zenmarket/ublock.png">
      </li>
      <li title="Ghostery">
        <img src="https://s3-us-west-1.amazonaws.com/zenmarket/ghostery.png">
      </li>
      <div style="clear: both;"></div>
    </ul>

    <ul class="drizzle--tab-panels">
      <li>
        <img src="https://s3-us-west-1.amazonaws.com/zenmarket/block-drizzle.png">
      </li>
      <li style="display: none;">
        <img src="https://s3-us-west-1.amazonaws.com/zenmarket/blockp-drizzle.png">
      </li>
      <li style="display: none;">
        <img src="https://s3-us-west-1.amazonaws.com/zenmarket/guard-drizzle.png">
      </li>
      <li style="display: none;">
        <img src="https://s3-us-west-1.amazonaws.com/zenmarket/ublock-drizzle.png">
      </li>
      <li style="display: none;">
        <img src="https://s3-us-west-1.amazonaws.com/zenmarket/ghostery-drizzle.png">
      </li>
    </ul>
  </div>`;
}

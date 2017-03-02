function checkByImportJS({ window, callback, url }) {
  let timeoutId;
  const element = document.createElement('script');
  element.src = url;

  element.onerror = () => {
    clearTimeout(timeoutId);
    callback(true);
    window.document.head.removeChild(element);
  };

  element.onload = () => {
    clearTimeout(timeoutId);
    window.document.head.removeChild(element);
    callback(false);
  };

  element.onbeforeload = () => {
    timeoutId = setTimeout(() => {
      callback(true);
    }, 3000);
  };

  window.document.head.appendChild(element);
}

export default function checkAdblock({ window, callback, onlyCheck }) {
  const gUrl = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  const rUrl = 'https://ads.rubiconproject.com/ad/12198.js';

  function cb(detected) {
    if (onlyCheck) {
      callback({ detected });
      return;
    }

    if (detected) {
      if (window && window.localStorage) {
        window.localStorage.setItem('drizzle__usingAdblock', 1);
      }

      callback({ detected });
    } else {
      let disabled = false;
      if (window && window.localStorage) {
        const wasUsingAdblock = !!window.localStorage.getItem('drizzle__usingAdblock');
        window.localStorage.removeItem('drizzle__usingAdblock');

        if (wasUsingAdblock) {
          window.localStorage.setItem('drizzle__disabledAdblock', 1);
        }

        disabled = !!window.localStorage.getItem('drizzle__disabledAdblock');
      }

      callback({ detected, disabled });
    }
  }

  checkByImportJS({
    window,
    url: gUrl,
    callback(usingAdblock) {
      if (usingAdblock) {
        cb(true);
        return;
      }
      checkByImportJS({ window, url: rUrl, callback: cb });
    },
  });
}

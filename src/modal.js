export function getHTML(content) {
  const html = `<div class="drizzle--modal">
    <div class="drizzle--modal-content">
      <div style="text-align: right !important; margin: 5px -10px !important; height: 20px !important;">
        <span class="drizzle--modal-close">&times;</span>
      </div>
      <div>
        ${content}
      </div>
    </div>
  </div>`;
  return html;
}

export function showModal() {
  const modal = document.querySelector('.drizzle--modal');

  if (modal) {
    modal.style.display = 'block';
  }
}

export function handleModalEvents(window) {
  const closeButton = document.querySelector('.drizzle--modal-close');
  const modal = document.querySelector('.drizzle--modal');

  if (modal && closeButton) {
    closeButton.onclick = function onClick() {
      modal.style.display = 'none';
    };
  }

  window.addEventListener(
    'click',
    (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    },
    false,
  );
}

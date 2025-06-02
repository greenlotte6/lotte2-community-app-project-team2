document.addEventListener("DOMContentLoaded", () => {
  fetch('/view/Messenger/Modal/Modaladdchat.html')
    .then(res => res.text())
    .then(html => {
      const container = document.createElement('div');
      container.innerHTML = html;
      const template = container.querySelector('#channel-modal-template');
      const clone = document.importNode(template.content, true);
      document.body.appendChild(clone);

      const modal = document.getElementById("channelModal");
      const openBtn = document.querySelector('[data-role="add-channel"]');
      const closeBtn = document.getElementById("closeModalBtn");

      if (openBtn && modal && closeBtn) {
        openBtn.addEventListener("click", () => modal.style.display = "flex");
        closeBtn.addEventListener("click", () => modal.style.display = "none");

        window.addEventListener("click", (e) => {
          if (e.target === modal) modal.style.display = "none";
        });
        window.addEventListener("keydown", (e) => {
          if (e.key === "Escape") modal.style.display = "none";
        });
      }
    })
    .catch(err => console.error("ModalAddChat 로딩 실패:", err));
});

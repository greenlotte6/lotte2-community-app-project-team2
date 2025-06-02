document.addEventListener("DOMContentLoaded", () => {
  fetch('/view/Messenger/Modal/Modalmemberslist.html')
    .then(res => res.text())
    .then(html => {
      const container = document.createElement('div');
      container.innerHTML = html;
      const template = container.querySelector('#member-modal-template');
      const clone = document.importNode(template.content, true);
      document.body.appendChild(clone);

      const modal = document.getElementById("memberModal");
      const openBtn = document.querySelector('[data-role="view-members"]');
      const closeBtn = document.getElementById("closeMemberModal");
      const inviteBtn = document.getElementById("inviteMembersBtn");

      const friendList = document.getElementById("friendList");
      const memberList = document.getElementById("memberList");

      if (openBtn && modal && closeBtn) {
        openBtn.addEventListener("click", () => modal.style.display = "flex");
        closeBtn.addEventListener("click", () => modal.style.display = "none");

        window.addEventListener("click", (e) => {
          if (e.target === modal) modal.style.display = "none";
        });
        window.addEventListener("keydown", (e) => {
          if (e.key === "Escape") modal.style.display = "none";
        });

        // 친구 → 참여인원으로 이동
        friendList.addEventListener("click", (e) => {
          if (e.target.tagName === "LI") {
            const friend = e.target;
            const email = friend.dataset.email;
            const name = friend.textContent;

            const alreadyExists = [...memberList.querySelectorAll("li")]
              .some(li => li.dataset.email === email);

            if (!alreadyExists) {
              const li = document.createElement("li");
              li.textContent = `${name} ❌`;
              li.dataset.email = email;
              li.style.cursor = "pointer";
              li.addEventListener("click", () => li.remove());  // ❌ 클릭 시 삭제
              memberList.appendChild(li);
            }
          }
        });

        // 초대하기 버튼 기능
        inviteBtn?.addEventListener("click", () => {
          const selectedMembers = [...memberList.querySelectorAll("li")].map(li => ({
            email: li.dataset.email,
            name: li.textContent.replace(" ❌", "")
          }));
          console.log("초대할 멤버 목록:", selectedMembers);
          alert("초대가 완료되었습니다.");
          modal.style.display = "none";
        });
      }
    })
    .catch(err => console.error("ModalMemberList 로딩 실패:", err));
});

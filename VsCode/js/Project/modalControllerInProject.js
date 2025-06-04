document.addEventListener('DOMContentLoaded', function () {
    const modalContainer = document.querySelector(".modalContainer");
    const modalClose = document.querySelectorAll(".modalClose");

    let currentModal = null;

    function openModal(modalElement) {
        if (modalContainer) {
            modalContainer.style.display = "flex";
            document.body.style.overflow = "hidden";

            // 모든 모달 숨김
            const allModals = modalContainer.querySelectorAll(".modalWrapper");
            allModals.forEach(modal => modal.style.display = "none");

            // 해당 모달만 표시
            modalElement.style.display = "block";
            currentModal = modalElement;
        }
    }

    function closeModal() {
        if (modalContainer) {
            modalContainer.style.display = "none";
            document.body.style.overflow = "visible";

            // 모든 모달 숨김
            const allModals = modalContainer.querySelectorAll(".modalWrapper");
            allModals.forEach(modal => modal.style.display = "none");

            currentModal = null;
        }
    }

    // 닫기 버튼
    modalClose.forEach((btn) => {
        btn.addEventListener("click", closeModal);
    });

    // === 작업 추가 모달 ===
    const addWorkBtns = document.querySelectorAll(".addWorkBtn");
    const addWorkModal = document.querySelector(".addWorkModal");

    if (addWorkBtns.length > 0 && addWorkModal) {
        addWorkBtns.forEach((btn) => {
            btn.addEventListener("click", function (e) {
                e.stopPropagation();
                openModal(addWorkModal);
            });
        });

        addWorkModal.addEventListener("click", function (e) {
            e.stopPropagation();
        });
    }

    // === 작업 상태 추가 모달 ===
    const addWorkStatusBtn = document.querySelector(".addWorkStatus");
    const addStatusModal = document.querySelector(".addStatusModal");

    if (addWorkStatusBtn && addStatusModal) {
        addWorkStatusBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            openModal(addStatusModal);
        });

        addStatusModal.addEventListener("click", function (e) {
            e.stopPropagation();
        });
    }

    // 모달 외부 클릭 시 닫기
    document.addEventListener("click", function (e) {
        if (modalContainer.style.display === "flex" &&
            currentModal && !currentModal.contains(e.target)) {
            closeModal();
        }
    });
});

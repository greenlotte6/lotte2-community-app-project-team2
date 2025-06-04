document.addEventListener('DOMContentLoaded', function () {
    const modalContainer = document.querySelector(".modalContainer");
    const modalWrapper = document.querySelector(".modalWrapper");
    const addProject = document.querySelector(".addProject");
    const addProjectModal = document.querySelector(".addProjectModal");
    const modalClose = document.querySelectorAll(".modalClose");

    // 열기
    addProject.addEventListener("click", function (e) {
        e.stopPropagation(); // 이벤트가 document까지 가지 않게 막음
        modalContainer.style.display = "flex";
        modalWrapper.style.display = "block";
        document.body.style.overflow = "hidden";
    });

    // 모달 외부 클릭 시 닫기
    document.addEventListener("click", function (e) {
        // 클릭된 요소가 모달(.addProjectModal) 안에 없다면 닫기
        if (!addProjectModal.contains(e.target)) {
            modalContainer.style.display = "none";
            modalWrapper.style.display = "none";
            document.body.style.overflow = "visible";
        }
    });

    // 모달 안쪽 클릭 시 닫히는 것 방지
    addProjectModal.addEventListener("click", function (e) {
        e.stopPropagation();
    });

    modalClose.forEach((e) => {
        e.addEventListener("click", function() {
            modalContainer.style.display = "none";
            modalWrapper.style.display = "none";
            document.body.style.overflow = "visible";
        })
    });
});

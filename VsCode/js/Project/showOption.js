document.addEventListener('DOMContentLoaded', function () {
  const showOptionBtns = document.querySelectorAll(".MoreIcon");

  showOptionBtns.forEach((btn) => {
    const showOption = btn.nextElementSibling; // 버튼 바로 다음 형제 요소가 .MoreOption이라고 가정

    // 버튼 클릭 시 토글 동작
    btn.addEventListener("click", function (e) {
      e.stopPropagation();

      // 현재 보이는 다른 메뉴 닫기
      document.querySelectorAll(".MoreOption").forEach((option) => {
        if (option !== showOption) {
          option.style.setProperty("display", "none", "important");
        }
      });

      // 토글 동작
      const isVisible = showOption.style.getPropertyValue("display") === "flex";
      if (isVisible) {
        showOption.style.setProperty("display", "none", "important");
      } else {
        showOption.style.setProperty("display", "flex", "important");
      }
    });

    // 메뉴 내부 클릭 시 닫히는 것 방지
    showOption.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  });

  // 문서 어디든 클릭하면 메뉴 닫기
  document.addEventListener("click", function () {
    document.querySelectorAll(".MoreOption").forEach((option) => {
      option.style.setProperty("display", "none", "important");
    });
  });
});

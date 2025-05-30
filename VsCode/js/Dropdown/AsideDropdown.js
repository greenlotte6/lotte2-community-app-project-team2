document.addEventListener("DOMContentLoaded", function () {
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();

            const dropdown = this.nextElementSibling;
            const arrow = this.querySelector('.rightArrow');

            const isOpen = dropdown.classList.contains('dropdown-true');

            // 모든 드롭다운 닫기
            document.querySelectorAll('.dropdown').forEach(d => {
                d.classList.remove('dropdown-true');
                d.classList.add('dropdown-false');
                d.classList.add('displayNone');
            });
            document.querySelectorAll('.dropdown-toggle li').forEach(l => l.classList.remove('selected'));
            document.querySelectorAll('.rightArrow').forEach(a => {
                a.classList.remove('rotate-open');
                a.classList.add('rotate-close');
            });

            if (!isOpen) {
                dropdown.classList.remove('dropdown-false');
                dropdown.classList.remove('displayNone');
                dropdown.classList.add('dropdown-true');

                arrow.classList.remove('rotate-close');
                arrow.classList.add('rotate-open');
            }
        });
    });
});
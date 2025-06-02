document.addEventListener('DOMContentLoaded', function() {
    const first = document.querySelector(".first");
    const second = document.querySelector(".second");
    const third = document.querySelector(".third");

    function fadeUp(element) {
        element.style.display = "block";
        element.style.animation = "fadeInUp 1.5s";
    }

    setTimeout(() => fadeUp(first), 1250);
    setTimeout(() => fadeUp(second), 2500);
    setTimeout(() => fadeUp(third), 3750);
});
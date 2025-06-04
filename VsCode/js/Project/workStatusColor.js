document.addEventListener('DOMContentLoaded', function () {
    const selectColorInput = document.querySelector(".selectColor");
    const whatStatusColor = document.querySelector(".whatStatusColor");

    function selectYourColor() {
        const selectedValue = selectColorInput.value;
        whatStatusColor.innerText = selectedValue;
    }

    selectColorInput.addEventListener("change", selectYourColor);
});
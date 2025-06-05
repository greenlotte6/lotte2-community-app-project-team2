document.addEventListener('DOMContentLoaded', function() {
    const employees = document.querySelectorAll(".employees");

    for (let i = 0; i < employees.length; i++) {
        if (i % 2 === 1) {
            employees[i].style.backgroundColor = '#f8f8f8';
        }
    }
});
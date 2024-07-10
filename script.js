// script.js

document.addEventListener("DOMContentLoaded", () => {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");
    const forms = document.querySelectorAll("form");
    const textareas = document.querySelectorAll("textarea");

    // Load saved checkbox states from localStorage
    checkboxes.forEach(checkbox => {
        const id = checkbox.id;
        if (localStorage.getItem(id)) {
            checkbox.checked = localStorage.getItem(id) === "true";
        }
    });

    // Save checkbox state to localStorage on change
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            localStorage.setItem(checkbox.id, checkbox.checked);
        });
    });

    // Add new topics dynamically
    forms.forEach(form => {
        form.addEventListener("submit", event => {
            event.preventDefault();
            const input = form.querySelector("input[type='text']");
            const tbody = form.previousElementSibling.querySelector("tbody");
            const newId = `${form.id}-${Date.now()}`;
            const newRow = document.createElement("tr");

            newRow.innerHTML = `
                <td>${input.value}</td>
                <td><input type="checkbox" id="${newId}"></td>
            `;
            tbody.appendChild(newRow);

            const newCheckbox = newRow.querySelector("input[type='checkbox']");
            newCheckbox.addEventListener("change", () => {
                localStorage.setItem(newCheckbox.id, newCheckbox.checked);
            });

            input.value = "";
        });
    });

    // Load saved notes from localStorage
    textareas.forEach(textarea => {
        const id = textarea.id;
        if (localStorage.getItem(id)) {
            textarea.value = localStorage.getItem(id);
        }

        // Save notes to localStorage on change
        textarea.addEventListener("input", () => {
            localStorage.setItem(textarea.id, textarea.value);
        });
    });

    // Highlight active section in the sidebar
    const links = document.querySelectorAll(".sidebar ul li a");
    links.forEach(link => {
        link.addEventListener("click", function () {
            links.forEach(l => l.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Smooth scroll to section
    links.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);
            targetElement.scrollIntoView({ behavior: "smooth" });
        });
    });
});

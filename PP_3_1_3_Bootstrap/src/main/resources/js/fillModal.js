// Функция для заполнения таблицы текущего пользователя
async function fillTableAboutCurrentUser() {
    const currentUserTable = document.getElementById("currentUserTable");
    const currentUser = await dataAboutCurrentUser();

    let currentUserTableHTML = `
        <tr>
            <td>${currentUser.id}</td>
            <td>${currentUser.firstName}</td>
            <td>${currentUser.lastName}</td>
            <td>${currentUser.age}</td>
            <td>${currentUser.email}</td>
            <td>${currentUser.roles.map(role => role.role.substring(5)).join(' ')}</td>
        </tr>`;
    currentUserTable.innerHTML = currentUserTableHTML;
}

// Функция для получения данных пользователя по ID
async function getUserDataById(userId) {
    const response = await fetch(`/api/admin/${userId}`);
    return await response.json();
}

// Функция для заполнения модального окна
async function fillModal(modal) {
    modal.addEventListener("show.bs.modal", async function(event) {
        const userId = event.relatedTarget.dataset.userId;
        const user = await getUserDataById(userId);

        const modalBody = modal.querySelector(".modal-body");

        const idInput = modalBody.querySelector("input[data-user-id='id']");
        const firstNameInput = modalBody.querySelector("input[data-user-id='firstName']");
        const lastNameInput = modalBody.querySelector("input[data-user-id='lastName']");
        const ageInput = modalBody.querySelector("input[data-user-id='age']");
        const emailInput = modalBody.querySelector("input[data-user-id='email']");
        const passwordInput = modalBody.querySelector("input[data-user-id='password']");

        if (passwordInput !== null) {
            passwordInput.value = user.password;
        }

        idInput.value = user.id;
        firstNameInput.value = user.firstName;
        lastNameInput.value = user.lastName;
        ageInput.value = user.age;
        emailInput.value = user.email;

        let rolesSelectEdit = modalBody.querySelector("select[data-user-id='rolesEdit']");
        if (rolesSelectEdit) {
            rolesSelectEdit.innerHTML = `
                <option value="ROLE_USER" ${user.roles.some(role => role.role === "ROLE_USER") ? 'selected' : ''}>USER</option>
                <option value="ROLE_ADMIN" ${user.roles.some(role => role.role === "ROLE_ADMIN") ? 'selected' : ''}>ADMIN</option>`;
        }

        let rolesSelectDelete = modalBody.querySelector("select[data-user-id='rolesDelete']");
        if (rolesSelectDelete) {
            rolesSelectDelete.innerHTML = user.roles.map(role =>
                `<option value="${role.role}" selected disabled>${role.role.substring(5)}</option>`).join('');
        }
    });
}

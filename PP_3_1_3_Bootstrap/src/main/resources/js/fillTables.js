// Функция для получения данных обо всех пользователях
async function dataAboutAllUsers() {
    const response = await fetch("/api/admin");
    return await response.json();
}

// Функция для получения данных о текущем пользователе
async function dataAboutCurrentUser() {
    const response = await fetch("/api/user");
    return await response.json();
}

// Функция для заполнения таблицы всех пользователей в Admin Panel
async function fillTableOfAllUsers() {
    const usersTable = document.getElementById("usersTable");
    const users = await dataAboutAllUsers();

    let usersTableHTML = "";
    for (let user of users) {
        usersTableHTML += `
            <tr>
                <td>${user.id}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.age}</td>
                <td>${user.email}</td>
                <td>${user.roles.map(role => role.role.substring(5)).join(' ')}</td>
                <td>
                    <button class="btn btn-info btn-sm text-white"
                            data-bs-toggle="modal"
                  style="background-color: darkcyan"
                            data-bs-target="#editModal"
                            data-user-id="${user.id}">
                        Edit</button>
                </td>
                <td>
                    <button class="btn btn-danger btn-sm btn-delete"
                            style="background-color: darkred"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteModal"
                            data-user-id="${user.id}">
                        Delete</button>
                </td>
            </tr>`;
    }
    usersTable.innerHTML = usersTableHTML;
}
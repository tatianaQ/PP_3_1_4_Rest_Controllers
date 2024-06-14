const URLTableUsers = 'http://localhost:8080/api/admin/';

// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function () {
    getAllUsers(); // Вызываем функцию только после загрузки DOM
});

function getAllUsers() {
    fetch(URLTableUsers)
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Ошибка HTTP ' + response.status);
            }
            return response.json();
        })
        .then(function (users) {
            let dataOfUsers = '';
            let rolesString = '';

            const tableUsers = document.getElementById('tableUsers');

            for (let user of users) {
                rolesString = user.roles.map(role => role.role.substring(5)).join(", ");

                dataOfUsers += `<tr>
                        <td>${user.id}</td>
                        <td>${user.firstName}</td>
                        <td>${user.lastName}</td>
                        <td>${user.age}</td>  
                        <td>${user.email}</td>
                        <td>${rolesString}</td>

                        <td>
                          <button type="button"
                          class="btn btn-info"
                          data-bs-toggle="modal"
                          style="background-color: darkcyan"
                          data-target="#editModal"
                          onclick="editModal(${user.id})">
                                Edit
                            </button>
                        </td>

                        <td>
                            <button type="button" 
                            class="btn btn-danger" 
                            data-bs-toggle="modal"
                            style="background-color: darkred" 
                            data-target="#deleteModal" 
                            onclick="deleteModal(${user.id})">
                                Delete
                            </button>
                        </td>
                    </tr>`;
            }
            tableUsers.innerHTML = dataOfUsers;

            // Добавление обработчиков событий происходит после обновления таблицы
            addEventListenersToButtons();
        })
        .catch(function (error) {
            console.error('Ошибка при загрузке пользователей:', error);
        });
}


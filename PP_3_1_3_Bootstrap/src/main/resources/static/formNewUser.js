// Доступные роли для выбора
const allRoles = [
    { id: 1, role: 'ROLE_USER'},
    { id: 2, role: 'ROLE_ADMIN' }
];

// Заполняем select элементами option на основе данных о всех ролях
const rolesSelect = document.getElementById('create-roles');
allRoles.forEach(role => {
    let option = document.createElement('option');
    option.value = role.id;
    option.textContent = role.role; // Отсекаем "ROLE_" из названия роли
    rolesSelect.appendChild(option);
});

// Обработчик формы для создания нового пользователя
let formNewUser = document.getElementById("formNewUser");
formNewUser.addEventListener("submit", async ev => {
    ev.preventDefault();

    let rolesForNewUser = Array.from(formNewUser.roles.selectedOptions).map(option => {
        return {
            id: parseInt(option.value), // Преобразуем значение в число, если необходимо
            role: option.textContent.trim().toUpperCase() // Используем текстовое содержимое
        };
    });

    try {
        const response = await fetch("http://localhost:8080/api/admin/users/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: formNewUser.name.value,
                lastName: formNewUser.surname.value,
                email: formNewUser.email.value,
                password: formNewUser.password.value,
                age: formNewUser.age.value,
                roles: rolesForNewUser
            })
        });

        if (!response.ok) {
            throw new Error('Failed to create user');
        }

        formNewUser.reset();
        getAllUsers();
        $('#usersTable').click(); // Предположим, что этот код переключает на вкладку с пользователями после добавления нового пользователя
    } catch (error) {
        console.error('Error creating new user:', error);
    }
});
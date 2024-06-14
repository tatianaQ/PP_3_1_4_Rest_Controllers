
let formEdit = document.forms["formEdit"];
editUser();

async function editModal(id) {
    const modalEdit = new bootstrap.Modal(document.querySelector('#editModal'));
    await open_fill_modal(formEdit, modalEdit, id);
}

function editUser() {
    formEdit.addEventListener("submit", ev => {
        ev.preventDefault();

        let rolesForEdit = [];
        for (let i = 0; i < formEdit.roles.options.length; i++) {
            if (formEdit.roles.options[i].selected) {
                rolesForEdit.push({
                    id: formEdit.roles.options[i].value,
                    role: "ROLE_" + formEdit.roles.options[i].text
                });
            }
        }

        // Проверяем, изменился ли пароль
        let password = formEdit.password.value.trim(); // Получаем значение пароля и убираем лишние пробелы
        let requestBody = {
            id: formEdit.id.value,
            firstName: formEdit.name.value,
            lastName: formEdit.surname.value,
            age: formEdit.age.value,
            email: formEdit.email.value,
            roles: rolesForEdit
        };

        // Добавляем пароль в тело запроса, если он изменился
        if (password !== "") {
            requestBody.password = password;
        }

        fetch("/api/admin/users/" + formEdit.id.value, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        }).then(() => {
            $('#editClose').click();
            getAllUsers();
        });
    });
}
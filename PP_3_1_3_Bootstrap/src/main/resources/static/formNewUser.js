let formNewUser = document.forms["formNewUser"];

createNewUser();

function createNewUser() {
    formNewUser.addEventListener("submit", ev => {
        ev.preventDefault();

        let rolesForNewUser = [];
        for (let i = 0; i < formNewUser.roles.options.length; i++) {
            if (formNewUser.roles.options[i].selected)
                rolesForNewUser.push({
                    id: formNewUser.roles.options[i].value,
                    role: "ROLE_" + formNewUser.roles.options[i].text
                });
        }

        fetch("http://localhost:8080/api/admin/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                firstName: formNewUser.firstName.value,
                lastName: formNewUser.lastName.value,
                age: formNewUser.age.value,
                email: formNewUser.email.value,
                password: formNewUser.password.value,
                roles: rolesForNewUser
            })
        }).then(() => {
            formNewUser.reset();
            getAllUsers();
            $('#usersTable').click();

        });
    });
}
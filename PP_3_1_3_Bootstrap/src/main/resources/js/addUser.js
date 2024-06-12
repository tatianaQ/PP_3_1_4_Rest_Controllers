async function createNewUser(user) {
    try {
        const response = await fetch("/api/admin", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            const data = await response.json();
            alert(`User with email ${data.email} already exists`);
        } else {
            alert("User created successfully");
        }
    } catch (error) {
        console.error("Error creating user:", error);
    }
}

async function addNewUserForm() {
    const newUserForm = document.getElementById("newUser");
    newUserForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const firstName = newUserForm.querySelector("#firstName").value.trim();
        const lastName = newUserForm.querySelector("#lastName").value.trim();
        const age = newUserForm.querySelector("#age").value.trim();
        const email = newUserForm.querySelector("#email").value.trim();
        const password = newUserForm.querySelector("#password").value.trim();

        const rolesSelected = document.getElementById("roles");

        let roles = [];
        if (rolesSelected.selectedOptions.length > 0) {
            for (let option of rolesSelected.selectedOptions) {
                if (option.value === ROLE_ADMIN.role) {
                    roles.push(ROLE_ADMIN);
                } else {
                    roles.push(ROLE_USER)
                }
            }
        } else {
            roles.push(ROLE_USER)
        }

        const newUserData = {
            name: firstName,
            lastname: lastName,
            age: age,
            email: email,
            password: password,
            roles: roles
        };

        await createNewUser(newUserData);
        newUserForm.reset();

        document.querySelector('a#show-users-table').click();
        await fillTableOfAllUsers();
    });
}
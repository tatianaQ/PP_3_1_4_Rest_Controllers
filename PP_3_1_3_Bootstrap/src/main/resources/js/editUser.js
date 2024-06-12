async function sendDataEditUser(user) {
    try {
        const response = await fetch(`/api/admin/${user.id}`, {
            method: "PUT",
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(user)
        });

        if (!response.ok) {
            throw new Error('Failed to update user data.');
        }
    } catch (error) {
        console.error('Error updating user data:', error.message);
        throw error;
    }
}

const modalEdit = document.getElementById("editModal");

async function EditModalHandler() {
    await fillModal(modalEdit);
}

modalEdit.addEventListener("submit", async function(event){
    event.preventDefault();

    const rolesSelected = document.getElementById("rolesEdit");

    const currentRoles = await getUserDataById(document.getElementById("idEdit").value);

    let roles = [];
    if (rolesSelected.selectedOptions.length > 0) {
        for (let option of rolesSelected.selectedOptions) {
            if(option.value === "ROLE_USER") {
                roles.push(ROLE_USER);
            } else if (option.value === "ROLE_ADMIN") {
                roles.push(ROLE_ADMIN);
            }
        }
    } else {
        for (let option of currentRoles.roles) {
            if (option === "ROLE_USER") {
                roles.push(ROLE_USER);
            } else if (option === "ROLE_ADMIN") {
                roles.push(ROLE_ADMIN);
            }
        }
    }

    let user = {
        id: document.getElementById("idEdit").value,
        firstName: document.getElementById("firstNameEdit").value,
        lastName: document.getElementById("lastNameEdit").value,
        age: document.getElementById("ageEdit").value,
        email: document.getElementById("emailEdit").value,
        password: document.getElementById("passwordEdit").value,
        roles: roles
    }

    try {
        await sendDataEditUser(user);
        await fillTableOfAllUsers();
        const modalBootstrap = bootstrap.Modal.getInstance(modalEdit);
        modalBootstrap.hide();
    } catch (error) {
        // Handle error
        console.error(error);
    }
});
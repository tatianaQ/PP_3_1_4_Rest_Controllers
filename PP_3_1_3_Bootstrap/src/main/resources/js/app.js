document.addEventListener('DOMContentLoaded', async function () {
    await showUsernameOnNavbar();
    await fillTableOfAllUsers();
    await fillTableAboutCurrentUser();
    await addNewUserForm();
    await DeleteModalHandler();
    await EditModalHandler();
});

const ROLE_USER = { id: 1, role: "ROLE_USER" };
const ROLE_ADMIN = { id: 2, role: "ROLE_ADMIN" };

async function showUsernameOnNavbar() {
    const currentUsernameNavbar = document.getElementById("currentUsernameNavbar");
    const currentUser = await dataAboutCurrentUser();
    currentUsernameNavbar.innerHTML =
        `<strong>${currentUser.email}</strong>
         with roles: 
         ${currentUser.roles.map(role => role.role.substring(5)).join(' ')}`;
}
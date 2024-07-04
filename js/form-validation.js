document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://127.0.0.1:5000/api'; // Asegúrate de que esta URL es correcta y accesible

    const createUserForm = document.getElementById('create-user-form');
    const listUsersButton = document.getElementById('list-users');
    const deleteUserForm = document.getElementById('delete-user-form');
    const updateUserForm = document.getElementById('update-user-form');

    if (createUserForm) {
        createUserForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);

            try {
                const response = await fetch(`${apiUrl}/usuario`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const result = await response.json();
                if (response.ok) {
                    Swal.fire('¡Usuario creado!', 'El usuario ha sido creado exitosamente.', 'success');
                } else {
                    Swal.fire('Error', result.message || 'Error al crear el usuario', 'error');
                }
            } catch (error) {
                Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
            }
        });
    } else {
        console.error('Elemento createUserForm no encontrado');
    }

    if (listUsersButton) {
        listUsersButton.addEventListener('click', async function() {
            try {
                const response = await fetch(`${apiUrl}/usuarios`);
                const users = await response.json();
                const usersList = document.getElementById('users-list');
                usersList.innerHTML = '';
                users.forEach(user => {
                    const li = document.createElement('li');
                    li.textContent = `ID: ${user.id}, Nombre: ${user.nombre}, Apellido: ${user.apellido}, Email: ${user.email}`;
                    usersList.appendChild(li);
                });
            } catch (error) {
                Swal.fire('Error', 'No se pudo obtener la lista de usuarios', 'error');
            }
        });
    } else {
        console.error('Elemento listUsersButton no encontrado');
    }

    if (deleteUserForm) {
        deleteUserForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);

            try {
                const response = await fetch(`${apiUrl}/usuario/${data.id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    Swal.fire('¡Usuario eliminado!', 'El usuario ha sido eliminado exitosamente.', 'success');
                } else {
                    const result = await response.json();
                    Swal.fire('Error', result.message || 'Error al eliminar el usuario', 'error');
                }
            } catch (error) {
                Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
            }
        });
    } else {
        console.error('Elemento deleteUserForm no encontrado');
    }

    if (updateUserForm) {
        updateUserForm.addEventListener('submit', async function(event) {
            event.preventDefault();
            const formData = new FormData(event.target);
            const data = Object.fromEntries(formData);
            const userId = data.id;
            delete data.id; // Remover el id del objeto de datos para evitar problemas en la solicitud

            try {
                const response = await fetch(`${apiUrl}/usuario/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
                const result = await response.json();
                if (response.ok) {
                    Swal.fire('¡Usuario actualizado!', 'El usuario ha sido actualizado exitosamente.', 'success');
                } else {
                    Swal.fire('Error', result.message || 'Error al actualizar el usuario', 'error');
                }
            } catch (error) {
                Swal.fire('Error', 'No se pudo conectar con el servidor', 'error');
            }
        });
    } else {
        console.error('Elemento updateUserForm no encontrado');
    }
});

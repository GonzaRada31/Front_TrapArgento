document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'http://127.0.0.1:5000/api';

    const createUserForm = document.getElementById('createUserForm');
    const listUsersButton = document.getElementById('listUsersButton');
    const userList = document.getElementById('userList');

    if (!createUserForm || !listUsersButton || !userList) {
        console.error('Elemento no encontrado en el DOM.');
        return;
    }

    // Crear un nuevo usuario
    createUserForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(createUserForm);
        const data = {
            nombre: formData.get('nombre'),
            apellido: formData.get('apellido'),
            email: formData.get('email'),
            password: formData.get('password')
        };

        fetch(`${apiUrl}/usuario`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: data.message
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario creado',
                    text: 'El usuario ha sido creado exitosamente'
                });
                listUsers(); // Actualizar la lista de usuarios
            }
        })
        .catch(error => {
            console.error('Error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al crear el usuario'
            });
        });
    });

    // Listar todos los usuarios
    listUsersButton.addEventListener('click', listUsers);

    function listUsers() {
        fetch(`${apiUrl}/usuarios`)
            .then(response => response.json())
            .then(data => {
                userList.innerHTML = '';
                data.forEach(user => {
                    const userItem = document.createElement('li');
                    userItem.textContent = `${user.id} - ${user.nombre} ${user.apellido} - ${user.email}`;
                    userItem.appendChild(createDeleteButton(user.id));
                    userItem.appendChild(createUpdateButton(user));
                    userList.appendChild(userItem);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    function createDeleteButton(userId) {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', function () {
            fetch(`${apiUrl}/usuario/${userId}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (response.ok) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Usuario eliminado',
                        text: 'El usuario ha sido eliminado exitosamente'
                    });
                    listUsers(); // Actualizar la lista de usuarios
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al eliminar el usuario'
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al eliminar el usuario'
                });
            });
        });
        return deleteButton;
    }

    function createUpdateButton(user) {
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Actualizar';
        updateButton.addEventListener('click', function () {
            const newName = prompt('Nuevo nombre:', user.nombre);
            const newApellido = prompt('Nuevo apellido:', user.apellido);
            const newEmail = prompt('Nuevo email:', user.email);

            if (newName && newApellido && newEmail) {
                const data = {
                    nombre: newName,
                    apellido: newApellido,
                    email: newEmail
                };

                fetch(`${apiUrl}/usuario/${user.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.message) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: data.message
                        });
                    } else {
                        Swal.fire({
                            icon: 'success',
                            title: 'Usuario actualizado',
                            text: 'El usuario ha sido actualizado exitosamente'
                        });
                        listUsers(); // Actualizar la lista de usuarios
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al actualizar el usuario'
                    });
                });
            }
        });
        return updateButton;
    }

    // Inicializar la lista de usuarios al cargar la página
    listUsers();
});

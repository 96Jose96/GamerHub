-- GESTION DE NOTICIAS:

Esta aplicación incluye un módulo para obtener noticias relacionadas con el mundo "gamer" desde una API externa. Estas noticias se almacenan en memoria al inicio de la aplicacion y después se actualizan cada hora para minimizar las solicitudes a la API. A cada noticia se le asigna un ID único para una gestión mas sencilla.

    ENDPOINTS:

    # Ruta: GET/news -- Devuelve una lista de todas las noticias almacenadas en memoria.
    # RUta: GET/news/:id -- Devuelve la noticia correspondiente al id proporcionado.

-- ZONA DE PUBLICACIONES:

Esta sección solo será accesible para usuarios registrados. En ella se pueden ver las diferentes publicaciones de todos los usuarios registrados. También tiene un apartado personal para cada usuario donde se pueden ver, editar y borrar todas sus publicaciones.

    ENDPOINTS:

    # Ruta: GET/posts -- Devuelve una lista de todas las publicaciones hasta el momento.
    # Ruta: GET/posts/my-posts -- Devuelve una lista de todas las publicaciones del usuario.
    # Ruta: POST/posts/create -- Devuelve un formulario para la creación de una nueva publicación.
    # Ruta: PUT/posts/update -- Devuelve un formulario para editar una publicación del usuario.
    # Ruta: DELETE/posts/delete/:id -- Elimina una publicación del usuario.

-- REGISTRO DE USUARIOS

Para el registro de usuarios se utiliza FireBase, lo cual es necesario para acceder a la zona de publicaciones.

    ENDPOINTS:

    # Ruta: POST/registry -- Devuelve un formulario de registro con los campos requeridos "nombre de usuario", "correo elctrónico" y "contraseña".
    # Ruta: POST/login -- Devuelve un formulario de inicio de sesion con los campos requeridos "Correo electrónico" y "contraseña". Después de iniciar sesion se almacena el TOKEN en localstorage para mantener la sesion abierta hasta cerrarla.

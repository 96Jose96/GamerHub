-- GESTION DE NOTICIAS:

Esta aplicación incluye un módulo para obtener noticias relacionadas con el mundo "gamer" desde una API externa. Estas noticias se almacenan en memoria al inicio de la aplicacion y después se actualizan cada hora para minimizar las solicitudes a la API. A cada noticia se le asigna un ID único para una gestión mas sencilla.

    ENDPOINTS:

    # Ruta: GET/news -- Devuelve una lista de todas las noticias almacenadas en memoria.
    # RUta: GET/news/:id -- Devuelve la noticia correspondiente al id proporcionado.
# Proyecto de emprendimiento
Este proyecto está hecho con las librerías Handlebars, Express, con datos .json. Y en la parte de estilado tiene CSS y Bootstrap.
Simplemente tiene un encabezado donde muestra el título de la temática.
El archivo .json tiene 4 elementos: "nombre", "descripcion", "imagen" y "precio". Lo que hace el botón buscar es arrojar resultados filtrados por el elemento "nombre". Es decir, si uno de los elementos "nombre"
tiene una palabra llamada "cartera" y se busca dicha palabra (sin discriminar mayúsculas y minúsculas), se devolverán resultados de listas que contengan dicha palabra. Ahora, si en el buscador se busca una palabra que no esté en el
elemento "nombre", no arrojará ningún resultado.
A su vez, cuando aparecen resultados, el h1 muestra la cantidad de resultados mostrada al buscar, siendo 0 si no se encuentran.

/** Aquí llamamos a las liberías */

const express = require("express");
const path = require("path");
const fs = require('fs');
const hndlbrs = require('express-handlebars');

const app = express();

/** Aquí llamamos a las rutas estáticas. Es decir, a las que va a ver el cliente */

app.use(express.static(path.join(__dirname, 'client')));

/** Aquí ordenamos las vistas de las páginas. En este caso, tenemos el "index" (página principal) y el "productos" (que arroja los resultados de la búsqueda) */

app.engine('handlebars', hndlbrs({
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layout')
}));

app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) => {
    res.render('index');
});

app.get("/productos", (req, res) => {

    let listaProductos = [];

/** Aquí leemos los datos del .json */

    fs.readFile(path.join(__dirname, "productos.json"), (err, data) => {
        if (!err) {

            /** El let = productos guarda los datos del .json */
            let productos = JSON.parse(data);
            if (req.query) {
                if (req.query.productos) {

                    /**Aquí empieza el código que configura el tipo de búsqueda. En este caso, el .toLowerCase lee las letras minúsculas */
                    req.query.productos = req.query.productos.toLowerCase();

                    /** Aquí se lee la variable productos que contiene los datos del .json, forEach (para cada "producto", parámetro puesto para nombrar qué elemento del .json se utiliza, en este caso "nombre"). */
                    productos.forEach(producto => {
                        producto.nombre = producto.nombre.toLowerCase();
                        /** Aquí se determina que si la búsqueda incluye (includes) algo del req.query.productos, parámetro creado para filtrar, se devuelva (push) el "producto" */
                        if (producto.nombre.includes(req.query.productos)) listaProductos.push(producto)
                    });
                    /**Aquí se renderiza el listado de la lista productos.handlebars */
                    res.render('productos', {
                        listaProductos: listaProductos
                    });
                }
            }

        }

    });
});

app.get("/comprar", (req, res) => {
    res.render('comprar');
});

app.get("/aceptada", (req, res) => {
    res.render('aceptada');
});

app.get("/sumarse", (req, res) => {
    res.render('sumarse');
});




/**El código que configura el servidor. localhost:3000 en este caso */

app.listen(3000, () => {
    console.log("Puerto 3000 funcionando!");
});
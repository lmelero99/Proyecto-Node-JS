const express = require("express");
const path = require("path");
const fs = require('fs');
const hndlbrs = require('express-handlebars');

const app = express();

app.use(express.static(path.join(__dirname, 'client')));

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

    console.log(req.query);

    fs.readFile(path.join(__dirname, "productos.json"), (err, data) => {
        if (!err) {
            let productos = JSON.parse(data);

            if (req.query) {

                if (req.query.productos) {
                    productos = productos.includes(producto => producto.productos == req.query.productos);

                    console.log(productos);

                    res.render('productos', {
                        listaProductos: productos
                    });
                }
            }
        }
    });
});


app.listen(3000, () => {
    console.log("Puerto 3000 funcionando!");
});
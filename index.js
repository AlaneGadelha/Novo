// Instalações

const express = require("express");
const ejs = require("ejs");

const app = express();

const mysql = require("mysql");
// Configurações

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "node"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Conectado ao banco de dados");
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}))

// Componentes

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Views/index.html");

});

app.get("/eventos", (req, res) => {
    
    const query = "SELECT * FROM cardapiogg";
    connection.query(query, (err, rows) => {
        if (err) throw err;
        
        res.render("eventos", {rows});
        
    }); 

});

app.get("/criar",(req,res)=>{
    res.render('criar')
})
app.post('/criar',(req,res)=>{
    const {Title,Des,URL,Price} = req.body
    const query = 'INSERT INTO cardapiogg(Title,URL,Descricao,Price) VALUES(?,?,?,?)'
    connection.query(query,[Title,URL,Des,Price],(err) =>{
        if (err) throw err
        res.redirect('/eventos')
    })
})

app.get('/delete/:Title',(req,res)=>{
    const {Title} = req.params
    const query = 'DELETE FROM cardapiogg WHERE Title = ? limit 1'
    connection.query(query,[Title], (err)=>{
        if(err) throw err
        res.redirect('/')
    })
})


// Inicialização

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});


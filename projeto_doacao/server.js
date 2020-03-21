//config o servidor 
const express = require ('express')
const server = express()

//config o servidor para apresentar arquivos extras
server.use(express.static('public'))

//habilitar body do formulario
server.use(express.urlencoded({extended: true}))


            //configurar a conexão com banco de dados
const Pool= require('pg').Pool
const bd= new Pool({
    user: 'postgres',
    password: 'senha',
    local: 'host',
    post: 5432,
    database: 'doacao'
})
//config a templete engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,//boolean ou booleano(aceita 2 valores, verdadeiro ou falso)
})


// configurar a apresentação da pagina  
server.get("/",function(req,res){
    bd.query("SELECT * FROM doadores",function(err, result){
        if(err) return res.send("com erro no BANCO")
        
        
        const doadores = result.rows
        return res.render("index.html", {doadores})
    })
})


//lista de doadores: Vetor ou Array
/* const doadores = [
    {
        name:"Aline Santos",
        sangue: 'O+'
    },
    {
        name:"Rafael Santos",
        sangue: 'O+'
    },
    {
        name:"Edna Maria",
        sangue: 'O+'
    },
    {
        name:"Mecias Santos",
        sangue: 'O+'
    },
] */


        //cofigurar a apresentação da pagina
/* server.get("/", function(req, res){
    const doadores = []
    return res.render("index.html", {doadores})
})
 */

server.post("/",function(req, res){
    //pegar dados do fomulario
    const name = req.body.name
    const email = req.body.email
    const sangue = req.body.sangue

//SE o nome igual a vazio  
//OU o email igual a vazio
//OU o sangue igual a vazio

    if(name == "" || email == "" || sangue == "") {
        return res.send("Todos os campos são obrigatórios.")
    }

    //coloco valores dentro do array
 /*    doadores.push({
        name: name,
        sangue: sangue,
    })
    return res.redirect("/")
}) */




 //colocando os valores dentro do BD
    const query = `
    INSERT INTO doadores ("name","sangue","email")
    VALUES ($1, $2, $3)` 
    const values= [name,sangue,email] 
    
    bd.query(query, values, function(err){
       //FLUXO DE ERROR
        if (err) return res.send("erro no bd")
      
        //FLUXO IDEAL
        return res.redirect("/");
    })
})

/* db.query(`INSERT INTO doadores ("name","email","sangue") VALUES ('')`) */




//ligar o servidor e permitir acesso na porta 5500
server.listen(5500, function(){
    console.log('funcionando')
  })

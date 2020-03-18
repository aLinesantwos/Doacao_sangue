//config o servidor 
const express = require ('express')
const server = express()

//config o servidor para apresentar arquivos extras
server.use(express.static('public'))

//habilitar body do formulario
server.use(express.urlencoded({extended: true}))


//config a templete engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,//boolean ou booleano(aceita 2 valores, verdadeiro ou falso)
})


//lista de doadores: Vetor ou Array
const doadores = [
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
]


//cofigurar a apresentação da pagina
server.get("/", function(req, res){
    return res.render("index.html", {doadores})
})


server.post("/",function(req, res){
    //pegar dados do fomulario
    const name = req.body.name
    const email = req.body.email
    const sangue = req.body.sangue


    //coloco valores dentro do array
    doadores.push({
        name: name,
        sangue: sangue,
    })
    return res.redirect("/")
})



//ligar o servidor e permitir acesso na porta 5500
server.listen(5500, function(){
    console.log('funcionando')
})
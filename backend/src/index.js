const express = require('express'); //importando pacote
const routes = require("./routes"); //importando arquivo da pasta
const cors = require('cors');

const app = express();

app.use(cors(/*{origin:"meusite.com.br"}*/));
app.use(express.json()); //Transformando o body json recebido em objeto js
app.use(routes);

app.listen(3333);


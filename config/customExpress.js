const express = require('express')
const consign = require('consign')
const bodyParser = require('body-parser')

module.exports = () => {
  const app = express();

  // Usando dados enviados do form e convertendo para json
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // Tudo que estiver nos controllers vai para o app e será exibido
  consign()
    .include('controllers')
    .into(app);

  return app;
}

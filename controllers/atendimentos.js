const Atendimento = require('../models/atendimentos');

module.exports = app => {
  app.get('/atendimentos', (req, res) => {
    Atendimento.lista(res);
  });

  app.get('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    Atendimento.buscaPorId(id, res);
  });

  app.post('/atendimentos', (req, res) => {
    // atendimento chamado no model - corpo da requisição
    const atendimento = req.body;

    // O RES são os dados que estou enviando no post (POSTMAN - body - form-urlencoded)
    Atendimento.adiciona(atendimento, res);
  });

  app.patch('/atendimentos/:id', (req, res) => {

    const id = parseInt(req.params.id);
    const valores = req.body;

    Atendimento.altera(id, valores, res);
  });

  app.delete('/atendimentos/:id', (req, res) => {
    const id = parseInt(req.params.id);

    Atendimento.deleta(id, res);
  })
}

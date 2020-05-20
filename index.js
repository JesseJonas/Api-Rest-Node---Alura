const customExpress = require('./config/customExpress');
const conexao = require('./infra/conexao');
const Tabelas = require('./infra/tabelas');

conexao.connect(erro => {
  if(erro){
    console.log(erro);
  } else {
    console.log('Conectado no MySQL');

    Tabelas.init(conexao);

    // Só irá rodar o servidor se a conexão com o MySQL estiver ok
    const app = customExpress();
    app.listen(3030, () => {
      console.log("Servidor rodando na porta 3030");
    });
  }
});

const conexao = require('../infra/conexao');
const moment = require('moment');

class Atendimento{
  // res vindo do controller que adiciona valores
  adiciona(atendimento, res){
    // data atual formatado para o mysql
    const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS');

    // Este é o formato da data que eu estou enviando no POST e convertendo para o padrão do MySQL
    const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');

    // Validando tamanho de nome e data maior q atual
    const dataValida = moment(data).isSameOrAfter(dataCriacao);
    const clienteValido = atendimento.cliente.length >= 3;

    // Validando se a data é válida e o nome tem mais de 3 digitos
    const validacoes = [
      {
        nome: 'data',
        valido: dataValida,
        mensagem: 'Data deve ser maior ou igual à atual'
      },
      {
        nome: 'cliente',
        valido: clienteValido,
        mensagem: 'Nome do cliente deve ser maior que três caracteres.'
      }
    ]

    const erros = validacoes.filter(campo => !campo.valido);
    const existemErros = erros.length;

    if(existemErros){
      res.status(400).json(erros);
    } 
    else{
      const atendimentoDatado = {...atendimento, dataCriacao, data};

      const sql = 'INSERT INTO atendimentos SET ?';
    
      conexao.query(sql, atendimentoDatado, (erro, resultados) => {
        if(erro){
          res.status(400).json(erro);
        } else{
          res.status(201).json({atendimento});
        }
      });

    }
  }

  lista(res){
    const sql = 'SELECT * FROM Atendimentos';

    conexao.query(sql, (erro, resultados) => {
      if(erro){
        res.status(400).json(erro);
      } else{
        res.status(200).json(resultados);
      }
    }) 
  }

  buscaPorId(id, res){
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

    conexao.query(sql, (erro, resultados) => {
      const atendimento = resultados[0];
      if(erro){
        res.status(400).json(erro);
      } else {
        res.status(200).json(atendimento);
      }
    })
  }

  altera(id, valores, res){

    if(valores.data){
      valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
    }

    const sql = 'UPDATE Atendimentos SET ? WHERE id=?';

    conexao.query(sql, [valores, id], (erro, resultados) => {
      if(erro){
        res.status(400).json(erro);
      } else {
        res.status(200).json({...valores, id});
      }
    })
  }

  deleta(id, res){
    const sql = 'DELETE FROM Atendimentos WHERE id=?';

    conexao.query(sql, id, (erro, resultados) => {
      if(erro){
        res.status(400).json(erro);
      } else {
        res.status(200).json({id});
      }
    });
  }

}

module.exports = new Atendimento;
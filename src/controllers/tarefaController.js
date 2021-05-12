// Define a utilização do model cliente e a dependência http-status
const Tarefa = require('../models/tarefa');
const status = require('http-status');

// Cria o método Insert, obtendo os dados da request
exports.Insert = (req, res, next) => {
    const nome = req.body.nome;

    // Popula cada um dos campos do model com os campos recebido na request
    Tarefa.create({
        nome: nome,
    })
        //then = registra o que queremos que aconteca quando a Promise for resolvida
        .then(tarefa => {
            if (tarefa) {
                res.status(status.OK).send(tarefa);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        //catch = registra o que queremos que aconteca quando a Promise falhar
        .catch(error => next(error));
};

exports.SelectAll = (req, res, next) => {
    Tarefa.findAll()
        .then(tarefa => {
            if (tarefa) {
                res.status(status.OK).send(tarefa);
            }
        })
        .catch(error => next(error));
}

exports.SelectDetail = (req, res, next) => {
    const id = req.params.id;

    Tarefa.findByPk(id)
        .then(tarefa => {
            if (tarefa) {
                res.status(status.OK).send(tarefa);
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

exports.Update = (req, res, next) => {
    const id = req.params.id;
    const nome = req.body.nome;

    Tarefa.findByPk(id)
        .then(tarefa => {
            if (tarefa) {
                tarefa.update({
                    nome: nome
                },
                    {
                        where: { id: id }
                    })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            } else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};

exports.Delete = (req, res, next) => {
    const id = req.params.id;

    Tarefa.findByPk(id)
        .then(tarefa => {
            if (tarefa) {
                tarefa.destroy({
                    where: { id: id }
                })
                    .then(() => {
                        res.status(status.OK).send();
                    })
                    .catch(error => next(error));
            }
            else {
                res.status(status.NOT_FOUND).send();
            }
        })
        .catch(error => next(error));
};
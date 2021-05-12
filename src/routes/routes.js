const express = require('express');
const TarefaController = require('../controllers/tarefaController.js');
const router = express.Router();

router.post('/tarefa', TarefaController.Insert);
router.get('/tarefa', TarefaController.SelectAll);
router.get('/tarefa/:id', TarefaController.SelectDetail);
router.put('/tarefa/:id', TarefaController.Update);
router.delete('/tarefa/:id', TarefaController.Delete);

module.exports = router;
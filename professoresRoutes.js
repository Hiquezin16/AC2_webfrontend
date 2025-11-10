// professoresRoutes.js

const express = require('express');
const router = express.Router();
const professoresController = require('./professoresController');

// (rota base /professores)

// Listar todos os professores
router.get('/', professoresController.listarTodos);

// Listar professores por departamento
router.get('/departamento/:departamento', professoresController.listarPorDepartamento);

// Listar todas as turmas de um professor
router.get('/:id/turmas', professoresController.listarTurmasPorProfessor);

// Buscar um professor por ID
router.get('/:id', professoresController.buscarPorId);

// Atualizar dados de um professor
router.put('/:id', professoresController.atualizarProfessor);

// Adicionar uma turma para um professor
router.post('/:id/turmas', professoresController.adicionarTurma);

// Remover um professor
router.delete('/:id', professoresController.removerProfessor);

module.exports = router;

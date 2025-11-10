// professoresController.js

// "Banco de dados" em memória
let professores = [
  {
    id: "1",
    nome: "Prof. Carlos",
    idade: 40,
    departamento: "Matemática",
    turmas: [
      { codigo: "9A", disciplina: "MAT101", alunos: ["João", "Maria", "Pedro"] },
      { codigo: "10A", disciplina: "MAT201", alunos: ["Ana", "Luiz"] }
    ]
  },
  {
    id: "2",
    nome: "Prof. Ana",
    idade: 35,
    departamento: "História",
    turmas: [
      { codigo: "9A", disciplina: "HIS101", alunos: ["João", "Pedro"] },
      { codigo: "10B", disciplina: "HIS201", alunos: ["Maria", "Carlos", "Luiza"] }
    ]
  },
  {
    id: "3",
    nome: "Prof. João",
    idade: 50,
    departamento: "Ciências",
    turmas: [
      { codigo: "9A", disciplina: "CIE101", alunos: ["João", "Maria"] },
      { codigo: "9B", disciplina: "CIE101", alunos: ["Pedro", "Luiz"] }
    ]
  }
];

// (1) Listar todos os professores - GET /professores
function listarTodos(req, res) {
  res.json(professores);
}

// (2) Buscar um professor por ID - GET /professores/:id
function buscarPorId(req, res) {
  const id = req.params.id;
  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Professor não encontrado" });
  }

  res.json(professor);
}

// (3) Listar todas as turmas de um professor - GET /professores/:id/turmas
function listarTurmasPorProfessor(req, res) {
  const id = req.params.id;
  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Professor não encontrado" });
  }

  res.json(professor.turmas);
}

// (4) Atualizar dados de um professor - PUT /professores/:id
function atualizarProfessor(req, res) {
  const id = req.params.id;
  const { nome, idade, departamento } = req.body;

  const index = professores.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  // Atualiza somente os campos enviados
  if (nome !== undefined) professores[index].nome = nome;
  if (idade !== undefined) professores[index].idade = idade;
  if (departamento !== undefined) professores[index].departamento = departamento;

  res.json(professores[index]);
}

// (5) Adicionar uma turma para um professor - POST /professores/:id/turmas
function adicionarTurma(req, res) {
  const id = req.params.id;
  const { codigo, disciplina, alunos } = req.body;

  const professor = professores.find(p => p.id === id);

  if (!professor) {
    return res.status(404).json({ mensagem: "Professor não encontrado" });
  }

  if (!codigo || !disciplina) {
    return res
      .status(400)
      .json({ mensagem: "codigo e disciplina são obrigatórios" });
  }

  const novaTurma = {
    codigo,
    disciplina,
    alunos: alunos || []
  };

  professor.turmas.push(novaTurma);

  res.status(201).json(novaTurma);
}

// (6) Listar professores por departamento - GET /professores/departamento/:departamento
function listarPorDepartamento(req, res) {
  const departamentoParam = req.params.departamento.toLowerCase();

  const filtrados = professores.filter(
    p => p.departamento.toLowerCase() === departamentoParam
  );

  res.json(filtrados);
}

// (7) Remover um professor - DELETE /professores/:id
function removerProfessor(req, res) {
  const id = req.params.id;
  const index = professores.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ mensagem: "Id não existente" });
  }

  const removido = professores.splice(index, 1);

  res.json({
    mensagem: "Professor removido com sucesso",
    professor: removido[0]
  });
}

module.exports = {
  listarTodos,
  buscarPorId,
  listarTurmasPorProfessor,
  atualizarProfessor,
  adicionarTurma,
  listarPorDepartamento,
  removerProfessor
};

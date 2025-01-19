// public/js/script.js

// Funções para interagir com a API
async function listarTecnicos() {
    try {
      const response = await fetch('/tecnicos');
      const tecnicos = await response.json();
  
      // Exibir a lista de técnicos na página
      const listaTecnicos = document.getElementById('lista-tecnicos');
      listaTecnicos.innerHTML = ''; // Limpar a lista antes de exibir
  
      tecnicos.forEach(tecnico => {
        const li = document.createElement('li');
        li.textContent = `Nome: ${tecnico.nome}, CPF: ${tecnico.cpf}`;
        listaTecnicos.appendChild(li);
      });
    } catch (error) {
      console.error('Erro ao listar técnicos:', error);
      // Exibir mensagem de erro na página
    }
  }
  
  // Chamar a função para listar técnicos ao carregar a página
  listarTecnicos();
  
  // ... outras funções para interagir com a API (cadastrar, editar, etc.)
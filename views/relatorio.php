<!DOCTYPE html>
<html>
<head>
  <title>Relatórios</title>
  <style>
    /* Estilos básicos para o formulário e tabela */
    body {
      font-family: sans-serif;
    }
    form {
      margin-bottom: 20px;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input[type="date"],
    select {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 3px;
      box-sizing: border-box;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      border: 1px solid #ccc;
      padding: 8px;
      text-align: left;
    }
  </style>
</head>
<body>

<h1>Relatórios</h1>

<h2>Gerar Relatório de Produtividade</h2>
<form id="form-relatorio">
  <label for="inicio">Data de Início:</label>
  <input type="date" id="inicio" name="inicio"><br><br>
  <label for="fim">Data de Fim:</label>
  <input type="date" id="fim" name="fim"><br><br>
  <label for="tecnicoId">Técnico:</label>
  <select id="tecnicoId" name="tecnicoId">
    <option value="">Selecione um técnico</option>
    <?php
      // Lógica para buscar técnicos da API e preencher o select
      $tecnicos = json_decode(file_get_contents('http://localhost:3000/tecnicos'), true);
      foreach ($tecnicos as $tecnico) {
        echo "<option value=\"{$tecnico['id']}\">{$tecnico['nome']}</option>";
      }
    ?>
  </select><br><br>
  <button type="submit">Gerar Relatório</button>
</form>

<div id="relatorio">
  </div>

<script>
  const formRelatorio = document.getElementById('form-relatorio');
  formRelatorio.addEventListener('submit', async (event) => {
    event.preventDefault();

    const inicio = document.getElementById('inicio').value;
    const fim = document.getElementById('fim').value;
    const tecnicoId = document.getElementById('tecnicoId').value;

    try {
      const url = new URL('http://localhost:3000/relatorios/produtividade');
      if (inicio) {
        url.searchParams.append('inicio', inicio);
      }
      if (fim) {
        url.searchParams.append('fim', fim);
      }
      if (tecnicoId) {
        url.searchParams.append('tecnicoId', tecnicoId);
      }

      const response = await fetch(url);
      const data = await response.json();

      if (response.ok) {
        exibirRelatorio(data.relatorio);
      } else {
        console.error('Erro ao gerar relatório:', data.error);
        // Exibir mensagem de erro ao usuário
      }
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      // Exibir mensagem de erro ao usuário
    }
  });

  function exibirRelatorio(relatorio) {
    const relatorioDiv = document.getElementById('relatorio');
    relatorioDiv.innerHTML = ''; // Limpa o conteúdo anterior

    if (relatorio.length === 0) {
      relatorioDiv.innerHTML = '<p>Nenhum conserto encontrado para os filtros selecionados.</p>';
      return;
    }

    const tabela = document.createElement('table');
    const cabecalho = tabela.insertRow();
    cabecalho.innerHTML = '<th>Número da OS</th><th>Cliente</th><th>Status</th><th>Técnico</th>';

    relatorio.forEach(conserto => {
      const linha = tabela.insertRow();
      linha.innerHTML = `<td>${conserto.numeroOS}</td><td>${conserto.cliente}</td><td>${conserto.status}</td><td>${conserto.tecnico}</td>`;
    });

    relatorioDiv.appendChild(tabela);
  }
</script>

</body>
</html>
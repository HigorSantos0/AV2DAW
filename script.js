window.addEventListener('DOMContentLoaded', function() {
  // Formulário - Incluir Candidato
  var formIncluirCandidato = document.getElementById('incluir.php');
  if (formIncluirCandidato) {
      formIncluirCandidato.addEventListener('submit', function(event) {
          event.preventDefault();
          incluirCandidato();
      });
  }

  // Botão - Listar Candidatos
  var btnListarCandidatos = document.getElementById('listar.php');
  if (btnListarCandidatos) {
      btnListarCandidatos.addEventListener('click', function() {
          listarCandidatos();
      });
  }

  // Formulário - Incluir Fiscal
  var formIncluirFiscal = document.getElementById('incluirFiscal.php');
  if (formIncluirFiscal) {
      formIncluirFiscal.addEventListener('submit', function(event) {
          event.preventDefault();
          incluirFiscal();
      });
  }

  // Formulário - Alterar Sala de Prova
  var formAlterarSala = document.getElementById('alterarSala.php');
  if (formAlterarSala) {
      formAlterarSala.addEventListener('submit', function(event) {
          event.preventDefault();
          alterarSalaProva();
      });
  }
});

// Resto do código permanece o mesmo...

// Função para incluir um candidato
function incluirCandidato() {
  // Obter os valores dos campos do formulário
  var nome = document.getElementById('nome-candidato').value;
  var cpf = document.getElementById('cpf-candidato').value;
  var identidade = document.getElementById('identidade-candidato').value;
  var email = document.getElementById('email-candidato').value;
  var cargo = document.getElementById('cargo-candidato').value;
  var salaProva = document.getElementById('sala-prova-candidato').value;

  // Validar os campos (exemplo: campo não vazio)
  if (nome === '' || cpf === '' || identidade === '' || email === '' || cargo === '' || salaProva === '') {
      alert('Por favor, preencha todos os campos.');
      return;
  }

  // Criar um objeto com os dados do candidato
  var candidato = {
      nome: nome,
      cpf: cpf,
      identidade: identidade,
      email: email,
      cargo: cargo,
      salaProva: salaProva
  };

  // Enviar os dados para o servidor usando XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'incluir_candidato.php', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              alert(xhr.responseText);
              // Limpar os campos do formulário
              formIncluirCandidato.reset();
          } else {
              alert('Erro ao incluir o candidato.');
          }
      }
  };
  xhr.send(JSON.stringify(candidato));
}

// Função para listar os candidatos
function listarCandidatos() {
  // Limpar a lista de candidatos
  var listaCandidatos = document.getElementById('lista-candidatos');
  listaCandidatos.innerHTML = '';

  // Requisição para obter a lista de candidatos
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'listar_candidatos.php', true);
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              var candidatos = JSON.parse(xhr.responseText);
              // Exibir a lista de candidatos
              for (var i = 0; i < candidatos.length; i++) {
                  var candidato = candidatos[i];
                  var item = document.createElement('p');
                  item.textContent = 'Nome: ' + candidato.nome + ', CPF: ' + candidato.cpf + ', Sala: ' + candidato.salaProva;
                  listaCandidatos.appendChild(item);
              }
          } else {
              alert('Erro ao listar os candidatos.');
          }
      }
  };
  xhr.send();
}

// Função para incluir um fiscal de prova
function incluirFiscal() {
  // Obter os valores dos campos do formulário
  var nome = document.getElementById('nome-fiscal').value;
  var cpf = document.getElementById('cpf-fiscal').value;
  var salaProva = document.getElementById('sala-prova-fiscal').value;

  // Validar os campos (exemplo: campo não vazio)
  if (nome === '' || cpf === '' || salaProva === '') {
      alert('Por favor, preencha todos os campos.');
      return;
  }

  // Criar um objeto com os dados do fiscal
  var fiscal = {
      nome: nome,
      cpf: cpf,
      salaProva: salaProva
  };

  // Enviar os dados para o servidor usando XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'incluir_fiscal.php', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              alert(xhr.responseText);
              // Limpar os campos do formulário
              formIncluirFiscal.reset();
          } else {
              alert('Erro ao incluir o fiscal.');
          }
      }
  };
  xhr.send(JSON.stringify(fiscal));
}

// Função para alterar a sala de prova de um candidato
function alterarSalaProva() {
  // Obter os valores dos campos do formulário
  var cpf = document.getElementById('cpf-candidato-alterar').value;
  var novaSala = document.getElementById('nova-sala').value;

  // Validar os campos (exemplo: campo não vazio)
  if (cpf === '' || novaSala === '') {
      alert('Por favor, preencha todos os campos.');
      return;
  }

  // Criar um objeto com os dados da alteração
  var alteracao = {
      cpf: cpf,
      novaSala: novaSala
  };

  // Enviar os dados para o servidor usando XMLHttpRequest
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'alterar_sala.php', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              alert(xhr.responseText);
              // Limpar os campos do formulário
              formAlterarSala.reset();
          } else {
              alert('Erro ao alterar a sala de prova do candidato.');
          }
      }
  };
  xhr.send(JSON.stringify(alteracao));
}

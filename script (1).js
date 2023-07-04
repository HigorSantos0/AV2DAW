
function listaCand() {
  var tabelaCandidatos = document.getElementById("tabelaCandidatos");
  tabelaCandidatos.innerHTML = "";

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        var candidatos = response.data;
        if (candidatos.length > 0) {
          var tableContent = "<tr><th>Nome</th><th>CPF</th><th>Identidade</th><th>Email</th><th>Cargo Pretendido</th><th>Sala de Prova</th></tr>";
          for (var i = 0; i < candidatos.length; i++) {
            tableContent += "<tr><td>" + candidatos[i].nome + "</td><td>" + candidatos[i].cpf + "</td><td>" + candidatos[i].identidade + "</td><td>" + candidatos[i].email + "</td><td>" + candidatos[i].cargo + "</td><td>" + candidatos[i].sala_prova + "</td></tr>";
          }
          tabelaCandidatos.innerHTML = tableContent;
        } else {
          tabelaCandidatos.innerHTML = "Nenhum candidato encontrado.";
        }
      } else {
        tabelaCandidatos.innerHTML = "Erro ao listar candidatos.";
      }
    }
  };
  xhr.open("GET", "index.php", true);
  xhr.send();
}

function incluiFis() {
  var nome = document.getElementById("fiscalNome").value;
  var cpf = document.getElementById("fiscalCPF").value;
  var sala = document.getElementById("fiscalSala").value;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        alert("Fiscal de prova incluído com sucesso.");
      } else {
        alert("Erro ao incluir fiscal de prova.");
      }
    }
  };
  xhr.open("POST", "index.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("incluirFiscal=1&nome=" + nome + "&cpf=" + cpf + "&sala=" + sala);
}

function alteraSlPro() {
  var cpf = document.getElementById("candidatoCPF").value;
  var novaSala = document.getElementById("novaSala").value;


  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        alert("Sala de prova do candidato atualizada com sucesso.");
      } else {
        alert("Erro ao atualizar sala de prova do candidato.");
      }
    }
  };
  xhr.open("POST", "index.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("alterarSalaProva=1&cpf=" + cpf + "&novaSala=" + novaSala);
}

function listaFis() {
  var tabelaFiscais = document.getElementById("tabelaFiscais");
  tabelaFiscais.innerHTML = "";

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        var fiscais = response.data;
        if (fiscais.length > 0) {
          var tableContent = "<tr><th>Nome</th><th>CPF</th><th>Sala de Prova</th></tr>";
          for (var i = 0; i < fiscais.length; i++) {
            tableContent += "<tr><td>" + fiscais[i].nome + "</td><td>" + fiscais[i].cpf + "</td><td>" + fiscais[i].sala + "</td></tr>";
          }
          tabelaFiscais.innerHTML = tableContent;
        } else {
          tabelaFiscais.innerHTML = "Nenhum fiscal encontrado.";
        }
      } else {
        tabelaFiscais.innerHTML = "Erro ao listar fiscais.";
      }
    }
  };
  xhr.open("GET", "index.php", true);
  xhr.send();
}

function validacaoCand() {
  var cpf = document.getElementById("validarCPF").value;

  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        var candidato = response.data;
        if (candidato) {
          alert("O candidato " + candidato.nome + " foi validado.");
        } else {
          alert("CPF de candidato não encontrado.");
        }
      } else {
        alert("Erro ao validar candidato.");
      }
    }
  };
  xhr.open("POST", "index.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send("validarCandidato=1&cpf=" + cpf);
}

<?php
// Configurações de conexão com o banco de dados
$servername = "localhost";
$username = "higor";
$password = "93530504@Vhf";
$dbname = "lista";

// Recebe os dados enviados pelo JavaScript
$data = json_decode(file_get_contents("php://input"), true);
$nome = $data['nome'];
$cpf = $data['cpf'];
$identidade = $data['identidade'];
$email = $data['email'];
$cargo = $data['cargo'];
$salaProva = $data['salaProva'];

// Conecta ao banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// Insere o candidato no banco de dados
$sql = "INSERT INTO candidatos (nome, cpf, identidade, email, cargo, sala_prova) VALUES ('$nome', '$cpf', '$identidade', '$email', '$cargo', '$salaProva')";
if ($conn->query($sql) === TRUE) {
    echo "Candidato incluído com sucesso";
} else {
    echo "Erro ao incluir o candidato: " . $conn->error;
}

$conn->close();
?>

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
$salaProva = $data['salaProva'];

// Conecta ao banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// Insere o fiscal de prova no banco de dados
$sql = "INSERT INTO fiscais (nome, cpf, sala_prova) VALUES ('$nome', '$cpf', '$sala')";
if ($conn->query($sql) === TRUE) {
    echo "Fiscal incluído com sucesso";
} else {
    echo "Erro ao incluir o fiscal: " . $conn->error;
}

$conn->close();
?>

<?php
// Configurações de conexão com o banco de dados
$servername = "localhost";
$username = "higor";
$password = "93530504@Vhf";
$dbname = "lista";

// Recebe os dados enviados pelo JavaScript
$data = json_decode(file_get_contents("php://input"), true);
$cpf = $data['cpf'];
$novaSala = $data['novaSala'];

// Conecta ao banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}

// Atualiza a sala de prova do candidato no banco de dados
$sql = "UPDATE candidatos SET sala_prova = '$novaSala' WHERE cpf = '$cpf'";
if ($conn->query($sql) === TRUE) {
    echo "Sala de prova alterada com sucesso";
} else {
    echo "Erro ao alterar a sala de prova: " . $conn->error;
}

$conn->close();
?>

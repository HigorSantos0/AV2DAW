<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "";

function listaCand($ordenacao)
{
    global $servername, $username, $password, $dbname;

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Falha na conexão com o banco de dados: " . $conn->connect_error);
    }

    if ($ordenacao == "nome") {
        $sql = "SELECT * FROM candidatos ORDER BY nome";
    } elseif ($ordenacao == "sala") {
        $sql = "SELECT * FROM candidatos ORDER BY sala_prova";
    } else {
        echo "Ordenação inválida!";
        return;
    }

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            echo "Nome: " . $row["nome"] . "<br>";
            echo "CPF: " . $row["cpf"] . "<br>";
            echo "Identidade: " . $row["identidade"] . "<br>";
            echo "Email: " . $row["email"] . "<br>";
            echo "Cargo Pretendido: " . $row["cargo_pretendido"] . "<br>";
            echo "Sala de Prova: " . $row["sala_prova"] . "<br><br>";
        }
    } else {
        echo "Não existem candidatos cadastrados.";
    }

    $conn->close();
}

function incluiFis($nome, $cpf, $sala)
{
    global $servername, $username, $password, $dbname;

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Falha na conexão com o banco de dados: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO fiscais (nome, cpf, sala_prova) VALUES (?, ?, ?)");

    if (!$stmt) {
        die("Erro ao preparar a consulta: " . $conn->error);
    }

    $stmt->bind_param("sss", $nome, $cpf, $sala);

    if ($stmt->execute()) {
        echo "Fiscal de prova incluído com sucesso!";
    } else {
        echo "Erro ao incluir fiscal de prova: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}

function alteraSlPro($cpf, $novaSala)
{
    global $servername, $username, $password, $dbname;

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) 
    {
        die("Falha na conexão com o banco de dados: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("Candidato selecione a sala da prova");

    if (!$stmt) {
        die("Erro ao preparar a consulta: " . $conn->error);
    }

    $stmt->bind_param("ss", $novaSala, $cpf);

    if ($stmt->execute()) {
        echo "Sala de prova alterada com sucesso!";
    } else {
        echo "Erro ao alterar sala de prova: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}

function listaFis()
{
    global $servername, $username, $password, $dbname;

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Falha na conexão com o banco de dados: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM fiscais";

    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $fiscais = array();
        while ($row = $result->fetch_assoc()) {
            $fiscais[] = $row;
        }
        echo json_encode(array("success" => true, "data" => $fiscais));
    } else {
        echo json_encode(array("success" => false, "message" => "Não existem fiscais cadastrados."));
    }

    $conn->close();
}

function validacaoCand($cpf)
{
    global $servername, $username, $password, $dbname;

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die("Falha na conexão com o banco de dados: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("SELECT * FROM candidatos WHERE cpf = ?");
    $stmt->bind_param("s", $cpf);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();

    if ($result->num_rows > 0) {
        $candidato = $result->fetch_assoc();
        echo json_encode(array("success" => true, "data" => $candidato));
    } else {
        echo json_encode(array("success" => false, "message" => "CPF de candidato não encontrado."));
    }

    $conn->close();
}


$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Falha na conexão com o banco de dados: " . $conn->connect_error);
}



$conn->close();
?>

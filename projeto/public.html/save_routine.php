<?php
$servername = "localhost";
$username = "root"; // Usuário do MySQL
$password = ""; // Senha do MySQL
$dbname = "treinos";

// Criando a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar se a conexão foi bem-sucedida
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Receber dados da rotina (do formulário via POST)
$userId = $_POST['user_id'];
$day = $_POST['day'];
$exercises = $_POST['exercises'];

// Inserir rotina no banco de dados
$sql = "INSERT INTO training_routines (user_id, day, exercises) VALUES ('$userId', '$day', '$exercises')";

if ($conn->query($sql) === TRUE) {
    echo "Rotina salva com sucesso!";
} else {
    echo "Erro ao salvar rotina: " . $conn->error;
}

$conn->close();
?>

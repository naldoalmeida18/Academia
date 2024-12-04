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

// Recebendo dados do formulário (via POST)
$user = $_POST['username'];
$pass = $_POST['password'];
$role = $_POST['role'];

// Verificando se o usuário existe
$sql = "SELECT * FROM users WHERE username = '$user' AND password = '$pass' AND role = '$role'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "Login bem-sucedido";
} else {
    echo "Usuário ou senha incorretos";
}

$conn->close();
?>

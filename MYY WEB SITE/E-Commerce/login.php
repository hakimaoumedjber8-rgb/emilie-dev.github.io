login.php <?php
session_start();

// If the user is already logged in, redirect them to the homepage
if(isset($_SESSION['login'])){
    header("Location: main.html");
    exit();
}

include 'link.php';

$error = "";

if(isset($_POST['submit'])){

    $login = trim($_POST['username']);
    $password = $_POST['password'];

    if(empty($login) || empty($password)){
        $error = "❌ Please fill in all fields.";
    } else {

        $select = $conn->prepare("SELECT * FROM account WHERE login = ?");
        $select->execute([$login]);

        if($select->rowCount() > 0){
            $row = $select->fetch(PDO::FETCH_ASSOC);

            if(password_verify($password, $row['password'])){
                session_regenerate_id(true);
                $_SESSION['login'] = $row['login'];
                header("Location: main.html");
                exit();
            } else {
                $error = "❌ Incorrect password";
            }
        } else {
            $error = "❌User not found ";
        }
    }
}
?>
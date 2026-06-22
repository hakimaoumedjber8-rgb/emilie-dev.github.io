sava_order <?php
session_start();

// Check that the user is inside
if(!isset($_SESSION['login'])){
    header("Location: index.html");
    exit();
}

include 'link.php';

if(isset($_POST['save_order'])){

    $customer_name    = trim($_POST['customer_name']);
    $customer_address = trim($_POST['customer_address']);
    $customer_phone   = trim($_POST['customer_phone']);
    $customer_email   = trim($_POST['customer_email']);
    $product_id       = $_POST['product_id'];
    $quantity         = (int)$_POST['quantity'];
    $total_price      = (float)$_POST['total_price'];

    //Check the fields
    if(empty($customer_name) || empty($customer_address) || empty($customer_phone) || empty($product_id) || $quantity <= 0){
        die("❌Please fill in all fields");
    }

    // 1. Save or pocket the customer
    $check = $conn->prepare("SELECT customer_id FROM customer WHERE phone_number = ?");
    $check->execute([$customer_phone]);

    if($check->rowCount() > 0){
        $customer = $check->fetch(PDO::FETCH_ASSOC);
        $customer_id = $customer['customer_id'];
    } else {
        $insert_customer = $conn->prepare("INSERT INTO customer (name, address, phone_number, email) VALUES (?, ?, ?, ?)");
        $insert_customer->execute([$customer_name, $customer_address, $customer_phone, $customer_email]);
        $customer_id = $conn->lastInsertId();
    }

    // 2. Save the order
    $insert_order = $conn->prepare("INSERT INTO orders (customer_id, product_id, quantity, order_date, total_price) VALUES (?, ?, ?, NOW(), ?)");
    $insert_order->execute([$customer_id, $product_id, $quantity, $total_price]);

    header("Location: main.html");
    exit();
}
?>
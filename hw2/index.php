<!-- 
  COMP 333: Software Engineering
  Trey Plante & Gunn Jungpaibul
-->
<!DOCTYPE HTML>
<html lang="en">
<head>
    <!-- This is the default encoding type for the Html Form post submission. 
    Encoding type tells the browser how the form data should be encoded before 
    sending the form data to the server. 
    https://www.logicbig.com/quick-info/http/application_x-www-form-urlencoded.html-->
    <meta http-equiv="Content-Type" content="application/x-www-form-urlencoded"/>
    <title>Registration & Lookup Form</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <link rel="stylesheet" href="style.css">
</head>

<body>
  <?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "music-db";

    // Create server connection.
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check server connection.
    if ($conn->connect_error) {
      die("Connection failed: " . $conn->connect_error);
    }


    $out_value = "";

    if(!empty($_POST['register'])){
      $s_uname = $_REQUEST['username'];
      $s_pass = $_REQUEST['password'];

      if(!empty($s_uname) && !empty($s_pass)){

        $sql_query = "INSERT INTO users (username, password) VALUES 
                          ('$s_uname', '$s_pass')";

        if ($conn->query($sql_query) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql_query . "<br>" . $conn->error;
        }
      }
    }
    if(!empty($_GET['retrieve'])){
      $s_name = $_REQUEST['name'];

      if(!empty($s_name)){

        $sql_query = "SELECT * FROM ratings WHERE username = ('$s_name')";
        $result = mysqli_query($conn, $sql_query);
       
        while($row = mysqli_fetch_assoc($result)){
          $out_value = $out_value.
          'Song: ' . $row['song'] . ' Rating: ' . $row['rating']."<br><br>";
        }  
      }
      else{
        $out_value = 'No ratings for this user.';
      }

    }
    $conn->close();
  ?>

  <!-- 
    Form for registering a user.
  -->

  <div class="content">
    <h1 id="pagetitle">music-db</h1>

    <h1>Registration</h1>
    <form method="POST" action="">
    Username: <input type="text" name="username" placeholder="Enter your username" /><br>
    Password: <input type="text" name="password" placeholder="Enter a password" /><br>
    <br>
    <input type="submit" name="register" value="Register"/>
    </form>

    <!-- Form for song retrieval -->
    <h1> Song Retrieval</h1>
    <form method="GET" action="">
    Username: <input type="text" name="name" placeholder="Enter the username" /><br>
    <br>
    <input type="submit" name="retrieve" value="Retrieve"/> 
    </form>

  <p><?php 
    if(!empty($out_value)){
      echo $out_value;
    }
  ?></p>
  </div>
  
</body>
</html>
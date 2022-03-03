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
    $s_name = $_REQUEST['username'];
    $s_pass = $_REQUEST['password'];

    if(!empty($_POST['register'])){
      if(!empty($s_name) && !empty($s_name)){

        $sql_query = "INSERT INTO users (username, password) VALUES 
                          ('$s_name', '$s_pass')";

        if ($conn->query($sql_query) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql_query . "<br>" . $conn->error;
        }
      }
    }
    if(!empty($_GET['retrieve'])){

      if(!empty($s_name)){

        $sql_query = "SELECT * FROM ratings WHERE username = ('$s_name')";
        $result = mysqli_query($conn, $sql_query);
       
        while($row = mysqli_fetch_assoc($result)){
          $out_value = $out_value.
          'Song: ' . $row['song'] . ' Rating: ' . $row['rating']."\r\n";
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
  <h1>Registration</h1>
  <form method="POST" action="">
  Username: <input type="text" name="username" placeholder="Enter your email" /><br>
  Password: <input type="text" name="password" placeholder="Enter a password" /><br>
  <input type="submit" name="register" value="Register"/>
  </form>

  <!-- Form for song retrieval -->
  <h1>Song Retrieval</h2>
  <form method="GET" action="">
  Username: <input type="text" name="username" placeholder="Enter the username" /><br>
  <input type="submit" name="retrieve" value="Retrieve"/> 
  </form>

  <p><?php 
    if(!empty($out_value)){
      echo $out_value;
    }
  ?></p>
  
</body>
</html>
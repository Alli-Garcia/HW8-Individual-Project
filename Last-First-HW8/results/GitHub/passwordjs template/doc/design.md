+--------------------------------+
|          User Input            |
|--------------------------------|
|   email, password             |
+---------------+----------------+
                |
                V
+--------------------------------+
|      Authentication Module     |
|--------------------------------|
|  Validate email and password   |
|  Check against database       |
|  Return true/false             |
+---------------+----------------+
                |
                V
+--------------------------------+
|      Encryption Module         |
|--------------------------------|
|  Encrypt passwords             |
|  Save email-hash pairs        |
|  to password.enc.txt           |
+---------------+----------------+
                |
                V
+--------------------------------+
|  Database Integration Module   |
|--------------------------------|
|  Upload encrypted data        |
|  to MongoDB using Mongoose    |
+--------------------------------+

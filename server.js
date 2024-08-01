  import express from 'express';
  import mysql from 'mysql2/promise';
  import cors from 'cors';
  import bodyParser from 'body-parser';
  import jwt from 'jsonwebtoken'; 
  import dotenv from 'dotenv';
  import authenticateToken from './src/middleware/authMiddleware.js';

  dotenv.config();
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  const secret = process.env.ACCESS_TOKEN_SECRET;

  const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'duyanhstore'
  };

  // Create a pool of connections
  const pool = mysql.createPool(dbConfig);

  // Get all products
  app.get('/products', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT * FROM products');
      res.json(rows);
    } catch (err) {
      console.error('Error fetching products:', err);
      res.status(500).send('Error fetching products');
    }
  });

  // Get product by ID
  app.get('/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
      const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [productId]);
      if (rows.length === 0) {
        res.status(404).send('Product not found');
        return;
      }
      res.json(rows[0]);
    } catch (err) {
      console.error('Error fetching product:', err);
      res.status(500).send('Error fetching product');
    }
  });

  // Protect this route
  app.get('/protected', authenticateToken, (req, res) => {
    // You can now access req.user here
    res.json({ message: 'This is a protected route!', user: req.user });
  });




  // User Signup
  app.post('/signup', async (req, res) => {
    const { email, username, password } = req.body;
    try {
      // Insert user into the database
      await pool.query('INSERT INTO users (email, username, password) VALUES (?, ?, ?)', [email, username, password]);
      res.status(201).send('User created successfully');
    } catch (err) {
      console.error('Error creating user:', err);
      res.status(500).send('Error creating user');
    }
  });

  // User Login
  app.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      console.log(`Login attempt for email: ${email}`);

      // Query the user by email
      const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);

      // Check if user exists
      if (rows.length === 0) {
        console.log('User not found');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Retrieve user details
      const user = rows[0];
      console.log('User retrieved from database:', user);

      // Compare plain text passwords
      if (user.password !== password) {
        console.log('Password does not match');
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      console.log('Login successful');
      res.status(200).json({ token, userId: user.id });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  app.post('/cart', authenticateToken, async (req, res) => {
    const { product_id } = req.body;
    const userId = req.user.userId; // Assuming req.user contains the decoded token with userId

    try {
      // Check if the product already exists in the cart
      const [rows] = await pool.query('SELECT * FROM cart WHERE user_id = ? AND product_id = ?', [userId, product_id]);

      if (rows.length > 0) {
        // If the product exists, update the quantity
        await pool.query('UPDATE cart SET quantity = quantity + 1 WHERE user_id = ? AND product_id = ?', [userId, product_id]);
      } else {
        // If the product does not exist, insert a new row
        await pool.query('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, 1)', [userId, product_id]);
      }

      res.status(200).send('Product added to cart');
    } catch (err) {
      console.error('Error adding product to cart:', err);
      res.status(500).send('Error adding product to cart');
    }
  });

  // Get cart items for a user
  // Get cart items
app.get('/cart', authenticateToken, async (req, res) => {
  const userId = req.user.userId; // Ensure you have user ID from JWT
  try {
    const [cartItems] = await pool.query('SELECT * FROM cart WHERE user_id = ?', [userId]);

    if (cartItems.length === 0) {
      return res.json([]); // Return empty array if no items
    }

    const productIds = cartItems.map(item => item.product_id);
    const placeholders = productIds.map(() => '?').join(',');

    const [productsRows] = await pool.query(`SELECT * FROM products WHERE id IN (${placeholders})`, productIds);

    const detailedCartItems = cartItems.map(cartItem => {
      const product = productsRows.find(p => p.id === cartItem.product_id);
      return { ...cartItem, ...product };
    });

    res.json(detailedCartItems);
  } catch (err) {
    console.error('Error fetching cart items:', err);
    res.status(500).send('Error fetching cart items');
  }
});


app.delete('/cart/:product_id', authenticateToken, async (req, res) => {
  const productId = req.params.product_id;
  const userId = req.user.userId; // User ID from the JWT token
  
  try {
    // Check the current quantity of the product in the cart
    const [cartItem] = await pool.query('SELECT quantity FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId]);
    
    if (cartItem.length === 0) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }
    
    const currentQuantity = cartItem[0].quantity;

    if (currentQuantity > 1) {
      // Decrement the quantity by 1 if there are more than 1
      await pool.query('UPDATE cart SET quantity = quantity - 1 WHERE user_id = ? AND product_id = ?', [userId, productId]);
    } else {
      // Remove the item from the cart if the quantity is 1
      await pool.query('DELETE FROM cart WHERE user_id = ? AND product_id = ?', [userId, productId]);
    }

    res.status(200).json({ message: 'Product quantity updated' });
  } catch (error) {
    console.error('Error updating cart item quantity:', error);
    res.status(500).json({ error: 'Error updating cart item quantity' });
  }
});

app.post('/products/:id/like', authenticateToken, async (req, res) => {
  const productId = req.params.id;
  try {
    await pool.query('UPDATE products SET likes = likes + 1 WHERE id = ?', [productId]);
    res.status(200).send('Product liked successfully');
  } catch (err) {
    console.error('Error liking product:', err);
    res.status(500).send('Error liking product');
  }
});


  const port = 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

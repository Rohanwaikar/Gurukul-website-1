import fs from 'node:fs/promises';  // Using 'fs/promises' for promise-based file operations
import express from 'express';  // Importing express to create the server

const app = express();  // Creating an instance of express

app.use(express.json());  // Middleware to parse JSON request bodies
app.use(express.static('public'));  // Serving static files from the 'public' directory

app.use((req, res, next) => {   // Middleware to handle CORS (Cross-Origin Resource Sharing)
  res.setHeader('Access-Control-Allow-Origin', '*');  // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');  // Allow specific HTTP methods
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow specific headers in the request
  if(req.method === 'OPTIONS') {  
    return res.sendStatus(204);  
  }  
  next();  
});

app.get('/meals', async (req, res) => {  
  const meals = await fs.readFile('./data/available-meals.json', 'utf8'); 
  res.json(JSON.parse(meals)); 
}); 

app.post('/orders', async (req, res) => {
  try {
    console.log('Received body:', req.body);

    const customer = req.body.customer;
    if (!customer) {
      return res.status(400).json({ message: 'Missing customer object in request body.' });
    }

    const { name, email, street, mobile, city, 'postal-code': postalCode } = customer;

    if (
      !email || !email.includes('@') ||
      !name || name.trim() === '' ||
      !street || street.trim() === '' ||
      !postalCode || postalCode.trim() === '' ||
      !city || city.trim() === '' ||
      !mobile || mobile.trim() === ''
    ) {
      return res.status(400).json({
        message: 'Missing data: Email, name, street, postal code, city or mobile number is missing.',
      });
    }

    const newOrder = {
      customer: { name, email, street, mobile, city, postalCode },
      id: Date.now().toString(),
    };

    const orders = await fs.readFile('./data/orders.json', 'utf8');
    const allOrders = JSON.parse(orders);
    allOrders.push(newOrder);
    await fs.writeFile('./data/orders.json', JSON.stringify(allOrders, null, 2));

    res.status(201).json({ message: 'Order created!' });
  } catch (error) {
    console.error('Error while creating order:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.use((req, res) => { 
  if (req.method === 'OPTIONS') {  
    return res.sendStatus(200);  
  }

  res.status(404).json({ message: 'Not found' });  
}); 

// -----------------------
// UPDATED:
const PORT = process.env.PORT || 3001;  // ← UPDATED: Use env port for deployment platforms

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));  // ← UPDATED: Use dynamic port

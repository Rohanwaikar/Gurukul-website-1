import fs from 'node:fs/promises';  // Using 'fs/promises' for promise-based file operations
import express from 'express';  // Importing express to create the server
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");
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

// Create reusable transporter object using SMTP transport (example Gmail SMTP)

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Your email address
    pass: process.env.EMAIL_PASS, // Your email password or app password
  },
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


    // Send Notification Email

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.NOTIFY_EMAIL || process.env.EMAIL_USER, // where you want to receive notifications
      subject: `New Enquiry Received - ID: ${newOrder.id}`,
      text: `New enquiry received from ${name}.\n
Email: ${email}
Mobile: ${mobile}
Address: ${street}, ${city} - ${postalCode}

Enquiry ID: ${newOrder.id}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending notification email:', error);
      } else {
        console.log('Notification email sent:', info.response);
      }
    });




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

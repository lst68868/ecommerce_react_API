// Importing necessary dependencies
import express from "express";
import cors from "cors";
import axios from "axios";
import jwt from "jsonwebtoken";
import Product from "../DB/Models/Products.js";
import User from "../DB/Models/Users.js";
import connectToDB from "../DB/connect.js";
import bcrypt from "bcrypt";

// Instantiating the express app
const app = express();
// Accessing environment variables
// Setting port from environment variables or default 3000
const PORT = process.env.PORT || 3000;
// Applying CORS middleware to allow requests from different origins
app.use(cors());
// Applying middleware for JSON body parsing
app.use(express.json());

connectToDB();

// JWT middleware handler:
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, "password", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.user = user;
    next();
  });
}

// Endpoint to seed the database with products from the given API
app.get("/seed", async (req, res) => {
  try {
    Product.collection.dropIndex("id_1", function (err, result) {
      if (err) {
        console.log("Error in dropping index!", err);
      }
    });
    const response = await axios.get("https://fakestoreapi.com/products");
    let products = response.data;
    console.log("THESE PRODUCTS HAVE OLD ID " + products);
    // Removing the id field from each product
    products = products.map((product) => {
      const { id, ...productWithoutId } = product;
      return productWithoutId;
    });
    console.log("NO IDS HERE " + products);
    // Deleting all products before seeding
    await Product.deleteMany({});
    // Creating products
    await Product.create(products);
    console.log("DID IT WORK? " + products);

    res.json({ message: "Database seeded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});

// Empty home route
app.get("/", (req, res) => {
  res.send("Welcome to the home route");
});

// Endpoint to fetch all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to fetch a specific product by _ID
app.get("/products/:id", async (req, res) => {
  const productId = req.params.id;

  try {
    const product = await Product.findOne({ _id: productId });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to fetch products by category
app.get("/products/category/:category", async (req, res) => {
  const category = req.params.category;

  try {
    const products = await Product.find({ category });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to add a product to the database
app.post("/products", authenticateToken, async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const { title, price, description, category, image } = req.body;

    const product = await Product.create({
      title,
      price,
      description,
      category,
      image,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to delete a product from the database
app.delete("/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findOneAndDelete({ _id: productId });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to update a product in the database
app.put("/products/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const { title, price, description, category, image } = req.body;

    const product = await Product.findOneAndUpdate(
      { _id: productId },
      {
        title,
        price,
        description,
        category,
        image,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to create a new user
app.post("/user", async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const { firstName, lastName, email } = req.body;
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
    };
    await User.create(user);

    res.status(200).json({ message: "User created! Yaaaaay :)" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error: ${error._message}` });
  }
});

app.post("/login", async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: "Bad Request" });
    }
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, "your-secret-key", {
      expiresIn: "24h", // Set the token expiration time
    });

    res.status(200).json({ message: "Login successful", token, User: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error: ${error._message}` });
  }
});

app.delete("/user/:email", async (req, res) => {
  const email = req.params.email;

  try {
    const deletedUser = await User.findOneAndDelete({ email: email });
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: `Internal Server Error: ${error._message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

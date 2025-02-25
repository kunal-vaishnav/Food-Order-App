const fs = require("fs/promises");
const bodyParser = require("body-parser");
const express = require("express");
const path = require("path");

const app = express();
const DATA_PATH = path.join(__dirname, "data");

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // Serve static files dynamically

// CORS Headers
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//  Get meals dynamically
app.get("/meals", async (req, res) => {
  try {
    const mealsPath = path.join(DATA_PATH, "available-meals.json");
    const meals = await fs.readFile(mealsPath, "utf8");
    res.json(JSON.parse(meals));
  } catch (error) {
    res.status(500).json({ message: "Error fetching meals", error });
  }
});

// Handle order creation dynamically
app.post("/orders", async (req, res) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const orderData = req.body.order;

    if (!orderData || !orderData.items || orderData.items.length === 0) {
      return res.status(400).json({ message: "Missing order data." });
    }

    const customer = orderData.customer;
    if (
      !customer.email ||
      !customer.email.includes("@") ||
      !customer.name ||
      customer.name.trim() === "" ||
      !customer.street ||
      customer.street.trim() === "" ||
      !customer["postal-code"] ||
      customer["postal-code"].trim() === "" ||
      !customer.city ||
      customer.city.trim() === ""
    ) {
      return res.status(400).json({
        message: "Missing required customer details.",
      });
    }

    // Create new order object
    const newOrder = {
      ...orderData,
      id: Date.now().toString(),
    };

    // Read existing orders
    const ordersPath = path.join(DATA_PATH, "orders.json");
    let allOrders = [];

    try {
      const orders = await fs.readFile(ordersPath, "utf8");
      allOrders = JSON.parse(orders);
    } catch (err) {
      console.log("No existing orders, creating new file...");
    }

    // Append new order
    allOrders.push(newOrder);
    await fs.writeFile(ordersPath, JSON.stringify(allOrders, null, 2));

    res.status(201).json({ message: "Order created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error processing order", error });
  }
});

//Handle OPTIONS request & 404 errors
app.use((req, res) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  res.status(404).json({ message: "Not found" });
});

//  Start Server
app.listen(3000, () => console.log("Server running on port 3000 🚀"));

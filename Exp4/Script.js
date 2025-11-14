// Experiment 7: REST API for Playing Card Collection using Express.js
// Save this file as cards_api.js and run using: node cards_api.js
// Requirements: Node.js v18+, Express.js

const express = require("express");
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// In-memory data
let cards = [
  { id: 1, suit: "Hearts", value: "A" },
  { id: 2, suit: "Spades", value: "10" },
];

// Helper: Validate card
function validateCard(card) {
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const values = [
    "A",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
  ];

  if (!suits.includes(card.suit)) return "Invalid suit";
  if (!values.includes(card.value)) return "Invalid value";
  return null;
}

// Routes
// GET all cards
app.get("/cards", (req, res) => {
  res.json(cards);
});

// GET card by ID
app.get("/cards/:id", (req, res) => {
  const card = cards.find((c) => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ message: "Card not found" });
  res.json(card);
});

// POST create card
app.post("/cards", (req, res) => {
  const { suit, value } = req.body;
  const error = validateCard({ suit, value });
  if (error) return res.status(400).json({ message: error });

  const newCard = {
    id: cards.length ? cards[cards.length - 1].id + 1 : 1,
    suit,
    value,
  };
  cards.push(newCard);
  res.status(201).json(newCard);
});

// PUT update card
app.put("/cards/:id", (req, res) => {
  const card = cards.find((c) => c.id === parseInt(req.params.id));
  if (!card) return res.status(404).json({ message: "Card not found" });

  const { suit, value } = req.body;
  const error = validateCard({ suit, value });
  if (error) return res.status(400).json({ message: error });

  card.suit = suit;
  card.value = value;

  res.json(card);
});

// DELETE card
app.delete("/cards/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cards.findIndex((c) => c.id === id);

  if (index === -1) return res.status(404).json({ message: "Card not found" });

  const removed = cards.splice(index, 1);
  res.json({ message: "Card deleted", removed });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

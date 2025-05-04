require("./db")

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require("./routes/taskRoutes");
const authMidlleware = require("./middleware/authMiddleware");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.use('/api/auth', authRoutes);
app.use("/api/task", authMidlleware, taskRoutes);

app.get('/', (req, res) => {
  res.send('Servidor rodando com Express!');
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

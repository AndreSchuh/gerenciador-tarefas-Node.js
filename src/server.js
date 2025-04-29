require("./db")

const express = require('express');
const cors = require("cors");
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require("./routes/taskRoutes");
const authMidlleware = require("./middleware/authMiddleware");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('models'));
app.use("/api", taskRoutes);

app.use('/api/auth', authRoutes);

app.use(express.static(path.join(__dirname, "views")));

// Rota raiz redireciona para o index.html automaticamente
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get('/', (req, res) => {
  res.send('Servidor rodando com Express!');
});

app.use("/api/tasks", authMidlleware, taskRoutes);


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

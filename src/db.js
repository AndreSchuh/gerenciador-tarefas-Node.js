const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/gerenciador-tarefas')

.then(() => console.log("Conectado ao mongoDB"))
.catch((err) => console.log("Erro ao conectar ao mongoDB: ", err))

const mongoose = require('mongoose');

mongoose.connect('mongodb://admin:senha123@localhost:27017/', {
    authSource: 'admin',
})

.then(() => console.log("Conectado ao mongoDB"))
.catch((err) => console.log("Erro ao conectar ao mongoDB: ", err))

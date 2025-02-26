const User = require("../models/userModel");

exports.getUsers = async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch (error){
        res.status(500).json({ error: "Erro ao buscar os usuários"});
    }
};

exports.createUser = async (req, res) => {
    try{
        const {nome, email, senha} = req.body;
        const newUser = new User({ nome, email, senha});
        await newUser.save();
        res.status(201).json({message: "Usuário criado com sucesso"});
    } catch (error){
        res.status(500).json({message: "Erro ao criar usuário"});
    }
}
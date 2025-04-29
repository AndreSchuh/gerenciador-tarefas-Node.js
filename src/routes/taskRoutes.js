const express = require("express");
const router = express.Router();
const Task = require("../models/Task")

router.post("/task", async (req, res) => {
    try{
        console.log("REQ BODY:", req.body);
        
        const { title } = req.body;
        const task = new Task({ title });
        await task.save();
        res.status(201).json(task);
    }catch (err){
        console.error(err);
        res.status(500).json({ error: "Erro ao criar a tarefa"});
    }
});

router.get("/task", async (req,res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    
    }catch(err) {
        res.status(500).json({error: "Erro ao listar as tarefas"});
    }
})

router.delete("/task/:id", async (req,res) => {
    try{
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.json({ message: "Tarefa removida com sucesso"});
    }catch(err) {
        res.status(500).json({ error: "Erro ao remover a tarefa"})
    }
})

module.exports = router;

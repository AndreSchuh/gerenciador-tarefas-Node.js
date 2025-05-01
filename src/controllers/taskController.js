const Task = require("../models/Task");

exports.createTask = async (req, res) => {
    try{
        const { title } = req.body;
        const task = new Task ({ title });
        await task.save();
        res.status(201).json(task);
    }catch(err){
        console.error(err);
        res.status(500).json({ error: "Erro ao criar a tarefa"});
    }
}

exports.getTasks = async (req,res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    
    }catch(err) {
        res.status(500).json({error: "Erro ao listar as tarefas"});
    }
}

exports.deleteTaskById = async (req,res) => {
    try{
        const { id } = req.params;
        await Task.findByIdAndDelete(id);
        res.json({ message: "Tarefa removida com sucesso"});
    }catch(err) {
        res.status(500).json({ error: "Erro ao remover a tarefa"})
    }
}

exports.updateTaskStatusById = async (req, res) => {
    try {
        const { done } = req.body;
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { done },
            { new: true }
        );
        if (!task) {
            return res.status(404).json({ error: "Tarefa não encontrada" });
        }

        res.json(task);
    } catch (err) {
        res.status(500).json({ error: "Erro ao atualizar a tarefa" });
    }
}
const { todo } = require('../models')

class TodoController {
    static index(req, res){
        todo.findAll()
            .then(todos => {
                res.json({
                    count:todos.length,
                    status:true,
                    data:todos
                })
            })
            .catch(err => {
                res.status(500).json({ 
                    error: err.message 
                })
            })
    }

    static findByUuid(req, res){
        let uuid = req.params.uuid
        todo.findOne({ 
            where: { 
                uuid 
            } 
        }) 
            .then(result => {
                if(result !== null){
                    res.json({
                        count:1,
                        status:true,
                        data:result
                    })
                } else{
                    res.json({
                        count:0,
                        status: true,
                        data: null
                    })
                }
            })
            .catch(err => {
                res.status(500).json({ 
                    error: err.message 
                })
            })
    }

    static create(req, res){
        const {task, description, status} = req.body
        todo.create({
            task,
            description,
            status
        })
            .then(result => {
                res.status(201).json({
                    status:true,
                    message:"data has been created",
                    data:result
                })
            })
            .catch(err => {
                res.status(500).json({ error: err.message }) // Handle error properly
            })
    }

    static delete(req, res){
        let uuid = req.params.uuid
        todo.destroy({
            where: {
                uuid
            }
        })
            .then(result => {
                if(result === 1){
                    res.json({
                        status:true,
                        message:"data has been deleted"
                    })
                } else{
                    res.status(400).json({
                        status:false,
                        message:"data not found. failed to delete"
                    })
                }
            })
            .catch(err => {
                res.status(500).json({ error: err.message }) // Handle error properly
            })
    }

    static update(req, res){
        let uuid = req.params.uuid
        const {task, description, status} = req.body
        todo.update({
                task, description, status
            },{
            where: {
                    uuid
                }
            })
            .then(([updatedRows]) => {
                if(updatedRows > 0){
                    res.json({
                        status:true,
                        message:"data has been updated"
                    })
                }else{
                    res.status(400).json({
                        status:false,
                        message:"data not found. failed to update"
                    })
                }
            })
            .catch(err => {
                res.status(500).json({error: err.message})
            })
        
    }
}

module.exports = TodoController
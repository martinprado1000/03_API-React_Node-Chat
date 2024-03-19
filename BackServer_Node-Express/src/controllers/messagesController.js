const MessagesService = require("../services/messagesService")

class MessagesController {
    constructor(){
        this.messageService = new MessagesService 
    }

    async get(req,res){
        const result = await this.messageService.get()
        res.json(result)
    }

    async getPaginate(req,res){
        const query = req.query;
        const result = await this.messageService.getPaginate(query)
        res.json(result)
    }

    async getById(req,res){
        const id = req.params.pid
        const result = await this.messageService.getById(id)
        res.json(result)
    }

    async post(req,res){
        const body = req.body
        const result = await this.messageService.post(body)
        res.json(result)
    }

    async put(req,res){
        const id = req.params.pid
        const body = req.body
        const result = await this.messageService.put(id,body)
        res.json(result)
    }

    async delete(req,res){
        const id = req.params.pid
        const result = await this.messageService.delete(id)
        res.json(result)
    }

}

module.exports = MessagesController;
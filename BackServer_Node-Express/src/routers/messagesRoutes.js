const {Router} = require("express")

const MessagesController = require("../controllers/messagesController");

const messagesRouter = new Router()

const messagesController = new MessagesController();

messagesRouter.get("/messages", messagesController.get.bind(messagesController))
messagesRouter.get("/messagesPaginate", messagesController.getPaginate.bind(messagesController))
messagesRouter.get("/messages/:pid", messagesController.getById.bind(messagesController))
messagesRouter.post("/messages", messagesController.post.bind(messagesController))
messagesRouter.put("/messages/:pid", messagesController.put.bind(messagesController))
messagesRouter.delete("/messages/:pid", messagesController.delete.bind(messagesController))

module.exports = messagesRouter


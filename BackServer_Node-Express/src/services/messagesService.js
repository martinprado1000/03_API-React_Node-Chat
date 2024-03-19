const MessagesRepository = require("../repositories/messagesRepository");
const mongoose = require("mongoose");

// Funcion para validar si los id son validos para mongo
const isValid = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

class MessagesService {
  constructor() {
    this.messagesRepository = new MessagesRepository();
  }

  async get() {
    try {
      const result = await this.messagesRepository.get();
      if (!result || result == "") {
        return { status: 404, data: "No existen mensage" };
      }
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async getPaginate() {
    try {
      const result = await this.messagesRepository.getPaginate();
      if (!result || result == "") {
        return { status: 404, data: "No existen mensage" };
      }
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async getById(id) {
    if (!isValid(id)) {
      return { status: 404, data: "ID de usuario invalido" };
    }
    try {
      const result = await this.messagesRepository.getById(id);
      if (!result) {
        return { status: 404, data: "Mensage no encontrado" };
      }
      //console.log(result)
      return { status: 200, data: result };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async post(body) {
    try {
      const result = await this.messagesRepository.post(body);
      //console.log(result)
      return { status: 201, data: "Mensage ingresado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async put(id, body) {
    if (!isValid(id)) {
      return { status: 404, data: "ID de usuario invalido" };
    }
    try {
      const result = await this.messagesRepository.put(id, body);
      //console.log(result)
      if (!result) {
        return { status: 404, data: "Mensage no encontrado" };
      }
      return { status: 201, data: "Mensage editado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }

  async delete(id) {
    if (!isValid(id)) {
      return { status: 404, data: "ID de usuario invalido" };
    }
    try {
      const result = await this.messagesRepository.delete(id);
      //console.log(result.deletedCount)
      if (result.deletedCount == 0) {
        return { status: 404, data: "Mensage no encontrado" };
      }
      return { status: 204, data: "Mensage eliminado correctamente" };
    } catch (e) {
      console.log(e);
      return { status: 500, data: "Error inesperado en el sistema" };
    }
  }
}

module.exports = MessagesService;

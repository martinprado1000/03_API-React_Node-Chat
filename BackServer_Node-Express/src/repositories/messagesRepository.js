// Repository: requerimos el factory para seleccionar el tipo de persistencia

const messagesFactory = require("../factories/messagesFactory");
const MessagesDTO = require("../DTOs/messagesDTO");

class MessagesRepository {
  constructor() {
    this.dao = messagesFactory(process.env.PERSISTENCE);
    //console.log(this.dao);
  }

  async get() {
    const result = await this.dao.get();
    if (result == null) {
      return result;
    }
    return result.map((message) => new MessagesDTO(message));
  }

  async getPaginate(query,options) {
    const result = await this.dao.getPaginate(query,options);
    if (result == null) {
      return result;
    }
    const payload = await result.docs.map((p)=>p.toObject());
    result.docs = payload
    result.docs = result.docs.map((message) => new MessagesDTO(message));
    return result
  }

  async getById(id) {
    const result = await this.dao.getById(id);
    if (result == null) {
      return result;
    }
    return new MessagesDTO(result);
  }

  async post(body) {
    const result = await this.dao.post(body);
    if (result == null) {
      return result;
    }
    return new MessagesDTO(result);
  }

  async put(id, body) {
    const result = await this.dao.put(id, body);
    if (result == null) {
      return result;
    }
    return new MessagesDTO(result);
  }

  async delete(id) {
    const result = await this.dao.delete(id);
    //console.log(result)
    return result;
  }
}

module.exports = MessagesRepository;

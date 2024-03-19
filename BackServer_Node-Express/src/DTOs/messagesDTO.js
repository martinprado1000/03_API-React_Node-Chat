//Aparte de modificar el dato id, tambien sacamos los datos createdAt y updatedAt porque son datos irrelevantes para el cliente.

class MessagesDTO {
  constructor(message) {
    this.id = message._id || message.id; // Esto lo que hace es que si el dato vine distinto segun la persistencia estemos usando no importa porque lo vamos retornar siempre igual.
    this.message = message.message;
    this.owner = message.owner;
    this.createdAt = message.createdAt;
    this.updatedAt = message.updatedAt;
  }
}

module.exports = MessagesDTO;

const { Schema, model } = require("mongoose"); // de mongoose solo requier Schema y model
const mongoosePaginate = require("mongoose-paginate-v2");
// Schema: es para armar el esquema de como va a ser nuestra colleccion, se escribe en mayusculo porque es una clase.
// model: es lo que interactua nuestro esquema con la colleccion

//Los tipo de datos los obtenemos d la paguina de mongoose
const messagesSchema = new Schema(
  {
    message: {
      type: String,
      trim: true,
      require: true,
    },
    owner: {
      type: String,
      require: true,
      trim: true,
    },
  },
  { timestamps: true } // Esto habilita automáticamente los campos created_at y updated_at
);

messagesSchema.plugin(mongoosePaginate); // Asi inyectamos el plugin de mongoose-paginate en nuestro esquema

module.exports = model("messages", messagesSchema);
// Si no existe la colleccion messages crea la colleccion, pero lo muestra cuando ingresemos el primer documento
// Aca indicamos que el nombre de nuestro modelo es Products y esta basado en el Schema messagesSchema.
// Y lo exporto para usar en otro lado de la aplicacion

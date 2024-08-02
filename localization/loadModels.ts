import { sequelize } from "./database";

// MODELS
import "@models/i18n";
import "@models/Embed";
import "@models/Field";
import "@models/Button";
import "@models/SelectMenu";
import "@models/SelectMenuOption";
import "@models/Modal";
import "@models/ModalTextInput";
import "@models/Command";
import "@models/CommandOption";
import "@models/CommandOptionChoice";
// import "@models/Medallium";

export async function loadModels() {
    try {
        sequelize.authenticate(); // Authenticate if the db is ok and create if not exists the schema

        await sequelize.sync({}).then(() => {
            console.log("Database syncronized successfully!\n");
        });
    } catch (err) {
        console.error(err);
    }
}
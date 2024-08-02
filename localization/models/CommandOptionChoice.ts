import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../database";

export interface CommandOptionChoice extends Model<InferAttributes<CommandOptionChoice>, InferCreationAttributes<CommandOptionChoice>> {
    option_id: string;
    command_id: string;
    cmd_parent_id: string;
    is_subcommand?: boolean;
    id: string;
    language: "es-ES" | "en-US" | "fr";
    name: string;
    value: string;
    type: "STRING" | "INTEGER";
    created_at?: Date;
    updated_at?: Date;
}

export const CommandOptionChoice = sequelize.define<CommandOptionChoice>("CommandOptionChoice", {
    option_id: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        allowNull: false
    },
    command_id: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        allowNull: false
    },
    cmd_parent_id: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        allowNull: false
    },
    is_subcommand: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    id: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(32),
        allowNull: false,
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "STRING",
        values: [ "STRING", "INTEGER" ]
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
},{ timestamps: false, freezeTableName: true });
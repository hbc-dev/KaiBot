import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../database";

export interface CommandOption extends Model<InferAttributes<CommandOption>, InferCreationAttributes<CommandOption>> {
    command_id: string;
    cmd_parent_id: string;
    is_subcommand?: boolean;
    id: string;
    language: "es-ES" | "en-US" | "fr";
    name?: string;
    description?: string;
    created_at?: Date;
    updated_at?: Date;
}

export const CommandOption = sequelize.define<CommandOption>("CommandOption", {
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
        allowNull: false,
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
    description: {
        type: DataTypes.STRING(100),
        allowNull: false
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
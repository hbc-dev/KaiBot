import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../database";

export interface Embed extends Model<InferAttributes<Embed>, InferCreationAttributes<Embed>> {
    id: string;
    language: "es-ES" | "en-US" | "fr";
    title: string;
    author?: string;
    description?: string;
    footer?: string;
    created_at?: Date;
    updated_at?: Date;
}

export const Embed = sequelize.define<Embed>("Embed", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING(256),
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING(256),
    },
    description: {
        type: DataTypes.STRING(4096),
    },
    footer: {
        type: DataTypes.STRING(2048),
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
}, { timestamps: false, freezeTableName: true });
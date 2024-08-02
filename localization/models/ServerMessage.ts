import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../database";

export interface ServerMessage extends Model<InferAttributes<Required<ServerMessage>>, InferCreationAttributes<ServerMessage>> {
    id: string;
    language: "es-ES" | "en-US" | "fr";
    value: string;
    created_at?: Date;
    updated_at?: Date;
}

export const ServerMessage = sequelize.define<ServerMessage>("ServerMessage", {
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
    value: {
        type: DataTypes.STRING(2000),
        allowNull: false,
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
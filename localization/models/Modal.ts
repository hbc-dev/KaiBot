import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../database";

export interface Modal extends Model<InferAttributes<Modal>, InferCreationAttributes<Modal>> {
    id: string;
    language: "es-ES" | "en-US" | "fr";
    title: string;
    created_at?: Date;
    updated_at?: Date;
}

export const Modal = sequelize.define<Modal>("Modal", {
    id: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        allowNull: false
    },
    language: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
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
}, { timestamps: false, freezeTableName: true });
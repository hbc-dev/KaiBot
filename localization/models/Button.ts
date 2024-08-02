import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../database";

export interface Button extends Model<InferAttributes<Button>, InferCreationAttributes<Button>> {
    id: string;
    language: "es-ES" | "en-US" | "fr";
    disabled?: boolean;
    emoji?: string;
    label?: string;
    style?: number;
    url?: string;
    created_at?: Date;
    updated_at?: Date;
}

export const Button = sequelize.define<Button>("Button", {
    id: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        allowNull: false,
    },
    language: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    disabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    emoji: {
        type: DataTypes.STRING
    },
    label: {
        type: DataTypes.STRING(80)
    },
    style: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    url: {
        type: DataTypes.STRING
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
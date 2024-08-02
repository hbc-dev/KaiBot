import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../database";

export interface i18n extends Model<InferAttributes<Required<i18n>>, InferCreationAttributes<i18n>> {
    id: string;
    language: "es-ES" | "en-US" | "fr";
    value: string;
    created_at?: Date;
    updated_at?: Date;
}

export const i18n = sequelize.define<i18n>("i18n", {
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
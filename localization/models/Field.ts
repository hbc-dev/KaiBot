import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../database";

export interface Field extends Model<InferAttributes<Field>, InferCreationAttributes<Field>> {
    id: string;
    embed_id: string;
    language: "es-ES" | "en-US" | "fr";
    name: string;
    value: string;
    inline?: boolean;
    created_at?: Date;
    updated_at?: Date;
}

export const Field = sequelize.define<Field>("Field", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    embed_id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    language: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING(256),
        allowNull: false
    },
    value: {
        type: DataTypes.STRING(1024),
        allowNull: false
    },
    inline: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
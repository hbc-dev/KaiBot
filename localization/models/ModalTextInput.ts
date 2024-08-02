import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../database";

export interface ModalTextInput extends Model<InferAttributes<ModalTextInput>, InferCreationAttributes<ModalTextInput>> {
    modal_id: string;
    id: string;
    language: "es-ES" | "en-US" | "fr";
    style: 1 | 2;
    label: string;
    min_length?: number;
    max_length?: number;
    required?: boolean;
    value?: string;
    placeholder?: string;
    created_at?: Date;
    updated_at?: Date;
}

export const ModalTextInput = sequelize.define<ModalTextInput>("ModalTextInput", {
    modal_id: {
        type: DataTypes.STRING(100),
        primaryKey: true,
        allowNull: false
    },
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
    style: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            is: /1|2/
        }
    },
    label: {
        type: DataTypes.STRING(45),
        allowNull: false
    },
    min_length: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
            max: 4000,
            min: 0
        }
    },
    max_length: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 4000,
        validate: {
            max: 4000,
            min: 1
        }
    },
    required: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    value: {
        type: DataTypes.STRING(4000)
    },
    placeholder: {
        type: DataTypes.STRING(100)
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
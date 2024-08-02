import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../database";

export interface SelectMenuOption extends Model<InferAttributes<SelectMenuOption>, InferCreationAttributes<SelectMenuOption>> {
	menu_id: string;
	language: "es-ES" | "en-US" | "fr";
	value: string;
	default?: boolean;
	description?: string;
	emoji?: string;
	label: string;
	created_at?: Date;
	updated_at?: Date;
}

export const SelectMenuOption = sequelize.define<SelectMenuOption>("SelectMenuOption", {
    menu_id: {
		type: DataTypes.STRING(100),
		primaryKey: true,
		allowNull: false,
    },
    language: {
		type: DataTypes.STRING,
		primaryKey: true,
		allowNull: false,
    },
    value: {
        type: DataTypes.STRING(100),
        allowNull: false,
        primaryKey: true
    },
    default: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    description: {
        type: DataTypes.STRING(50)
    },
    emoji: {
        type: DataTypes.STRING
    },
    label: {
        type: DataTypes.STRING(25),
        allowNull: false
    },
    created_at: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
    },
    updated_at: {
		type: DataTypes.DATE,
		allowNull: false,
		defaultValue: DataTypes.NOW,
    },
}, { timestamps: false, freezeTableName: true });

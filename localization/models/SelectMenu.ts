import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import { sequelize } from "../database";

export interface SelectMenu extends Model<InferAttributes<SelectMenu>, InferCreationAttributes<SelectMenu>> {
  id: string;
  language: "es-ES" | "en-US" | "fr";
  disabled?: boolean;
  maxValues?: number;
  minValues?: number;
  placeholder?: string;
  created_at?: Date;
  updated_at?: Date;
}

export const SelectMenu = sequelize.define<SelectMenu>("SelectMenu",
	{
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
		maxValues: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1
		},
		minValues: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 1
		},
		placeholder: {
			type: DataTypes.STRING(150),
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
  },
  { timestamps: false, freezeTableName: true }
);

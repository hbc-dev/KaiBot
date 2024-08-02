import { DataTypes } from "sequelize";
import { sequelize } from "../database";

export const Medallium = sequelize.define("Medallium", {
    name_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
    },
    description_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    skill_id: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rank: {
        type: DataTypes.STRING,
        allowNull: false
    },
    equipment_slots: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tribe_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    attack_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    technique_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    inspirit_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    soultimate_id: {
        type: DataTypes.STRING,
        allowNull: false
    },
    can_evolve: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    evolution_id: {
        type: DataTypes.STRING
    },
    type: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "A row for each game"
    }
}, { timestamps: false, freezeTableName: true });
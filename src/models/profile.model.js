import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const profileModel = sequelize.define("Profile", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    references: {
      model: "users",
      key: "id"
    }
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  biography: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  avatar_url: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  birth_date: {
    type: DataTypes.DATE,
    allowNull: true
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
}, {
  tableName: "profiles",
  timestamps: false,
  paranoid: true,
  deletedAt: "deleted_at"
});

export default profileModel;

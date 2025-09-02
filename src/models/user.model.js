import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import profileModel from "./profile.model.js";
import articleModel from "./article.model.js";

const userModel = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM("admin", "user"),
    allowNull: false,
    defaultValue: "user"
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
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true
  },
}, {
  tableName: "users",
  timestamps: false, 
  paranoid: true,
  deletedAt: "deleted_at"
});

//relacion 1:1 user y profile
userModel.hasOne(profileModel, {
  foreignKey: "user_id",
  as: "profile"
});
profileModel.belongsTo(userModel, {
  foreignKey: "user_id",
  as: "user"
});

//relacion 1:N user y articles
userModel.hasMany(articleModel, {
  foreignKey: "user_id",
  as: "articles"
});
articleModel.belongsTo(userModel, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "CASCADE"
});

export default userModel;
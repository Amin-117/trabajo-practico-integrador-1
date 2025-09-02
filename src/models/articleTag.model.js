import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import articleModel from "./article.model.js";
import tagModel from "./tag.model.js";

const articleTagModel = sequelize.define("ArticleTag", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    article_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "articles",
      key: "id"
    }
  },
  tag_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "tags",
      key: "id"
    }
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
  tableName: "article_tags",
  timestamps: false
});

// Relación N:M
articleModel.belongsToMany(tagModel, {
  through: articleTagModel,
  foreignKey: "article_id",
  otherKey: "tag_id",
  as: "tags"
});

tagModel.belongsToMany(articleModel, {
  through: articleTagModel,
  foreignKey: "tag_id",
  otherKey: "article_id",
  as: "articles"
});

export default articleTagModel;

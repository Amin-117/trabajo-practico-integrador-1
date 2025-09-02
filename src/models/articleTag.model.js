import { DataTypes } from "sequelize";
import sequelize from "../config/database";

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

export default articleTagModel;

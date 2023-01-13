import sequelize  from "sequelize";

const db = new sequelize('mpishi', 'root', '' , {
    host: "localhost",
    dialect: "mysql"
});

export default db

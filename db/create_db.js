require('dotenv').config();
const  mysql      = require('mysql');
const {NEW_DB_NAME, NEW_DB_AUTH_TABLE_NAME, NEW_DB_CLUSTERS_TABLE_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST} = process.env;

const createDbQuery = `CREATE DATABASE ${NEW_DB_NAME};`;
const createAuthTableQuery = `CREATE TABLE ${NEW_DB_AUTH_TABLE_NAME} (id int UNSIGNED AUTO_INCREMENT,  customerid int, customername varchar(20), username varchar(20), password varchar(20), PRIMARY KEY(id));`;
const createClustersTableQuery = `CREATE TABLE ${NEW_DB_CLUSTERS_TABLE_NAME} (clusterid int UNSIGNED AUTO_INCREMENT, customerid int UNSIGNED, clustername varchar(20), endpoints varchar(50), clustersize int, vpcid varchar(20), subnetid varchar(20), zone varchar(20), targetcloud varchar(20), PRIMARY KEY(clusterid));`;

const db_pipe_creation = async ()=>{
    const  create_db_connection = await mysql.createConnection({
        host     : DB_HOST || 'localhost',
        user     : DB_USERNAME,
        password : DB_PASSWORD,
    });
    await create_db_connection.connect();
    const errors = [];
    await create_db_connection.query(createDbQuery, async (error, results, fields) => {
            if (error) {
                errors.push("Can not create DB " + NEW_DB_NAME);
                throw error;
            }
    });
    await create_db_connection.end();

   const create_table_connection = await mysql.createConnection({
        host     : DB_HOST || 'localhost',
        user     : DB_USERNAME,
        password : DB_PASSWORD,
        database : NEW_DB_NAME
    });
    setTimeout(async ()=>{
    await create_table_connection.query(createAuthTableQuery, async (error, results, fields) => {
        if (error) {
            console.error("Can not create Table " + NEW_DB_AUTH_TABLE_NAME, error);
            throw error;
        }
    });
    await create_table_connection.query(createClustersTableQuery, async (error, results, fields) => {
        if (error) {
            errors.push("Can not create Table " + NEW_DB_CLUSTERS_TABLE_NAME);
            throw error;
        }
    });

    if (!errors.length) {
        const successStr = `Database "${NEW_DB_NAME}" is ready to use with the tables: "${NEW_DB_AUTH_TABLE_NAME}" and "${NEW_DB_CLUSTERS_TABLE_NAME}";`;
        console.log(successStr);
    }
    await create_table_connection.end();
}, 500);
};

db_pipe_creation();

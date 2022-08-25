# SYSTEM REQUIREMENTS:
- NODE JS: v. 16+
- MARIADB:  10.8.3

1. Install backend packages
```
npm install
```
2. Env variables:
```
PORT=8080
DB_USERNAME=sd
DB_PASSWORD=password
DB_HOST=localhost
DB_PORT=3306
DB_NAME=dfaas
```
If need to create a new database with the tables (values provided for example)
```
NEW_DB_NAME=dfaas
NEW_DB_AUTH_TABLE_NAME=auth
NEW_DB_CLUSTERS_TABLE_NAME=clusters
```

3. Create DB [OPTIONAL]
```
npm run create_db
```
4. Build client (from the root project folder)
```
cd client && npm run build
```
5. Run server (from the root project folder)
```
npm start 
```
6. Open port 8080
7. If we created database with the webserver, we should insert auth permissions in the table for auth.
   (or it can be done from the webserver)
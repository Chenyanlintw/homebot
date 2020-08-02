# Setup

## Step 1. Install npm dependencies
```
npm install
```

## Step 2. Fix Mysql Connection Issue
```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';
```
If you can't login mysql after above commend. You need add followings into the end of /etc/my.cnf.
```
[mysqld]
skip-grant-tables
```

## Step 3. Create Mysql Database
```
node init-db.js
```

## Step 4. Create Database Tables
```
node init-db-tables.js
```

# Run
```
forever start bg-services.js
forever start app.js
```

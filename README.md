# Introduction
This is a home IOT bot project (WIP).
It records temperature, humidity, lux values and present a dashboard by website.

Raspberry Pi (Server Machine)
- setup a express.js server
- provide RESTful api to receive other sensor's data.
- provide a front-end dashboard page to view datas.

Raspberry Pi (Sensor Machine)
- Read sensors data by GPIO
- Send data by request.js to server (with different module_id)

&nbsp;

# Setup Server Machine

## Step 1. Install npm dependencies
```
npm install
```

## Step 2. Fix Mysql Connection Issue
There's authority issue when Node.js work with latest MySql. (because of the login encrypt type)
```
ALTER USER 'root'@'localhost' IDENTIFIED BY 'MyNewPass';
```
If you can't login mysql after above commend. You need add followings into the end of /etc/my.cnf.
```
[mysqld]
skip-grant-tables
```

## Step 3. Create MySql Database
```
node init-db.js
```

## Step 4. Create Database Tables
```
node init-db-tables.js
```

# Run
Here we use pm2 to run our apps. Because it's easier to setup a autorun on boot. (below command must run in homebot folder)
Install pm2 if you haven't install before.
```
sudo npm install pm2 -g 
```
Use pm2 run apps.
```
pm2 start bg-services.js
pm2 start app.js
```

# Autorun on Boot
Run below script first.
```
pm2 startup systemd
```
Copy/Paste & run the result. This will setup pm2 autorun ability. Example:
```
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u pi --hp /home/pi
```
Save current pm2 status(with app.js & bg-services.js running) for next autorun.
```
pm2 save
```

&nbsp;

# Setup Sensor Machines
(WIP)
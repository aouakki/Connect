### Solive connect
 * login/register part system using laravel 5.4
 * connected users part using socket.io 
 
 ### Prerequisites
  
  * MySQL or MariaDB listning on port 3306
  * PHP >= v7.1  
  * composer 
  * nodejs >= v8
  * NPM 
 
### How to install
 
 1. clone this repository using git . 
 2. update `solive-test/.env` and `websocket-server/conf` according to your configuration
 2. go to `solive-test/` and run the flowing commands : 
  ```bash
   composer install
   npm install
   npm build
   php artisan migrate
   php artisan serve
   ```
   this should setup the login/register part using php internal server on post `8000`.
  3. go to `websocket-server/` and run the flowing commands : 
   ```bash
   npm install
   node index.js
   ```
   socket.io server should be listing on port `3000` by default.
   
   NB : in case you need to modify the socket.io port , don't forget the client in `solive-test/resources/assets/js/app.js` part then run `npm build`
     
  

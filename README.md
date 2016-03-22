# jsSkeletonAng1
Enterprize js modularity skeleton based on node (back) and angular 1 (front)

<h2> Boilerplate include: </h2>

<b>Angular 1  (1.5.3)</b>  on frontend

<b>Node + koa</b>   on backend   (WebSocket-server included also - ws module)

<b>Typescript + TSD + ES6</b> integrate with front and backend

<b>Babel + Webpack</b>

<b>Gulp</b>

<b>Stylus</b> (Auto-generated retina-ready sprites)

<b>Bootstrap</b>

<b>Jade engine</b> on front and back

<b>Karma + Jasmine</b> (Protractor in future) <br>

/src (in all main folders: server | backend | frontend) - source files that will be compiled by bundle systems<br>

/built (in all main folders: server | backend | frontend) - builded files <br>

/engine  - engine folder <br>

/engine/server - server files <br>


<i>After repo cloning execute -  <b>npm i</b> </i> <br><br>
When all package will be installed, you must launch - <b>gulp</b>  from app root folder from your terminal. Gulp build all src files to built folder and stop self into watch mode (you can change src files, and gulp execute some task for this file types (css/ts/jade/etc) <br> 
To start the server, please, launch /engine/server/built/server.js by executing  (node server.js)  or  (nodemon server.js) if you use nodemon, server will be started at 8080 port (you will see msg in console)

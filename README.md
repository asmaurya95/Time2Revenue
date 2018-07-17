# IBM - Time to Revenue

A Web application to track project from inception to revenue realization.

## Dependencies

Install [couchDB](https://couchdb.apache.org/) and make sure the server is up and running.

## Instructions

#### Setting up databases :

- Open the browser and navigate to http://localhost:5984/_utils/

This would open [fauxton](https://couchdb.apache.org/fauxton-visual-guide/index.html), a native web based interface built into couchDB.

- Create a database named <code> ibm </code> and create a few documents containing the user credentials, username(email), group(program-manager / service-manager) and password.

Program-Manager (Sample) :
```
{  
  "_id": "<predefined by couchdb>",

  "_rev": "<predefined by couchdb>",

  "username": "pm@ibm.com",

  "password": 1234,

  "group": "program-manager"
}
```

Service-Manager (Sample) :
```
{  
  "_id": "<predefined by couchdb>",

  "_rev": "<predefined by couchdb>",

  "username": "sm@ibm.com",

  "password": 1234,

  "group": "service-manager"
}
```
- Create a [view](http://docs.couchdb.org/en/2.1.1/ddocs/views/intro.html) with design-name <code> users </code> and view-name <code> login </code>.

Map function :

```
function (doc) {
    emit(doc.username, doc);
}
```
This view would emit username as <code> key </code> and document as <code> value </code>.

- Create another database named <code> projects </code> where all project data will be stored.

- Create a [view](http://docs.couchdb.org/en/2.1.1/ddocs/views/intro.html) with design-name <code> findproject </code> and view-name <code> findbyname </code>.

Map function :

```
function (doc) {
    emit(doc.username, doc);
}
```

#### To install, clone the repository and install node dependencies :

<code>$ git clone https://github.com/asmaurya95/Time2Revenue.git </code>

<code>$ cd Time2Revenue</code>

<code>$ npm install</code>

#### Start the server :

<code>$ npm start</code>

OR

(For developers)

<code>$ npm run devstart</code>

This would enable the server to automatically restart on any changes made to the script while the server is already running

Open the browser and navigate to http://localhost:3000/ to see the application in action.

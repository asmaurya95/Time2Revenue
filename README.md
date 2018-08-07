# IBM - Time to Revenue

A Web application to track project from inception to revenue realization.

## Dependencies

Install [couchDB](https://couchdb.apache.org/) and make sure the server is up and running.

## Instructions

#### Setting up databases :

- Open the browser and navigate to http://localhost:5984/_utils/

This would open [fauxton](https://couchdb.apache.org/fauxton-visual-guide/index.html), a native web based interface built into couchDB.

- Create a database named <code> projects </code> where all project data will be stored.

- Create a [view](http://docs.couchdb.org/en/2.1.1/ddocs/views/intro.html) with design-name <code> findproject </code> and view-name <code> findbyname </code>.

Map function :

```
function (doc) {
    emit(doc.proj_name, doc);
}
```
Note: This view is required to make queries on projects database.

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

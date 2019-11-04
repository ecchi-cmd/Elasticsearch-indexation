//ajouter  la bibliothèque Elasticsearch
const elasticsearch = require('elasticsearch');
// instancier un client elasticsearch
const client = new elasticsearch.Client({
   hosts: [ 'http://localhost:9200']
});
//require Express
const express = require( 'express' );
// instancier une instance d'express
const app     = express();
//ajouter la bibliothèque body-parser utilisé pour parser le fichier JSON
const bodyParser = require('body-parser')
const path    = require( 'path' );

// tester l'état du cluster ElasticSearch
client.ping({
     requestTimeout: 30000,
 }, function(error) {
     if (error) {
         console.error('ElasticSearch Is Down!');
     } else {
         console.log('ElasticSearch Is Up');
     }
 });

app.use(bodyParser.json())
// ajouter le numéro du port (localhost:3001)
app.set( 'port', process.env.PORT || 3001 );
app.use( express.static( path.join( __dirname, 'public' )));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

//ajouter le view template
app.get('/', function(req, res){
  res.sendFile('template.html', {
     root: path.join( __dirname, 'views' )
   });
})

// definir la route /search pour retourner le résultat de recherche
app.get('/search', function (req, res){
  console.log(req.query["q"])
  let body = {
    size: 200,
    from: 0, 
    query: {
      fuzzy: {
        tags:{
          value: req.query['q'],
          fuzziness:4
        }
      }
    }
  }
  // chercher dans l'indew flickrphotos avec le type metadata
  client.search({index:'flickrphotos',  body:body})
  .then(results => {
    res.send(results.hits.hits);
    console.log(results.hits.hits);
  })
  .catch(err=>{
    console.log(err)
    res.send([]);
  });

})

app .listen( app.get( 'port' ), function(){
  console.log( 'Express server listening on port ' + app.get( 'port' ));
} );
module.exports = app;

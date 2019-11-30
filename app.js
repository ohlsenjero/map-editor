const express = require('express');

const app = express();
const expressLayouts = require('express-ejs-layouts');

const dirTree = require("directory-tree");

var tree;

const fs = require('file-system');

var bodyParser = require('body-parser');
 app.use(bodyParser.urlencoded({
  limit: '50mb',
    extended: false, 

  }));
 app.use(bodyParser.json({ type: 'application/json' }))


app.use(expressLayouts);
app.use(express.static(__dirname + "/assets/"));
app.use('/images/', express.static('./images'));



app.set('view engine', 'ejs');
// app.set('views', './views')

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server started on port ${PORT}`));

////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
////////////////////////////////////////

/// SWATCHES  from folder
//

function getSwatches(rootFolder){

  var rf = "./images/a/";
  if(rootFolder=='A'){
    console.log('choclo');
    rf = "./images/a/";
    tree = dirTree(rf);
    
  }else if(rootFolder=='B'){
    console.log('porotos');
    rf = "./images/b/";
    tree = dirTree(rf);
  }
  
  

  var dirFind = [];
  var obj = {};

for(var i= 0; i < tree.children.length; i++){
  console.log(tree.children[i].path)
  /////////////////////
  /////
  //        HERE IS WHERE YOU CHANGE (VIA AJAX i guess) AND SWITCH BETWEEN  "./images:A/" <<>> "./images:B/"
  /////
  //////////
  var newTree = dirTree(rf+tree.children[i].name);



  if(newTree.children != undefined){
    //console.log(newTree.children.length);
    for(var j= 0; j < newTree.children.length; j++){

      dirFind.push(newTree.children[j].path);
      
    }

  }else{ 
      dirFind.push(tree.children[i].path);
      
  }
}

for (var i = 0; i< dirFind.length; i++) {
  obj["variable_" + i] = dirFind[i];
  ///
  //  SO HERE is where I can distinguish from one palette to the next (mountain, desert, water, etc..)
  //       and so maybe store in different objects (name based on type)
  //        and then send as diff keys in the {post object}
  //          to pick up in the view and put each one in a diff palette.class (to switch back and forth)
  //
  // class="palette-floors",class="palette-walls","palette-overs","palette-anim&covers"<-(liquids-tallGrass)
  //      
}
return obj;
}


app.get('/',  function(req, res){

  console.log('main-pageLoad');
  var obj = getSwatches('A');
  var obj2 = getSwatches('B');

  res.render('landing', {data: obj, data2: obj2})
        
});





app.post('/tile-settings',  function(req, res){
  console.log('tile-settings');

  var resetTileSize = req.body.tileSize;
  var map = req.body.map;
  var mapForLoading = JSON.parse(req.body.mapForLoading);
  //console.log(map);

  //console.log(req.body.x)
  var setMap = {tilesXY:{x:req.body.x, y:req.body.y}, tileSize:parseInt(resetTileSize),map: map,  mapForLoading:mapForLoading};

  res.json({map:setMap})
        
});





app.post('/save',  function(req, res){
  console.log('saving');

  // var obj = getSwatches('A');
  // var obj2 = getSwatches('B');
  // ///write (save)

  // var dataGame = req.body.map;
  // fs.writeFileSync('saved/'+req.body.name+'.txt', dataGame);

  var dataLoad = JSON.stringify(req.body);
  console.log(req.body.map);
  fs.writeFileSync('saved/'+req.body.name+'.json', dataLoad);


  res.json({})
        

});


app.post('/load',  function(req, res){
  console.log('loading');
    var obj = getSwatches('A');
  var obj2 = getSwatches('B');

  var dataLoad = req.body.name;
  console.log(dataLoad);

  //read (load) 
  var rawdata = fs.readFileSync('saved/'+dataLoad+'.json');
  var parsedData = JSON.parse(rawdata);
  
  //console.log(JSON.parse(parsedData.tilesXY));
    console.log(parsedData.map);
  var loadedMap = {name: parsedData.name , tileSize: parsedData.tileSize , tilesXY: JSON.parse(parsedData.tilesXY),  map: JSON.parse(parsedData.map), mapForLoading: JSON.parse(parsedData.mapForLoading)};

///I dont need to resend the obj!!!!
  res.json({data: obj, map: loadedMap})

});
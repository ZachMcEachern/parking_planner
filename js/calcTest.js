//var time = sessionStorage.time;
//var struct = sessionStorage.structure;
//$.getScript(getLot(sessionStorage.structure), function(data, textStatus, jqxhr){});

function getLot(name){
  var loc = "js/parking_structure_charts/chart-area-";
  var split = name.split(" ");
  var structArray = ["nutwood", "state-college", "eastside", "lotAG", "ev-church"];
  for(var i = 0; i < structArray.length; ++i){
    if(structArray[i].toLowerCase().includes(split[0].toLowerCase()))
    {
      console.log(loc + structArray[i] + ".js");
      return loc + structArray[i] + ".js";
    }
    if(split[0].toLowerCase().includes("ev")){
      return loc + "ev-church.js";
    }
  }
  return null;
}

function getLotName(name){
  var split = name.split(" ");
  var structArray = ["nutwood", "state-college", "eastside", "lotAG", "ev-church"];
  for(var i = 0; i < structArray.length; ++i){
    if(structArray[i].toLowerCase().includes(split[0].toLowerCase()))
    {
      return structArray[i] + ".js";
    }
    if(split[0].toLowerCase().includes("ev")){
      return "ev-church.js";
    }
  }
  return null;
}
module.exports={getLotName}

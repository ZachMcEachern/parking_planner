var time = sessionStorage.time;
var struct = sessionStorage.structure;

if(struct == "Nutwood Parking Structure"){
  $.getScript( "js/parking_structure_charts/chart-area-nutwood.js", function( data, textStatus, jqxhr){});
}
else if(struct == "State College Structure"){
  $.getScript( "js/parking_structure_charts/chart-area-state-college.js", function( data, textStatus, jqxhr){});
}
else if(struct == "Eastside Structure"){
  $.getScript( "js/parking_structure_charts/chart-area-eastside.js", function( data, textStatus, jqxhr){});
}
else if(struct == "Lot A & G"){
  $.getScript( "js/parking_structure_charts/chart-area-lotAG.js", function( data, textStatus, jqxhr){});
}
else{
  $.getScript( "js/parking_structure_charts/chart-area-ev-church.js", function( data, textStatus, jqxhr){});
}

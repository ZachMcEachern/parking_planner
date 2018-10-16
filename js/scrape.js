const request = require('request');
const cheerio = require('cheerio');
module.exports = function (n) { return n * 111 }

var URL = 'https://parking.fullerton.edu/parkinglotcounts/mobile.aspx';

request(URL, (error, response, html) => {
    if(!error && response.statusCode == 200){
	const $ = cheerio.load(html);
	var numArray = [];

$('.AvailableYellow span').each((i,elem) => {
    const item = $(elem).text();
  //  console.log(item);
    numArray[i] = item;
});
document.getElementById('Nutwood').innerHTML = numArray[0];
document.getElementById('East').innerHTML = numArray[1];
document.getElementById('sCollege').innerHTML = numArray[2];
document.getElementById('AG').innerHTML = numArray[3];
document.getElementById('Church').innerHTML = numArray[4];

}
});

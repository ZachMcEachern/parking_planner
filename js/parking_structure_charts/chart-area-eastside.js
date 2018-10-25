// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
var timeSlots = ["07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30",
"11:45", "12:00", "12:15", "12:30", "12:45", "01:00", "01:15", "01:30", "01:45", "02:00", "02:15", "02:30", "02:45", "03:00", "03:15", "03:30", "03:45", "04:00", "04:15", "04:30",
"04:45", "05:00", "05:15", "05:30", "05:45", "06:00", "06:15", "06:30", "06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30",
"09:45", "10:00"]

var time = sessionStorage.time;
var tSplit= time.split(":");
var pm = false;

if(tSplit[0] > 12){
  tSplit[0] = tSplit[0] - 12;
  pm = true;
  time = '0' + tSplit[0] + ':' + tSplit[1];
}
else
time = tSplit[0] + ':' + tSplit[1];



function index(time){
  if(pm == true){
  return timeSlots.lastIndexOf(time);
}
  else{
  return timeSlots.indexOf(time);
}
};

// Parking Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: timeSlots,
    datasets: [{
      label: "Parked Cars",
      lineTension: 0.3,
      backgroundColor: "rgba(2,17,216,0.2)",
      borderColor: "rgba(2,17,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,17,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,17,216,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
        //7am             8am                 9am                 10am                11am                 12pm                1pm                 2pm                 3pm                 4pm                 5pm                 6pm                 7pm                8pm                  9pm                 10pm
      data: [49, 125, 208, 354, 523, 682, 705, 856, 932, 1008, 1134, 1198, 1263, 1302, 1320, 1359, 1360, 1365, 1365, 1362, 1363, 1364, 1365, 1364, 1360, 1358, 1365, 1363, 1365, 1320, 1305, 1298, 1250, 1230, 1218, 1206, 1189, 1130, 1097, 1003, 952, 870, 783, 682, 597, 503, 453, 389, 305, 235, 198, 121, 87, 53, 34, 20, 17, 12, 5, 1, 0],
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: 1365,
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  },
  // NEW LINE
  lineAtIndex: [index(time)]
});

const verticalLinePlugin = {
  getLinePosition: function (chart, pointIndex) {
      const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
      const data = meta.data;
      return data[pointIndex]._model.x;
  },
  renderVerticalLine: function (chartInstance, pointIndex) {
      const lineLeftOffset = this.getLinePosition(chartInstance, pointIndex);
      const scale = chartInstance.scales['y-axis-0'];
      const context = chartInstance.chart.ctx;

      // render vertical line
      context.beginPath();
      context.strokeStyle = '#ffa500';
      context.moveTo(lineLeftOffset, scale.top);
      context.lineTo(lineLeftOffset, scale.bottom);
      context.stroke();

      // write label
      context.fillStyle = "#000000";
      context.font = "normal 30px Arial";
      context.textAlign = 'center';
      context.fillText('test', lineLeftOffset + 40, (scale.bottom - scale.top) / 2 + scale.top);
  },

  afterDatasetsDraw: function (chart, easing) {
      if (chart.config.lineAtIndex) {
          chart.config.lineAtIndex.forEach(pointIndex => this.renderVerticalLine(chart, pointIndex));
      }
  }
  };

  Chart.plugins.register(verticalLinePlugin);

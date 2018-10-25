// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var time = sessionStorage.time;
var tSplit= time.split(":");
var pm = false;

if(tSplit[0] > 12){
  tSplit[0] = tSplit[0] - 12;
  pm = true;
}
time = '0' + tSplit[0] + ':' + tSplit[1];// + ':' + tSplit[2];


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
    labels: ["7:00", "7:15", "7:30", "7:45", "8:00", "8:15", "8:30", "8:45", "9:00", "9:15", "9:30", "9:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30", "11:45", "12:00", "12:15", "12:30", "12:45", "1:00", "1:15", "1:30", "1:45", "2:00", "2:15", "2:30", "2:45", "3:00", "3:15", "3:30", "3:45", "4:00", "4:15", "4:30", "4:45", "5:00", "5:15", "5:30", "5:45", "6:00", "6:15", "6:30", "6:45", "7:00", "7:15", "7:30", "7:45", "8:00", "8:15", "8:30", "8:45", "9:00", "9:15", "9:30", "9:45", "10:00"],
    datasets: [{
      label: "Time",
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
      data: [21, 56, 97, 134, 201, 284, 347, 432, 498, 603, 687, 804, 923, 1056, 1203, 1301, 1339, 1339, 1337, 1338, 1332, 1330, 1329, 1332, 1338, 1339, 1337, 1333, 1339, 1325, 1305, 1298, 1242, 1227, 1215, 1203, 1180, 1145, 1103, 1042, 993, 902, 823, 750, 678, 559, 476, 389, 290, 198, 121, 87, 61, 45, 32, 20, 13, 6, 0, 0, 0],
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
          max: 1339,
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

// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';

var time = sessionStorage.time;
var structure = sessionStorage.structure;
var spaces, max_spaces;

if (structure == 'Nutwood Parking Structure') {
  max_spaces = 2439;
  spaces = nutwood_spaces;
} else if (structure == 'State College Structure') {
  max_spaces = 1339;
  spaces = state_spaces;
} else if (structure == 'Eastside Structure') {
  max_spaces = 1365;
  spaces = eastside_spaces;
} else if (structure == 'Lot A & G') {
  max_spaces = 2104;
  spaces = lotag_spaces;
} else  {
  max_spaces = 550;
  spaces = church_spaces;
}

const lookback = 10;
const spaces_window = max_spaces - 200;

var timeSlots = ["07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30", "09:45", "10:00", "10:15", "10:30", "10:45", "11:00", "11:15", "11:30",
"11:45", "12:00", "12:15", "12:30", "12:45", "01:00", "01:15", "01:30", "01:45", "02:00", "02:15", "02:30", "02:45", "03:00", "03:15", "03:30", "03:45", "04:00", "04:15", "04:30",
"04:45", "05:00", "05:15", "05:30", "05:45", "06:00", "06:15", "06:30", "06:45", "07:00", "07:15", "07:30", "07:45", "08:00", "08:15", "08:30", "08:45", "09:00", "09:15", "09:30",
"09:45", "10:00"]

var tSplit = time.split(":");
var pm = false;

if (tSplit[0] > 12){
  tSplit[0] = tSplit[0] - 12;
  pm = true;
  time = '0' + tSplit[0] + ':' + tSplit[1];// + ':' + tSplit[2];
}
else {
  time = tSplit[0] + ':' + tSplit[1];// + ':' + tSplit[2];
}


function timeIndex(time){
  if (pm == true){
    return timeSlots.lastIndexOf(time);
  }
  else {
    return timeSlots.indexOf(time);
  }
};

function recommendIndex(time) {
  var index = timeIndex(time)
  for (var i = index; i > (index - lookback); i--) {
    if (spaces[i] < spaces_window) {
      return i
    }
  }
}

// Parking Chart Example
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: timeSlots,
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
      data: spaces,
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
          max: max_spaces,
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

  lineAtIndex: {
    [timeIndex(time)]: "Inputted time",
    [recommendIndex(time)]: "Recommended time"
  }
});

const verticalLinePlugin = {
  getLinePosition: function (chart, pointIndex) {
      const meta = chart.getDatasetMeta(0); // first dataset is used to discover X coordinate of a point
      const data = meta.data;
      return data[pointIndex]._model.x;
  },
  renderVerticalLine: function (chartInstance, pointIndex, text, offset) {
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
      context.font = "normal 12px Arial";
      context.textAlign = 'center';
      context.fillText(text, lineLeftOffset + offset, (scale.bottom - scale.top) / 5 + scale.top);
  },

  afterDatasetsDraw: function (chart, easing) {
      if (chart.config.lineAtIndex) {
          //chart.config.lineAtIndex.forEach(pointIndex => this.renderVerticalLine(chart, pointIndex));
          var offset = -58;
          for (var key in chart.config.lineAtIndex){
            this.renderVerticalLine(chart, key, chart.config.lineAtIndex[key], offset);
            offset += 100;
          }
      }
  }
  };

  Chart.plugins.register(verticalLinePlugin);

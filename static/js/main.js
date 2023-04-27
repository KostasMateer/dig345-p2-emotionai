function updateData(google, textblobs) {
  myChart.data.datasets[0].data = [google, textblobs];
  myChart.update();
}

$('#google-form').submit(function(event) {
  event.preventDefault(); // prevent default form submit behavior
  $("#google-prediction").html(`<p>sentiment: loading...</p>`)
  $("#python-prediction").html(`<p>sentiment: loading...</p>`)
  var inputVal = $('#input-field').val();
  if (inputVal) {
    fetch('https://dig345-p2-emotionai.vercel.app/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: inputVal }),
    })
    .then((response) => {
      // convert to json
      return response.json();
    })
    .then((data) => {
      setTimeout(function() {
        $("#google-prediction").html(`<p>sentiment: ${data.google_sentiment}</p>`)
        $("#python-prediction").html(`<p>sentiment: ${data.python_sentiment}</p>`)
        updateData(data.google_sentiment, data.python_sentiment)
      }, Math.floor(Math.random() * 500) + 500);
    })
    .catch((err) => console.log(err));
  }
  else {
    $("#google-prediction").html(`<p>sentiment: no text</p>`)
    $("#python-prediction").html(`<p>sentiment: no text</p>`)
  }
})

const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Google Model', 'textBlobs'],
    datasets: [{
      label: 'Sentiment',
      data: [0, 0],
      backgroundColor:  function(context) {
        const value = context.dataset.data[context.dataIndex];
        const colorRed = { r: 255, g: 0, b: 0 };
        const colorGrey = { r: 128, g: 128, b: 128 };
        const colorGreen = { r: 0, g: 255, b: 0 };
        let color;
        if (value < 0) {
          const valueNormalized = value / -1; // convert value to range of 0 to 1
          color = {
            r: colorGrey.r + (colorRed.r - colorGrey.r) * valueNormalized,
            g: colorGrey.g + (colorRed.g - colorGrey.g) * valueNormalized,
            b: colorGrey.b + (colorRed.b - colorGrey.b) * valueNormalized
          };
        } else if (value > 0) {
          const valueNormalized = value / 1; // convert value to range of 0 to 1
          color = {
            r: colorGrey.r + (colorGreen.r - colorGrey.r) * valueNormalized,
            g: colorGrey.g + (colorGreen.g - colorGrey.g) * valueNormalized,
            b: colorGrey.b + (colorGreen.b - colorGrey.b) * valueNormalized
          };
        } else {
          color = colorGrey;
        }
        return `rgba(${color.r}, ${color.g}, ${color.b}, 0.8)`;
      },
      borderColor: [
        'rgba(0, 0, 0, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        min: -1,
        max: 1,
        ticks: {
          stepSize: 0.2
        },
      },
      y1: {
        position: 'right',
        min: -1,
        max: 1,
        ticks: {
          stepSize: 0.2,
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    response: true,
    maintainAspectRatio: false
  }
});


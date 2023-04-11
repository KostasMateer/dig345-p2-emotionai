$('#google-form').submit(function(event) {
  event.preventDefault(); // prevent default form submit behavior
  var inputVal = $('#input-field').val();
  if (inputVal) {
    fetch("https://dig345-p2-emotionai.vercel.app/predict/" + inputVal)
    // fetch("http://localhost:5000/predict/" + inputVal)
    .then((response) => {
      // convert to json
      return response.json();
    })
    .then((data) => {
      $("#google-prediction").html(`Prediction: ${data.google_sentiment}`)
      $("#python-prediction").html(`Prediction: ${data.python_sentiment}`)
    })
    .catch((err) => console.log(err));
  }
  else {
    $("#google-prediction").html(`Prediction: no text`)
    $("#python-prediction").html(`Prediction: no text`)
  }
})

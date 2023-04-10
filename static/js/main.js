$('#python-form').submit(function(event) {
  event.preventDefault(); // prevent default form submit behavior
  var inputVal = $('#input-field').val();
  fetch("http://localhost:5000/predict/" + inputVal)
    .then((response) => {
      // convert to json
      return response.json();
    })
    .then((data) => {
      console.log(data.prediction)
      $("#python-prediction").html(`Prediction: ${data.sentiment}`)
    })
    .catch((err) => console.log(err));
})

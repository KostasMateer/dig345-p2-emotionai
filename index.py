from flask import Flask, render_template, request, jsonify
import joblib
import os
from dotenv import load_dotenv
# load_dotenv()

print(os.environ)

# # Load the trained machine learning model
# model = joblib.load('trained_model.pkl')

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

# # Define a route to accept POST requests
# @app.route('/predict', methods=['POST'])
# def predict():
#     # Get data from the POST request
#     data = request.get_json()

#     # Make predictions using the loaded machine learning model
#     predictions = model.predict(data['input_data'])

#     # Return the predictions as JSON
#     return jsonify({'predictions': predictions.tolist()})

@app.route('/api')
def server_live():
    return jsonify({'message': 'server is live'})

if __name__ == '__main__':
    app.run(debug=True)

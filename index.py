from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
from google.cloud import language_v1
from google.oauth2.service_account import Credentials
from dotenv import load_dotenv
load_dotenv()

# Instantiates a client
client = language_v1.LanguageServiceClient()

# import joblib
# import os

# # Load the trained machine learning model
# model = joblib.load('trained_model.pkl')

app = Flask(__name__, static_folder='static')
CORS(app)

@app.route('/')
def index():
    # if request.method == 'POST':
    #     text_input = request.form['text_input']
    #     prediction = (text_input)
    #     return render_template('index.html', prediction=prediction, text_input=text_input)
    return render_template('index.html')

# Define a route to accept POST requests
@app.route('/predict/<text>', methods=['GET'])
@cross_origin()
def predict(text):
    # Get data from the POST request
    textToSentiment = text
    document = language_v1.Document(content=textToSentiment, type_=language_v1.Document.Type.PLAIN_TEXT)
    sentiment = client.analyze_sentiment(request={'document': document}).document_sentiment.score
    return jsonify({'sentiment': sentiment})

@app.route('/api')
def server_live():
    return jsonify({'message': 'server is live'})

if __name__ == '__main__':
    app.run(debug=True)

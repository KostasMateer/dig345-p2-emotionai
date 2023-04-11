from flask import Flask, render_template, jsonify
from google.cloud import language_v1
from textblob import TextBlob
from dotenv import load_dotenv
load_dotenv()

# Instantiates a client
client = language_v1.LanguageServiceClient()
app = Flask(__name__, static_folder='static')

@app.route('/')
def index():
    return render_template('index.html')

# Define a route to accept POST requests
@app.route('/predict/<text>', methods=['GET'])
def predict(text):
    textToSentiment = text
    document = language_v1.Document(content=textToSentiment, type_=language_v1.Document.Type.PLAIN_TEXT)
    google_sentiment = client.analyze_sentiment(request={'document': document}).document_sentiment.score
    python_sentiment = TextBlob(textToSentiment).sentiment.polarity
    return jsonify(
                    {'google_sentiment': google_sentiment,
                    "python_sentiment": python_sentiment}
                    )


@app.route('/api')
def server_live():
    return jsonify({'message': 'server is live'})

if __name__ == '__main__':
    app.run(debug=True)

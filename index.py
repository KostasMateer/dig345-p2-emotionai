from flask import Flask, render_template, jsonify, request
from google.cloud import language_v1
from textblob import TextBlob
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()

# Instantiates a client
app = Flask(__name__, static_folder="static")
CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})
client = language_v1.LanguageServiceClient()


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/about.html")
def about():
    return render_template("about.html")


# Define a route to accept POST requests
@app.route("/predict", methods=["POST"])
def predict():
    text = request.json.get("text", "")
    textToSentiment = text
    document = language_v1.Document(
        content=textToSentiment, type_=language_v1.Document.Type.PLAIN_TEXT
    )

    google_sentiment = round(client.analyze_sentiment(
        request={"document": document}
    ).document_sentiment.score, 2)

    python_sentiment = round(TextBlob(textToSentiment).sentiment.polarity, 2)

    return jsonify(
        {"google_sentiment": google_sentiment, "python_sentiment": python_sentiment}
    )


@app.route("/api")
def server_live():
    return jsonify({"message": "server is live"})


if __name__ == "__main__":
    app.run()

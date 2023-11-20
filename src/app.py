from flask import Flask, request, jsonify
import pickle
import re
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from flask_cors import CORS
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
import json
import nltk
nltk.download('punkt')
tfidf = TfidfVectorizer(max_features=1000, lowercase=True, stop_words='english')


lemmatizer = WordNetLemmatizer()    

import joblib
model = joblib.load(r'C:\Users\Admin\Desktop\SE\twitter\src\lr_model.pkl')
app = Flask(__name__)
CORS(app)

def preprocess(text):
    text = re.sub(r'@[A-Za-z0-9_]+', '', text) 
    text = re.sub(r'#', '', text) 
    text = re.sub(r'RT[\s]+', '', text)
    text = re.sub(r'https?:\/\/\S+', '', text) 

    
    tokens = word_tokenize(text)
    
    tokens = [lemmatizer.lemmatize(token) for token in tokens if token not in stopwords]

    text = " ".join(tokens)
    
    vectorized = tfidf.transform([text])
    
    return vectorized

@app.route('/predict', methods=['POST'])
def predict():
    
    data = request.get_json()
    text = data.get('text', '') 
    
    # Predict sentiment
    preprocessed_text = preprocess(text)

    # Vectorize the preprocessed text
    vectorized = tfidf.transform([preprocessed_text])

    # Predict sentiment
    prediction = model.predict(vectorized)[0] 
    probs = model.predict_proba(vectorized)

    response = {
        'prediction': prediction,
        'negative_prob': probs[0][0],
        'positive_prob': probs[0][1]
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
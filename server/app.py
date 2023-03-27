from flask import Flask, render_template, jsonify, request, json
from flask_cors import CORS, cross_origin
import os
import pickle

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/pingServer', methods=['GET'])
@cross_origin()
def pingServer():
    resp = {
        "messId": "S",
        "messText": "Success"
    }
    return jsonify(resp)


@app.route('/validatePass', methods=['POST'])
@cross_origin()
def validatePass():
    body_inp = json.loads(request.data)
    data = pickled_tfidf.transform([body_inp['password']]).toarray()
    output = pickled_model.predict(data)
    resp = {
        "messId": "S",
        "messText": "Success",
        "strength": output[0]
    }
    return jsonify(resp)


def word(password):
    character = []
    for i in password:
        character.append(i)
    return character


if __name__ == "__main__":
    # Load Pickled Objects
    pickled_tfidf = pickle.load(open('./assets/pickled/vectorizer.pkl', 'rb'))
    pickled_model = pickle.load(open('./assets/pickled/model.pkl', 'rb'))

    port = int(os.environ.get('PORT', 5011))
    app.run(debug=True, host='0.0.0.0', port=port)

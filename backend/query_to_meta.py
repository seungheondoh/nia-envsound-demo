import argparse
import os
import json
from flask import Flask, request, jsonify, make_response
from transformers import AutoTokenizer, AutoModel
import numpy as np
import pandas as pd
import functions as F
import pickle
from flask_cors import CORS

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app)

## Model & Meta Data Load
tokenizer = AutoTokenizer.from_pretrained('jhgan/ko-sbert-multitask')
model = AutoModel.from_pretrained('jhgan/ko-sbert-multitask')

item_embs = torch.load("./static/model/hier-ko-sbert_embs.pt")
item_indices = torch.load("./static/model/hier-index.pt")
annotation = json.load(open("./static/metadata/annotation.json", 'r'))
kv_items = {k.replace(".wav", ""):", ".join(v['ALL']) for k,v in annotation.items()}
all_items = pd.Series(kv_items)
MP3PATH = "./static/audio/"

@app.errorhandler(404)
def pageNotFound(error):
    return "page not found"

@app.errorhandler(500)
def raiseError(error):
    return error

@app.route('/')
def query_to_result():
    query = request.args['query']
    types = "word"
    ret_items, ret_tags = F.retrieval(query, all_items, item_embs, item_index)
    sim_item_list = []
    for i in sim_tiems:
        instance = annotation[i + ".wav"]
        audio_path = os.path.join(MP3PATH, i)
        instance['audio_path'] = audio_path
        sim_item_list.append(instance)
    output = {
        'query': query,
        'sim_tag' : ret_tags,
        "sim_track": sim_item_list
    }
    return jsonify(**output)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Flask option arguments')
    parser.add_argument('--host', type=str, default=None, help='Default is localhost')
    parser.add_argument('--port', type=int, default=None, help='Default is :5000')
    args = parser.parse_args() 
    host = args.host
    port = args.port

    print("Finish Loading Audio & Meta Data")

    app.run(host="0.0.0.0", port=7777)

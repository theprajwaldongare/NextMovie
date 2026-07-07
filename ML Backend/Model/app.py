import pickle
import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask,url_for,redirect,request,render_template,jsonify


app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

df = pd.read_csv("Datasets/bollywood.csv")
with open("bin/vectorizer.pkl","rb") as f:
    vectorizer = pickle.load(f)

@app.route("/bollywood",methods=["POST"])
def bMovie():
    recdata = request.get_json()
    bsearch = recdata.get("bmovie")
    with open("bin/bollywoodVectors.pkl","rb") as f:
        bVectors = pickle.load(f)
    bsrchDecVec = vectorizer.transform([bsearch])
    bsimilarDec = cosine_similarity(bsrchDecVec,bVectors).flatten()
    topK = 5
    topIndexDec = np.argsort(bsimilarDec)[::-1][:topK]
    print(topIndexDec)

    print("Search keyword: ",bsearch)
    print("\n")
    dataSend = []
    for i in topIndexDec:
        temp=[]
        temp.append(df['title'].iloc[i])
        temp.append(bsimilarDec[i])
        temp.append(df['desc'].iloc[i])
        dataSend.append(temp)
    return jsonify({
        "status":"success",
        "message":dataSend
    })


hdf = pd.read_csv("Datasets/hollywood.csv")
with open("bin/hvectorizer.pkl","rb") as f:
    hvectorizer = pickle.load(f)

@app.route("/hollywood",methods=["POST"])
def hMovie():
    recdata = request.get_json()
    hsearch = recdata.get("hmovie")
    with open("bin/hollywoodVectors.pkl","rb") as f:
        hVectors = pickle.load(f)
    hsrchDecVec = hvectorizer.transform([hsearch])
    hsimilarDec = cosine_similarity(hsrchDecVec,hVectors).flatten()
    topK = 5
    topIndexDec = np.argsort(hsimilarDec)[::-1][:topK]
    print(topIndexDec)

    print("Search keyword: ",hsearch)
    print("\n")
    dataSend = []
    for i in topIndexDec:
        temp=[]
        temp.append(hdf['title'].iloc[i])
        temp.append(hsimilarDec[i])
        temp.append(hdf['desc'].iloc[i])
        dataSend.append(temp)
    return jsonify({
        "status":"success",
        "message":dataSend
    })





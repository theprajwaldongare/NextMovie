import pickle
import numpy as np
import pandas as pd
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask,url_for,redirect,request,render_template,jsonify

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return render_template("index.html")

df = pd.read_csv("Datasets/bollywood.csv")
with open("bin/vectorizer.pkl","rb") as f:
    vectorizer = pickle.load(f)

def recBollywood(bsearch,movieNo):
    with open("bin/bollywoodVectors.pkl","rb") as f:
        bVectors = pickle.load(f)
    bsrchDecVec = vectorizer.transform([bsearch])
    bsimilarDec = cosine_similarity(bsrchDecVec,bVectors).flatten()
    topK = movieNo
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
    return dataSend

@app.route("/bollywood",methods=["POST"])
def bMovie():
    #only for individual request not for combined for combined use the functions...
    recdata = request.get_json()
    bsearch = recdata.get("bmovie")
    movieNo = recdata.get("movieNo")
    databollywood = recBollywood(bsearch,movieNo)

    return jsonify({
        "status":"success",
        "message":databollywood
    })


hdf = pd.read_csv("Datasets/hollywood.csv")
with open("bin/hvectorizer.pkl","rb") as f:
    hvectorizer = pickle.load(f)

def recHollywood(hsearch,movieNo):
    with open("bin/hollywoodVectors.pkl","rb") as f:
        hVectors = pickle.load(f)
    hsrchDecVec = hvectorizer.transform([hsearch])
    hsimilarDec = cosine_similarity(hsrchDecVec,hVectors).flatten()
    topK = movieNo
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
    return dataSend


@app.route("/hollywood",methods=["POST"])
def hMovie():
    recdata = request.get_json()
    hsearch = recdata.get("hmovie")
    movieNo = recdata.get("movieNo")
    datahollywood = recHollywood(hsearch,movieNo)

    return jsonify({
        "status":"success",
        "message":datahollywood
    })

@app.route("/recommend",methods=["POST"])
def recMovie():
    recdata = request.get_json()
    bsearch = recdata.get("movie")
    hsearch = recdata.get("movie")
    movieNo = recdata.get("movieNo")
    datahollywood=[]
    databollywood=[]
    if movieNo%2!=0:
        tempno=(movieNo//2)+1
        datahollywood = recHollywood(hsearch,tempno)
        databollywood = recBollywood(bsearch,(movieNo-tempno))
    else:
        datahollywood = recHollywood(hsearch,(movieNo//2))
        databollywood = recBollywood(bsearch,(movieNo//2))

    return jsonify({
        "status":"sussess",
        "message":datahollywood+databollywood
    })



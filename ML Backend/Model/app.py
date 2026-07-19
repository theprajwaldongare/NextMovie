import os
import pickle
import requests
import numpy as np
import pandas as pd
from dotenv import load_dotenv
from flask_cors import CORS
from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask,url_for,redirect,request,render_template,jsonify


app = Flask(__name__, 
            static_folder='dist/assets', 
            template_folder='dist')
CORS(app)

load_dotenv()
TMDBAPI = os.getenv('TMDB_API')

@app.route("/")
def home():
    return render_template("index.html")

df = pd.read_csv("Datasets/bollywood.csv")
with open("bin/vectorizer.pkl","rb") as f:
    vectorizer = pickle.load(f)

TMDBgen = {
    28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime",
    99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History",
    27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Science Fiction",
    10770: "TV Movie", 53: "Thriller", 10752: "War", 37: "Western"
}

def getMovieInfo(movieName):

    url = f"https://api.themoviedb.org/3/search/movie?api_key={TMDBAPI}&query={movieName}"
    response = requests.get(url).json()
    movieInfo = {}
    if response.get('results'):
        top=response['results'][0]
        title = top.get('title')
        rating = top.get('vote_average')
        votes = top.get('vote_count')
        popularity = top.get('popularity')
        posterPath = top.get('poster_path')
        overview = top.get('overview','')
        genre_ids = top.get('genre_ids', [])

        genres_list = [TMDBgen.get(gid, "Unknown") for gid in genre_ids]

        image = 'https://image.tmdb.org/t/p/w500'
        poster = f"{image}{posterPath}" if posterPath else "No image"

        movieInfo['title'] = title
        movieInfo['rating'] = rating
        movieInfo['votes'] = votes
        movieInfo['popularity'] = popularity
        movieInfo['poster'] = poster
        
        movieInfo['overview'] = overview
        movieInfo['genres'] = genres_list

        # print(f"Title: {title}")
        # print(f"Rating: {rating}/10 (from {votes} votes)")
        # print(f"Popularity Score: {popularity}")
        # print(f"Poster Link: {poster}")
        
    else:
        # print("Movie not found")
        pass
    return movieInfo
    

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
        tmdbData = getMovieInfo(df['title'].iloc[i])
        temp.append(tmdbData)
        dataSend.append(temp)
    return dataSend

@app.route("/bollywood",methods=["POST"])
def bMovie():
    #only for individual request not for combined for combined use the functions...
    recdata = request.get_json()
    bsearch = recdata.get("bmovie")
    movieNo = recdata.get("movieNo")

    inpType = recdata.get("inpType")
    if inpType=="name":
        tmdbData = getMovieInfo(bsearch)
        bsearch = tmdbData.get("overview") or bsearch
    
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
        tmdbData = getMovieInfo(hdf['title'].iloc[i])
        temp.append(tmdbData)
        dataSend.append(temp)
    return dataSend


@app.route("/hollywood",methods=["POST"])
def hMovie():
    recdata = request.get_json()
    hsearch = recdata.get("hmovie")
    movieNo = recdata.get("movieNo")

    inpType = recdata.get("inpType")
    if inpType=="name":
        tmdbData = getMovieInfo(hsearch)
        hsearch = tmdbData.get("overview") or hsearch

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

    inpType = recdata.get("inpType")
    if inpType=="name":
        tmdbData = getMovieInfo(bsearch)
        bsearch = tmdbData.get("overview") or bsearch
    hsearch = bsearch
    
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
        "status":"success",
        "message":datahollywood+databollywood
    })



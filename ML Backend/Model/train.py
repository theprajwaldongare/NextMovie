import pickle
import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer

df = pd.read_csv("Datasets/bollywood.csv")

titleFeature = df['title']
descFeature = df['desc']
genreFeature = df['genre'].str.replace(","," ")
descGenreFeature = genreFeature.fillna("") + descFeature.fillna("")

vectorizer = TfidfVectorizer(stop_words="english")

decvec = vectorizer.fit_transform(descGenreFeature)

with open("bin/vectorizer.pkl", "wb") as f:
    pickle.dump(vectorizer,f)

with open("bin/bollywoodVectors.pkl","wb") as f:
    pickle.dump(decvec,f)




hdf = pd.read_csv("Datasets/hollywood.csv")
hdf.dropna(subset=['desc'], inplace=True)

htitleFeature = hdf['title']
hdescFeature = hdf['desc']
hgenreFeature = hdf['genre'].str.replace(","," ")
hdescGenreFeature = hgenreFeature.fillna("") + hdescFeature.fillna("")

hvectorizer = TfidfVectorizer(stop_words="english")

hdecvec = hvectorizer.fit_transform(hdescGenreFeature)

with open("bin/hvectorizer.pkl", "wb") as f:
    pickle.dump(hvectorizer,f)

with open("bin/hollywoodVectors.pkl","wb") as f:
    pickle.dump(hdecvec,f)

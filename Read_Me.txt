**The Goal of the app:

This application return the similar images based on the images exists the database using Edge Histogram Distances, in this application we will adopt 
both the local histogram 
--------------------------------------------------
**Packages required :

(Python 3.6)
* pymongo
*sklearn.cluster
--------------------------------------------------
**Files :

insert.py:  inject the edge histogram (eh) files in the Mongodb with their indexes and clusters. 
app.py: the web app (http://localhost:5000) using Flask.
templates/index.html : html file of the app

-------------------------------------------------
**Steps to use the app :

1. Open MongoDB
2. Change the path of the input files (eh+ht)
3.add the thumbnail folder to the root of the script(images should exsist directly when the folder is opened)
3. Run insert.ipnb
4. Enter : http://localhost:5000 in your browser 

----------------------------------------------------------------------------
Released By : saad+chiheb
---------------------------------------------------------------------------------------------------------------------



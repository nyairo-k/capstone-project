from flask import Flask
from flask_cors import CORS
import os

from config import Config
from extensions import db, migrate


app = Flask(__name__)

app.config.from_object(Config)


db.init_app(app)

migrate.init_app(app, db)


CORS(
    app,
origins=[
        "http://localhost:5173"
    ]
)

from routes.hospitals import hospital_routes
from routes.requests import request_routes
from routes.donors import donor_routes
from routes.auth import auth_routes

app.register_blueprint(
    hospital_routes
)

app.register_blueprint(
    request_routes
)

app.register_blueprint(
    donor_routes
)
app.register_blueprint(
    auth_routes
)


@app.route("/")
def home():

    return {
        "message": "BloodLink API running"
    }



if __name__ == "__main__":

    app.run(debug=True)
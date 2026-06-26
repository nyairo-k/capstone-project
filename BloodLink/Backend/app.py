from flask import Flask
from flask_cors import CORS

from config import Config
from extensions import db, migrate


app = Flask(__name__)

app.config.from_object(Config)


db.init_app(app)

migrate.init_app(app, db)


CORS(app)


from routes.hospitals import hospital_routes
from routes.requests import request_routes

app.register_blueprint(
    hospital_routes
)

app.register_blueprint(
    request_routes
)



@app.route("/")
def home():

    return {
        "message": "BloodLink API running"
    }



if __name__ == "__main__":

    app.run(debug=True)
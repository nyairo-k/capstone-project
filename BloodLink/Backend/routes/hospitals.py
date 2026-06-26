from flask import Blueprint, request, jsonify
from extensions import db
from models import Hospital


hospital_routes = Blueprint(
    "hospital_routes",
    __name__
)

@hospital_routes.route(
    "/hospitals",
    methods=["POST"]
)
def create_hospital():

    data = request.json
    existing_hospital = Hospital.query.filter_by(
        email=data["email"]
    ).first()


    if existing_hospital:

        return jsonify({
            "message":"Email already registered"
        }),400


    new_hospital = Hospital(

        hospital_name=data["hospital_name"],

        email=data["email"],

        password_hash=data["password"],

        phone_number=data.get("phone_number"),

        location=data.get("location"),

        role="hospital"

    )


    db.session.add(new_hospital)

    db.session.commit()



    return jsonify({

        "message": "Hospital created successfully",

        "hospital": {

            "id": new_hospital.id,

            "hospital_name": new_hospital.hospital_name,

            "email": new_hospital.email,

            "location": new_hospital.location

        }

    }), 201

@hospital_routes.route(
    "/hospitals/<int:id>",
    methods=["GET"]
)
def get_hospital(id):


    hospital = Hospital.query.get(id)


    if not hospital:

        return jsonify({

            "message":"Hospital not found"

        }),404



    return jsonify({

        "id": hospital.id,

        "hospital_name": hospital.hospital_name,

        "email": hospital.email,

        "phone_number": hospital.phone_number,

        "location": hospital.location,

        "role": hospital.role,

        "created_at": hospital.created_at

    }),200

@hospital_routes.route(
    "/hospitals/<int:id>",
    methods=["PATCH"]
)
def update_hospital(id):


    hospital = Hospital.query.get(id)


    if not hospital:

        return jsonify({

            "message":"Hospital not found"

        }),404



    data = request.json



    hospital.hospital_name = data.get(
        "hospital_name",
        hospital.hospital_name
    )


    hospital.phone_number = data.get(
        "phone_number",
        hospital.phone_number
    )


    hospital.location = data.get(
        "location",
        hospital.location
    )



    db.session.commit()



    return jsonify({

        "message":"Hospital updated successfully",

        "hospital":{

            "id":hospital.id,

            "hospital_name":hospital.hospital_name,

            "phone_number":hospital.phone_number,

            "location":hospital.location

        }

    }),200
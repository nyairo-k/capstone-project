from flask import Blueprint, request, jsonify
from models import Hospital, Donor
from werkzeug.security import check_password_hash, generate_password_hash
from extensions import db
from flask_jwt_extended import create_access_token

auth_routes = Blueprint(
    "auth_routes",
    __name__
)



@auth_routes.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data.get("email")
    password = data.get("password")


    hospital = Hospital.query.filter_by(email=email).first()


    if hospital:

        if check_password_hash(hospital.password_hash, password):

            access_token = create_access_token(

                identity=str(hospital.id),

                additional_claims={

                    "role": hospital.role,

                    "name": hospital.hospital_name,

                    "email": hospital.email

                }

            )

            return jsonify({

                "access_token": access_token,

                "user": {

                    "id": hospital.id,

                    "name": hospital.hospital_name,

                    "email": hospital.email,

                    "role": hospital.role

                }

            }), 200



    donor = Donor.query.filter_by(email=email).first()


    if donor:

        if check_password_hash(donor.password_hash, password):

            access_token = create_access_token(

                identity=str(donor.id),

                additional_claims={

                    "role": donor.role,

                    "name": donor.full_name,

                    "email": donor.email

                }

            )

            return jsonify({

                "access_token": access_token,

                "user": {

                    "id": donor.id,

                    "name": donor.full_name,

                    "email": donor.email,

                    "role": donor.role

                }

            }), 200



    return jsonify({

        "message":"Invalid credentials"

    }),401
    
@auth_routes.route(
    "/signup",
    methods=["POST"]
)
def signup():


    data=request.json



    role=data.get("role")



    if role=="hospital":


        new_user = Hospital(

            hospital_name=data["name"],

            email=data["email"],

            password_hash=generate_password_hash(
                data["password"]
            ),

            phone_number=data.get("phone_number"),

            location=data.get("location"),

            role="hospital"

        )



    else:


        new_user = Donor(


            full_name=data["name"],

            email=data["email"],

            password_hash=generate_password_hash(
                data["password"]
            ),

            phone_number=data.get("phone_number"),

            blood_type=data.get("blood_type"),

            location=data.get("location"),

            role="donor"

        )




    db.session.add(new_user)

    db.session.commit()



    return jsonify({

        "message":"Account created successfully"

    }),201
from flask import Blueprint, request, jsonify

from extensions import db
from models import BloodRequest
from flask_jwt_extended import jwt_required, get_jwt_identity,get_jwt



request_routes = Blueprint(
    "request_routes",
    __name__
)

@request_routes.route(
    "/requests",
    methods=["POST"]
)
@jwt_required()
def create_request():
    claims = get_jwt()
    if claims["role"] != "hospital":
        return jsonify({
            "message": "Only hospitals can create requests."
        }), 403

    data = request.json



    new_request = BloodRequest(


        requester_name=data["requester_name"],


        hospital_name=data["hospital_name"],


        blood_type_needed=data["blood_type_needed"],


        units_needed=data["units_needed"],


        urgency_level=data["urgency_level"],


        contact_phone=data.get("contact_phone"),


        location=data.get("location"),


        status="pending"


    )


    db.session.add(new_request)


    db.session.commit()



    return jsonify({

        "message":"Blood request created successfully",

        "request":{

            "id":new_request.id,

            "hospital_name":new_request.hospital_name,

            "blood_type_needed":new_request.blood_type_needed,

            "units_needed":new_request.units_needed,

            "urgency_level":new_request.urgency_level,

            "status":new_request.status

        }

    }),201

@request_routes.route(
    "/requests",
    methods=["GET"]
)
@jwt_required()
def get_requests():


    requests = BloodRequest.query.all()



    response = []


    for req in requests:

        response.append({

            "id": req.id,

            "requester_name": req.requester_name,

            "hospital_name": req.hospital_name,
            "blood_type_needed": req.blood_type_needed,

            "units_needed": req.units_needed,

            "urgency_level": req.urgency_level,

            "status": req.status,

            "donor_id": req.donor_id,

            "contact_phone": req.contact_phone,

            "location": req.location,

            "created_at": req.created_at

        })


    return jsonify(response), 200

@request_routes.route(
    "/requests/<int:id>",
    methods=["PATCH"]
)
@jwt_required()

def update_request(id):
    current_user = int(get_jwt_identity())
    claims = get_jwt()
    print("JWT Claims:", claims)
    print("Role:", claims.get("role"))
    print("Identity:", get_jwt_identity())

    if claims["role"] != "donor":
     return jsonify({
        "message": "Only donors can respond to requests."
    }),403


    blood_request = BloodRequest.query.get(id)


    if not blood_request:

        return jsonify({

            "message":"Blood request not found"

        }),404



    data = request.json



    blood_request.blood_type_needed = data.get(
        "blood_type_needed",
        blood_request.blood_type_needed
    )


    blood_request.units_needed = data.get(
        "units_needed",
        blood_request.units_needed
    )


    blood_request.urgency_level = data.get(
        "urgency_level",
        blood_request.urgency_level
    )


    status = data.get("status")

    if status not in ["accepted", "declined"]:
        return jsonify({
            "message": "Invalid status."
        }), 400

    blood_request.status = status


    blood_request.contact_phone = data.get(
        "contact_phone",
        blood_request.contact_phone
    )


    blood_request.location = data.get(
        "location",
        blood_request.location
    )

    blood_request.donor_id = current_user



    db.session.commit()



    return jsonify({

        "message":"Blood request updated successfully",

        "request":{

            "id":blood_request.id,

            "blood_type_needed":blood_request.blood_type_needed,

            "units_needed":blood_request.units_needed,

            "urgency_level":blood_request.urgency_level,

            "status":blood_request.status

        }

    }),200

@request_routes.route(
    "/requests/<int:id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_request(id):

    claims = get_jwt()
    if claims["role"] != "hospital":
        return jsonify({
            "message": "Only hospitals can delete requests."
        }), 403

    blood_request = BloodRequest.query.get(id)



    if not blood_request:

        return jsonify({

            "message":"Blood request not found"

        }),404



    db.session.delete(
        blood_request
    )


    db.session.commit()



    return jsonify({

        "message":"Blood request deleted successfully"

    }),200
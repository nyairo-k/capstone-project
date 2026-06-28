from flask import Blueprint, request, jsonify
from extensions import db
from models import BloodRequest

request_routes = Blueprint("request_routes", __name__)


# POST /requests — hospital submits a new blood request
@request_routes.route("/requests", methods=["POST"])
def create_request():
    data = request.json

    if not data.get("requester_name") or not data.get("hospital_name") \
            or not data.get("blood_type_needed") or not data.get("units_needed") \
            or not data.get("urgency_level"):
        return jsonify({"message": "requester_name, hospital_name, blood_type_needed, units_needed, and urgency_level are required"}), 400

    new_request = BloodRequest(
        requester_name=data["requester_name"],
        hospital_name=data["hospital_name"],
        hospital_id=data.get("hospital_id"),          # FK — ties request to the hospital account
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
        "message": "Blood request created successfully",
        "request": _serialize(new_request)
    }), 201


# GET /requests — returns all requests, or a hospital's own requests via ?hospital_id=<id>
@request_routes.route("/requests", methods=["GET"])
def get_requests():
    hospital_id = request.args.get("hospital_id", type=int)

    if hospital_id:
        results = BloodRequest.query.filter_by(hospital_id=hospital_id).order_by(BloodRequest.created_at.desc()).all()
    else:
        results = BloodRequest.query.order_by(BloodRequest.created_at.desc()).all()

    return jsonify([_serialize(r) for r in results]), 200


# PATCH /requests/<id> — hospital edits their own request details
@request_routes.route("/requests/<int:id>", methods=["PATCH"])
def update_request(id):
    blood_request = BloodRequest.query.get(id)

    if not blood_request:
        return jsonify({"message": "Blood request not found"}), 404

    data = request.json

    blood_request.blood_type_needed = data.get("blood_type_needed", blood_request.blood_type_needed)
    blood_request.units_needed = data.get("units_needed", blood_request.units_needed)
    blood_request.urgency_level = data.get("urgency_level", blood_request.urgency_level)
    blood_request.status = data.get("status", blood_request.status)
    blood_request.contact_phone = data.get("contact_phone", blood_request.contact_phone)
    blood_request.location = data.get("location", blood_request.location)

    db.session.commit()

    return jsonify({
        "message": "Blood request updated successfully",
        "request": _serialize(blood_request)
    }), 200


# PATCH /requests/<id>/respond — donor accepts or declines a request
# Body: { "action": "accept" | "decline", "donor_id": <int> }
@request_routes.route("/requests/<int:id>/respond", methods=["PATCH"])
def respond_to_request(id):
    blood_request = BloodRequest.query.get(id)

    if not blood_request:
        return jsonify({"message": "Blood request not found"}), 404

    if blood_request.status != "pending":
        return jsonify({"message": "This request has already been responded to"}), 409

    data = request.json
    action = data.get("action")
    donor_id = data.get("donor_id")

    if action not in ("accept", "decline"):
        return jsonify({"message": "action must be 'accept' or 'decline'"}), 400

    if action == "accept":
        if not donor_id:
            return jsonify({"message": "donor_id is required to accept a request"}), 400
        blood_request.status = "accepted"
        blood_request.donor_id = donor_id
    else:
        blood_request.status = "rejected"
        blood_request.donor_id = None

    db.session.commit()

    return jsonify({
        "message": f"Request {blood_request.status}",
        "request": _serialize(blood_request)
    }), 200


# DELETE /requests/<id>
@request_routes.route("/requests/<int:id>", methods=["DELETE"])
def delete_request(id):
    blood_request = BloodRequest.query.get(id)

    if not blood_request:
        return jsonify({"message": "Blood request not found"}), 404

    db.session.delete(blood_request)
    db.session.commit()

    return jsonify({"message": "Blood request deleted successfully"}), 200


def _serialize(r):
    return {
        "id": r.id,
        "requester_name": r.requester_name,
        "hospital_name": r.hospital_name,
        "hospital_id": r.hospital_id,
        "blood_type_needed": r.blood_type_needed,
        "units_needed": r.units_needed,
        "urgency_level": r.urgency_level,
        "status": r.status,
        "donor_id": r.donor_id,
        "contact_phone": r.contact_phone,
        "location": r.location,
        "created_at": str(r.created_at),
        "updated_at": str(r.updated_at),
    }

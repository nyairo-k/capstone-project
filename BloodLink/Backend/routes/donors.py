from flask import Blueprint, request, jsonify
from extensions import db
from models import Donor

donor_routes = Blueprint("donor_routes", __name__)

# GET all donors
@donor_routes.route("/donors", methods=["GET"])
def get_donors():
    donors = Donor.query.all()
    return jsonify([donor.to_dict() for donor in donors]), 200

# GET a single donor
@donor_routes.route("/donors/<int:id>", methods=["GET"])
def get_donor(id):
    donor = Donor.query.get_or_404(id)
    return jsonify(donor.to_dict()), 200

# POST - register a new donor
@donor_routes.route("/donors",methods=["POST"])
def create_donor():
    data = request.get_json()

    if not data.get("full_name") or not data.get("email") or not data.get("password_hash") or not data.get("blood_type"):
        return jsonify({"error": "full_name, email, password_hash and blood_type are required"}), 404
    
    existing = Donor.query.filter_by(email=data["email"]).first()
    if existing:
        return jsonify({"error": "Email already registered"}), 409
    
    donor = Donor(
        full_name=data["full_name"],
        email=data["email"],
        password_hash=data["password_hash"],
        phone_number=data.get("phone_number"),
        blood_type=data["blood_type"],
        location=data.get("location"),
        is_available=data.get("is_available", True),
        last_donation_date=data.get("last_donation_date")
        
    )

    db.session.add(donor)
    db.session.commit()

    return jsonify(donor.to_dict()), 201

# PATCH - update donor
@donor_routes.route("/donors/<int:id>", methods=["PATCH"])
def update_donor(id):
    donor=Donor.query.get_or_404(id)
    data=request.get_json()

    if "full_name" in data:
        donor.full_name = data["full_name"]

    if "phone_number" in data:
        donor.phone_number=data["phone_number"]

    if "blood_type" in data:
        donor.blood_type=data["blood_type"]

    if "location" in data:
        donor.location=data["location"]

    if "is_available" in data:
        donor.is_available=data["is_available"]

    if "last_donation_date" in data:
        donor.last_donation_date=data["last_donation_date"]


    db.session.commit()
    return jsonify(donor.to_dict()), 200


# DELETE - delete donor
@donor_routes.route("/donors/<int:id>", methods=["DELETE"])
def delete_donor(id):
    donor = Donor.query.get_or_404(id)
    db.session.delete(donor)
    db.session.commit()
    return jsonify({"message": f"Donor {donor.full_name} deleted successfully"}), 200

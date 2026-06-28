from flask import Blueprint, request, jsonify
from models import Donor, Hospital

auth_routes = Blueprint("auth_routes", __name__)


# POST /auth/login
# Checks the submitted email + password against both the donors and hospitals tables.
# Returns the matched user's id, role, name, and email so the frontend
# can store the session and redirect to the correct dashboard.
# TODO: Replace plain-text password comparison with proper hashing (e.g. bcrypt)
#       once the team adds password hashing on registration.
@auth_routes.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()

    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    # Check donors table
    donor = Donor.query.filter_by(email=email).first()
    if donor and donor.password_hash == password:
        return jsonify({
            "id": donor.id,
            "role": donor.role,        # "donor"
            "name": donor.full_name,
            "email": donor.email
        }), 200

    # Check hospitals table
    hospital = Hospital.query.filter_by(email=email).first()
    if hospital and hospital.password_hash == password:
        return jsonify({
            "id": hospital.id,
            "role": hospital.role,     # "hospital"
            "name": hospital.hospital_name,
            "email": hospital.email
        }), 200

    return jsonify({"message": "Invalid email or password"}), 401

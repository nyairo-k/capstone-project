from extensions import db
from datetime import datetime


class Hospital(db.Model):

    __tablename__ = "hospitals"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    hospital_name = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password_hash = db.Column(
        db.String(255),
        nullable=False
    )

    phone_number = db.Column(
        db.String(20)
    )

    location = db.Column(
        db.String(100)
    )

    role = db.Column(
        db.String(20),
        default="hospital"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )




class BloodRequest(db.Model):

    __tablename__ = "blood_requests"


    id = db.Column(
        db.Integer,
        primary_key=True
    )


    requester_name = db.Column(
        db.String(100),
        nullable=False
    )


    # KEEP THIS
    hospital_name = db.Column(
        db.String(100),
        nullable=False
    )


    blood_type_needed = db.Column(
        db.String(10),
        nullable=False
    )


    units_needed = db.Column(
        db.Integer,
        nullable=False
    )


    urgency_level = db.Column(
        db.String(20),
        nullable=False
    )


    status = db.Column(
        db.String(20),
        default="pending"
    )


    donor_id = db.Column(
        db.Integer,
        nullable=True
    )


    contact_phone = db.Column(
        db.String(20)
    )


    location = db.Column(
        db.String(100)
    )


    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )


    updated_at = db.Column(
        db.DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )
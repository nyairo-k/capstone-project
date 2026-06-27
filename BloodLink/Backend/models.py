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

class Donor(db.Model):
    
    __tablename__ = "donors"
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    phone_number=db.Column(db.String(20))
    blood_type = db.Column(db.String(5), nullable=False)
    location = db.Column(db.String(100))
    role = db.Column(db.String(20), default="donor")
    is_available = db.Column(db.Boolean, default=True)
    last_donation_date = db.Column(db.Date, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
       return {
          "id": self.id,
        "full_name": self.full_name,
        "email": self.email,
        "phone_number": self.phone_number,
        "blood_type": self.blood_type,
        "location": self.location,
        "role": self.role,
        "is_available": self.is_available,
        "last_donation_date": str(self.last_donation_date),
        "created_at": str(self.created_at),
        "updated_at": str(self.updated_at)
           }

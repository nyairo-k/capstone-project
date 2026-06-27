class Config:

    SQLALCHEMY_DATABASE_URI = (
        "postgresql://postgres:root@localhost/bloodlink"
    )

    SQLALCHEMY_TRACK_MODIFICATIONS = False
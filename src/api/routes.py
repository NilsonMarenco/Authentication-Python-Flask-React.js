"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/signup', methods=['POST'])
def handle_signup():
    request_body_user = request.get_json()
    if not request_body_user or 'email' not in request_body_user or 'password' not in request_body_user:
        return jsonify({"message": "Invalid request. Email and password are required."}), 400

    user = User.query.filter_by(email=request_body_user["email"]).first()
    if user:
        return jsonify({"message": "Email already exists"}), 400

    new_user = User(email=request_body_user["email"], password=request_body_user["password"], is_active=True)
    db.session.add(new_user)
    db.session.commit()
  
    access_token = create_access_token(identity=request_body_user["email"])

    return jsonify({"message": "New user added", "access_token": access_token}), 200

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    if not email or not password:
        return jsonify({"message": "Both email and password are required."}), 400

    user = User.query.filter_by(email=email, password=password).first()
    if not user:
        return jsonify({"message": "Invalid email or password."}), 401

    access_token = create_access_token(identity=email)

    return jsonify({"access_token": access_token}), 200


@api.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

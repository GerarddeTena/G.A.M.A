"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from .models import db, User, Player
from .utils import generate_sitemap, APIException
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, resources={r"/api/*": {"origins": "*", "allow_headers": ["Content-Type", "Authorization", "X-Requested-With"]}})


@api.route('/register', methods=['POST'])
def register_user():  # FUNCIONA
    data = request.get_json()
    user = User(
        email=data['email'],
        user_name=data['user_name'],
        password=generate_password_hash(data['password'])
    )
    access_token = create_access_token(identity=user.id)
    db.session.add(user)
    db.session.commit()
    return jsonify({
        'id': user.id,
        'email': user.email,
        'user_name': user.user_name,
        'success': True,
        'response': 'User created successfully',
        'token': access_token
    }), 201


@api.route('/login', methods=['POST'])
def login_user():  # FUNCIONA
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    access_token = create_access_token(identity=user.id)
    if user and check_password_hash(user.password, data['password']):
        return jsonify({
            'id': user.id,
            'email': user.email,
            'user_name': user.user_name,
            'token': access_token
        }), 200
    return jsonify({'message': 'Invalid email or password'}), 401


@api.route('/validate-token', methods=['GET'])
@jwt_required()
def validate_token():
    current_user = get_jwt_identity()
    auth_header = request.headers.get('Authorization', None)
    print(f"Authorization Header: {auth_header}")
    return jsonify(logged_in_as=current_user), 200


@api.route('/user', methods=['POST'])
def create_user():  # FUNCIONA
    data = request.get_json()
    user = User(
        email=data['email'],
        user_name=data['user_name']
    )
    user.password = data['password']
    db.session.add(user)
    db.session.commit()
    return jsonify({
        'id': user.id,
        'email': user.email,
        'user_name': user.user_name
    }), 201


@api.route('/user', methods=['GET'])  # FUNCIONA
def get_user():
    try:
        data = request.get_json()
        user_id = data.get('user_id')

        user = User.query.get(user_id)

        if user is None:
            return jsonify({'message': 'User not found'}), 404

        return jsonify({
            'id': user.id,
            'email': user.email,
            'user_name': user.user_name
        }), 200
    except APIException as e:

        return jsonify({'message': 'Error getting user: ', 'error': str(e)}), 500


@api.route('/user/<int:id>', methods=['GET'])
def get_user_by_url(id):
    try:

        user = User.query.get(id)

        if user is None:
            return jsonify({'message': 'User not found'}), 404

        return jsonify({
            'id': user.id,
            'email': user.email,
            'user_name': user.user_name
        }), 200
    except APIException as e:

        return jsonify({'message': 'Error getting user: ', 'error': str(e)}), 500


@api.route('/user', methods=['DELETE'])
def delete_user():  # FUNCIONA
    data = request.get_json()
    user_id = data.get('user_id')
    user = User.query.get(user_id)
    if user is None:
        return jsonify({'message': 'User not found'}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({'message': 'User deleted'}), 200


@api.route('/player', methods=['POST'])
def create_player():
    data = request.get_json()
    player = Player(
        name=data['name'],
        type=data['type'],
        user_id=data['user_id'],
        score=data['score'],
        level=data['level']
    )
    db.session.add(player)
    db.session.commit()
    return jsonify({
        'id': player.id,
        'name': player.name,
        'type': player.type,
        'user_id': player.user_id,
        'score': player.score,
        'level': player.level
    }), 201


@api.route('/player/updateScore', methods=['PUT'])
def update_score():
    data = request.get_json()
    player_id = data.get('player_id')
    user_id = data.get('user_id')
    score = data.get('score')
    player = Player.query.filter_by(id=player_id, user_id=user_id).first()
    if player is None:
        return jsonify({'message': 'Player not found'}), 404
    player.score = score
    db.session.commit()
    return jsonify({'message': 'Score updated'}), 200


@api.route('/player/updateLevel', methods=['PUT'])
def update_level():
    data = request.get_json()
    player_id = data.get('player_id')
    user_id = data.get('user_id')
    level = data.get('level')
    player = Player.query.filter_by(id=player_id, user_id=user_id).first()
    if player is None:
        return jsonify({'message': 'Player not found'}), 404
    player.level += 1
    db.session.commit()
    return jsonify({'message': 'Score updated'}), 200


@api.route('/player', methods=['GET'])
def get_players():
    players = Player.query.all()
    return jsonify([{
        'id': player.id,
        'name': player.name,
        'type': player.type,
        'user_id': player.user_id
    } for player in players]), 200


@api.route('/player', methods=['DELETE'])
def delete_player():
    data = request.get_json()
    player_id = data.get('id')
    player = Player.query.get(player_id)
    if player is None:
        return jsonify({'message': 'Player not found'}), 404
    db.session.delete(player)
    db.session.commit()
    return jsonify({'message': 'Player deleted'}), 200

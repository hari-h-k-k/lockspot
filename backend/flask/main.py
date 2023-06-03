import pymysql
import json
from flask import request, jsonify, Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token

app = Flask(__name__)
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'atlantis'
app.config['MYSQL_PORT'] = 3306
app.config['JWT_SECRET_KEY'] = 'your-secret-key'

jwt = JWTManager(app)


def create_database():
    db = pymysql.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        port=app.config['MYSQL_PORT']
    )
    cursor = db.cursor()
    cursor.execute(f"CREATE DATABASE IF NOT EXISTS atlantis")
    db.commit()
    cursor.close()
    db.close()


def get_db():
    db = pymysql.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DB'],
        port=app.config['MYSQL_PORT']
    )
    return db


def create_tables():
    db = get_db()
    cursor = db.cursor()

    table_queries = [
        '''CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(255),
            password VARCHAR(255),
            role VARCHAR(255)
        )''',
        '''CREATE TABLE IF NOT EXISTS turfs (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            owner_id INT,
            location VARCHAR(255),
            created_at TIMESTAMP,
            FOREIGN KEY (owner_id) REFERENCES users(id)
        )''',
        '''CREATE TABLE IF NOT EXISTS sports (
            id INT AUTO_INCREMENT PRIMARY KEY,
            turf_id INT,
            name VARCHAR(255),
            FOREIGN KEY (turf_id) REFERENCES turfs(id)
        )''',
        '''CREATE TABLE IF NOT EXISTS review (
            id INT AUTO_INCREMENT PRIMARY KEY,
            review VARCHAR(255),
            turf_id INT,
            user_id INT,
            FOREIGN KEY (turf_id) REFERENCES turfs(id),
            FOREIGN KEY (user_id) REFERENCES users(id)
        )'''
    ]

    for query in table_queries:
        cursor.execute(query)

    db.commit()
    cursor.close()
    db.close()


def insert_dummy_data():
    db = get_db()
    cursor = db.cursor()

    cursor.execute('SELECT COUNT(*) FROM users')
    user_count = cursor.fetchone()[0]

    if user_count == 0:
        user_data = [
            ('user1@example.com', 'password1', 'admin'),
            ('user2@example.com', 'password2', 'user'),
            ('user3@example.com', 'password3', 'user'),
            ('user4@example.com', 'password4', 'owner'),
            ('user5@example.com', 'password5', 'owner'),
        ]
        insert_user_query = 'INSERT INTO users (email, password, role) VALUES (%s, %s, %s)'
        cursor.executemany(insert_user_query, user_data)

    cursor.execute('SELECT COUNT(*) FROM turfs')
    turf_count = cursor.fetchone()[0]

    if turf_count == 0:
        turf_data = [
            ('Turf A', 4, 'Location A', '2023-05-28 12:00:00'),
            ('Turf X', 5, 'Location A', '2023-05-28 12:30:00'),
            ('Turf B', 4, 'Location B', '2023-05-28 13:00:00'),
            ('Turf C', 5, 'Location C', '2023-05-28 14:00:00'),
            ('Turf D', 5, 'Location D', '2023-05-28 15:00:00')
        ]
        insert_turf_query = 'INSERT INTO turfs (name, owner_id, location, created_at) VALUES (%s, %s, %s, %s)'
        cursor.executemany(insert_turf_query, turf_data)

    cursor.execute('SELECT COUNT(*) FROM sports')
    sports_count = cursor.fetchone()[0]

    if sports_count == 0:
        sports_data = [
            (1, 'Football'),
            (1, 'Basketball'),
            (1, 'Tennis'),
            (2, 'Basketball'),
            (2, 'Football'),
            (2, 'Cricket'),
            (3, 'Tennis'),
            (4, 'Cricket')
        ]
        insert_sports_query = 'INSERT INTO sports (turf_id, name) VALUES (%s, %s)'
        cursor.executemany(insert_sports_query, sports_data)

    cursor.execute('SELECT COUNT(*) FROM review')
    review_count = cursor.fetchone()[0]

    if review_count == 0:
        review_data = [
            ('Great turf!', 1, 1),
            ('Nice place to play basketball.', 2, 2),
            ('Good for tennis practice.', 3, 3)
        ]
        insert_review_query = 'INSERT INTO review (review, turf_id, user_id) VALUES (%s, %s, %s)'
        cursor.executemany(insert_review_query, review_data)

    db.commit()
    cursor.close()
    db.close()

    print("Dummy data inserted successfully!")


@app.route('/')
def index():
    return 'Hello World!'


@app.route('/signInEmail', methods=['POST'])
def signInEmail():
    email = request.json.get('email')
    password = request.json.get('password')

    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
    result = cursor.fetchone()

    if result:
        db_password = result[2]
        if password == db_password:
            access_token = create_access_token(identity=email)
            return jsonify(
                {'message': 'Credentials match!', 'token': access_token, 'id': result[0], 'email': result[1]})
        else:
            return jsonify({'message': 'Incorrect password!'})
    else:
        return jsonify({'message': 'User not found!'})


@app.route('/registerEmail', methods=['POST'])
def registerEmail():
    email = request.json.get('email')
    password = request.json.get('password')
    confirmPassword = request.json.get('confirmPassword')
    userType = request.json.get('userType')

    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT email FROM users')
    users = cursor.fetchall()

    if email in users:
        return jsonify({'message': 'User already exists!'}), 400
    if password != confirmPassword:
        return jsonify({'message': 'Passwords do not match'}), 400

    try:
        query = "INSERT INTO users (email, password, role) VALUES (%s, %s, %s)"
        values = (email, password, userType)
        cursor.execute(query, values)
        db.commit()
        cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
        result = cursor.fetchone()
        access_token = create_access_token(identity=email)
        return jsonify(
            {'message': 'User registered successfully', 'token': access_token, 'id': result[0], 'email': result[1],
             'userType': result[3]})

    except Exception as e:
        return jsonify({'message': 'Error registering user', 'error': str(e)}), 500


@app.route('/getTurfs', methods=['GET'])
def getTurfs():
    location = request.args.get('location')
    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        'SELECT turfs.id, turfs.name, sports.name FROM atlantis.turfs JOIN atlantis.sports ON turfs.id = sports.turf_id WHERE '
        'turfs.location = %s',
        (location,))
    turfs = cursor.fetchall()
    cursor.close()
    db.close()
    merged_turfs = {}

    for turf in turfs:
        turf_id = turf[0]
        turf_name = 'Turf ' + str(turf_id)
        sport = turf[2]

        if turf_id not in merged_turfs:
            merged_turfs[turf_id] = {'name': turf_name, 'sports': []}

        merged_turfs[turf_id]['sports'].append(sport)

    merged_turfs_json = json.dumps(merged_turfs)

    return merged_turfs_json


if __name__ == '__main__':
    create_database()
    create_tables()
    insert_dummy_data()
    app.run()

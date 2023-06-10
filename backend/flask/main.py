import pymysql
import json
from flask import request, jsonify, Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token
import base64
app = Flask(__name__)
CORS(app)
import io

app.config['MYSQL_HOST'] = 'mysql'
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
    cursor = db.cursor()
    cursor.execute("Use " + app.config['MYSQL_DB'])
    db.commit()
    cursor.close()
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
            cover_image LONGBLOB,
            created_at TIMESTAMP,
            FOREIGN KEY (owner_id) REFERENCES users(id)
        )''',
        '''CREATE TABLE IF NOT EXISTS sports (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255)
        )''',
        '''CREATE TABLE IF NOT EXISTS turf_sports (
            id INT AUTO_INCREMENT PRIMARY KEY,
            turf_id INT,
            sport_id INT,
            FOREIGN KEY (turf_id) REFERENCES turfs(id),
            FOREIGN KEY (sport_id) REFERENCES sports(id)
        )''',
        '''CREATE TABLE IF NOT EXISTS reviews (
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
            'Football',
            'Basketball',
            'Tennis',
            'Swimming',
            'Cricket',
            'Badminton',
            'Snooker'
        ]
        insert_sports_query = 'INSERT INTO sports (name) VALUES (%s)'
        cursor.executemany(insert_sports_query, sports_data)

    cursor.execute('SELECT COUNT(*) FROM turf_sports')
    turf_sports_count = cursor.fetchone()[0]

    if turf_sports_count == 0:
        turf_sports_data = [
            (1, 1),
            (1, 2),
            (1, 3),
            (2, 2),
            (2, 1),
            (2, 5),
            (3, 3),
            (4, 5)
        ]
        insert_turf_sports_query = 'INSERT INTO turf_sports (turf_id, sport_id) VALUES (%s, %s)'
        cursor.executemany(insert_turf_sports_query, turf_sports_data)

    cursor.execute('SELECT COUNT(*) FROM reviews')
    review_count = cursor.fetchone()[0]

    if review_count == 0:
        review_data = [
            ('Great turf!', 1, 1),
            ('Bad turf!', 1, 2),
            ('Nice place to play basketball.', 2, 2),
            ('Good for tennis practice.', 3, 3)
        ]
        insert_review_query = 'INSERT INTO reviews (review, turf_id, user_id) VALUES (%s, %s, %s)'
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
                {'message': 'Credentials match!', 'token': access_token, 'userId': result[0], 'email': result[1],
                 'userType': result[3]})
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
            {'message': 'User registered successfully', 'token': access_token, 'userId': result[0], 'email': result[1],
             'userType': result[3]})

    except Exception as e:
        return jsonify({'message': 'Error registering user', 'error': str(e)}), 500


@app.route('/getTurfs', methods=['GET'])
def getTurfs():
    location = request.args.get('location')
    db = get_db()
    cursor = db.cursor()
    cursor.execute(
        "SELECT turfs.id, turfs.name, turfs.location, sports.name AS sport_name, reviews.review FROM turfs LEFT JOIN "
        "turf_sports ON turfs.id = turf_sports.turf_id LEFT JOIN sports ON turf_sports.sport_id = sports.id LEFT JOIN "
        "reviews ON turfs.id = reviews.turf_id WHERE location LIKE %s",
        ('%' + location + '%',))
    turfs = cursor.fetchall()
    cursor.close()
    db.close()
    turfs_json = {}

    for turf in turfs:
        turf_id = turf[0]
        turf_name = turf[1]
        turf_location = turf[2]
        sport = turf[3]
        review = turf[4]

        if turf_id not in turfs_json:
            turfs_json[turf_id] = {
                'id': turf_id,
                'name': turf_name,
                'sports': [],
                'location': turf_location,
                'reviews': []
            }

        turfs_json[turf_id]['sports'].append(sport)
        if review not in turfs_json[turf_id]['reviews']:
            turfs_json[turf_id]['reviews'].append(review)

    turfs_json_str = json.dumps(turfs_json)

    return turfs_json_str


@app.route('/addVenue', methods=['POST'])
def addVenue():
    owner_id = request.form.get('ownerId')
    turf_name = request.form.get('turfName')
    location = request.form.get('location')
    sports = json.loads(request.form.get('sports'))
    image = request.files['coverImage']

    db = get_db()
    cursor = db.cursor()

    try:
        insert_turf_query = 'INSERT INTO turfs (name, owner_id, location, cover_image, created_at) VALUES (%s, %s, %s, %s, %s)'
        insert_turf_values = (turf_name, owner_id, location, image.read(), '2023-06-05 10:00:00',)
        cursor.execute(insert_turf_query, insert_turf_values)

        db.commit()
        cursor.execute("SELECT LAST_INSERT_ID()")
        turf_id = cursor.fetchone()[0]

        for sport in sports:
            cursor.execute('SELECT id FROM sports WHERE id = %s', (sport['id'],))
            sport_id = cursor.fetchone()[0]

            insert_sports_query = 'INSERT INTO turf_sports (turf_id, sport_id) VALUES (%s, %s)'
            insert_sports_values = (turf_id, sport_id,)
            cursor.execute(insert_sports_query, insert_sports_values)

        db.commit()
        return jsonify({'message': 'Added venue successfully'})

    except Exception as e:
        db.rollback()
        return jsonify({'message': 'Error adding venue', 'error': str(e)}), 500

    finally:
        cursor.close()
        db.close()


@app.route('/updateVenue', methods=['POST'])
def updateVenue():
    turf_id = request.json.get('turfId')
    turf_name = request.json.get('turfName')
    location = request.json.get('location')
    sports = request.json.get('sports')

    db = get_db()
    cursor = db.cursor()

    try:
        update_turf_query = 'UPDATE turfs SET name = %s, location = %s WHERE id = %s'
        update_turf_values = (turf_name, location, turf_id)
        cursor.execute(update_turf_query, update_turf_values)

        delete_sports_query = 'DELETE FROM turf_sports WHERE turf_id = %s'
        delete_sports_values = (turf_id,)
        cursor.execute(delete_sports_query, delete_sports_values)

        for sport in sports:
            cursor.execute('SELECT id FROM sports WHERE name = %s', (sport,))
            sport_id = cursor.fetchone()[0]

            insert_sports_query = 'INSERT INTO turf_sports (turf_id, sport_id) VALUES (%s, %s)'
            insert_sports_values = (turf_id, sport_id,)
            cursor.execute(insert_sports_query, insert_sports_values)

        db.commit()
        return jsonify({'message': 'Venue updated successfully'})

    except Exception as e:
        db.rollback()
        return jsonify({'message': 'Error updating venue', 'error': str(e)}), 500

    finally:
        cursor.close()
        db.close()

@app.route('/getSports',methods=['GET'])
def getSports():
    db=get_db()
    cursor=db.cursor()
    get_sports_query='SELECT * FROM sports'
    cursor.execute(get_sports_query)
    sports=cursor.fetchall()
    sports_json=[]

    for sport in sports:
        sport_ele={
            'id':sport[0],
            'name':sport[1]
        }
        sports_json.append(sport_ele)
    
    cursor.close()
    db.close()
    return json.dumps(sports_json)

@app.route('/getOwnerVenues',methods=['GET'])
def getOwnerVenues():
    owner_id = request.args.get('ownerId')
    db=get_db()
    cursor=db.cursor()
    cursor.execute(
        "SELECT turfs.id, turfs.name, turfs.location, turfs.cover_image, turf_sports.sport_id, sports.name AS sport_name "
        "FROM turfs "
        "LEFT JOIN turf_sports ON turfs.id = turf_sports.turf_id "
        "LEFT JOIN sports ON turf_sports.sport_id = sports.id "
        "WHERE turfs.owner_id = %s",
        (owner_id,)
    )
    venues=cursor.fetchall()
    mergedData={}
    for id,name,location,coverImage,s_id,s_name in venues:
        if(id in mergedData and s_id and s_name):
            mergedData[id]['sports'].append({'sportId':s_id, 'sportName':s_name})
        else:
            mergedData[id]={
                'id': id,
                'name': name,
                'location': location,
                'coverImage': None,
                'sports': []
            }
            if(coverImage):
                mergedData[id]['coverImage']=base64.b64encode(coverImage).decode('utf-8')
            if(s_id and s_name):
                mergedData[id]['sports'].append({'sportId':s_id,'sportName':s_name})
    owner_venues=[]
    for i in mergedData:
        owner_venues.append(mergedData[i])

    cursor.close()
    db.close()
    return json.dumps(owner_venues)


if __name__ == '__main__':
    create_database()
    create_tables()
    insert_dummy_data()
    app.run(host='0.0.0.0')

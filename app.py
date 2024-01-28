from flask import Flask, request, jsonify, render_template
import sqlite3

app = Flask(__name__)

# Database setup
def get_db_connection():
    conn = sqlite3.connect('appointments.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return render_template('index.html')

# Add more routes here for handling appointments

if __name__ == '__main__':
    app.run(debug=True)

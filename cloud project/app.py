# app.py

from flask import Flask, render_template, jsonify
import csv

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/weather_history')
def weather_history():
    # Replace 'weatherHistory.csv' with the actual path to your CSV file
    csv_file_path = 'C:\\Users\\saidm\\OneDrive\\Desktop\\cloud project\\static\\weatherHistory.csv'

    
    try:
        with open(csv_file_path, 'r') as file:
            reader = csv.DictReader(file)
            weather_data = [row for row in reader]
        
        # Sort the data by timestamp (assuming the timestamp is in the first column)
        sorted_data = sorted(weather_data, key=lambda x: x.get('Timestamp', ''), reverse=True)

        # Return the 10 most recent entries
        recent_entries = sorted_data[:10]

        return jsonify(recent_entries)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)

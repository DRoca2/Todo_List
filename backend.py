from flask import Flask, request, jsonify, session
from flask_cors import CORS

app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for all routes
CORS(app)

# Set a secret key for session management
app.secret_key = 'your_secret_key'

# Define a route to handle toggling the dark/light mode
@app.route('/toggle_mode', methods=['POST'])
def toggle_mode():
    # Access the current mode from the session, default to 'light'
    current_mode = session.get('mode', 'light')

    # Toggle the mode
    new_mode = 'dark' if current_mode == 'light' else 'light'

    # Update the session with the new mode
    session['mode'] = new_mode

    # Return a JSON response indicating success and the new mode
    return jsonify({'status': 'success', 'mode': new_mode})

# Run the app if this script is executed
if __name__ == '__main__':
    app.run(debug=True)

from flask import Flask, render_template

app = Flask(__name__)

# Route to render the HTML page
@app.route('/')
def index():
    return render_template('index.html')

# Toggle dark/light mode
@app.route('/toggle-dark-mode')
def toggle_dark_mode():
    # Logic to toggle dark/light mode
    # For simplicity, we will just return a message
    return 'Dark mode toggled'

if __name__ == '__main__':
    app.run(debug=True)

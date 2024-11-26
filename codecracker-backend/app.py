from flask import Flask, jsonify
import requests
from flask_cors import CORS



app = Flask(__name__)
CORS(app)
@app.route("/leetcode/<username>")
# use this url for instance to fetch data:
#  http://127.0.0.1:5000/leetcode/ishika2005


def fetch_leetcode_data(username):
    url = "https://leetcode.com/graphql" #api
    headers = {"Content-Type": "application/json"}  # Corrected typo here

    query = {
        "query": """
        query userProfile($username: String!) {
            matchedUser(username: $username) {
                username
                profile {
                    realName
                    ranking
                }
                submitStats {
                    acSubmissionNum {
                        difficulty
                        count
                    }
                }
            }
        }
        """,
        "variables": {"username": username},
    }

    try:
        response = requests.post(url, json=query, headers=headers)
        response.raise_for_status()  # Raise an error for bad status codes
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"Error fetching data: {e}")
        return {"error": "Failed to fetch data from LeetCode"}



def leetcode(username):
    data = fetch_leetcode_data(username)
    if "error" in data:
        return jsonify({"error": "Unable to fetch user data. Please check the username."}), 400
    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)

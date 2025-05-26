# app.py
from flask import Flask, request, jsonify
from supabase import create_client, Client
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Supabase setup
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@app.route('/api/market_prices', methods=['GET'])
def get_market_prices():
    location = request.args.get('location', '')
    crop = request.args.get('crop', '')
    
    query = supabase.table('market_prices').select('*')
    
    if location:
        query = query.ilike('location', f'%{location}%')
    if crop:
        query = query.ilike('crop', f'%{crop}%')
        
    query = query.order('created_at', desc=True).limit(10)
    
    data, error = query.execute()
    
    if error:
        return jsonify({'error': str(error)}), 400
    
    return jsonify(data[1])

@app.route('/api/price_alerts', methods=['POST'])
def create_price_alert():
    data = request.json
    user_id = data.get('user_id')
    crop = data.get('crop')
    target_price = data.get('target_price')
    location = data.get('location')
    
    if not all([user_id, crop, target_price, location]):
        return jsonify({'error': 'Missing required fields'}), 400
    
    # In a real app, we would store this in a price_alerts table
    # For now, we'll just return a success message
    return jsonify({
        'message': 'Price alert created successfully',
        'alert': {
            'user_id': user_id,
            'crop': crop,
            'target_price': target_price,
            'location': location
        }
    })

if __name__ == '__main__':
    app.run(debug=True)

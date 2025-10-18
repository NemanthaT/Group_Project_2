// Test script to verify event endpoints are working
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api';

async function testEndpoints() {
    console.log('🧪 Testing Event Endpoints...\n');

    // Test 1: Health check
    console.log('1️⃣ Testing health endpoint...');
    try {
        const response = await axios.get('http://localhost:5000/api/health');
        console.log('✅ Health check passed:', response.data);
    } catch (error) {
        console.log('❌ Health check failed:', error.message);
    }

    // Test 2: GET events
    console.log('\n2️⃣ Testing GET /api/events...');
    try {
        const response = await axios.get(`${API_BASE_URL}/events`);
        console.log('✅ GET events passed. Events count:', response.data.events?.length || 0);
    } catch (error) {
        console.log('❌ GET events failed:', error.response?.status, error.message);
    }

    // Test 3: POST events (will fail validation but tests route exists)
    console.log('\n3️⃣ Testing POST /api/events (checking route exists)...');
    try {
        const response = await axios.post(`${API_BASE_URL}/events`, {
            name: 'Test Event'
        });
        console.log('✅ POST route exists:', response.data);
    } catch (error) {
        if (error.response?.status === 400) {
            console.log('✅ POST route exists (validation error expected):', error.response.data);
        } else {
            console.log('❌ POST events failed:', error.response?.status || error.code, error.message);
        }
    }

    console.log('\n✅ All tests completed!');
}

testEndpoints();

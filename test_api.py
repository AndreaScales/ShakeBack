#!/usr/bin/env python3
"""
Simple test script for ShakeBack API
"""
import requests
import json

BASE_URL = "http://127.0.0.1:8001"

def test_root():
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Root endpoint: {response.status_code}")
        print(response.json())
    except Exception as e:
        print(f"Error testing root: {e}")

def test_applications():
    try:
        # Test GET applications
        response = requests.get(f"{BASE_URL}/applications/")
        print(f"Get applications: {response.status_code}")
        print(response.json())

        # Test POST application
        test_app = {
            "company": "Test Company",
            "role": "Test Role",
            "status": "applied"
        }
        response = requests.post(f"{BASE_URL}/applications/", json=test_app)
        print(f"Create application: {response.status_code}")
        if response.status_code == 200:
            print(response.json())
    except Exception as e:
        print(f"Error testing applications: {e}")

if __name__ == "__main__":
    print("Testing ShakeBack API...")
    test_root()
    test_applications()
    print("Test complete!")
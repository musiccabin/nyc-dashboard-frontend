#!/bin/bash

set -e

# Kill servers after terminal exits
trap "kill 0" EXIT

# Activate Python virtual environment
cd backend || exit
source venv/bin/activate

# Kill previous servers if running
echo "Stopping any existing servers..."
lsof -ti:{8000,5173} | xargs -r kill -9

# Start backend server
echo "Starting backend..."
uvicorn app.main:app --reload &

# Start frontend server
echo "Starting frontend..."
cd ../frontend || exit
npm run dev &

# Open VS Code
cd ..
code -n backend
code -n frontend

echo "Ready to work!"

wait
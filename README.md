## Prerequisites

Before running this project locally, make sure you have:

- Python 3.11+
- PostgreSQL
- Node.js + npm
- Git

---

## Backend Setup (FastAPI)

### 1. Clone this repository

git clone https://github.com/ryezra/moonlay-task.git
cd moonlay-task/moonlay-task-backend

### 2. Create and activate virtual environment

python -m venv venv  
venv\Scripts\activate # On Windows

### 3. Install dependencies

pip install fastapi uvicorn sqlalchemy psycopg2-binary python-multipart passlib[bcrypt] jose

### 4. Setup PostgreSQL

Create a database named:
moonlay_task_app

Update database.py with your connection string:
DATABASE_URL = "postgresql://postgres:your_password@localhost/moonlay_task_app"

### 5. Run the API

uvicorn main:app --reload  
App will be available at http://127.0.0.1:8000/docs

Frontend Setup (Next.js)

1. Navigate to frontend folder

cd ../moonlay-task-frontend

2. Install dependencies

npm install

3. Run the frontend

npm run dev

Open http://localhost:3000 in your browser.

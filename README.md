# 🧿 Krishna Leela Text Generator

An AI-powered text generation project based on the divine stories and wisdom of **Lord Krishna**. The system uses a fine-tuned transformer model to answer prompts with mythological context and storytelling flair. Built using **FastAPI** (Python backend) and a **ReactJS** frontend.

---

## ✨ Features

- 🔮 Ask Lord Krishna questions like:
  - *“Where was Krishna born?”*
  - *“What is the significance of Raas Leela?”*
- 🤖 AI model generates poetic, context-aware responses
- 🧘 Beautiful Krishna-themed UI suggestions
- ⚡ Real-time response streaming (word-by-word typing effect)
- 🔗 Seamless API communication with proper error handling

---

## 🛠️ Tech Stack

| Frontend           | Backend           | ML Model             |
|--------------------|-------------------|----------------------|
| React.js + TailwindCSS | FastAPI (Python) | Transformers (HuggingFace) |
| Axios              | Pydantic          | PyTorch              |

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/krishna-leela-generator.git
cd krishna-leela-generator


2. Backend Setup (FastAPI)
📦 Install dependencies
bash
Always show details

Copy
cd backend
pip install -r requirements.txt
📁 Model Files
Make sure your model (e.g. opt350m_b_finetuned) is present in the ./backend/ directory.

▶️ Run the server
bash
Always show details

Copy
uvicorn main:app --reload
Your FastAPI server will be live at: http://127.0.0.1:8000

3. Frontend Setup (React)
bash
Always show details

Copy
cd frontend
npm install
npm run dev
Your React frontend will be running at: http://localhost:5173

🌐 CORS Configuration
If you're facing CORS errors, add this to your FastAPI app:

python
Always show details

Copy
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
📂 Folder Structure
css
Always show details

Copy
krishna-leela-generator/
│
├── backend/
│   ├── main.py
│   ├── opt350m_b_finetuned/
│   └── requirements.txt
│
└── frontend/
    ├── src/
    │   ├── component/
    │   │   └── helper.js
    │   ├── context/
    │   │   └── ContextProvider.js
    │   └── App.jsx
    └── vite.config.js
📸 Screenshots
(Add some cool UI screenshots here if you like!)

🙏 Acknowledgements
Inspired by the stories of Bhagavad Gita, Srimad Bhagavatam, and Indian mythology.

Hugging Face Transformers for the model base.

FastAPI for blazing-fast backend.

📜 License
This project is licensed under the MIT License. """
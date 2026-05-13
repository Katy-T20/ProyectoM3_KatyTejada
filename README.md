# 🎬 Character Chat SPA

An interactive Single Page Application where users chat with AI‑powered iconic characters. Built with Vanilla JavaScript, powered by Google’s Gemini 2.5 Flash Lite model, and deployed on Vercel, this project delivers personality‑driven conversations with real‑time AI responses.

🔗 Live Demo: https://proyectom3-katytejada.vercel.app

## 🎭 Characters

### 🐰 **Bugs Bunny** (Looney Tunes)

The legendary Looney Tunes trickster known for sarcasm, clever comebacks, and Brooklyn‑style charm. Famous for his catchphrases lines like *"Ehhh, What's up, doc?"* and *"What a maroon!"*

### 🦝 **Rocket Raccoon** (Marvel - Guardians of the Galaxy)

A cybernetically enhanced raccoon from Guardians of the Galaxy. Loud, sarcastic, brilliant with tech, and always ready with a snarky remark. Uses text‑actions like *grumbles* and *loads blaster*.

---

## ✨ Features

🎭 Multi‑character chat

🤖 AI‑powered responses

⚡ Real‑time messaging

🧠 Context‑aware conversations

📱 Fully responsive SPA

🧩 Modular architecture

🛡️ Robust error handling

🧪 Comprehensive testing

🚀 Production‑ready deployment

---

## 🚀 Quick Start

### Prerequisites

```bash
# Check versions (should be ≥ these)
node --version      # v18.0.0+
npm --version       # v9.0.0+
git --version       # any recent version
```

Get a free API key from Google AI Studio:
https://aistudio.google.com/

### Installation (5 steps)

**1. Clone & Navigate**
```bash
git clone https://github.com/Katy-T20/ProyectoM3_KatyTejada.git
cd ProyectoM3_KatyTejada
```

**2. Install Dependencies**
```bash
npm install
```

**3. Create .env File**
```bash
# Windows
New-Item .env
```

**4. Add Your API Key**
```env
GOOGLE_API_KEY=your_api_key_here
```

**5. Run Development Server**
```bash
npm install -g vercel
vercel dev
```

Then open http://localhost:3000 in your browser.

---

## 🧪 Testing

Run all tests:
```bash
npm test
```

Watch mode (auto-rerun on changes):
```bash
npm run test:watch
```

**Test Coverage:**
- `app.test.js`: (API, character lookup, AI responses)
- `utils.test.js`: (data transformations, message handling)

---

## 🌐 Deploy to Vercel

**Option 1: Vercel CLI (Fastest)**
```bash
npm install -g vercel
vercel

# Follow prompts, set VITE_GOOGLE_API_KEY environment variable
```

**Option 2: GitHub Integration (Automatic)**
1. Push code to GitHub repository
2. Go to https://vercel.com
3. Import your repository
4. Add GOOGLE_API_KEY in Environment Variables
5. Deploy (auto-deploys on future pushes)

---

## 📱 How to Use

1. **Home Page** - Welcome screen with character selection (Image1.jpg)
2. **Select Character** - Choose Bugs Bunny or Rocket Raccoon and click "Let's start chatting" (Image2.jpg and Image3.jpg)
3. **Chat Interface** - Type messages and receive AI responses (Image4.jpg)
4. **About Page** - Project info and technical details

**Example Conversation:**
```
You: What's your favorite color?

BUGS BUNNY:
Ehhh, doc, that would be carrot orange! 
What a maroon asks that kind of question!

ROCKET:
*grumbles* Why do ya care about my favorite color, pal? 
I'm more into laser blues, if you ask me.

---

## 📁 Project Structure
```
ProyectoM3_KatyTejada/
├── index.html                # Main entry point
├── package.json              # Dependencies and scripts
├── vercel.json               # Vercel deployment config
├── .env                      # Environment variables
│
├── api/
│   └── chat.js               # Backend endpoint for AI chat
│
├── src/
│   ├── main.js               # App initialization
│   ├── router.js             # Client-side routing
│   ├── navigation.js         # Navigation handler
│   ├── styles.css            # Global styles
│   │
│   ├── services/
│   │   ├── api.js            # Character data fetching
│   │   ├── aiClient.js       # AI response generation
│   │   ├── prompts.js        # Character system prompts
│   │   ├── fetchJson.js      # HTTP request utility
│   │   ├── debounce.js       # Debounce utility
│   │   └── mockGeminiApi.js  # Mock API for testing
│   │
│   ├── transform/
│   │   ├── character.js      # Character data transformation
│   │   └── chatPayload.js    # Message/payload transformations
│   │
│   ├── ui/
│   │   ├── characterCard.js  # Character card rendering
│   │   └── messages.js       # Message display rendering
│   │
│   └── views/
│       ├── home.js           # Home page view
│       ├── chat.js           # Chat page view
│       ├── about.js          # About page view
│       └── notFound.js       # 404 page view
│
├── test/
│   ├── app.test.js           # Core functionality tests (7 tests)
│   └── utils.test.js         # Transformation tests (9 tests)
│
└── images/                   # Character images
```

---

## 🛠️ Tech Stack & Tools

### Frontend
- **Vanilla JavaScript (ES6 Modules)** - No frameworks, pure JS
- **HTML5** - Semantic markup
- **CSS3** - BEM methodology, responsive design

### Backend / API
- **Node.js** - Runtime
- **Google Generative AI SDK** - @google/generative-ai ^0.24.1
- **Vercel Functions** - Serverless API endpoint

### Testing & Development
- **Vitest** - Testing framework
- **Vercel CLI** - Local development and deployment

### Deployment
- **Vercel** - Production hosting

## 📚 Dependencies

```json
{
  "dependencies": {
    "@google/generative-ai": "^0.24.1"
  },
  "devDependencies": {
    "vitest": "^4.1.6"
  }
}
```
---

## 🔐 Security
- ✅ API keys stored in `.env` (never committed to Git)
- ✅ `.env` listed in `.gitignore`
- ✅ Input validation for character lookups
- ✅ HTTPS enforced on Vercel deployment

---
---

## 📖 Learn More

- [Google Generative AI Docs](https://ai.google.dev/)
- [Vercel Documentation](https://vercel.com/docs)
- [Vitest Testing Framework](https://vitest.dev/)
- [GitHub Repository](https://github.com/Katy-T20/ProyectoM3_KatyTejada)

---
---

## 🤖📚 AI Documentation


---

## 👤 Author

**Katy Tejada** - [@Katy-T20](https://github.com/Katy-T20)

**Version**: 1.0.0 | **Status**: ✅ Production Ready | **Updated**: May 2026


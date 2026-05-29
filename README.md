# 🌋 Vulcano AI

Chatbot powered by Google Gemini, nasazený na Vercel.

## Struktura projektu

```
vulcano-ai/
├── api/
│   └── chat.js        ← serverless funkce (skrývá API klíč)
├── public/
│   └── index.html     ← frontend chatbotu
│   └── logo.png       ← (sem vlož své logo)
├── package.json
├── vercel.json
└── README.md
```

## Nasazení na Vercel (krok za krokem)

### 1. Založ GitHub repozitář
- Jdi na github.com → New repository → pojmenuj ho `vulcano-ai`
- Nahraj všechny soubory z tohoto projektu

### 2. Připoj Vercel
- Jdi na vercel.com a přihlas se (GitHub účtem)
- Klikni "Add New Project" → vyber repozitář `vulcano-ai`
- **Framework Preset:** Other
- **Root Directory:** `.` (nechej prázdné)
- Klikni "Deploy"

### 3. Nastav API klíč
- V projektu na Vercel jdi do **Settings → Environment Variables**
- Přidej proměnnou:
  - **Name:** `GROQ_API_KEY`
  - **Value:** tvůj klíč z console.groq.com
- Klikni "Save" a pak **Redeploy** projekt

### 4. Sdílej URL
Vercel ti dá URL ve tvaru `vulcano-ai.vercel.app` — tu sdílíš s uživateli. API klíč nikdo neuvidí.

## Přidání loga

1. Ulož logo jako `public/logo.png`
2. V `public/index.html` najdi komentář `<!-- Logo: az budes mit soubor -->` a nahraď SVG za:
   ```html
   <img src="logo.png" alt="Vulcano AI">
   ```
3. Logo v AI avataru: najdi `avatar.textContent = role === 'ai' ? 'V' : 'Ty'` a nahraď za:
   ```js
   if (role === 'ai') {
     const img = document.createElement('img');
     img.src = 'logo.png';
     avatar.appendChild(img);
   } else {
     avatar.textContent = 'Ty';
   }
   ```

## Získání Gemini API klíče zdarma

1. Jdi na https://console.groq.com
2. Přihlas se Google účtem
3. Klikni "Create API Key"
4. Klíč zkopíruj do Vercel Environment Variables

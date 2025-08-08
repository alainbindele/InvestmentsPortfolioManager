# Portfolio Balancer

Un'applicazione web avanzata per l'ottimizzazione e il ribilanciamento di portafogli di investimento, potenziata dall'intelligenza artificiale.

## Caratteristiche

- 📊 **Gestione Portfolio**: Aggiungi e gestisci i tuoi asset di investimento
- 🎯 **Strategie di Investimento**: Confronta strategie conservative, bilanciate e aggressive
- 🤖 **AI Assistant**: Analisi del portafoglio e generazione di strategie tramite ChatGPT
- 📈 **Proiezioni di Crescita**: Visualizza la crescita del portafoglio nel tempo
- 💰 **Piano di Accumulo (PAC)**: Simula l'effetto compound degli investimenti ricorrenti
- 🌍 **Multilingua**: Supporto per Italiano, Inglese, Spagnolo, Francese, Tedesco e Cinese
- 📱 **Responsive Design**: Ottimizzato per desktop e mobile

## Installazione

1. Clona il repository:
```bash
git clone <repository-url>
cd portfolio-balancer
```

2. Installa le dipendenze:
```bash
npm install
```

3. Configura le variabili d'ambiente:
```bash
cp .env.example .env
```

4. Modifica il file `.env` e inserisci la tua API key di OpenAI:
```
VITE_OPENAI_API_KEY_PFB=sk-your-actual-api-key-here
```

Per ottenere una API key di OpenAI:
- Vai su [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys)
- Crea un account o accedi
- Genera una nuova API key
- Copia la chiave nel file `.env`

5. Avvia l'applicazione:
```bash
npm run dev
```

## Utilizzo

### Gestione Asset
- Aggiungi i tuoi asset di investimento specificando nome, tipo, valore attuale, rendimento atteso e livello di rischio
- Visualizza l'allocazione attuale del portafoglio tramite grafici interattivi

### Strategie di Investimento
- Esplora strategie predefinite (Conservativa, Bilanciata, Aggressiva)
- Confronta le metriche di performance tra diverse strategie
- Visualizza proiezioni di crescita a lungo termine

### AI Assistant
- Analizza il tuo portafoglio con l'intelligenza artificiale
- Ricevi raccomandazioni personalizzate
- Genera strategie ottimizzate basate sul tuo profilo di rischio

### Piano di Accumulo (PAC)
- Crea piani di investimento ricorrenti
- Simula l'effetto compound nel tempo
- Visualizza proiezioni dettagliate dei tuoi investimenti periodici

## Tecnologie Utilizzate

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS
- **Grafici**: Recharts
- **Build Tool**: Vite
- **AI Integration**: OpenAI GPT API

## Struttura del Progetto

```
src/
├── components/          # Componenti React riutilizzabili
├── types/              # Definizioni TypeScript
├── utils/              # Utility e funzioni helper
├── services/           # Servizi per API esterne
└── App.tsx            # Componente principale
```

## Contribuire

1. Fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi il file `LICENSE` per maggiori dettagli.

## Supporto

Per supporto o domande, apri un issue su GitHub o contatta il team di sviluppo.
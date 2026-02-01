# Missions API (démo)

API REST **Node.js / Express** permettant de gérer une ressource *missions*.  
Projet de démonstration orienté **prestation B2B / missions de développement web**.

## Objectif
Montrer la capacité à concevoir une API REST simple, structurée et exploitable :
- endpoints clairs
- logique CRUD complète
- validation minimale des données
- tests réels des routes

## Fonctionnalités
- CRUD complet (Create, Read, Update, Delete)
- Filtres via query params (`tag`, `q`)
- Validation des payloads
- CORS activé
- Données fictives (in-memory)

## Endpoints disponibles
- `GET /` — informations sur l’API
- `GET /health` — statut du service
- `GET /api/missions` — liste des missions
- `GET /api/missions/:id` — détail d’une mission
- `POST /api/missions` — création
- `PUT /api/missions/:id` — modification
- `DELETE /api/missions/:id` — suppression

## Exemples d’utilisation (PowerShell)

```powershell
Invoke-RestMethod http://localhost:4000/health
Invoke-RestMethod http://localhost:4000/api/missions  
```

## Création d’une mission
```powershell
$body = @{
  title = "Mission Next.js"
  description = "Renfort sur une application Next.js (routing, SSR, intégration API)."
  tags = @("next.js","react","api")
} | ConvertTo-Json

Invoke-RestMethod -Method Post `
  -Uri "http://localhost:4000/api/missions" `
  -ContentType "application/json" `
  -Body $body
```

## Installation
```bash
npm install
npm run dev
```

```md
## Notes
-API volontairement simple
-Pas de base de données (stockage en mémoire)
-Données fictives
-Projet de démonstration publique
```
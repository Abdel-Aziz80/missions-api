import app from "./app.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`missions-api running on http://localhost:${PORT}`);
    console.log(`Health: http://localhost:${PORT}/health`);
    console.log(`RMissions://localhost:${PORT}/api/missions`);
});
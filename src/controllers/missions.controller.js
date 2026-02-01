import { missions, nextId } from "../data/missions.js";

// helpers
function normalizeTags(tags) {
  if (!Array.isArray(tags)) return [];
  return tags
    .map((t) => String(t).trim().toLowerCase())
    .filter(Boolean);
}

function validateMissionPayload(payload, { partial = false } = {}) {
  const errors = [];

  if (!partial || payload.title !== undefined) {
    if (!payload.title || String(payload.title).trim().length < 3) {
      errors.push("Le titre doit contenir au moins 3 caractères.");
    }
  }

  if (!partial || payload.description !== undefined) {
    if (!payload.description || String(payload.description).trim().length < 10) {
      errors.push("La description doit contenir au moins 10 caractères.");
    }
  }

  if (payload.tags !== undefined && !Array.isArray(payload.tags)) {
    errors.push("Les tags doivent être un tableau.");
  }

  return errors;
}

// GET /api/missions?tag=react&q=api
export function getMissions(req, res) {
  const { tag, q } = req.query;

  let list = [...missions];

  if (tag) {
    const t = String(tag).toLowerCase();
    list = list.filter((m) => m.tags.map((x) => x.toLowerCase()).includes(t));
  }

  if (q) {
    const s = String(q).toLowerCase();
    list = list.filter(
      (m) =>
        m.title.toLowerCase().includes(s) ||
        m.description.toLowerCase().includes(s) ||
        m.tags.some((t) => t.toLowerCase().includes(s))
    );
  }

  return res.json({ count: list.length, missions: list });
}

// GET /api/missions/:id
export function getMissionById(req, res) {
  const id = Number(req.params.id);
  const mission = missions.find((m) => m.id === id);

  if (!mission) return res.status(404).json({ error: "Mission not found" });
  return res.json(mission);
}

// POST /api/missions
export function createMission(req, res) {
  const payload = req.body;

  const errors = validateMissionPayload(payload);
  if (errors.length) {
    return res.status(400).json({ error: "Invalid payload", details: errors });
  }

  const mission = {
    id: nextId(missions),
    title: String(payload.title).trim(),
    description: String(payload.description).trim(),
    tags: normalizeTags(payload.tags),
    createdAt: new Date().toISOString(),
  };

  missions.push(mission);
  return res.status(201).json(mission);
}

// PUT /api/missions/:id
export function updateMission(req, res) {
  const id = Number(req.params.id);
  const idx = missions.findIndex((m) => m.id === id);

  if (idx === -1) return res.status(404).json({ error: "Mission not found" });

  const payload = req.body;
  const errors = validateMissionPayload(payload, { partial: true });
  if (errors.length) {
    return res.status(400).json({ error: "Invalid payload", details: errors });
  }

  const current = missions[idx];

  if (payload.title !== undefined) current.title = String(payload.title).trim();
  if (payload.description !== undefined)
    current.description = String(payload.description).trim();
  if (payload.tags !== undefined) current.tags = normalizeTags(payload.tags);

  missions[idx] = current;
  return res.json(current);
}

// DELETE /api/missions/:id
export function deleteMission(req, res) {
  const id = Number(req.params.id);
  const idx = missions.findIndex((m) => m.id === id);

  if (idx === -1) return res.status(404).json({ error: "Mission not found" });

  const deleted = missions.splice(idx, 1)[0];
  return res.json({ deleted });
}

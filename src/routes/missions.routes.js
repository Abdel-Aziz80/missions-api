import express from "express"
import {
    getMissions,
    getMissionById,
    createMission,
    updateMission,
    deleteMission
} from "../controllers/missions.controller.js";

const router = express.Router();

router.get("/", getMissions);
router.get("/:id", getMissionById);
router.post("/", createMission);
router.put("/:id", updateMission);
router.delete("/:id", deleteMission);

export default router;
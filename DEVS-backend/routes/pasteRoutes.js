const express = require("express");
const router = express.Router();

const {
    createPaste,
    getAllPastes,
    getPasteById,
    deletePaste,
} = require("../controllers/pasteController");

router.post("/", createPaste);
router.get("/", getAllPastes);
router.get("/:id", getPasteById);
router.delete("/:id", deletePaste);

module.exports = router;
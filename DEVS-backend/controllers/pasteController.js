const Paste = require("../models/Paste");

// Create a new paste
const createPaste = async (req, res) => {
    try {
        const { title, content, language } = req.body;

        const paste = await Paste.create({
            title,
            content,
            language,
        });

        res.status(201).json(paste);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all pastes
const getAllPastes = async (req, res) => {
    try {
        const pastes = await Paste.find().sort({ createdAt: -1 });
        res.json(pastes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single paste
const getPasteById = async (req, res) => {
    try {
        const paste = await Paste.findById(req.params.id);

        if (!paste) {
            return res.status(404).json({ message: "Paste not found" });
        }

        res.json(paste);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete paste
const deletePaste = async (req, res) => {
    try {
        const paste = await Paste.findById(req.params.id);

        if (!paste) {
            return res.status(404).json({ message: "Paste not found" });
        }

        await paste.deleteOne();

        res.json({ message: "Paste deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createPaste,
    getAllPastes,
    getPasteById,
    deletePaste,
};
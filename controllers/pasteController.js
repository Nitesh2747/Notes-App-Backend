import Paste from '../models/PasteModel.js';

export const getPastes = async (req, res) => {
    try {
        const pastes = await Paste.find({ owner: req.userId }).sort({ createdAt: -1 });
        res.status(200).json(pastes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createPaste = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        if (!content) {
            return res.status(400).json({ message: 'Content required' });
        }
        const paste = await Paste.create({ title: title || '', content, tags: tags || [], owner: req.userId });
        res.status(201).json(paste);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updatePaste = async (req, res) => {
    try {
        const paste = await Paste.findOne({ _id: req.params.id, owner: req.userId });
        if (!paste) {
            return res.status(404).json({ message: 'Paste not found' });
        }
        paste.title = req.body.title ?? paste.title;
        paste.content = req.body.content ?? paste.content;
        paste.isPublic = req.body.isPublic ?? paste.isPublic;
        paste.tags = req.body.tags ?? paste.tags;
        await paste.save();
        res.status(200).json(paste);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deletePaste = async (req, res) => {
    try {
        const paste = await Paste.findOneAndDelete({ _id: req.params.id, owner: req.userId });
        if (!paste) {
            return res.status(404).json({ message: 'Paste not found' });
        }
        res.status(200).json({ message: 'Paste deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getPublicPaste = async (req, res) => {
    try {
        const paste = await Paste.findOne({ _id: req.params.id, isPublic: true });
        if (!paste) {
            return res.status(404).json({ message: 'Note not found or not shared' });
        }
        res.status(200).json(paste);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
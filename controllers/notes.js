const notes = require('../models/note.js');

const getNotes = async(req, res) => {
    try{
        const _notes = await notes.find({id: req.id});
        res.status(200).json(_notes);
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

const createNotes = async(req, res) => {
    const{title, desc, createdOn} = await req.body;
    try{
        const newNote = new notes({title:title, desc:desc, createdOn: createdOn, id: req.id});
        await newNote.save();
        res.status(200).json({message: "Note created successfully"});
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

const deleteNotes = async(req, res) => {
    try{
        const _id = req.params.id;
        await notes.findByIdAndDelete({_id: _id});
        res.status(200).json({message: "Note deleted successfully"});
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

const updateNotes = async(req, res) => {
    const {title, desc, lastModifiedOn} = req.body;
    try{
        const _id = req.params.id;
        await notes.findByIdAndUpdate({_id:_id}, {title, desc, lastModifiedOn}, {new: true});
        res.status(200).json({message: "Note updated successfully"});
    }catch(err){
        res.status(400).json({message: err.message});
    }
};

module.exports = {getNotes, createNotes, deleteNotes, updateNotes};

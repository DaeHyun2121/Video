const express = require('express');
const router = express.Router();
const { Board } = require("../models/Board");

const { auth } = require("../middleware/auth");


router.post('/uploadBoard', (req,res) => {
    const board = new Board(req.body)

    board.save((err, doc) => {
        if(err) return res.json({success:false, err})
        res.status(200).json({success:true})
    })
});

router.get('/getBoards',(req,res) => {
    Board.find()
        .populate('writer')
        .exec((err, boards) => {
            if(err) return res.status(400).send(err);
            res.status(200).json({success:true,boards})
        }) 
});

router.post('/getBoardDetail',(req,res) => {
    
    Board.findOne({"_id" : req.body.boardId})
        .populate('writer')
        .exec((err, boardDetail) => {
            if(err) return res.status(400).send(err)
            return res.status(200).json({success:true, boardDetail})
        })

});

module.exports = router;
var express = require('express');
const { Router } = require('express');

const router = Router();
router.use(express.json());
router.get('/',(req,res)=>{
    res.send("Aloha")
})

module.exports = router;

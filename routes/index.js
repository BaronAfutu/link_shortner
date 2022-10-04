var express = require('express');
var router = express.Router();
/**
 * @param Url mongoose
 */ 
 const Url = require('../models/url');

/* GET home page. */
router.get('/:urlCode', async (req, res)=>{
  try {
    const url = await Url.findOne({urlCode:req.params.urlCode});
    if(url){
      return res.redirect(url.longUrl);
    }else{
      res.status(404).json('No Url found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json('Server error');
  }
  
});

module.exports = router;

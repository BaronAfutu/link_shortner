const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
/**
 * @param Url mongoose
 */ 
const Url = require('../models/url');


/**
 * @swagger
 * components:
 *   schemas:
 *     Url:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the shortened URL
 *         urlCode:
 *           type: string
 *           description: The generated short code for the shortened URL
 *         longUrl:
 *           type: string
 *           description: The input long URL
 *         shortUrl:
 *           type: string
 *           description: The shortened URL
 *       example:
 *         id: 633b6f1cb614e7cbf7587003
 *         urlCode: "tdQvjb2tp"
 *         longUrl: "https://devcenter.heroku.com/articles/getting-started-with-nodejs#:~:text=Starting%20November%2028%2C%202022%2C%20free%20Heroku%20Dynos%2C%20free%20Heroku%20Postgres%2C%20and%20free%20Heroku%20Data%20for%20Redis%C2%AE%20plans%20will%20no%20longer%20be%20available."
 *         shortUrl: "http://localhost:3000/tdQvjb2tp"
 *     longUrl:
 *       type: object
 *       required:
 *         - longUrl
 *       properties:
 *         longUrl:
 *           type: string
 *           description: The input long URL
 *       example:
 *         longUrl: https://devcenter.heroku.com/articles/getting-started-with-nodejs#:~:text=Starting%20November%2028%2C%202022%2C%20free%20Heroku%20Dynos%2C%20free%20Heroku%20Postgres%2C%20and%20free%20Heroku%20Data%20for%20Redis%C2%AE%20plans%20will%20no%20longer%20be%20available.
 */

 /**
  * @swagger
  * tags:
  *   name: URL shortner
  *   description: Generate shortened URL from a longer URL
  */


/**
 * @swagger
 * /api/url/shorten:
 *   post:
 *     summary: Create a shortened URL
 *     tags: [URL shortner]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/longUrl'
 *     responses:
 *       200:
 *         description: Shortened URL successfully generated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Url'
 *       500:
 *         description: Some server error
 */
router.post('/shorten',async (req,res)=>{
    const { longUrl } = req.body;
    const baseUrl = 'http://localhost:3000';

    if(!validUrl.isUri(baseUrl)){
        return res.status(401).json('Invalid base url');
    }

    const urlCode = shortid.generate();

    if(validUrl.isUri(longUrl)){
        try {
            let url = await Url.findOne({longUrl});
            if(url){
                return res.json(url);
            }else{
                const shortUrl = baseUrl + '/' + urlCode;

                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    date: new Date()
                });
                await url.save();
                return res.json(url);
            }
        } catch (error) {
            console.error(error);
            res.status(500).json('Server eroor');
        }
        return res.status(401).json('Invalid base url');
    }else{
        res.status(401).json('Invalid long url');
    }
});

module.exports = router;

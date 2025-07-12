const express = require('express');
const router = express.Router();
const User = require('../models/Users')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const JWT_SECRET = 'DhruvRana@1234';
const salt=bcrypt.genSaltSync(10);
const fetchuser=require('../middleware/fetchuser')
//User Signup Route
// Route: /auth/signup
router.post('/signup', [
    body('email').isEmail(),
    body('name','Enter a valid name').isLength({ min: 4 }),
    body('password').isLength({ min: 5 })
],

    async (req, res) => {
        // console.log(await req.body);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        else {
            try {
                //missing await can cause error
                const salt = await bcrypt.genSalt(10);
                const secPass=await bcrypt.hash(req.body.password,salt);
                
                let user=await User.findOne({email:req.body.email});
            if(user){
                return res.status(400).json({ error: 'User with this email already exists' });
            }
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            }).then(user => {
                const data={
                    user: {
                        id: user.id
                    }
                }
                console.log(data)
                const authtoken=jwt.sign(data,JWT_SECRET); //its a sync method, no need to await
                res.json({authtoken});
            }).catch(err => {
                res.status(500).json({ error: 'Internal server error' ,message: err.message});
            });
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Some server side error occured' });
            }
        }
    });


//User Login Route
// Route: /auth/login
router.post('/login',[
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
],async(req,res)=>{
    
    try {
        const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }
    const user=await User.findOne({email:req.body.email});
    console.log(user);
    if(!user){
        return res.status(400).json({ error: 'Please try to login with correct credentials' });
    }
    const passwordCompare=await bcrypt.compare(req.body.password,user.password);
    if(!passwordCompare){   
        return res.status(400).json({ error: 'Please try to login with correct credentials' });
    }
    const data={
        user:{ // user is taken from the model made from the findOne method
            id:user.id
        }
    }
    const authtoken=jwt.sign(data,JWT_SECRET);
    res.json({authtoken});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Some server side error occured' });
    }
})

//Get logged in user details
// Route: /auth/getuser
router.post('/getuser',fetchuser,async (req,res)=>{
    try {
        const userId = req.user.user.id;
        const data = await User.findById(userId).select('-password');
        res.send(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Some server side error occurred' });
    }
})
module.exports = router;
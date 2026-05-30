const jwt = require("jsonwebtoken")
const usermodel = require('../models/user.model')
const bcrypt = require("bcryptjs")
const redis = require('../config/cache')

async function register(req, res) {
    try {
        const { username, email, password } = req.body;

        // 1. Prevent the Mongoose validation error by checking upfront
        if (!username || !email || !password) {
            return res.status(400).json({
                message: "All fields (username, email, password) are required."
            });
        }

        // 2. Check if user already exists
        const existingUser = await usermodel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        });

        // If user exists, stop here. (Changed to 400 Bad Request)
        if (existingUser) {
            return res.status(400).json({
                message: "Username or Email is already taken."
            });
        }

        // 3. Hash password and create the NEW user
        const hash = await bcrypt.hash(password, 10);
        
        // CRITICAL FIX: Save the returned new user document to a variable!
        const newUser = await usermodel.create({
            username, 
            email, 
            password: hash
        });

        // 4. Generate the token using the NEW user's details
        const token = jwt.sign(
            {
                id: newUser._id, // Fixed: Using newUser instead of the null 'user'
                username: newUser.username
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 5. Send cookie and success response
        res.cookie("token", token, {
            httpOnly: true, // Good practice to secure cookies against XSS
            secure: process.env.NODE_ENV === "production" 
        });

        return res.status(201).json({
            message: "Created successfully"
        });

    } catch (error) {
        // Catch-all to prevent the server from crashing on unexpected errors
        console.error("Registration Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function login(req, res) {
    try {
        const { username, email, password } = req.body;

        // 1. Basic validation check
        if ((!username && !email) || !password) {
            return res.status(400).json({
                message: "Please provide username/email and password"
            });
        }

        // 2. Find user by username OR email (and include password)
        const user = await usermodel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        }).select("+password");

        // Security Tip: Use generic "Invalid credentials" messages for both 
        // missing users and wrong passwords so hackers can't guess valid usernames.
        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // 3. FIX: Use bcrypt.compare and add 'await'
        const isValidPassword = await bcrypt.compare(password, user.password);
        
        if (!isValidPassword) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        // 4. FIX: Corrected user.username (removed the underscore)
        const token = jwt.sign(
            {
                id: user._id,
                username: user.username 
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        // 5. Set cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production"
        });

       
        return res.status(200).json({
            message: "Login successfully"
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function logout(req,res){
const token = req.cookies.token
res.clearCookie("token"); // 'C' ko capital karo (CamelCase)
await redis.set("token", Date.now().toString(), "EX" , 60 *60)
res.status(200).json({
    message : "logout sucessfully"
})

}
async function getme(req,res){
    const user = req.user
    res.status(200).json({
        user
    })
}


module.exports = {
    register ,
    login ,
    getme ,
    logout
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Public = require('../model/user');
const Admin = require('../model/admin');

function signup() {
    return async (req, res, next) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({
                    message: 'Please provide username, email, and password',
                });
            }

            const existingUser = await Public.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    message: 'User already exists, please use another email address',
                });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new Public({
                    name,
                    email,
                    password: hashedPassword,
                });

                await newUser.save();
                res.status(201).json({
                    message: 'User created successfully',
                    user: newUser,
                    id : newUser.id
                });
            }
        } catch (error) {
            console.log(error);
            next(error); 
        }
    };
}

function login() {
    return async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const existingUser = await Public.findOne({ email: email });

            if (existingUser) {
                const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
                if (isPasswordCorrect) {
                    const token = jwt.sign(
                        { userID: existingUser._id }, 
                        process.env.JWT_SECRET
                    );
                    res.status(200).json({
                        message: 'Login successful',
                        email: existingUser.email,
                        name: existingUser.name,
                        id: existingUser._id,
                        token
                    });

                } else {
                    res.status(400).json({
                        message: 'Invalid credentials',
                    });
                }
            } else {
                res.status(400).json({
                    message: 'User not found',
                });
            }
        } catch (error) {
            next("Error Logging In", error);
        }
    };
}

const Updateuser = () => {
    return async (req, res) => {
        try {
            const userId = req.params.id;
            console.log(`Update user ${userId}`);
            const { updemail, updpassword } = req.body;
            console.log(req.body);
            if (!updemail || !updpassword) {
                return res.status(400).json({ message: 'Please provide all required fields' });
            }

            const userone = await Public.findById(userId);
            console.log(userone);
            if (userone){
                userone.email = updemail;
                userone.password = await bcrypt.hash(updpassword, 10);

                await userone.save();

                res.json({
                    message: 'User updated successfully',
                    user: userone
                });
            }else{
                return res.status(404).json({ message: 'User not found' });
            }

            
        } catch (error) {
            res.status(500).json({ message: 'Server Error', error: error.message });
        }
    }
}

function adminlogin() {
    return async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const existingUser = await Admin.findOne({ username: username });

            if (existingUser) {
                const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
                if (isPasswordCorrect) {
                    const token = jwt.sign(
                        { userID: existingUser._id }, 
                        process.env.JWT_SECRET
                    );
                    res.status(200).json({
                        message: 'Login successful',
                        username: existingUser.username,
                        id: existingUser._id,
                        token
                    });

                } else {
                    res.status(400).json({
                        message: 'Invalid credentials',
                    });
                }
            } else {
                res.status(400).json({
                    message: 'Admin not found',
                });
            }
        } catch (error) {
            next("Error Logging In", error);
        }
    };
}

function updateAdmin(){
    return async (req, res) => {
        try {
            const userId = req.params.id;
            
            const { updusername, newpassword } = req.body;
            if (!updusername ||!newpassword) {
                return res.status(400).json({ message: 'Please provide all required fields' });
            }
            
            const adminone = await Admin.findById(userId);
            if (!adminone) {
                return res.status(404).json({ message: 'Admin not found' });
            }
            
            adminone.username = updusername;
            adminone.password = await bcrypt.hash(newpassword, 10);
            
            await adminone.save();
            
            res.json({
                message: 'Admin updated successfully',
                admin: adminone
            });
        }catch (e) {
            console.log(e);
            res.status(500).json({ message: 'Server Error', error: e.message });
        }
}}

module.exports = {
    signup,
    login,
    Updateuser,
    adminlogin,
    updateAdmin
};
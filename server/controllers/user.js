const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../model/user');
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

            const existingUser = await User.findOne({ email });

            if (existingUser) {
                return res.status(400).json({
                    message: 'User already exists, please use another email address',
                });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = new User({
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
            const existingUser = await User.findOne({ email: email });

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
            
            const { updname, updemail, oldpassword, newpassword } = req.body;
            if (!updname || !updemail || !oldpassword || !newpassword) {
                return res.status(400).json({ message: 'Please provide all required fields' });
            }

            const userone = await User.findById(userId);
            if (!userone) {
                return res.status(404).json({ message: 'User not found' });
            }

            const ispasscorrect = await bcrypt.compare(oldpassword, userone.password);
            if (!ispasscorrect) {
                return res.status(401).json({ message: 'Invalid Password' });
            }

            userone.name = updname;
            userone.email = updemail;
            userone.password = await bcrypt.hash(newpassword, 10);

            await userone.save();

            res.json({
                message: 'User updated successfully',
                user: userone
            });
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
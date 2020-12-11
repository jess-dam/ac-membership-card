const express = require('express');
const User = require('../../models/user/user.model');

const getUser = async (req, res, next) => {
    if (!req.params.id) {
        console.log('no ID!');
        res.status(400).json({
            status: 'failed',
            message: 'No user ID provided'
        });
        return;
    }


    try {
        var user = await User.findById(req.params.id);

        if(!user) {
            res.status(404).json({
                status: 'failed',
                message: 'User could not be found'
            });

            return;
        }

        res.status(200).json({
            status: 'success',
            message: 'Retrieved user',
            user
        });
    } catch {
        res.status(404).json({
            status: 'failed',
            message: 'User could not be found'
        });
    }


};

const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        const user = await User.create({ name, email, password });

        res.status(201).json({
            status: 'success',
            message: 'User has been signed up',
            userId: user._id
        });

    } catch(err) {
        res.status(500).json({
            status: 'failed',
            message: 'Could not create user',
            error: err
        });
    }

};

const validateUser = async (req, res, next) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
        console.log('email or password is missing');
        res.status(400).json({
            status: 'failed',
            message: 'Email or password is missing'
        });

        return;
    }

    try {
        const user = (await User.find({ email }))[0]; // Get the first user found by email
        console.log(user);
        if (user && user.password === password) {
            res.status(201).json({
                status: 'success',
                message: 'User has been validated successfully',
                userId: user._id
            });
        } else {
            console.log(user)
            res.status(403).json({
                status: 'failed',
                message: 'User is invalid'
            });
        }

    } catch(err) {
        res.status(500).json({
            status: 'failed',
            message: 'Could not validate user'
        })

    }

};


module.exports = { getUser, signUp, validateUser };

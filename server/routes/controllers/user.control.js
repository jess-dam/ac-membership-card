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

const signIn =  (req, res, next) => {

};

const signOut =  (req, res, next) => {

};

module.exports = { getUser, signUp, signIn, signOut };

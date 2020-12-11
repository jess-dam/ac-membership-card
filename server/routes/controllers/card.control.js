const express = require('express');
const Card = require('../../models/card/card.model');
const User = require('../../models/user/user.model');


const getCard = async (req, res, next) => {
    try {
        const cardId = (await User.findById(req.params.id)).cardId;
        const card = await Card.findById(cardId);

        res.status(200).json({
            status: 'success',
            message: `Retrieved card for user ${req.params.id}`,
            card
        });

    } catch {
        res.status(404).json({
            status: 'failed',
            message: `Card could not be found`
        });
    }
};

const createCard = async (req, res, next) => {
    const userId = req.params.id;
    let user = await User.findById(userId);

    if (!user) {
        res.status(400).json({
            status: 'failed',
            message: 'User does not exist'
        });

        return;
    }

    let card;
    try {
        card = await Card.create({});
        await User.findByIdAndUpdate(userId, { cardId: card._id });

        res.status(201).json({
            status: 'success',
            message: `Card has been registered for user ${userId}`,
            cardId: card._id
        });
    } catch {
        res.status(500).json({
            status: 'failed',
            message: `Could not create card for user ${user._id}`
        });
    }
};

const removeCard = async (req, res, next) => {

};

const addPoints = async (req, res, next) => {
    const { cardId, pointsToAdd } = req.body;
    try {
        let currentPoints = (await Card.findById(cardId)).points;
        await Card.findByIdAndUpdate(cardId, { points: (pointsToAdd + currentPoints) });
        res.status(201).json({
            status: 'success',
            message: 'User points updated'
        });
    } catch (err) {
        res.status(500).json({
            status: 'failed',
            message: 'Could not update user points: ' + err
        });
    }
};

module.exports = { getCard, createCard, removeCard, addPoints };
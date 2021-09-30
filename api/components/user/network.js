const express = require('express');

const secure = require('./secure');
const response = require('../../../network/response');
const controller = require('./');


const router = express.Router();

// Routes
router.get('/', list);
router.get('/:id', get);
router.post('/', upsert);
router.put('/', secure('update'), upsert);
router.delete('/:id', remove);

// Internal functions
async function list(req, res, next) {
    try {
        const dataList = await controller.list();
        response.success(req, res, dataList, 200);
    } catch(err) {
        next(err);
    }
}

async function get(req, res, next) {
    try {
        const user = await controller.get(req.params.id)
        response.success(req, res, user, 200);
    } catch(err) {
        next(err);
    }
}

async function upsert(req, res, next) {
    try {
        const user = await controller.upsert(req.body)
        response.success(req, res, user, 201);
    } catch(err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        await controller.remove(req.params.id)
        response.success(req, res, 'El elemento fue eliminado', 200);
    } catch {
        next(err);
    }
}

module.exports = router;
const projectsRouter = require('./projectsRouter');
const actionsRouter = require('./actionsRouter');
const express = require('express');
const router = express.Router(); 

router.use('/', projectsRouter);
router.use('/', actionsRouter);

module.exports = router;
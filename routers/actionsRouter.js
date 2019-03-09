const express = require("express");
const actionModel = require("../data/helpers/actionModel");
const router = express.Router();

router.get("/actions", async (req, res) => {
    try {
      const action = await actionModel.get();
      res.status(200).json(action);
    } catch (error) {
      res.status(500).json({ error: "Could not retrive action information." });
    }
  });

module.exports = router;
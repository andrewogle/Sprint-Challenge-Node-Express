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
router.get("/actions/:id", async (req, res) => {
  try {
    const action = await actionModel.get(req.params.id);
    if (action) {
      res.status(200).json(action);
    } else {
      res.status(404).json({ message: "The specified action does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Action information could not be retrieved." });
  }
});
router.post("/actions", async (req, res) => {
  try {
    const action = await actionModel.insert(req.body);
    if (action) {
      res.status(201).json(action);
    } else {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the action."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the action to the database"
    });
  }
});
router.put("/actions/:id", async (req, res) => {
    try {
      const { description, notes } = req.body;
      if (description && notes) {
        const action = await actionModel.update(req.params.id, req.body);
        if (action) {
          res.status(200).json(action);
        } else {
          res
            .status(404)
            .json({ message: "The action with the specified ID does not exist." });
        }
      } else {
        res.status(400).json({
          errorMessage: "Please provide title and contents for the action."
        });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "The action information could not be modified." });
    }
  });
  router.delete("/actions/:id", async (req, res) => {
    try {
      const action = await actionModel.remove(req.params.id);
      if (action) {
        res.json(action);
      } else {
        res
          .status(404)
          .json({ message: "The action with the specified ID does not exist." });
      }
    } catch (error) {
      res.status(500).json({ error: "The action could not be removed" });
    }
  });
  

module.exports = router;

const express = require("express");
const projectModel = require("../data/helpers/projectModel");
const router = express.Router();

router.get("/projects", async (req, res) => {
  try {
    const project = await projectModel.get();
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Could not retrive action information." });
  }
});
router.get("/projects/:id", async (req, res) => {
  try {
    const project = await projectModel.get(req.params.id);
    if (action) {
      res.status(200).json(project);
    } else {
      res.status(404).json({ message: "The specified project does not exist." });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Project information could not be retrieved." });
  }
});
router.get("/projects/:id/actions", async (req, res) => {
    try {
      const project = await projectModel.getProjectActions(req.params.id);
      if (action) {
        res.status(200).json(project);
      } else {
        res.status(404).json({ message: "The specified project does not exist." });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Project actions could not be retrieved." });
    }
  });
router.post("/projects", async (req, res) => {
  try {
    const project = await projectModel.insert(req.body);
    if (project) {
      res.status(201).json(project);
    } else {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the project."
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "There was an error while saving the project to the database"
    });
  }
});
router.put("/projects/:id", async (req, res) => {
  try {
    const { description, notes } = req.body;
    if (description && notes) {
      const project = await projectModel.update(req.params.id, req.body);
      if (action) {
        res.status(200).json(project);
      } else {
        res
          .status(404)
          .json({
            message: "The project with the specified ID does not exist."
          });
      }
    } else {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the project."
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "The action information could not be modified." });
  }
});
router.delete("/projects/:id", async (req, res) => {
  try {
    const project = await projectModel.remove(req.params.id);
    if (project) {
      res.json(project);
    } else {
      res
        .status(404)
        .json({ message: "The project with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The project could not be removed" });
  }
});

module.exports = router;

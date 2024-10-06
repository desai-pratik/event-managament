const express = require("express");
const router = express.Router();
const eventSchema = require("../../models/EventSchema");
const mongoose = require("mongoose");
const multer = require("multer");
const verifyJWT = require("../../middleware/jwtMiddleware");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now() + ".png");
  },
});
var upload = multer({ storage: storage });
router.post("/addevent", upload.single("file"), async (req, res) => {
  try {
    const { eventName, eventDate, location, eventDetails, standingPrice, isStanding } = req.body;

    if (!eventName || !eventDate || !location || !eventDetails) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newEventData = {
      _id: new mongoose.Types.ObjectId(),
      eventName,
      eventDate,
      location,
      eventImageUrl: req.file ? req.file.path : null,
      eventDetails,
    };

    if (isStanding === "true") {
      newEventData.isStanding = true;
      newEventData.standingPrice = standingPrice;
    } else {
      newEventData.vvip = {
        price: req.body.vvipPrice,
        maxSeat: req.body.vvipMaxSeat,
      };
      newEventData.leftWing = {
        price: req.body.leftWingPrice,
        maxSeat: req.body.leftWingMaxSeat,
      };
      newEventData.rightWing = {
        price: req.body.rightWingPrice,
        maxSeat: req.body.rightWingMaxSeat,
      };
    }

    const newEvent = new eventSchema(newEventData);
    await newEvent.save();

    res.status(201).json({
      message: "Event Created",
      event: newEvent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred while creating the event",
      error: error.message,
    });
  }
});

router.get("/allevents", (req, res, next) => {
  try {
    eventSchema
      .find({})
      .exec()
      .then((doc) => {
        if (doc) {
          res.status(302).json({
            doc,
          });
        } else {
          res.status(206).json({
            message: "No Event Found",
          });
        }
      });
  } catch (error) {
    res.status(204).json({
      message: "No Event Found",
    });
  }
});

router.get("/upcomingevents", (req, res, next) => {
  const currentDate = new Date();
  try {
    eventSchema
      .find({
        eventDate: {
          $gte: currentDate.toISOString().slice(0, 10),
        },
      })
      .exec()
      .then((doc) => {
        if (doc) {
          res.status(302).json({
            doc,
          });
        } else {
          res.status(206).json({
            message: "No Event Found",
          });
        }
      });
  } catch (error) {
    res.status(204).json({
      message: "No Event Found",
    });
  }
});

router.get("/pastevents", (req, res, next) => {
  const currentDate = new Date();
  try {
    eventSchema
      .find({
        eventDate: {
          $lt: currentDate.toISOString().slice(0, 10),
        },
      })
      .exec()
      .then((doc) => {
        if (doc) {
          res.status(302).json({
            doc,
          });
        } else {
          res.status(206).json({
            message: "No Event Found",
          });
        }
      });
  } catch (error) {
    res.status(204).json({
      message: "No Event Found",
    });
  }
});

router.get("/ongoingevent", (req, res, next) => {
  const currentDate = new Date();
  try {
    eventSchema
      .find({
        eventDate: {
          $eq: currentDate.toISOString().slice(0, 10),
        },
      })
      .exec()
      .then((doc) => {
        if (doc) {
          res.status(302).json({
            doc,
          });
        } else {
          res.status(206).json({
            message: "No Event Found",
          });
        }
      });
  } catch (error) {
    res.status(204).json({
      message: "No Event Found",
    });
  }
});

router.get("/:id", (req, res, next) => {
  try {
    const id = req.params.id;
    eventSchema
      .findById(id)
      .exec()
      .then((doc) => {
        if (doc) {
          res.status(320).json({
            doc,
          });
        } else {
          res.status(206).json({
            message: "No Event Found",
          });
        }
      });
  } catch (error) {
    res.status(404).status({
      message: "Not Found",
    });
  }
});

router.patch("/:id", verifyJWT, async (req, res, next) => {
  const id = req.params.id;

  try {
    const updatedEvent = await eventSchema.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({
      message: "Event successfully updated",
      doc: updatedEvent,
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", verifyJWT, (req, res, next) => {
  eventSchema.findByIdAndRemove(req.params.id, (err, doc) => {
    if (err || !doc) {
      return res.status(404).json({ message: "Event not found or couldn't be deleted" });
    }
    res.status(200).json({ message: "Successfully removed" });
  });
});

module.exports = router;

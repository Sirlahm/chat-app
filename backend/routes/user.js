const express = require("express");
const userController = require("../controllers/user");
const {authMiddleware} = require("../middlewares/auth")
const router = express.Router();


router.get("/", authMiddleware, userController.getAllUser);
router.get("/:id", authMiddleware, userController.getAUser);
router.get("/messages/:senderId/:receiverId", authMiddleware, userController.getUsersMessages);


module.exports = router;

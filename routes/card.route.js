const express = require("express");
const router = express.Router();

//controllers
const {
  createCard,
  listCards,
  listCardsRoute,
  read,
  getManifest,
  listUserCards,
  modifyCard,
  payCard
} = require("../controllers/card.controller");

router.post("/create", createCard);
router.get("/cards", listCards)
router.get("/cardsRoute/:userRoute", listCardsRoute)
router.get("/:userRoute", read)
router.get('/:user/cards', listUserCards)
router.put("/modify/:cardId", modifyCard)
router.post("/pay/:cardId", payCard)

router.get("/:userRoute/manifest", getManifest)



module.exports = router;

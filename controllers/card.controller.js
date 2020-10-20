const Card = require("../models/card.schema");
const _ = require("lodash");

exports.createCard = async (req, res) => {
  try {
    const {
      socials,
      links,
      infos,
      style,
      body,
      picture,
      pictureLogo,
      pictureLogo2,
    } = req.body.socials;
    const { user, isQr, visual, visualBg } = req.body;
    const wazeDeepLink = `waze://?ll=${req.body.socials.coordonates.lat}%2C${req.body.socials.coordonates.lng}&navigate=yes&zoom=17`
    const userRoute = req.body.socials.infos.route;
    const qrLink = "https://digiscards.com/static/images/index/qr-code.png";
    const manifest = {
      name: infos.title,
      short_name: infos.title,
      start_url: `https://digiscards.com/digis/${userRoute}`,
      scope: `https://digiscards.com/digis/${userRoute}`,
      display: "standalone",
      theme_color: "#ffffff",
      background_color: "#ffffff",
      icons: [
        {
          src: pictureLogo2,
          sizes: "192x192",
          type: "image/png",
        },
        {
          src: pictureLogo,
          sizes: "512x512",
          type: "image/png",
        },
      ],
    };

    card = new Card({
      socials,
      links,
      infos,
      style,
      body,
      picture,
      pictureLogo,
      pictureLogo2,
      isQr,
      qrLink,
      user,
      userRoute,
      manifest,
      wazeDeepLink,
      visual,
      visualBg
    });
    await card.save((err, data) => {
      if (err) {
        console.log("Card error", err);
        return res.status(400).json({
          error: "Card error",
        });
      }

      return res.json({
        message:
          "Card sended. Please wait until creation and proceed to paiement",
        data,
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
    console.log(error)
  }
};

exports.listCards = async (req, res) => {
  Card.find({}).exec((err, data) => {
    if (err) {
      return res.json({
        error: errorHandler(err),
      });
    }
    res.json(data);
  });
};

exports.listCardsRoute = async (req, res) => {
  Card.findOne({
    userRoute: req.params.userRoute,
  }).exec((err, data) => {
    if (err) {
      return res.json({
        error: err,
      });
    }
    if (data) {
      return res.json(true);
    } 
    if(data = "") {
      return res.json(true)
    }
    else {
      return res.json(false);
    }
  });
};

exports.listUserCards = async (req, res) => {
  const user = req.params.user;
  Card.find({ user })
    // .select("-photo")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      res.json(data);
    });
};

exports.read = (req, res) => {
  const userRoute = req.params.userRoute.toLowerCase();
  Card.findOne({ userRoute })
    // .select("-photo")
    .exec((err, data) => {
      if (err) {
        return res.json({
          error: err,
        });
      }
      res.json(data);
    });
};

exports.getManifest = (req, res) => {
  const userRoute = req.params.userRoute;
  Card.findOne({ userRoute })
    .select("manifest")
    .exec((err, card) => {
      if (err || !card) {
        return res.status(400).json({
          error: err,
        });
      }
      return res.json(card.manifest);
    });
};

exports.modifyCard = async (req, res) => {
  const cardId = req.params.cardId;
  const { card, visual, visualBg } = req.body;
  console.log(card)
  const wazeDeepLink = `waze://?ll=${card.coordonates.lat}%2C${card.coordonates.lng}&navigate=yes&zoom=17`
  const manifest = {
    name: card.infos.title,
    short_name: card.infos.title,
    start_url: `https://digiscards.com/digis/${card.userRoute}`,
    scope: `https://digiscards.com/digis/${card.userRoute}`,
    display: "standalone",
    theme_color: "#ffffff",
    background_color: "#ffffff",
    icons: [
      {
        src: card.pictureLogo2,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: card.pictureLogo,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
  try {
    var newCard = await Card.findById(cardId).exec();
    newCard.set({
      infos: card.infos,
      socials: card.socials,
      links: card.links,
      style: card.style,
      body: card.body,
      picture: card.picture,
      pictureLogo: card.pictureLogo,
      pictureLogo2: card.pictureLogo2,
      isQr: card.isQr,
      manifest: manifest,
      wazeDeepLink,
      visual,
      visualBg
    });
    var result = await newCard.save();
    return res.json(result);
  } catch (error) {
    console.log(error);
  }
};

exports.payCard = async (req, res) => {
  const cardId = req.params.cardId;
  try {
    var newCard = await Card.findById(cardId).exec();
    newCard.set({
      paiement: {
        isPayed: true,
        data: req.body.payment,
        date: new Date(),
        price: req.body.price
      }
    });
    var result = await newCard.save();
    return res.json(result);
  } catch(error) {
    console.log(error)
  }
}

exports.payCard = async (req, res) => {
  const cardId = req.params.cardId;
  try {
    var newCard = await Card.findById(cardId).exec();
    newCard.set({
      paiement: {
        isPayed: true,
        data: req.body.payment,
        date: new Date(),
        price: req.body.price
      }
    });
    var result = await newCard.save();
    return res.json(result);
  } catch(error) {
    console.log(error)
  }

}

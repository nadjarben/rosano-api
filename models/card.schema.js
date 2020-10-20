const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const infoSchema = new mongoose.Schema({
  title: String,
  activities: String,
  shareMessage: String,
});

const socialSchema = new mongoose.Schema({
  facebook: Boolean,
  instagram: Boolean,
  phone: Boolean,
  whatsapp: Boolean,
  twitter: Boolean,
  website: Boolean,
  email: Boolean,
  youtube: Boolean,
  gmap: Boolean,
  waze: Boolean,
  linkedin: Boolean,
});

const linkSchema = new mongoose.Schema({
  facebook: String,
  instagram: String,
  phone: String,
  whatsapp: String,
  twitter: String,
  website: String,
  email: String,
  youtube: String,
  gmap: String,
  waze: String,
  linkedin: String
});

const styleSchema = new mongoose.Schema({
  background: String,
  backgroundLabels: String,
  backgroundLogo: String,
  borderImages: String,
  borderLabels: String,
  colorLabels: String,
  optionsColor: String,
  shareButton: String,
  subtitles: String,
  swipeColor: String,
  title: String,
});

const cardSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    userRoute: String,
    infos: infoSchema,
    body: {},
    socials: socialSchema,
    wazeDeepLink: String,
    links: linkSchema,
    style: styleSchema,
    picture: String,
    pictureLogo: String,
    pictureLogo2: String,
    isQr: Boolean,
    qrLink: String,
    manifest: Object,
    visual: Number,
    visualBg: Number,
    paiement: {
      data: {
        type: Array,
        default: [],
      },
      date: {
        type: Date
      },
      price: {
        type: Number
      },
      isPayed: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", cardSchema);

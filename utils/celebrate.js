const { celebrate, Joi } = require("celebrate");

const celebrateRegister = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(40).required(),
    avatar: Joi.string().pattern(
      /^(http|https):\/\/(www\.)?([A-Za-z0-9\.\-]+)(((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i
    ),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }),
});

const celebrateCreatePosts = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(2).max(50).required(),
    description: Joi.string().min(2).max(50).required(),
    tags: Joi.array().required(),
    image: Joi.string().pattern(
      /^(http|https):\/\/(www\.)?([A-Za-z0-9\.\-]+)(((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/i
    ),
  }),
});

module.exports = {
  celebrateRegister,
  celebrateCreatePosts,
};

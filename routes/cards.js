const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard, getCards, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

const cardIdValidate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).alphanum().hex(),
  }),
});

router.delete('/:cardId', cardIdValidate, deleteCard);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().uri({ scheme: ['http', 'https'] }),
  }),
}), createCard);

router.put('/:cardId/likes', cardIdValidate, likeCard);

router.delete('/:cardId/likes', cardIdValidate, dislikeCard);

module.exports = router;

var express = require('express');
var router = express.Router();
const checkAuth = require('../managers/checkauth');
const userManager = require('../managers/userManager');

/* GET users listing. */
router.get('/info', checkAuth, async (req, res, next) => {
  res.json({
    message: "success",
    data: req.userData
  });
});

router.post('/login', async (req, res, next) => {
  let response = await userManager.login(req.body);
  return res.json(response);
});

router.post('/register', async (req, res, next) => {
  let response = await userManager.register(req.body);
  return res.json(response);
})

module.exports = router;

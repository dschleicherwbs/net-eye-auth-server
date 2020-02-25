const auth = require('../../middleware/auth');
const Network = require('../../models/Network');
const router = require('express').Router();

// Create New Network
router.post('/', auth, async (req, res, next) => {
  try {
    const { name, place, ip, company } = req.body;
    const network = new Network({ name, place, ip, company });
    network.save();
    return res.send(201).json(network);
  } catch (error) {
    return next(error);
  }
});

router.post('/fill', auth, async (req, res, next) => {
  req.body.forEach(bodyItem => {
    try {
      const { name, place, ip, company } = bodyItem;
      const network = new Network({ name, place, ip, company });
      network.save();
      return res.send(201).json(network);
    } catch (error) {
      return next(error);
    }
  });
});

// Get all Networks
router.get('/', auth, async (req, res, next) => {
  try {
    const networks = await Network.find()
      .populate('company')
      .populate('events')
      .exec();
    return res.status(200).json(networks);
  } catch (error) {
    return next(error);
  }
});

// Get on Network by ID
router.get('/:id', auth, async (req, res, next) => {
  try {
    const network = await Network.findById(req.body);
    return res.status(200).json(network);
  } catch (error) {
    return next(error);
  }
});

// Edit Network
router.patch('/:id', auth, async (req, res, next) => {
  try {
    const { id, update } = req.body;
    const network = await Network.findByIdAndUpdate(id, update);
    return res.status(200).json(network);
  } catch (error) {
    return next(error);
  }
});

// Delete Network
// router.delete('/:id', auth, async (req, res, next) => {
//   try {
//     const network = await Network.findByIdAndDelete(filter, update);
//     return res.status(200).json(network);
//   } catch (error) {
//     return next(error);
//   }
// });

router.delete('/all', auth, async (req, res, next) => {
  try {
    const result = await Network.deleteMany();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

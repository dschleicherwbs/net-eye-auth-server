const auth = require('../../middleware/auth');
const NetworkEvent = require('../../models/NetworkEvent');
const Network = require('../../models/Network');
const router = require('express').Router();

// Create New Network
router.post('/', auth, async (req, res, next) => {
  try {
    const { history, networkId } = req.body;
    // Get Netwrok
    const network = await Network.findById(networkId);
    // Check if there is a Network
    if (!network) return res.status(400).send("Can't find Network");

    // Create and save new NetworkEvent
    const event = new NetworkEvent({ history });
    await event.save();

    // Push Event to Network and save
    network.events = [event._id, ...network.events];
    await network.save();

    return res.status(201).json(network);
  } catch (error) {
    return next(error);
  }
});

// Get all Networks
router.get('/', auth, async (req, res, next) => {
  try {
    const events = await NetworkEvent.find();
    return res.status(200).json(events);
  } catch (error) {
    return next(error);
  }
});

// Get on Network by ID
router.get('/:id', auth, async (req, res, next) => {
  try {
    const event = await NetworkEvent.findById(req.body);
    return res.status(200).json(event);
  } catch (error) {
    return next(error);
  }
});

// Edit Network
router.patch('/:id', auth, async (req, res, next) => {
  try {
    const { id, update } = req.body;
    const event = await NetworkEvent.findByIdAndUpdate(id, update);
    return res.status(200).json(event);
  } catch (error) {
    return next(error);
  }
});

// Delete Network
// router.delete('/:id', auth, async (req, res, next) => {
//   try {
//     const event = await Event.findByIdAndDelete(filter, update);
//     return res.status(200).json(event);
//   } catch (error) {
//     return next(error);
//   }
// });

router.delete('/all', auth, async (req, res, next) => {
  try {
    const result = await NetworkEvent.deleteMany();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

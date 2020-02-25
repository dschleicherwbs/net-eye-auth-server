const auth = require('../../middleware/auth');
const Company = require('../../models/Company');
const router = require('express').Router();

// Create New Network
router.post('/', auth, async (req, res, next) => {
  try {
    const { name, contactName, contactMail, contactTel } = req.body;
    const company = new Company({ name, contactName, contactMail, contactTel });
    company.save();
    return res.status(201).json(company);
  } catch (error) {
    return next(error);
  }
});

router.post('/fill', auth, async (req, res, next) => {
  req.body.forEach(bodyItem => {
    try {
      const { name, contactName, contactMail, contactTel } = bodyItem;
      const company = new Company({
        name,
        contactName,
        contactMail,
        contactTel
      });
      company.save();
      return res.status(201).json(company);
    } catch (error) {
      return next(error);
    }
  });
});

// Get all Networks
router.get('/', auth, async (req, res, next) => {
  try {
    const companys = await Company.find();
    return res.status(200).json(companys);
  } catch (error) {
    return next(error);
  }
});

// Get on Network by ID
router.get('/:id', auth, async (req, res, next) => {
  try {
    const company = await Company.findById(req.body);
    return res.status(200).json(company);
  } catch (error) {
    return next(error);
  }
});

// Edit Network
router.patch('/:id', auth, async (req, res, next) => {
  try {
    const { id, update } = req.body;
    const company = await Company.findByIdAndUpdate(id, update);
    return res.status(200).json(company);
  } catch (error) {
    return next(error);
  }
});

// Delete Network
// router.delete('/:id', auth, async (req, res, next) => {
//   try {
//     const company = await Company.findByIdAndDelete(filter, update);
//     return res.status(200).json(company);
//   } catch (error) {
//     return next(error);
//   }
// });

router.delete('/all', auth, async (req, res, next) => {
  try {
    const result = await Company.deleteMany();
    return res.status(200).json(result);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;

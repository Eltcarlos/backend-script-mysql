const { Router } = require("express");
const User = require("../controllers/User");

const router = Router();

router.post('/history_by_section', User.history_consumption_by_section)
router.post('/history_by_client', User.history_consumption_by_client)
router.post('/top_20_worst_customers', User.top_20_Worst_Customers)
module.exports = router;

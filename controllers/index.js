const router = require('express').Router();

const apiRoutes = require('./api/');
const homepageRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');

router.use("/", homepageRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);

module.exports = router;
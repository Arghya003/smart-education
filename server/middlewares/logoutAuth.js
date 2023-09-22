const AdminUser = require('../config/models/adminUser');
const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // Assuming you're using cookies for token storage
    if (!token) {
      throw new Error('Authentication required');
    }
    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN); // Replace with your secret key
    // Find the admin user by ID
    const rootAdminUser = await AdminUser.findOne({
      _id: decodedToken._id,
      isAdmin: true // Assuming you have a property to identify root admin users
    });
    if (!rootAdminUser) {
      throw new Error('Authentication failed');
    }
    req.rootUser = rootAdminUser; // Attach the root admin user to the request object
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = auth;

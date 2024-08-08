const bcrypt = require("bcrypt");
const adminSchema = require("../models/admin");
const authenticate = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await adminSchema.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (user.approval!=true) {
      return res.status(401).json({ error: "Admin Approval Pending" });
      
    }
    next();
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
};
module.exports = {
  authenticate,
};

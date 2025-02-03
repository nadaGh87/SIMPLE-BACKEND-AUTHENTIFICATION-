const allowedRoles = ["user", "admin", "moderateur"];

const verifyRoles = (...rolesToCheck) => {
  return (req, res, next) => {
    const userRoles = req.user.roles; // Make sure req.user.roles is populated
    console.log(userRoles);

    // Check if the user has any of the roles in rolesToCheck
    if (!userRoles.some(role => rolesToCheck.includes(role))) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

module.exports = { allowedRoles, verifyRoles };

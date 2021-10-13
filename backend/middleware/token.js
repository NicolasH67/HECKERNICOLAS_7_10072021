const JWT = require("jsonwebtoken");
const config = require("../config/config");

function issueJWT(user) {
  // on génére le token
  const id = user.id;
  const expiresIn = "24H";
  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const signedToken = JWT.sign(payload, "secret", { expiresIn: expiresIn });
  return {
    token: "Bearer " + signedToken,
    expires: expiresIn,
  };
}
function getUserId(req) {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = JWT.verify(token, "secret");
  const userId = decodedToken.sub;
  return userId;
}

module.exports.issueJWT = issueJWT;
module.exports.getUserId = getUserId;

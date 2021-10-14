const JWT = require("jsonwebtoken");

function issueJWT(user) {
  // on génére le token
  const id = user.id;
  const expiresIn = "24H";
  const payload = {
    sub: id,
    iat: Date.now(),
  };
  const signedToken = JWT.sign(payload, "RANDOM_TOKEN_SECRET", { expiresIn: expiresIn });
  return {
    token: signedToken,
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

export const decodePayloadFromJWT = (token: string) => {
  try {
    const base64Payload = token.split(".")[1];
    const payload = Buffer.from(base64Payload, "base64").toString("utf-8");
    return JSON.parse(payload);
  } catch (err) {
    console.error("JWT Decode Error");
    return null;
  }
};

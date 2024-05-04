const MAX_LEN = 6;

export const generateCharacterId = () => {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < MAX_LEN; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

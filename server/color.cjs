// Converts integer to hex
const colToHex = (c) => {
  // Hack so colors are bright enough
  let color = c < 75 ? c + 75 : c;
  let hex = color.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

// uses colToHex to concatenate
// a full 6 digit hex code
const rgbToHex = (r, g, b) => {
  return "#" + colToHex(r) + colToHex(g) + colToHex(b);
};

const getRandomColor = () => {
  return rgbToHex(
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
    Math.floor(Math.random() * 255),
  );
};

module.exports = { getRandomColor };

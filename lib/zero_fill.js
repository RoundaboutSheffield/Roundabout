
const zeroFill = n =>
  (String(n).length === 5
    ? String(n)
    : zeroFill(`0${n}`));

module.exports = zeroFill;

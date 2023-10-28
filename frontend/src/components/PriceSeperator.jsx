function NumberWithCommas(number) {
  const formattedNumber = number.toLocaleString('en-IN', { useGrouping: true });

  const map = {
    Thousand: 3,
    Lakh: 5,
    Crore: 7
  };

  const words = Object.keys(map).reverse();

  for (let i = 0; i < words.length; i++) {
    const divider = Math.pow(10, map[words[i]]);

    if (number >= divider) {
      const quotient = (number / divider).toFixed(2);
      return `${quotient} ${words[i]}`;
    }
  }

  return formattedNumber;
}

export default NumberWithCommas;

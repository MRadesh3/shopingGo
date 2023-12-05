export const shortenText = (text, n) => {
  if (text && text.length > n) {
    const shortenedText = text.substring(0, n).concat("...");
    return shortenedText;
  }
  return text;
};

export const dateIN = (date) => {
  const mongodbDate = new Date(date);
  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Asia/Kolkata",
  };

  return mongodbDate.toLocaleDateString("en-IN", options);
};

export const offerPrice = (price, discount) => {
  if (discount) {
    return price - (price * discount) / 100;
  }
  return price;
};

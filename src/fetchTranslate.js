export async function translate(source, target, text) {
  const response = await fetch(
    `https://translation.googleapis.com/language/translate/v2?key=AIzaSyD11ylXgBEAvMeaSYU1DFULsFZJmiRU1Dc&source=${source}&target=${target}` +
      "&q=" +
      encodeURI(text)
  );

  return response.json();
}

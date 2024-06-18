export default async function fetchInitialBooks() {

  const urls = [
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended",
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected",
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested",
  ];

  const responses = await Promise.all(urls.map((url) => fetch(url)));
  const data = await Promise.all(responses.map((res) => res.json()));

  return {
    recommended: data[0],
    selected: data[1],
    suggested: data[2],
  };
}
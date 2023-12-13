import axios from "axios";
import * as cheerio from "cheerio";

// Removed to avoid copyright issues

export async function bookScraper(url: string) {
  const axiosInstance = axios.create();

  interface bookData {
    title: string;
    author: string;
    bookLink: string;
    image: string | null;
    description: string | null;
  }

  const books: Array<bookData> = [];
  const descriptionLinks: Array<string> = [];

  await axiosInstance
    .get(url)
    .then(async (response) => {
      const html = response.data;
      const $ = cheerio.load(html);
      const booksTableRows = $(".tableList > tbody > tr");

      for (let i = 0; i < 10; i++) {
        const elm = booksTableRows[i];

        const title: string = $(elm)
          .find(".bookTitle > span")
          .text()
          .split(" (")[0];
        const author: string = $(elm).find(".authorName > span").text();
        const bookLink: string =
          "copyright issues :(" + $(elm).find(".bookTitle").attr("href");

        descriptionLinks.push(bookLink);

        books.push({
          title,
          author,
          bookLink: bookLink,
          image: null,
          description: null,
        });
      }
    })
    .catch(console.error);

  await axios
    .all(
      descriptionLinks.map((url) =>
        axios.get(url).then((response) => {
          const html = response.data;
          const $ = cheerio.load(html);
          const title = $(".BookPageTitleSection__title > h1").text();
          const imageUrl = $(".BookCover__image > div > img").attr("src");
          const description = $(
            `
            .BookPageMetadataSection__description >
            .TruncatedContent > 
            .TruncatedContent__text >
            .DetailsLayoutRightParagraph >
            .DetailsLayoutRightParagraph__widthConstrained >
            span
           `
          ).text();
          // .replace(/(\.[^' '?!\"\'])/gm, ". ");

          const bookInd = books.findIndex((book) => book.title === title);
          if (books[bookInd]) {
            books[bookInd].image = imageUrl;
            books[bookInd].description = description;
          }
        })
      )
    )
    .then(async (response) => {});
  console.log(books);
  return books;
}

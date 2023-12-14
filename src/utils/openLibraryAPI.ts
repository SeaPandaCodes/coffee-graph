import { RESTDataSource } from "@apollo/datasource-rest";

export class LibraryAPI extends RESTDataSource {
  override baseURL?: string = "https://openlibrary.org/";

  async getBooksBySubject(subject: string) {
    return this.get(`subjects/${encodeURIComponent(subject)}.json`);
  }
}

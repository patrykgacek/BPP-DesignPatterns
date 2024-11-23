export class ExternalDataService {
  private jsonData: string = ''
  private csvData: string = ''
  private xmlData: string = ''

  constructor() {
    this.jsonData = `[{"title": "JBook_1", "author": "JSON"}, {"title": "JBook_2", "author": "JSON"}]`
    this.csvData = `title,author\nCBook_1,CSV\nCBook_2,CSV`
    this.xmlData = `<books><book><title>XBook_1</title><author>XML</author></book><book><title>XBook_2</title><author>XML</author></book></books>`
  }

  fetchJsonData(): string {
    return this.jsonData
  }

  fetchCsvData(): string {
    return this.csvData
  }

  fetchXmlData(): string {
    return this.xmlData
  }
}

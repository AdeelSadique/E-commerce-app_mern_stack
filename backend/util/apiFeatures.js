class ApiFeatures {
  constructor(query, searchString) {
    this.query = query;
    this.searchString = searchString;
  }

  search() {
    const search = this.searchString.search
      ? {
          name: {
            $regex: this.searchString.search,
            $options: 'i',
          },
        }
      : {};

    this.query = this.query.find({ ...search });
    return this;
  }
  filter() {
    const searchStringCopy = { ...this.searchString };
    const removeFields = ['search', 'page', 'limit'];
    removeFields.forEach((key) => delete searchStringCopy[key]);
    let queryString = JSON.stringify(searchStringCopy);
    queryString = queryString.replace(/\b(gt|gte|lt|lte)/g, (key) => `$${key}`);
    // console.log(queryString);
    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  pagination(productsPerPage) {
    const currentPage = Number(this.searchString.page) || 1;
    const skip = productsPerPage * (currentPage - 1);

    this.query = this.query.limit(productsPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;

class ApiFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  search() {
    const searchParams = new URLSearchParams(this.queryString);
    const searchParamsObj = {};
    for (const [key, value] of searchParams.entries()) {
      searchParamsObj[key] = value;
    }
    console.log(searchParamsObj);
    const keyword = searchParamsObj.keyword
      ? {
          name: {
            $regex: searchParamsObj.keyword,
            $options: "i",
          },
        }
      : {};

    console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const searchParams = new URLSearchParams({ ...this.queryString });
    const searchParamsObj = {};
    for (const [key, value] of searchParams.entries()) {
      searchParamsObj[key] = value;
    }

    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((key) => delete searchParamsObj[key]);

    if (searchParamsObj.minPrice || searchParamsObj.maxPrice) {
      const priceFilter = {};

      if (searchParamsObj.minPrice) {
        priceFilter.$gte = parseFloat(searchParamsObj.minPrice);
      }

      if (searchParamsObj.maxPrice) {
        priceFilter.$lte = parseFloat(searchParamsObj.maxPrice);
      }

      searchParamsObj.price = priceFilter;
      delete searchParamsObj.minPrice;
      delete searchParamsObj.maxPrice;
    }

    if (searchParamsObj.ratings) {
      const ratingsFilter = parseFloat(searchParamsObj.ratings);
      const mongoRatingsFilter = { $gte: ratingsFilter };

      const mongoQuery = { ratings: mongoRatingsFilter };

      searchParamsObj.$and = [mongoQuery];
      delete searchParamsObj.ratings;
    }

    console.log(searchParamsObj);

    this.query = this.query.find({ ...searchParamsObj });

    return this;
  }

  pagination(resultPerPage) {
    const searchParams = new URLSearchParams(this.queryString);
    const searchParamsObj = {};
    for (const [key, value] of searchParams.entries()) {
      searchParamsObj[key] = value;
    }
    const currentPage = Number(searchParamsObj.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

export default ApiFeatures;

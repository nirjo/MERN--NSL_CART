class APIFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        let keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i'
            }
        } : {};
        this.query.find({ ...keyword });
        return this;
    }

    filter() {
        // Create a copy of queryStr
        const queryStrCopy = { ...this.queryStr };

        // Remove fields from query
        const removeFields = ['keyword', 'limit', 'page'];
        removeFields.forEach(field => delete queryStrCopy[field]);

        // Convert queryStrCopy to string
        let queryStr = JSON.stringify(queryStrCopy);
        // Replace comparison operators
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        // Parse the string back to object
        const filterObj = JSON.parse(queryStr);

        // Apply filters to the query
        this.query.find(filterObj);

        return this;
    }

    paginate(resPerPage){
        const currentPage = Number( this.queryStr.page) || 1;
        const skip = resPerPage * (currentPage - 1) 
        this.query.limit(resPerPage).skip(skip);
        return this;
        }
}

module.exports = APIFeatures;
const db = require('../../utils/database');

class GetCategories {
    static  getcategories() {
        return db.execute(`
            SELECT 
                category_id,name
            FROM 
                category
        `);
       
    }
}

exports.getcategories = async (req, res, next) => {
    try {
        const categories = await GetCategories.getcategories(); // Use the class method correctly
        res.status(200).json(categories[0]);
    } catch (error) {
        next(error);
    }
}





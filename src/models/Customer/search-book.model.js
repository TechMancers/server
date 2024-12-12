const db = require("../../utils/database");

exports.searchBooks = async (searchTerm, selectedCategories) => {
  let categoryFilter = "";
  if (selectedCategories && selectedCategories.length > 0) {
    categoryFilter = `AND b.category_id IN (${selectedCategories.join(",")})`;
  }

  try {
    const [rows] = await db.execute(
      `
      SELECT
        b.book_id,
        b.name AS book_name,
        b.author AS author_name,
        b.price AS book_price,
        b.description AS book_description,
        b.cover_image AS cover_image,
        b.stock AS book_stock,
        c.name AS category_name,
        b.category_id
      FROM
        book b
      LEFT JOIN
        category c ON b.category_id = c.category_id
      WHERE
        b.name LIKE ? OR
        b.author LIKE ? OR
        c.name LIKE ?
        ${categoryFilter}
      GROUP BY
        b.book_id;
      `,
      [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`]
    );

    return rows;
  } catch (error) {
    console.error("Error searching books:", error);
    throw new Error("Error searching books");
  }
};

exports.getCategories = async () => {
  try {
    const [rows] = await db.execute(`
      SELECT category_id, name
      FROM category;
    `);
    return rows;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Error fetching categories");
  }
};

exports.getBooksByCategoryId = async (categoryId) => {
  try {
    const [rows] = await db.execute(
      `
      SELECT
        b.book_id,
        b.name AS book_name,
        b.author AS author_name,
        b.price AS book_price,
        b.description AS book_description,
        b.stock AS book_stock,
        c.name AS category_name,
        b.category_id
      FROM
        book b
      LEFT JOIN
        category c ON b.category_id = c.category_id
      WHERE
        b.category_id = ?
      GROUP BY
        b.book_id;
      `,
      [categoryId]
    );

    return rows;
  } catch (error) {
    console.error("Error fetching books by category:", error);
    throw new Error("Error fetching books by category");
  }
};

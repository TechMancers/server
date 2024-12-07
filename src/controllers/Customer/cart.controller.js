const Cart = require('../../models/Customer/cart.model');

exports.addItem = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;
    await Cart.addItem(userId, bookId);
    res.status(200).json({ message: 'Item added to cart' });
  } catch (error) {
    next(error);
  }
};

exports.removeItem = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;
    await Cart.removeItem(userId, bookId);
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    next(error);
  }
};

exports.getCartItems = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const [items] = await Cart.getCartItems(userId);
    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

exports.incrementQuantity = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;
    await Cart.incrementQuantity(userId, bookId);
    res.status(200).json({ message: 'Item quantity incremented' });
  } catch (error) {
    next(error);
  }
};

exports.decrementQuantity = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;
    await Cart.decrementQuantity(userId, bookId);
    res.status(200).json({ message: 'Item quantity decremented' });
  } catch (error) {
    next(error);
  }
};

exports.clearCart = async (req, res, next) => {
  try {
    const { userId } = req.body;
    await Cart.clearCart(userId);
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    next(error);
  }
};

exports.likeArtwork = async (req, res, next) => {
  try {
    const { userId, artworkId } = req.body;
    await Cart.likeArtwork(userId, bookId);
    const totalLikes = await Cart.getTotalLikes(bookId);
    res.status(200).json({ message: 'Artwork like status updated', total_likes: totalLikes });
  } catch (error) {
    next(error);
  }
};

exports.getLikedStatus = async (req, res, next) => {
  try {
    const { userId, bookId } = req.body;
    const liked = await Cart.getLikedStatus(userId, bookId);
    res.status(200).json({ liked });
  } catch (error) {
    next(error);
  }
};

exports.getTotalLikes = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const totalLikes = await Cart.getTotalLikes(bookId);
    res.status(200).json({ total_likes: totalLikes });
  } catch (error) {
    next(error);
  }
};

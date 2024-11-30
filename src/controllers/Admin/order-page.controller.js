import PurchaseHistoryModel from '../models/order-page.model';

class OrderController {
  // Method to get all purchase histories
  static async getAllPurchases(req, res) {
    try {
      const purchases = await PurchaseHistoryModel.getAllPurchases();
      res.status(200).json(purchases);
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve purchase history' });
    }
  }

  // Method to get a single purchase by ID
  static async getPurchaseById(req, res) {
    const { purchaseId } = req.params;
    try {
      const purchase = await PurchaseHistoryModel.getPurchaseById(purchaseId);
      if (purchase) {
        res.status(200).json(purchase);
      } else {
        res.status(404).json({ error: 'Purchase not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve purchase' });
    }
  }

  // Method to create a new purchase
  static async createPurchase(req, res) {
    const purchaseData = req.body;
    try {
      const purchaseId = await PurchaseHistoryModel.createPurchase(purchaseData);
      res.status(201).json({ message: 'Purchase created successfully', purchaseId });
    } catch (error) {
      res.status(500).json({ error: 'Failed to create purchase' });
    }
  }

  // Method to update an existing purchase record
  static async updatePurchase(req, res) {
    const { purchaseId } = req.params;
    const purchaseData = req.body;
    try {
      const updatedRows = await PurchaseHistoryModel.updatePurchase(purchaseId, purchaseData);
      if (updatedRows > 0) {
        res.status(200).json({ message: 'Purchase updated successfully' });
      } else {
        res.status(404).json({ error: 'Purchase not found or no changes made' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to update purchase' });
    }
  }

  // Method to delete a purchase record
  static async deletePurchase(req, res) {
    const { purchaseId } = req.params;
    try {
      const deletedRows = await PurchaseHistoryModel.deletePurchase(purchaseId);
      if (deletedRows > 0) {
        res.status(200).json({ message: 'Purchase deleted successfully' });
      } else {
        res.status(404).json({ error: 'Purchase not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete purchase' });
    }
  }
}

export default OrderController;

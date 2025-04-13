import apiClient from './client';

/**
 * Create a new order
 * @param {Object} orderData - Order data
 * @returns {Promise} - Created order
 */
export const createOrder = async (orderData) => {
  try {
    const response = await apiClient.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error(error.response?.data?.message || 'Failed to create order');
  }
};

/**
 * Get order by ID
 * @param {string} id - Order ID
 * @returns {Promise} - Order data
 */
export const getOrderById = async (id) => {
  try {
    const response = await apiClient.get(`/orders/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw new Error(error.response?.data?.message || 'Order not found');
  }
};

/**
 * Update order to paid status
 * @param {string} id - Order ID
 * @param {Object} paymentResult - Payment data
 * @returns {Promise} - Updated order
 */
export const updateOrderToPaid = async (id, paymentResult) => {
  try {
    const response = await apiClient.put(`/orders/${id}/pay`, paymentResult);
    return response.data;
  } catch (error) {
    console.error('Error updating order payment:', error);
    throw new Error(error.response?.data?.message || 'Failed to update payment status');
  }
};

/**
 * Get user's orders
 * @returns {Promise} - User's orders
 */
export const getUserOrders = async () => {
  try {
    const response = await apiClient.get('/orders/myorders');
    return response.data;
  } catch (error) {
    console.error('Error fetching my orders:', error);
    throw new Error(error.response?.data?.message || 'Failed to fetch your orders');
  }
};

/**
 * Cancel an order
 * @param {string} id - Order ID
 * @returns {Promise} - Canceled order confirmation
 */
export const cancelOrder = async (id) => {
  try {
    const response = await apiClient.put(`/orders/${id}/cancel`);
    return response.data;
  } catch (error) {
    console.error('Error canceling order:', error);
    throw new Error(error.response?.data?.message || 'Failed to cancel order');
  }
};

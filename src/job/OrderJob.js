import {
  updateDoc,
  query,
  getDocs,
  collectionGroup,
} from "firebase/firestore";
import { db } from "../firebase/firebase";

const OrderUpdate = {
  updateToProcessing: async () => {
    try {
      const ordersQuery = query(collectionGroup(db, "orders"));
      const querySnapshot = await getDocs(ordersQuery);

      const updatePromises = [];
      querySnapshot.forEach(async (doc) => {
        if (doc.exists()) {
          const orderData = doc.data();
          const userId = doc.ref.path.split("/")[1]; // Extract userId from path (e.g., order/{userId}/orders/{orderId})
          const orderId = doc.id;

          // Ensure orderData has userId and id for consistency
          const updatedOrderData = { ...orderData, userId, id: orderId };

          if (orderData.status === "Order Placed") {
            const orderRef = doc(
              db,
              "order",
              updatedOrderData.userId,
              "orders",
              String(orderData.orderId)
            );

            await updateDoc(orderRef, {
              status: "Order Processing",
              updateDate: new Date().toISOString(),
              statusTimestamps: {
                ...(orderData.statusTimestamps || {}),
                "Order Processing": new Date().toISOString(),
              },
            });
          }
        }
      });

      // Wait for all updates to complete
      await Promise.all(updatePromises);
    } catch (error) {
      console.error(
        `Error updating order to Processing:`,
        error.message
      );
    
    }
  },

  updateToShipped: async () => {
     try {
      const ordersQuery = query(collectionGroup(db, "orders"));
      const querySnapshot = await getDocs(ordersQuery);

      const updatePromises = [];
      querySnapshot.forEach(async (doc) => {
        if (doc.exists()) {
          const orderData = doc.data();
          const userId = doc.ref.path.split("/")[1]; // Extract userId from path (e.g., order/{userId}/orders/{orderId})
          const orderId = doc.id;

          // Ensure orderData has userId and id for consistency
          const updatedOrderData = { ...orderData, userId, id: orderId };

          if (orderData.status === "Order Processing") {
            const orderRef = doc(
              db,
              "order",
              updatedOrderData.userId,
              "orders",
              String(orderData.orderId)
            );

            await updateDoc(orderRef, {
              status: "Order Shipped",
              updateDate: new Date().toISOString(),
              statusTimestamps: {
                ...(orderData.statusTimestamps || {}),
                "Order Shipped": new Date().toISOString(),
              },
            });
          }
        }
      });

      // Wait for all updates to complete
      await Promise.all(updatePromises);
    } catch (error) {
      console.error(
        `Error updating order to Processing:`,
        error.message
      );
    
    }
  },

  updateToDelivered: async () => {
     try {
      const ordersQuery = query(collectionGroup(db, "orders"));
      const querySnapshot = await getDocs(ordersQuery);

      const updatePromises = [];
      querySnapshot.forEach(async (doc) => {
        if (doc.exists()) {
          const orderData = doc.data();
          const userId = doc.ref.path.split("/")[1]; // Extract userId from path (e.g., order/{userId}/orders/{orderId})
          const orderId = doc.id;

          // Ensure orderData has userId and id for consistency
          const updatedOrderData = { ...orderData, userId, id: orderId };

          if (orderData.status === "Order Shipped") {
            const orderRef = doc(
              db,
              "order",
              updatedOrderData.userId,
              "orders",
              String(orderData.orderId)
            );

            await updateDoc(orderRef, {
              status: "Order Delivered",
              updateDate: new Date().toISOString(),
              statusTimestamps: {
                ...(orderData.statusTimestamps || {}),
                "Order Delivered": new Date().toISOString(),
              },
            });
          }
        }
      });

      // Wait for all updates to complete
      await Promise.all(updatePromises);
    } catch (error) {
      console.error(
        `Error updating order to Processing:`,
        error.message
      );
    
    }
},
};

export default OrderUpdate;

// OrderUpdate.js
import {
  updateDoc,
  query,
  getDocs,
  collectionGroup,
  doc,
  serverTimestamp,        // optional – for updateDate
} from "firebase/firestore";
import { db } from "../firebase/firebase";

/* -------------------------------------------------------------
   Helper: true if at least `hours` have passed since `timestamp`
   ------------------------------------------------------------- */
const hasTimeElapsed = (timestamp, hours) => {
  if (!timestamp) return false;
  const diffMs = Date.now() - new Date(timestamp).getTime();
  return diffMs >= hours * 60 * 60 * 1000;
};

/* -------------------------------------------------------------
   Core update functions
   ------------------------------------------------------------- */
const OrderUpdate = {
  /** Order Placed → Order Processing (after 3 h) */
  updateToProcessing: async () => {
    const promises = [];
    try {
      // 1. collectionGroup only needs the sub-collection name
      const q = query(collectionGroup(db, "orders"));
      const snap = await getDocs(q);

      snap.forEach((d) => {
        if (!d.exists()) return;
        const data = d.data();
        const ts = data.statusTimestamps || {};

        if (
          data.status === "Order Placed" &&
          hasTimeElapsed(ts["Order Placed"], 3)   // ← 3-hour check
        ) {
          // 2. Correct path: orders/{userId}/orders/{orderId}
          const [, userId] = d.ref.path.split("/"); // index 0 = "orders", 1 = userId
          const orderRef = doc(db, "orders", userId, "orders", String(data.orderId));

          promises.push(
            updateDoc(orderRef, {
              status: "Order Processing",
              updateDate: serverTimestamp(),               // or new Date().toISOString()
              statusTimestamps: {
                ...ts,
                "Order Processing": new Date().toISOString(),
              },
            }).catch((e) =>
              console.error(`Failed Processing ${data.orderId}:`, e)
            )
          );
        }
      });

      await Promise.all(promises);
      console.log(`updateToProcessing: ${promises.length} orders updated`);
    } catch (e) {
      console.error("updateToProcessing error:", e);
    }
  },

  /** Order Processing → Order Shipped (after 5 h) */
  updateToShipped: async () => {
    const promises = [];
    try {
      const q = query(collectionGroup(db, "orders"));
      const snap = await getDocs(q);

      snap.forEach((d) => {
        if (!d.exists()) return;
        const data = d.data();
        const ts = data.statusTimestamps || {};

        if (
          data.status === "Order Processing" &&
          hasTimeElapsed(ts["Order Processing"], 5)
        ) {
          const [, userId] = d.ref.path.split("/");
          const orderRef = doc(db, "orders", userId, "orders", String(data.orderId));

          promises.push(
            updateDoc(orderRef, {
              status: "Order Shipped",
              updateDate: serverTimestamp(),
              statusTimestamps: {
                ...ts,
                "Order Shipped": new Date().toISOString(),
              },
            }).catch((e) =>
              console.error(`Failed Shipped ${data.orderId}:`, e)
            )
          );
        }
      });

      await Promise.all(promises);
      console.log(`updateToShipped: ${promises.length} orders updated`);
    } catch (e) {
      console.error("updateToShipped error:", e);
    }
  },

  /** Order Shipped → Order Delivered (after 7 h) */
  updateToDelivered: async () => {
    const promises = [];
    try {
      const q = query(collectionGroup(db, "orders"));
      const snap = await getDocs(q);

      snap.forEach((d) => {
        if (!d.exists()) return;
        const data = d.data();
        const ts = data.statusTimestamps || {};

        if (
          data.status === "Order Shipped" &&
          hasTimeElapsed(ts["Order Shipped"], 7)
        ) {
          const [, userId] = d.ref.path.split("/");
          const orderRef = doc(db, "orders", userId, "orders", String(data.orderId));

          promises.push(
            updateDoc(orderRef, {
              status: "Order Delivered",
              updateDate: serverTimestamp(),
              statusTimestamps: {
                ...ts,
                "Order Delivered": new Date().toISOString(),
              },
            }).catch((e) =>
              console.error(`Failed Delivered ${data.orderId}:`, e)
            )
          );
        }
      });

      await Promise.all(promises);
      console.log(`updateToDelivered: ${promises.length} orders updated`);
    } catch (e) {
      console.error("updateToDelivered error:", e);
    }
  },
};

export default OrderUpdate;
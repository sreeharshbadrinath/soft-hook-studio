import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
} from 'firebase/firestore';
import { db } from './config';
import { handleFirestoreError, OperationType } from './errors';
import { Product } from '../types';

export interface FirestoreOrder {
  orderId: string;
  userId: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  shippingCity: string;
  shippingState: string;
  shippingZip: string;
  totalAmount: number;
  itemCount: number;
  status: 'pending_crafting' | 'in_artisan_production' | 'shipped' | 'delivered';
  createdAt: string;
}

export interface FirestoreFavorite {
  productId: string;
  userId: string;
  productName: string;
  price: number;
  primaryImage: string;
  savedAt: string;
}

export interface FirestoreCommission {
  commissionId: string;
  userId: string;
  itemType: string;
  yarnType: string;
  palette: string;
  notes: string;
  contactEmail: string;
  estimatedHours: number;
  estimatedPrice: number;
  status: 'inquiry_received' | 'quote_confirmed' | 'yarn_prepped' | 'hooking_in_progress' | 'completed';
  createdAt: string;
}

export interface FirestoreReview {
  reviewId: string;
  authorId?: string;
  authorName: string;
  productId?: string;
  rating: number;
  comment: string;
  verified: string;
  createdAt: string;
}

// -------------------------------------------------------------
// Orders
// -------------------------------------------------------------
export async function createOrderInFirestore(userId: string, order: FirestoreOrder): Promise<void> {
  const path = `users/${userId}/orders/${order.orderId}`;
  try {
    await setDoc(doc(db, 'users', userId, 'orders', order.orderId), order);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeUserOrders(
  userId: string,
  onUpdate: (orders: FirestoreOrder[]) => void
): () => void {
  const path = `users/${userId}/orders`;
  const ordersRef = collection(db, 'users', userId, 'orders');
  const q = query(ordersRef);

  return onSnapshot(
    q,
    (snapshot) => {
      const items: FirestoreOrder[] = [];
      snapshot.forEach((docSnap) => {
        items.push(docSnap.data() as FirestoreOrder);
      });
      onUpdate(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// -------------------------------------------------------------
// Favorites / Wishlist
// -------------------------------------------------------------
export async function toggleFavoriteInFirestore(
  userId: string,
  product: Product,
  isCurrentlyFavorited: boolean
): Promise<void> {
  const path = `users/${userId}/favorites/${product.id}`;
  try {
    const favRef = doc(db, 'users', userId, 'favorites', product.id);
    if (isCurrentlyFavorited) {
      await deleteDoc(favRef);
    } else {
      const favoriteData: FirestoreFavorite = {
        productId: product.id,
        userId,
        productName: product.name,
        price: product.price,
        primaryImage: product.primaryImage,
        savedAt: new Date().toISOString(),
      };
      await setDoc(favRef, favoriteData);
    }
  } catch (error) {
    handleFirestoreError(
      error,
      isCurrentlyFavorited ? OperationType.DELETE : OperationType.CREATE,
      path
    );
  }
}

export function subscribeUserFavorites(
  userId: string,
  onUpdate: (favoriteIds: string[]) => void
): () => void {
  const path = `users/${userId}/favorites`;
  const favsRef = collection(db, 'users', userId, 'favorites');
  const q = query(favsRef);

  return onSnapshot(
    q,
    (snapshot) => {
      const ids: string[] = [];
      snapshot.forEach((docSnap) => {
        ids.push(docSnap.id);
      });
      onUpdate(ids);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// -------------------------------------------------------------
// Custom Commissions
// -------------------------------------------------------------
export async function createCommissionInFirestore(
  userId: string,
  commission: FirestoreCommission
): Promise<void> {
  const path = `users/${userId}/commissions/${commission.commissionId}`;
  try {
    await setDoc(doc(db, 'users', userId, 'commissions', commission.commissionId), commission);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeUserCommissions(
  userId: string,
  onUpdate: (commissions: FirestoreCommission[]) => void
): () => void {
  const path = `users/${userId}/commissions`;
  const commsRef = collection(db, 'users', userId, 'commissions');
  const q = query(commsRef);

  return onSnapshot(
    q,
    (snapshot) => {
      const items: FirestoreCommission[] = [];
      snapshot.forEach((docSnap) => {
        items.push(docSnap.data() as FirestoreCommission);
      });
      onUpdate(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

// -------------------------------------------------------------
// Reviews
// -------------------------------------------------------------
export async function createReviewInFirestore(review: FirestoreReview): Promise<void> {
  const path = `reviews/${review.reviewId}`;
  try {
    await setDoc(doc(db, 'reviews', review.reviewId), review);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
}

export function subscribeReviews(onUpdate: (reviews: FirestoreReview[]) => void): () => void {
  const path = 'reviews';
  const reviewsRef = collection(db, 'reviews');
  const q = query(reviewsRef);

  return onSnapshot(
    q,
    (snapshot) => {
      const items: FirestoreReview[] = [];
      snapshot.forEach((docSnap) => {
        items.push(docSnap.data() as FirestoreReview);
      });
      onUpdate(items);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

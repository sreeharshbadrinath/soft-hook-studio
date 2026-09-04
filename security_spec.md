# Security Specification & Threat Model

## 1. Data Invariants
1. **User Isolation**: No user can read, list, update, or delete another user's profile, orders, favorites, or commission inquiries.
2. **Identity Integrity**: `userId` in any incoming payload under `/users/{userId}/*` must strictly match `request.auth.uid`.
3. **Immutability of Key Fields**:
   - `orderId`, `userId`, `createdAt`, and `totalAmount` in orders cannot be modified after creation.
   - `commissionId`, `userId`, and `createdAt` cannot be modified after creation.
   - `authorId` on reviews must match `request.auth.uid`.
4. **Relational Sync**: User subcollections (`orders`, `favorites`, `commissions`) require ownership of the parent `/users/{userId}` document.
5. **Denial of Wallet Guard**:
   - Strings are bounded by length (`maxLength` checks).
   - Document IDs are sanitized via `isValidId()`.
   - Operations follow `request.auth != null` -> static validation -> relational verification.

## 2. The "Dirty Dozen" Threat Payloads (Must be rejected)

1. **Spoofed User Profile Write**: Attacker submits a profile with someone else's UID (`userId: "victim123"` while authenticated as `attacker456`).
2. **Admin Escalation in Profile**: Attacker injects `"role": "admin"` or `"isAdmin": true` in their user profile document.
3. **Order Interception (List Snooping)**: Attacker attempts to list all orders across users without filtering by their own `userId`.
4. **Cross-User Order Injection**: Attacker attempts to create an order inside `/users/victimUid/orders/order123`.
5. **Order Price Tampering (Update Gap)**: Attacker attempts to update an existing order's `totalAmount` from $185 to $1.00.
6. **Order Terminal Status Hijacking**: Attacker attempts to change order status once delivered or bypass the defined status state machine.
7. **Giant String Injection (Denial of Wallet)**: Attacker attempts to send a 2MB string in the commission `notes` field (limit is 2000 characters).
8. **Malicious Document ID (ID Poisoning)**: Attacker uses a 5KB path ID with special regex chars to exploit document traversal.
9. **Fake Review Injection**: Unauthenticated user or user spoofing someone else's UID attempts to write to `/reviews/{reviewId}` with an arbitrary authorId.
10. **Favorite Tampering**: Attacker attempts to delete or read another user's saved favorites under `/users/{victimId}/favorites/{prodId}`.
11. **Commission Price Forgery**: Attacker attempts to update `estimatedPrice` or mutate `userId` on an existing custom commission inquiry.
12. **Ghost Field Injection (Shadow Update)**: Attacker attempts to inject unexpected keys (e.g., `verifiedDiscount: true`, `creditBalance: 5000`) on update.

## 3. Test Runner
Verification is confirmed via Firestore rules evaluation, strict typing, schema alignment with `firebase-blueprint.json`, and static analysis.

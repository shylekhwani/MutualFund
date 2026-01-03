# Mutual Fund Backend (Node.js + Express + MongoDB)

This project is a **backend-only mutual fund management system** built using **Node.js, Express, and MongoDB (Mongoose)**. It simulates how real-world fintech platforms (like Groww / Zerodha) handle **users, mutual funds, investments, redemptions, transactions, and portfolio calculation**.

The focus of this project is **backend architecture, data modeling, validation, and financial flow correctness**, not UI or real payment integrations.

---

## 🚀 Features Implemented

### 1️⃣ User Module

- User registration with hashed password (bcrypt)
- Default wallet balance on signup
- Role-based users: `USER` and `ADMIN`
- User balance management

**Key concepts:**

- Password hashing
- Pre-save hooks
- Role-based access

---

### 2️⃣ Mutual Fund Module

- Admin-only fund creation
- Fund attributes:

  - Name
  - Category
  - Risk level
  - NAV (Net Asset Value)
  - Minimum investment
  - Active / Inactive status

**Notes:**

- NAV is updated by ADMIN
- Risk is a property of the fund, not user-defined

---

### 3️⃣ Investment (BUY) Module

Represents **buying a mutual fund**.

**Flow:**

1. User selects fund
2. User enters amount
3. Backend validates:

   - User exists
   - Fund exists & is active
   - Amount ≥ minimum investment
   - User balance ≥ amount

4. NAV fetched dynamically
5. Units calculated
6. User balance deducted
7. Investment saved
8. Transaction recorded

**Important Design Decision:**

- Investment is a **snapshot at buy time**
- NAV at buy is stored
- Investments are never recalculated

---

### 4️⃣ Redemption (SELL) Module

Represents **selling units from an investment**.

**Flow:**

1. User selects investment
2. User enters units to sell
3. Backend validates:

   - User owns the investment
   - Units available
   - Fund is active

4. Redeem amount calculated using **current NAV**
5. Units deducted from investment
6. User balance credited
7. Redemption record saved
8. Transaction recorded

**Key Concept:**

- Partial redemptions supported
- Investment units decrease, but buy snapshot remains intact

---

### 5️⃣ Transactions Module (Ledger)

Every financial action creates a transaction.

**Transaction types:**

- BUY
- SELL

**Stored data:**

- User
- Fund
- Type (BUY / SELL)
- Amount
- Units
- NAV
- Timestamp

**Why transactions matter:**

- Complete history
- Auditing
- Debugging mismatches
- Financial traceability

Transactions act as a **financial ledger**.

---

### 6️⃣ Portfolio Module (Derived Data)

Portfolio is **not stored** in the database.

It is **computed dynamically** using:

- Investments (remaining units)
- Latest fund NAV

**For each fund, portfolio shows:**

- Units owned
- Total invested amount
- Current NAV
- Current value
- Profit / Loss

**Important:**

- Portfolio reflects current holdings only
- Redeemed units are excluded automatically

---

### 7️⃣ Relationships & Data Modeling

- One User → Many Investments
- One User → Many Redemptions
- One User → Many Transactions
- One Fund → Many Investments

Used **Mongoose Virtuals** to populate:

- User → Investments
- User → Redemptions

This keeps schemas clean and avoids duplication.

---

## 🧠 Key Design Principles Used

- Separation of concerns:

  - Controller → Service → Repository

- Financial operations are validated strictly
- Snapshot vs derived data separation
- No blind writes
- Explicit payload creation (no unsafe spreading)

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcrypt

---

## 📌 What This Project Is NOT

- No real payment gateway
- No real bank integration
- No frontend
- No tax or compliance logic

This is an **educational + portfolio-grade backend project**.

---

## 🌱 Possible Future Enhancements

- SIP (Systematic Investment Plan)
- MongoDB transactions (sessions)
- NAV history tracking
- Exit load & lock-in rules
- XIRR calculation
- Swagger API documentation
- Automated tests

---

## ✅ Why This Project Matters

This project demonstrates:

- Real-world fintech backend thinking
- Correct financial modeling
- Scalable architecture
- Interview-ready explanations

---

**Author:** Backend Mutual Fund System (Node.js)

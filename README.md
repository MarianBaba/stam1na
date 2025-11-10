# Stam1na 🚀

**An Automation Suite for [AutomationExercise.com](https://www.automationexercise.com)**

Stam1na is a robust and scalable automation testing suite built to interact with and validate the functionalities of AutomationExercise.com, a sample e-commerce web application. It leverages modern automation frameworks and tools to provide end-to-end UI and functional testing, making it ideal for QA engineers, learners, and automation enthusiasts.

[] make auth work on every browser
[] check for signup success after doing all the steps

---

## ✨ Features

- 🔍 **Test Coverage**: Comprehensive test coverage of user journeys including registration, login, product browsing, cart operations, checkout, and more.
- ⚙️ **Automation Framework**: Modular, maintainable, and scalable code structure.
- 🧪 **Test Reporting**: Integrated test reporting with screenshots, logs, and detailed results.
- 🔁 **CI/CD Integration Ready**: Easily pluggable into Jenkins, GitHub Actions, GitLab CI, etc.
- 🧰 **Cross-browser Support**: Easily configurable to run on Chrome, Firefox, Edge, and headless modes.
- ⏱️ **Parallel Execution**: Faster test runs via parallel execution.

---

## 🧱 Tech Stack

| Component            | Technology                                                  |
| -------------------- | ----------------------------------------------------------- |
| Programming Language | Python / JavaScript / Java _(based on your implementation)_ |
| Framework            | Selenium / Playwright / Cypress                             |
| Test Runner          | Pytest / Jest / JUnit                                       |
| Reporting            | Allure / HTML Reports / Mochawesome                         |
| CI/CD                | GitHub Actions, Jenkins (optional setup included)           |

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.8+** / Node.js (for JS-based frameworks) / Java 11+ (for Java-based)
- **pip** / **npm** / **Maven**
- Chrome or Firefox browser
- Git

### Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/stam1na.git
cd stam1na
```

---

# ✅ Automation Exercise — Test Case TODO List

## 📂 UI Test Cases

- [ ] **1. Register User**
- [ ] **2. Login User with correct email and password**
- [ ] **3. Login User with incorrect email and password**
- [ ] **4. Logout User**
- [ ] **5. Register User with existing email**
- [ ] **6. Contact Us Form**
- [ ] **7. Verify Test Cases Page**
- [ ] **8. Verify All Products and product detail page**
- [ ] **9. Search Product**
- [ ] **10. Verify Subscription in Home Page**
- [ ] **11. Verify Subscription in Cart Page**
- [ ] **12. Add Products in Cart**
- [ ] **13. Verify Product Quantity in Cart**
- [ ] **14. Place Order: Register while Checkout**
- [ ] **15. Place Order: Register before Checkout**
- [ ] **16. Place Order: Login before Checkout**
- [ ] **17. Remove Products From Cart**
- [ ] **18. View Category Products**
- [ ] **19. View & Cart Brand Products**
- [ ] **20. Search Products and Verify Cart After Login**
- [ ] **21. Add Review on Product**
- [ ] **22. Add to Cart from Recommended Items**
- [ ] **23. Verify Address Details in Checkout Page**
- [ ] **24. Download Invoice after Purchase Order**
- [ ] **25. Verify Scroll Up using ‘Arrow’ button and Scroll Down functionality**
- [ ] **26. Verify Scroll Up without ‘Arrow’ button and Scroll Down functionality**

## 🔧 API Test Cases

### 🛒 Products & Brands APIs

- [x] **API 1 — GET All Products List**
- [x] **API 2 — POST to `/api/productsList` (unsupported request)**
- [x] **API 3 — GET All Brands List**
- [x] **API 4 — PUT to `/api/brandsList` (unsupported request)**

### 🔍 Product Search APIs

- [ ] **API 5 — POST Search Product (valid request)**
- [ ] **API 6 — POST Search Product without required parameter (invalid request)**

### 🔐 Login & User Authentication APIs

- [ ] **API 7 — POST Verify Login with valid credentials**
- [ ] **API 8 — POST Verify Login without email parameter (invalid request)**
- [ ] **API 9 — DELETE Verify Login (unsupported request)**

### 👤 User Account APIs

- [ ] **API 10 — POST Create Account**
- [ ] **API 11 — DELETE User Account**

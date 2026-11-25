# BookVerse 📚

**A responsive online bookshop front end built with plain HTML, CSS and JavaScript. Browse the books, choose how many copies you want, then check out through a payment form that validates the card details before sending them to a card-check API.**

> 🎓 A university web development project. There is no real payment: checkout talks to the university's practice card-verification service, so only ever use test card numbers.

---

## Why BookVerse?

BookVerse shows the core of an online shop without any framework: a product page, a quantity picker, a checkout form with proper validation, and a confirmation page. Everything is hand-written in vanilla JavaScript, so each step is easy to follow.

- 🪶 **No frameworks and no build step.** Open the page in a browser and it works.
- ✅ **Careful form validation.** Every field is checked before anything is sent.
- 📱 **Responsive.** The layout works on mobile, tablet and desktop.

---

## How it works

```
 1. Browse              2. Checkout                    3. Confirmation
┌──────────────┐      ┌───────────────────────┐      ┌──────────────────────┐
│ index.html   │ ──▶  │ pay.html              │ ──▶  │ success.html         │
│ pick a book  │      │ validate card details │      │ "Your payment of £…  │
│ + quantity   │      │ POST to card-check API│      │  card ending 1234"   │
└──────────────┘      └───────────────────────┘      └──────────────────────┘
     localStorage: order details      sessionStorage: success message
```

1. **Browse.** The home page lists the books with their prices. Use **+** and **−** to choose how many copies you want, then press **Pay**.
2. **Checkout.** The order total is carried over to the payment page. The form checks:
   - **Name:** letters and spaces only
   - **Card number:** 16 digits, starting 51 to 55 (Mastercard)
   - **Expiry:** a two-digit month (01 to 12) and four-digit year that isn't in the past
   - **Security code:** 3 or 4 digits
3. **Card check.** If everything is valid, the details are sent as JSON to the module's practice card-verification API, and any error it returns is shown to you.
4. **Confirmation.** A success page shows the amount paid and the last four digits of the card.

---

## Features

| | Feature |
|---|---|
| 📖 | Book catalogue with prices |
| 🔢 | Quantity picker for each book |
| 💳 | Checkout form with name, card number, expiry and CVV validation |
| 🌐 | Card details checked by a remote API with clear error messages |
| 🧾 | Order total carried between pages with `localStorage` |
| 🎉 | Confirmation page with the amount and masked card number |
| 📱 | Responsive design |

---

## Tech stack

| Area | Technology |
|---|---|
| Markup | HTML5 |
| Styling | CSS3 (one stylesheet, responsive) |
| Logic | Vanilla JavaScript (Fetch API, Web Storage) |

### Project structure

```
code/
  root/     ← index.html (shop), pay.html (checkout), success.html (confirmation)
  js/       ← index.js, pay.js, success.js (one script per page)
  css/      ← bookverse.css
```

---

## Getting started

No installs needed: you only need a web browser.

```bash
git clone https://github.com/adss0/BookVerse.git
```

Then open **`code/root/index.html`** in your browser.

> The card-check step needs the university's practice API to be online. If it can't be reached, the checkout page shows an error instead of the confirmation page. Never enter a real card number.

---

## License

This project is licensed under the MIT License.

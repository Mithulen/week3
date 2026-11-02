# Feature: Prepare payment details

## 1. User goal
As a pet owner, I want to review the selected service and amount before payment.

## 2. Scope
Prepare details for reviewing the selected service and amount before payment.
This feature does not charge a payment method or process a payment.

Use the service catalogue in section 4 as the source of truth for names and prices.
Use the server catalogue price. Do not accept a client-supplied payment amount.

## 3. Request
GET /payments/prepare/:serviceId

## 4. Service catalogue
| ID | Service name | Price |
|---:|---|---:|
| 1 | Vaccination | 35 |
| 2 | Pet Grooming | 50 |
| 3 | Boarding | 80 |

## 5. Successful response
HTTP 200 with a top-level JSON object containing exactly these five properties
and no additional properties:
- `serviceId` (number)
- `serviceName` (string)
- `amount` (number)
- `currency` (string, exactly `"sgd"`)
- `status` (string, exactly `"READY_FOR_PAYMENT"`)

## 6. Unsuccessful response
Unknown service: HTTP 404 with the exact JSON object
`{"error":"Service not found"}`.

## 7. Acceptance criteria
- AC1: `GET /payments/prepare/1` returns HTTP 200 with `serviceId: 1`,
  `serviceName: "Vaccination"` and `amount: 35`.
- AC2: `GET /payments/prepare/2` returns HTTP 200 with `serviceId: 2`,
  `serviceName: "Pet Grooming"` and `amount: 50`.
- AC3: `GET /payments/prepare/3` returns HTTP 200 with `serviceId: 3`,
  `serviceName: "Boarding"` and `amount: 80`.
- AC4: `GET /payments/prepare/999` returns HTTP 404 with the exact error
  object above.
- AC5: Every successful response is a top-level JSON object with exactly
  the five properties and types specified in section 5, and uses the
  catalogue values, `"sgd"` and `"READY_FOR_PAYMENT"`.
- Access: No login is required for this classroom mock.
- Out of scope: charging money, gateway integration, transactions, new
  database tables, EJS pages or changes to existing features.

## 8. Open questions
What has not yet been agreed? Do not silently invent an answer.
- Does `amount: 35` mean 35 SGD in major currency units (SGD 35.00)?
- How should missing, non-numeric, zero, negative or otherwise malformed
  `serviceId` values be handled?
- Is the exact lowercase currency value `"sgd"` intentional?

# NTC Workers Panel

`NTC-Workers-Panel` is a web application developed for the workers at NTC workshop.  
Its purpose is to connect with the main backend system (`NTC-Dashboard`) so that staff can manage vehicle repair orders in real time.

The application allows workers to:

- View active repair orders assigned to them.
- Easily update the status of each repair (in reception, diagnosing, under repair, completed).
- Keep the customer’s progress updated, as each status change updates the information and triggers automatic follow-up emails.
- Notify the customer when their vehicle is ready for pickup.

The app is built with Vue 3 + Vite, uses **axios** to communicate with the backend via a REST API, and is deployed on a dedicated VPS.  
Access is protected by login, validating a unique integration user through **JWT** handled by the backend.

In summary, `NTC-Workers-Panel` is the operational interface that streamlines workshop tasks, speeds up internal updates, and keeps customers informed throughout the entire repair process.

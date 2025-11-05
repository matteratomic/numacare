## Numa Care Patient Portal

Numa Care is a patient-facing portal concept built with the Next.js App Router and Tailwind CSS. It is designed to complement the Explanation of Benefits (EOB) email that insured patients receive by giving them a single destination to:

- Review their EOB coverage breakdown and claim details.
- Complete copay or balance payments with a clear step-by-step flow.
- Schedule, reschedule, or confirm delivery, fitting, and demo appointments.
- Track device order status from approval through post-delivery follow up.
- Manage reminders and start secure conversations with their care team.

The interface is themed around the brand color `#0ea5e9` and showcases mock data, interactive cards, and responsive layouts for a modern insurance-to-patient experience.

## Tech Stack

- [Next.js](https://nextjs.org/) App Router (TypeScript)
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [lucide-react](https://lucide.dev/) for icons

## Running Locally

Install dependencies (already done if you used the project scaffolding step):

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to explore the portal.

## Project Structure Highlights

- `src/app/page.tsx` – renders the patient dashboard with payment, scheduling, reminders, and order tracking sections.
- `tailwind.config.ts` – extends Tailwind with the Numa Care color palette and typography.
- `src/app/globals.css` – global surface styles and reusable utility classes for cards and badges.

Feel free to adapt the mock data, connect real scheduling/payment APIs, or split the sections into dedicated routes as you continue prototyping.

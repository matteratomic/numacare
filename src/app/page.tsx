import Link from "next/link";
import {
  ArrowUpRight,
  CalendarCheck,
  CalendarDays,
  CheckCircle2,
  Clock,
  CreditCard,
  MessageCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";

type StepState = "complete" | "current" | "upcoming";

type Step = {
  title: string;
  description: string;
  state: StepState;
};

type OrderCheckpoint = {
  title: string;
  description: string;
  date: string;
  state: StepState;
};

type Reminder = {
  channel: "Email" | "SMS" | "Portal";
  message: string;
  schedule: string;
};

const paymentSteps: Step[] = [
  {
    title: "Choose amount",
    description: "Pay in full or split across monthly installments.",
    state: "complete",
  },
  {
    title: "Confirm method",
    description: "Visa ending in 4098 or add HSA/FSA.",
    state: "current",
  },
  {
    title: "Review & submit",
    description: "Receive a receipt instantly and notify your care team.",
    state: "upcoming",
  },
];

const orderTimeline: OrderCheckpoint[] = [
  {
    title: "Coverage approved",
    description: "Insurance confirmed your eligibility and shared the EOB.",
    date: "Apr 14, 2024",
    state: "complete",
  },
  {
    title: "Device prepared",
    description: "Smart knee brace configured to the prescription specs.",
    date: "Apr 28, 2024",
    state: "complete",
  },
  {
    title: "Out for delivery",
    description: "Courier will arrive for the fitting window you selected.",
    date: "May 5, 2024 · 9:00 AM",
    state: "current",
  },
  {
    title: "Fitting & demo",
    description: "On-site specialist will walk through device setup and exercises.",
    date: "May 6, 2024 · 10:30 AM",
    state: "upcoming",
  },
  {
    title: "Follow-up check-in",
    description: "Virtual visit to review progress and answer questions.",
    date: "May 13, 2024",
    state: "upcoming",
  },
];

const reminders: Reminder[] = [
  {
    channel: "Email",
    message: "Detailed delivery itinerary + portal link for rescheduling.",
    schedule: "Sent Apr 30 at 9:15 AM",
  },
  {
    channel: "SMS",
    message: "24-hour reminder with quick reschedule actions.",
    schedule: "Scheduled for May 5 at 9:00 AM",
  },
  {
    channel: "Portal",
    message: "Live chat opens 1 hour before your fitting appointment.",
    schedule: "Available May 6 at 9:30 AM",
  },
];

const alternateSlots = [
  {
    date: "Thu · May 9",
    windows: ["9:00 AM", "11:30 AM", "2:00 PM"],
  },
  {
    date: "Fri · May 10",
    windows: ["10:00 AM", "1:30 PM"],
  },
  {
    date: "Mon · May 13",
    windows: ["8:30 AM", "4:00 PM"],
  },
];

const coverageBreakdown = [
  {
    label: "Insurance paid",
    amount: "$1,260.00",
    percent: 75,
    tone: "bg-primary text-white",
  },
  {
    label: "Copay collected",
    amount: "$120.00",
    percent: 7,
    tone: "bg-primary/30 text-primary-dark",
  },
  {
    label: "Balance remaining",
    amount: "$300.00",
    percent: 18,
    tone: "bg-slate-100 text-slate-600",
  },
];

export default function Home() {
  const paymentProgress = Math.round(
    (paymentSteps.filter((step) => step.state === "complete").length / paymentSteps.length) * 100,
  );

  return (
    <div className="min-h-screen pb-16">
      <PortalHeader />

      <main className="mx-auto mt-10 flex w-full max-w-7xl flex-col gap-8 px-6">
        <section className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <article className="card-surface relative overflow-hidden p-6">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary via-primary-dark to-primary" />
            <header className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="badge-soft">Explanation of Benefits</div>
                <h2 className="mt-3 text-2xl font-semibold text-slate-900">Smart knee brace coverage summary</h2>
                <p className="mt-2 text-sm text-slate-600">
                  This device has been fully approved by your insurance partner. Review the
                  breakdown before you confirm payment.
                </p>
              </div>
              <ShieldCheck className="h-10 w-10 text-primary" aria-hidden />
            </header>

            <dl className="mt-6 grid gap-4 text-sm md:grid-cols-3">
              {coverageBreakdown.map((item) => (
                <div key={item.label} className="surface-muted flex flex-col gap-1 p-4">
                  <dt className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    {item.label}
                  </dt>
                  <dd className="text-lg font-semibold text-slate-900">{item.amount}</dd>
                  <div className="mt-2 flex h-2 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full ${item.tone}`}
                      style={{ width: `${item.percent}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500">{item.percent}% of claim</span>
                </div>
              ))}
            </dl>

            <div className="mt-6 grid gap-4 rounded-xl bg-slate-100/80 p-4 md:grid-cols-3">
              <div>
                <span className="text-xs font-medium uppercase text-slate-500">Claim ID</span>
                <p className="font-semibold text-slate-900">EOB-72831</p>
              </div>
              <div>
                <span className="text-xs font-medium uppercase text-slate-500">Service date</span>
                <p className="font-semibold text-slate-900">Apr 12, 2024</p>
              </div>
              <div>
                <span className="text-xs font-medium uppercase text-slate-500">Provider</span>
                <p className="font-semibold text-slate-900">Motion Plus Orthopedics</p>
              </div>
            </div>
          </article>

          <aside className="card-surface flex h-full flex-col gap-5 p-6">
            <header className="flex items-start justify-between">
              <div>
                <div className="badge-soft">Payment flow</div>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Balance ready to pay</h2>
              </div>
              <CreditCard className="h-10 w-10 text-primary" aria-hidden />
            </header>

            <div className="rounded-xl border border-primary/10 bg-primary-muted p-4 text-primary-dark">
              <p className="text-xs uppercase">Remaining balance</p>
              <p className="mt-1 text-3xl font-semibold text-slate-900">$300.00</p>
              <p className="mt-1 text-sm text-slate-600">
                Pay today or set up 3 payments of <strong className="font-semibold">$100</strong>.
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between text-xs uppercase text-slate-500">
                <span>Progress</span>
                <span>{paymentProgress}% complete</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary-dark"
                  style={{ width: `${paymentProgress}%` }}
                />
              </div>
            </div>

            <ol className="flex flex-col gap-3">
              {paymentSteps.map((step) => (
                <li
                  key={step.title}
                  className="flex gap-3 rounded-xl border border-slate-200/80 bg-slate-50 p-4"
                >
                  <StepMarker state={step.state} />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-slate-900">{step.title}</p>
                    <p className="text-xs text-slate-600">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-auto flex flex-col gap-3">
              <button className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-primary-dark">
                Settle balance now <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-primary hover:text-primary">
                Schedule recurring payments
              </button>
            </div>
          </aside>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <article className="card-surface flex flex-col gap-6 p-6">
            <header className="flex items-start justify-between">
              <div>
                <div className="badge-soft">Delivery & demo</div>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">
                  Upcoming fitting on <span className="text-primary">May 6 · 10:30 AM</span>
                </h2>
                <p className="mt-1 text-sm text-slate-600">
                  Reschedule directly in the portal. We will notify the courier and your specialist.
                </p>
              </div>
              <CalendarCheck className="h-10 w-10 text-primary" aria-hidden />
            </header>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="surface-muted flex flex-col gap-3 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Truck className="h-4 w-4 text-primary" aria-hidden />
                  Delivery window
                </div>
                <p className="text-xs uppercase text-slate-500">Arrives</p>
                <p className="text-lg font-semibold text-slate-900">May 6 · 9:30-10:30 AM</p>
                <p className="text-sm text-slate-600">
                  Your device ships overnight with live tracking enabled at 7:00 AM.
                </p>
              </div>
              <div className="surface-muted flex flex-col gap-3 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <Clock className="h-4 w-4 text-primary" aria-hidden />
                  Specialist demo
                </div>
                <p className="text-xs uppercase text-slate-500">Coach</p>
                <p className="text-lg font-semibold text-slate-900">Alex Morgan, CPO</p>
                <p className="text-sm text-slate-600">
                  45-minute guided fitting with mobility coaching and remote monitoring set-up.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-primary/40 p-5">
              <p className="text-sm font-semibold text-slate-800">Need a different time?</p>
              <p className="mt-1 text-sm text-slate-600">
                Choose a new slot and we will update everyone instantly—no phone call required.
              </p>
              <div className="mt-4 grid gap-3 md:grid-cols-3">
                {alternateSlots.map((slot) => (
                  <button
                    key={slot.date}
                    className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 text-left text-sm font-medium text-slate-700 transition hover:border-primary hover:text-primary"
                  >
                    <span>{slot.date}</span>
                    <span className="text-xs text-slate-500">{slot.windows.join(" · ")}</span>
                  </button>
                ))}
              </div>
            </div>
          </article>

          <aside className="card-surface flex flex-col gap-5 p-6">
            <header className="flex items-start justify-between">
              <div>
                <div className="badge-soft">Stay informed</div>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">Reminders & follow up</h2>
              </div>
              <MessageCircle className="h-10 w-10 text-primary" aria-hidden />
            </header>

            <ul className="flex flex-col gap-3">
              {reminders.map((reminder) => (
                <li
                  key={reminder.channel}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <ReminderBadge channel={reminder.channel} />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{reminder.message}</p>
                    <p className="text-xs text-slate-600">{reminder.schedule}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="rounded-xl border border-primary/20 bg-primary-muted p-4">
              <p className="text-sm font-semibold text-slate-900">Need additional support?</p>
              <p className="mt-1 text-sm text-slate-600">
                Chat with your care navigator, upload progress photos, or request a virtual tune-up.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-primary shadow-sm transition hover:text-primary-dark"
                >
                  Start message
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="#"
                  className="inline-flex items-center gap-1 rounded-lg border border-primary/40 px-3 py-2 text-xs font-semibold text-primary"
                >
                  Request virtual check-in
                </Link>
              </div>
            </div>
          </aside>
        </section>

        <section className="card-surface p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="badge-soft">Order tracker</div>
              <h2 className="mt-2 text-xl font-semibold text-slate-900">Track every step of your device order</h2>
              <p className="mt-1 text-sm text-slate-600">
                We keep you informed from claim approval to follow-up. Tap any step to view details or
                message your care team.
              </p>
            </div>
            <Link
              href="#"
              className="inline-flex items-center gap-2 rounded-xl border border-primary/30 bg-primary-muted px-4 py-2 text-sm font-semibold text-primary hover:text-primary-dark"
            >
              Download full order timeline
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_1fr]">
            <div className="relative">
              <ol className="relative flex flex-col gap-6">
                {orderTimeline.map((checkpoint, index) => (
                  <li key={checkpoint.title} className="relative pl-10">
                    <TimelineMarker state={checkpoint.state} isLast={index === orderTimeline.length - 1} />
                    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-base font-semibold text-slate-900">{checkpoint.title}</h3>
                        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">
                          {checkpoint.date}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600">{checkpoint.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2 text-xs text-primary">
                        <button className="inline-flex items-center gap-1 rounded-lg border border-primary/40 px-3 py-1.5 font-semibold transition hover:border-primary hover:text-primary-dark">
                          See status details
                        </button>
                        {checkpoint.state !== "complete" && (
                          <button className="inline-flex items-center gap-1 rounded-lg border border-primary/40 px-3 py-1.5 font-semibold text-primary transition hover:border-primary hover:text-primary-dark">
                            Notify me of changes
                          </button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <aside className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center gap-3">
                <CalendarDays className="h-5 w-5 text-primary" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-slate-900">Reminder cadence</p>
                  <p className="text-xs text-slate-500">Automatic updates for every milestone.</p>
                </div>
              </div>
              <ul className="space-y-3 text-sm text-slate-600">
                <li>• Email confirmation for approvals, shipments, and delivery arrival.</li>
                <li>• SMS alerts the morning of your fitting with reschedule link.</li>
                <li>• Portal notifications when notes or documents are added.</li>
              </ul>
              <div className="rounded-xl border border-dashed border-primary/40 bg-white p-4 text-sm">
                <p className="font-semibold text-slate-900">Reschedule any step</p>
                <p className="mt-1 text-slate-600">
                  If your schedule shifts, choose a new date and your benefits coordinator will be
                  alerted instantly—no looping in insurance manually.
                </p>
              </div>
            </aside>
          </div>
        </section>
      </main>
    </div>
  );
}

function PortalHeader() {
  return (
    <header className="border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary-muted px-4 py-1 text-xs font-semibold text-primary">
            <span className="inline-flex h-2.5 w-2.5 items-center justify-center">
              <span className="h-2 w-2 rounded-full bg-primary" aria-hidden />
            </span>
            Numa Care Patient Portal
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-wide text-slate-500">Welcome back</p>
            <h1 className="mt-1 text-3xl font-semibold text-slate-900">Jordan Lee</h1>
          </div>
          <p className="max-w-xl text-sm text-slate-600">
            Review your explanation of benefits, settle your balance, and coordinate delivery in one
            place. Your insurance partner has shared this secure link for your records.
          </p>
        </div>

        <dl className="grid w-full max-w-md grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
          <div>
            <dt className="text-xs uppercase text-slate-500">Policy</dt>
            <dd className="text-base font-semibold text-slate-900">NUMA-4839201</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-slate-500">Member ID</dt>
            <dd className="text-base font-semibold text-slate-900">JL-109234</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-slate-500">Coverage tier</dt>
            <dd className="text-base font-semibold text-slate-900">Premier Plus</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-slate-500">Next action</dt>
            <dd className="text-base font-semibold text-primary">Pay balance</dd>
          </div>
        </dl>
      </div>
    </header>
  );
}

function StepMarker({ state }: { state: StepState }) {
  if (state === "complete") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
        <CheckCircle2 className="h-5 w-5" aria-hidden />
      </span>
    );
  }

  if (state === "current") {
    return (
      <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-primary bg-white text-primary">
        <Clock className="h-4 w-4" aria-hidden />
      </span>
    );
  }

  return (
    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-400">
      <Clock className="h-4 w-4" aria-hidden />
    </span>
  );
}

function ReminderBadge({ channel }: { channel: Reminder["channel"] }) {
  const iconByChannel: Record<Reminder["channel"], JSX.Element> = {
    Email: <ShieldCheck className="h-4 w-4" aria-hidden />,
    SMS: <MessageCircle className="h-4 w-4" aria-hidden />,
    Portal: <CalendarCheck className="h-4 w-4" aria-hidden />,
  };

  const colorByChannel: Record<Reminder["channel"], string> = {
    Email: "bg-primary/15 text-primary",
    SMS: "bg-primary text-white",
    Portal: "bg-slate-200 text-slate-700",
  };

  return (
    <span
      className={`flex h-9 w-9 items-center justify-center rounded-full ${colorByChannel[channel]}`}
      aria-label={channel}
    >
      {iconByChannel[channel]}
    </span>
  );
}

function TimelineMarker({ state, isLast }: { state: StepState; isLast: boolean }) {
  const baseCircle = "absolute left-0 top-2 flex h-6 w-6 items-center justify-center rounded-full";
  const colorsByState: Record<StepState, { circle: string; icon: JSX.Element }> = {
    complete: {
      circle: "bg-primary text-white",
      icon: <CheckCircle2 className="h-4 w-4" aria-hidden />,
    },
    current: {
      circle: "border-2 border-primary bg-white text-primary",
      icon: <Clock className="h-4 w-4" aria-hidden />,
    },
    upcoming: {
      circle: "border border-slate-300 bg-white text-slate-300",
      icon: <Clock className="h-4 w-4" aria-hidden />,
    },
  };

  return (
    <>
      <span className={`${baseCircle} ${colorsByState[state].circle}`}>{colorsByState[state].icon}</span>
      {!isLast && <span className="absolute left-3 top-7 bottom-0 w-px bg-slate-200" aria-hidden />}
    </>
  );
}

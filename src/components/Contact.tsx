import { useState, type ReactNode } from "react";
import {
  ArrowUpRight,
  Check,
  Clock,
  Copy,
  Github,
  Linkedin,
  Mail,
  Send,
  ShieldCheck,
} from "lucide-react";
import { ActionButton } from "./ui/ActionButton";
import { Reveal } from "./ui/Reveal";
import { useApp } from "../lib/app-context";
import { useClock } from "../hooks/useClock";
import { profile } from "../lib/data";
import { cn } from "../lib/utils";

type FieldName = "name" | "email" | "message";
type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const initialValues: Values = { name: "", email: "", message: "" };

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please share your name";
  if (!/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(values.email.trim())) {
    errors.email = "Enter a valid email";
  }
  if (values.message.trim().length < 12) {
    errors.message = "A little more detail helps";
  }
  return errors;
}

export function Contact() {
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const { copyText } = useApp();
  const { time, zone } = useClock(profile.timeZone);

  const update =
    (field: FieldName) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((current) => ({ ...current, [field]: event.target.value }));
      if (errors[field]) {
        setErrors((current) => ({ ...current, [field]: undefined }));
      }
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0] as FieldName | undefined;
    if (firstError) {
      document.getElementById(firstError)?.focus();
      return;
    }

    const subject = encodeURIComponent(`Portfolio enquiry from ${values.name}`);
    const body = encodeURIComponent(
      `${values.message}\n\n— ${values.name}\n${values.email}`,
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setSent(false);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="eyebrow">
                <span aria-hidden className="h-px w-6 bg-accent/70" />
                05 — Contact
              </span>
            </Reveal>

            <Reveal delay={0.05}>
              <h2 className="mt-5 text-[clamp(2.4rem,6vw,4.3rem)] font-semibold leading-[0.97] tracking-[-0.05em]">
                Have an idea?
                <br />
                Let&rsquo;s build{" "}
                <span className="text-gradient font-serif font-normal italic tracking-[-0.02em]">
                  something
                </span>
                .
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-[14px] leading-relaxed text-muted">
                Open to software development and data roles, freelance builds, and
                interesting conversations about products that make complex things
                feel simple.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-2">
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex items-center gap-2.5 font-serif text-[clamp(1.35rem,3vw,1.9rem)] italic tracking-tight text-ink"
                  data-cursor="link"
                >
                  <span className="relative">
                    {profile.email}
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 h-px w-full bg-line/25 transition-transform duration-500 ease-out-expo group-hover:scale-x-0 group-hover:origin-right"
                    />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-accent transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
                <button
                  type="button"
                  onClick={() => void copyText(profile.email, "Email copied")}
                  aria-label="Copy email address"
                  data-cursor="link"
                  className="grid h-8 w-8 place-items-center rounded-full border border-line/10 text-faint transition-colors hover:border-line/20 hover:text-ink"
                >
                  <Copy size={13} />
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 space-y-px overflow-hidden rounded-2xl border border-line/10">
                <SocialRow
                  icon={<Github size={15} />}
                  label="GitHub"
                  value="/AvulaVamshidhar"
                  href={profile.github}
                />
                <SocialRow
                  icon={<Linkedin size={15} />}
                  label="LinkedIn"
                  value="avula-vamshidhar"
                  href={profile.linkedin}
                />
                <SocialRow
                  icon={<Mail size={15} />}
                  label="Email"
                  value={profile.email}
                  href={`mailto:${profile.email}`}
                />
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10.5px] text-faint">
                <span className="inline-flex items-center gap-1.5">
                  <span className="relative flex h-1 w-1">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative h-1 w-1 rounded-full bg-emerald-400" />
                  </span>
                  Available for opportunities
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock size={11} /> {time} {zone} · Hyderabad
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.12}>
              <div className="glass rounded-[28px] p-5 sm:p-7">
                {sent ? (
                  <div className="flex min-h-[420px] flex-col items-start justify-center">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-300">
                      <Check size={18} strokeWidth={2.5} />
                    </span>
                    <h3 className="mt-5 text-[22px] font-semibold tracking-tight">
                      Your message is ready.
                    </h3>
                    <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-muted">
                      Your mail app should have opened with the message
                      pre-filled. If it didn&rsquo;t, copy the message below and
                      send it to{" "}
                      <span className="text-ink/80">{profile.email}</span>.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      <ActionButton
                        variant="glass"
                        onClick={() =>
                          void copyText(
                            `${values.name} <${values.email}>\n\n${values.message}`,
                            "Message copied",
                          )
                        }
                      >
                        <Copy size={13} /> Copy message
                      </ActionButton>
                      <ActionButton variant="ghost" onClick={reset}>
                        Write another
                      </ActionButton>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="text-[15px] font-medium tracking-tight">
                        Start a conversation
                      </h3>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint">
                        ~2 min
                      </span>
                    </div>
                    <p className="mt-1.5 text-[11.5px] text-muted">
                      Tell me what you&rsquo;re building or where you think
                      I&rsquo;d fit.
                    </p>

                    <div className="mt-6 space-y-4">
                      <Field
                        id="name"
                        label="Your name"
                        error={errors.name}
                      >
                        <input
                          id="name"
                          name="name"
                          type="text"
                          autoComplete="name"
                          value={values.name}
                          onChange={update("name")}
                          placeholder="Ada Lovelace"
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          className={inputClass(Boolean(errors.name))}
                        />
                      </Field>

                      <Field
                        id="email"
                        label="Email address"
                        error={errors.email}
                      >
                        <input
                          id="email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={update("email")}
                          placeholder="you@company.com"
                          aria-invalid={Boolean(errors.email)}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className={inputClass(Boolean(errors.email))}
                        />
                      </Field>

                      <Field
                        id="message"
                        label="What are you working on?"
                        error={errors.message}
                      >
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={values.message}
                          onChange={update("message")}
                          placeholder="A sentence or two about the project, role or idea…"
                          aria-invalid={Boolean(errors.message)}
                          aria-describedby={
                            errors.message ? "message-error" : undefined
                          }
                          className={cn(inputClass(Boolean(errors.message)), "resize-none")}
                        />
                      </Field>
                    </div>

                    <div className="mt-6">
                      <ActionButton type="submit" magnetic={false} className="w-full">
                        Send message
                        <Send size={13} />
                      </ActionButton>
                    </div>

                    <p className="mt-3.5 flex items-start gap-1.5 text-[10px] leading-relaxed text-faint">
                      <ShieldCheck size={11} className="mt-0.5 shrink-0" />
                      No accounts, no tracking. Submitting opens your own mail
                      client with the message filled in.
                    </p>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "w-full rounded-xl border bg-ink/[0.03] px-3.5 py-3 text-[13px] text-ink outline-none transition-all duration-300 placeholder:text-faint/60",
    hasError
      ? "border-rose-400/50 focus:border-rose-400/70"
      : "border-line/10 focus:border-accent/45 focus:bg-ink/[0.05]",
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <label
          htmlFor={id}
          className="font-mono text-[9px] uppercase tracking-[0.2em] text-faint"
        >
          {label}
        </label>
        {error ? (
          <span
            id={`${id}-error`}
            role="alert"
            className="text-[10px] text-rose-400"
          >
            {error}
          </span>
        ) : null}
      </div>
      {children}
    </div>
  );
}

function SocialRow({
  icon,
  label,
  value,
  href,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer noopener"}
      className="group flex items-center justify-between gap-4 bg-ink/[0.02] px-4 py-3.5 transition-colors duration-300 hover:bg-ink/[0.045]"
      data-cursor="link"
    >
      <span className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-lg border border-line/10 bg-ink/[0.04] text-accent">
          {icon}
        </span>
        <span>
          <span className="block text-[12.5px] font-medium tracking-tight">
            {label}
          </span>
          <span className="mt-0.5 block text-[10.5px] text-faint">{value}</span>
        </span>
      </span>
      <ArrowUpRight
        size={14}
        className="text-faint transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-ink"
      />
    </a>
  );
}

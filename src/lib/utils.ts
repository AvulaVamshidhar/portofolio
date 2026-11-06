export function cn(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (!element) return;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  element.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "start",
  });
}

export function downloadResume(href: string) {
  const link = document.createElement("a");
  link.href = href;
  link.download = "Avula-Vamshidhar-Resume.pdf";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function formatFullDate() {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

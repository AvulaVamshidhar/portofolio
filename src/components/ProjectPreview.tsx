import {
  ArrowRight,
  Check,
  Clock,
  Copy,
  FileText,
  ShieldCheck,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import type { ProjectMock } from "../lib/data";

/** Product-style previews built entirely in markup — no stock imagery, no fake screenshots. */
export function ProjectPreview({ kind }: { kind: ProjectMock }) {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#07090E]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 60% at 18% 8%, rgb(59 130 246 / 0.32), transparent 68%), radial-gradient(60% 60% at 88% 96%, rgb(139 92 246 / 0.28), transparent 66%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #FFFFFF 1px, transparent 1px), linear-gradient(to bottom, #FFFFFF 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, black 10%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, black 10%, transparent 78%)",
        }}
      />

      <div className="absolute left-4 top-3 flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
        <span className="ml-2 font-mono text-[8px] uppercase tracking-[0.2em] text-white/30">
          {kind === "docuhealth" ? "docuhealth · analyze" : "fileshare · upload"}
        </span>
      </div>

      <div className="relative flex h-full w-full items-center justify-center px-4 pb-6 pt-10 sm:px-5">
        {kind === "docuhealth" ? <DocuHealthMock /> : <FileShareMock />}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.07]"
      />
    </div>
  );
}

function DocuHealthMock() {
  const reportRows = [
    ["Hemoglobin", "14.2 g/dL"],
    ["Vitamin D", "18 ng/mL"],
    ["LDL", "142 mg/dL"],
  ];

  return (
    <div className="w-full max-w-[400px]">
      <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.22em] text-white/35">
        <span className="flex items-center gap-1.5">
          <span className="h-1 w-1 rounded-full bg-emerald-400" />
          Report ingested
        </span>
        <span>PDF · OCR</span>
      </div>

      <div className="mt-2 flex items-stretch gap-2">
        <div className="hidden w-[45%] rounded-xl border border-white/10 bg-white/[0.045] p-2.5 sm:block">
          <p className="text-[7.5px] uppercase tracking-[0.2em] text-white/35">
            Lab report
          </p>
          <p className="mt-1 text-[9.5px] font-medium text-white/80">
            Complete Blood Count
          </p>
          <div className="mt-2 space-y-1.5">
            {reportRows.map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between gap-1 border-b border-white/[0.06] pb-1 text-[8px]"
              >
                <span className="text-white/40">{label}</span>
                <span className="font-mono text-white/75">{value}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-4/5 rounded-full bg-gradient-to-r from-blue-400/70 to-violet-400/70" />
          </div>
        </div>

        <div className="flex items-center px-0.5 text-white/25">
          <Sparkles size={9} className="hidden sm:block" />
          <ArrowRight size={11} />
        </div>

        <div className="flex-1 rounded-xl border border-blue-400/20 bg-blue-500/[0.08] p-2.5">
          <p className="flex items-center gap-1 text-[7.5px] uppercase tracking-[0.2em] text-blue-200/70">
            <Sparkles size={8} /> Plain language
          </p>
          <p className="mt-1 text-[9.5px] font-medium text-white/85">
            Your results, explained
          </p>

          <div className="mt-2 space-y-1.5">
            <InsightRow
              tone="emerald"
              title="Hemoglobin"
              text="Right in the healthy range."
            />
            <InsightRow
              tone="amber"
              title="Vitamin D"
              text="A little low — sunlight or supplements."
            />
            <InsightRow
              tone="rose"
              title="LDL cholesterol"
              text="Slightly high. Worth discussing."
            />
          </div>

          <div className="mt-2 flex items-center justify-between rounded-lg border border-white/10 bg-white/[0.06] px-2 py-1.5 text-[8px] text-white/60">
            3 questions for your doctor
            <ArrowRight size={8} />
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightRow({
  tone,
  title,
  text,
}: {
  tone: "emerald" | "amber" | "rose";
  title: string;
  text: string;
}) {
  const toneClass = {
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    rose: "bg-rose-400",
  }[tone];

  return (
    <div className="flex items-start gap-1.5">
      <span className={`mt-[3px] h-1 w-1 shrink-0 rounded-full ${toneClass}`} />
      <p className="text-[8px] leading-[1.35] text-white/55">
        <span className="font-medium text-white/80">{title}</span> — {text}
      </p>
    </div>
  );
}

function FileShareMock() {
  return (
    <div className="w-full max-w-[360px] space-y-2">
      <div className="flex items-center justify-between text-[8px] uppercase tracking-[0.22em] text-white/35">
        <span>File sharing</span>
        <span className="flex items-center gap-1">
          <ShieldCheck size={9} /> No account needed
        </span>
      </div>

      <div className="rounded-xl border border-dashed border-white/15 bg-white/[0.035] px-3 py-3.5 text-center">
        <span className="mx-auto grid h-7 w-7 place-items-center rounded-lg border border-white/10 bg-white/[0.06] text-blue-300/80">
          <UploadCloud size={13} />
        </span>
        <p className="mt-1.5 text-[9px] font-medium text-white/80">
          Drop a file or browse
        </p>
        <p className="mt-0.5 text-[7.5px] text-white/35">
          Up to 25 MB · deleted after 24 hours
        </p>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/[0.05] p-2.5">
        <div className="flex items-center gap-2">
          <span className="grid h-6 w-6 place-items-center rounded-md border border-white/10 bg-white/[0.06] text-white/60">
            <FileText size={11} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[8.5px] font-medium text-white/80">
              project-brief.pdf
            </p>
            <p className="text-[7px] text-white/35">2.4 MB · uploaded</p>
          </div>
          <span className="grid h-4 w-4 place-items-center rounded-full bg-emerald-400/15 text-emerald-300">
            <Check size={9} strokeWidth={3} />
          </span>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-400 to-violet-400" />
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] p-2.5">
        <div className="min-w-0 flex-1">
          <p className="text-[7px] uppercase tracking-[0.2em] text-white/35">
            Shareable link
          </p>
          <p className="truncate font-mono text-[8.5px] text-blue-200/90">
            your-app.link/8f3a2c
          </p>
        </div>
        <span className="grid h-6 w-6 place-items-center rounded-md border border-white/10 bg-white/[0.06] text-white/55">
          <Copy size={10} />
        </span>
      </div>

      <div className="flex items-center gap-1.5 text-[7.5px] text-white/35">
        <Clock size={9} /> Auto-deletes in 24 hours
      </div>
    </div>
  );
}

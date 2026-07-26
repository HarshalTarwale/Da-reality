export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  actions,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  actions?: React.ReactNode;
}) {
  if (align === "center") {
    return (
      <div className="mx-auto max-w-2xl text-center">
        {eyebrow && (
          <p className="text-xs font-medium uppercase tracking-widest-luxe text-onyx">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-3 font-heading text-3xl font-medium leading-tight text-onyx sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
      <div className="max-w-xl">
        {eyebrow && (
          <p className="text-xs font-medium uppercase tracking-widest-luxe text-onyx">
            {eyebrow}
          </p>
        )}
        <h2 className="mt-3 font-heading text-3xl font-medium leading-tight text-onyx sm:text-4xl">
          {title}
        </h2>
        {description && (
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}

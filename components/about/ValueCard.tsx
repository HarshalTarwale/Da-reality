export default function ValueCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-stone bg-white p-8">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-stone text-gold-dark">
        {icon}
      </div>
      <h3 className="mt-6 font-heading text-lg font-medium text-onyx">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>
  );
}

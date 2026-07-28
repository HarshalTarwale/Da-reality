import { formatAed, unitTypeLabel, type UnitBreakdown } from "@/lib/types";

/** m² -> sqft, rounded. */
function toSqft(m2: number) {
  return Math.round(m2 * 10.7639);
}

function priceCell(from?: number, to?: number) {
  const lo = from && from > 0 ? from : null;
  const hi = to && to > 0 ? to : null;
  if (!lo && !hi) return "On request";
  if (lo && hi && lo !== hi) return `${formatAed(lo)} – ${formatAed(hi)}`;
  return formatAed((lo ?? hi) as number);
}

function areaCell(from?: number, to?: number) {
  if (!from && !to) return "—";
  const lo = from ?? to!;
  const hi = to ?? from!;
  if (lo === hi) return `${toSqft(lo).toLocaleString()} sqft`;
  return `${toSqft(lo).toLocaleString()} – ${toSqft(hi).toLocaleString()} sqft`;
}

export default function UnitBreakdownTable({ units }: { units: UnitBreakdown }) {
  const codes = Object.keys(units).sort();
  if (codes.length === 0) return null;

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[520px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-stone">
            <th className="pb-3 pr-4 text-xs font-medium uppercase tracking-widest-luxe text-muted-foreground">
              Unit Type
            </th>
            <th className="pb-3 pr-4 text-xs font-medium uppercase tracking-widest-luxe text-muted-foreground">
              Price Range
            </th>
            <th className="pb-3 pr-4 text-xs font-medium uppercase tracking-widest-luxe text-muted-foreground">
              Size Range
            </th>
            <th className="pb-3 text-xs font-medium uppercase tracking-widest-luxe text-muted-foreground">
              Available
            </th>
          </tr>
        </thead>
        <tbody>
          {codes.map((code) => {
            const u = units[code];
            return (
              <tr key={code} className="border-b border-stone/60 last:border-0">
                {/*
                  TODO: render the real configuration (Studio / 1BR / 2BR ...) once the
                  Alnair unit-type code mapping is available. Until then the raw code is
                  shown — guessing a bedroom count here would put wrong information on a
                  live listing. See unitTypeLabel() in lib/types.ts.
                */}
                <td className="py-4 pr-4 font-heading text-base font-medium text-onyx">
                  {unitTypeLabel(code)}
                </td>
                <td className="py-4 pr-4 text-muted-foreground">
                  {priceCell(u.price_from, u.price_to)}
                </td>
                <td className="py-4 pr-4 text-muted-foreground">
                  {areaCell(u.area_from, u.area_to)}
                </td>
                <td className="py-4 text-muted-foreground">
                  {u.count && u.count > 0 ? u.count.toLocaleString() : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

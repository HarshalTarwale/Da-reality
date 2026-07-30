import DevelopmentsCarousel from "@/components/DevelopmentsCarousel";
import { getOffPlanProjects } from "@/lib/properties";

/** Server component: pulls the newest-to-market off-plan projects (least construction progress). */
export default async function DevelopmentsSection() {
  const projects = await getOffPlanProjects(9);

  return <DevelopmentsCarousel projects={projects} />;
}

import DashboardEditClient from "@/components/dashboard/edit/DashboardEditClient";

interface EditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPage({ params, }: EditPageProps) {

  const { id } = await params;

  return (
    <DashboardEditClient dashboardId={id} />
  )
}

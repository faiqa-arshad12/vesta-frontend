import {DashboardLayout} from "@/components/dashboard/DashboardLayout";
import {auth} from "@/lib/auth";
import {redirect} from "next/navigation";

export default async function Layout({children}: {children: React.ReactNode}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/signin");
  }

  return <DashboardLayout>{children}</DashboardLayout>;
}

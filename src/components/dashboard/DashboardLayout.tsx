import {DashboardHeader} from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({children}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <DashboardHeader />
      <main className="w-full">{children}</main>
    </div>
  );
}

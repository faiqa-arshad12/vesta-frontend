import {DashboardHeader} from "./DashboardHeader";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({children}: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DashboardHeader />
      <main className="w-full flex-1 min-h-0">{children}</main>
    </div>
  );
}

import { TabBar } from "@/components/portal/tab-bar";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-paper-2 lg:py-8">
      {/* Mobile-first: full width on phones; framed device column on desktop. */}
      <div className="mx-auto flex min-h-screen w-full max-w-[420px] flex-col bg-paper lg:min-h-[800px] lg:overflow-hidden lg:rounded-[28px] lg:border lg:border-line lg:shadow-[0_20px_80px_rgba(0,0,0,0.6)]">
        <div className="flex-1 overflow-y-auto">{children}</div>
        <TabBar />
      </div>
    </div>
  );
}

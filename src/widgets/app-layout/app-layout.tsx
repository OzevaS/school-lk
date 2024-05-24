export function AppLayout({
  sidebar,
  content,
  header,
}: {
  sidebar?: React.ReactNode;
  header: React.ReactNode;
  content: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-row bg-muted/40 min-h-screen">
      <aside className="sticky z-[35] max-h-[100vh] inset-y-0 left-0 hidden flex-col border-r bg-background sm:flex">
        {sidebar}
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:px-10 flex-grow">
        {header}
        <main className="grid flex-1 items-start gap-4 py-4 sm:py-0 md:gap-8">
          {content}
        </main>
      </div>
    </div>
  );
}

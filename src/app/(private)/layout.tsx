import AuthorizedGuard from "@/features/auth/authorized-guard";
import { AppHeader } from "@/widgets/app-header/app-header";
import { AppLayout } from "@/widgets/app-layout/app-layout";
import { AppSideBar } from "@/widgets/app-side-bar/app-side-bar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppLayout
      header={<AppHeader variant="auth" />}
      content={<AuthorizedGuard>{children}</AuthorizedGuard>}
    />
  );
}

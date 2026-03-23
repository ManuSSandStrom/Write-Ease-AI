import { Outlet } from "react-router-dom";
import { BottomNav } from "../components/layout/BottomNav";
import { FloatingActionButton } from "../components/layout/FloatingActionButton";
import { QuickActionsSheet } from "../components/layout/QuickActionsSheet";
import { Toast } from "../components/common/Toast";

const AppLayout = () => (
  <>
    <main className="screen-shell">
      <Outlet />
    </main>
    <FloatingActionButton />
    <BottomNav />
    <QuickActionsSheet />
    <Toast />
  </>
);

export default AppLayout;


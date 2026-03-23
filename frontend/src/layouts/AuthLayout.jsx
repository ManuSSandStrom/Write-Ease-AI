import { Outlet } from "react-router-dom";

const AuthLayout = () => (
  <main className="screen-shell flex items-start justify-center py-4 sm:py-6 lg:items-center">
    <div className="w-full max-w-md pb-8">
      <Outlet />
    </div>
  </main>
);

export default AuthLayout;

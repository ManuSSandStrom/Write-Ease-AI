import { Outlet } from "react-router-dom";

const AuthLayout = () => (
  <main className="screen-shell flex items-center justify-center">
    <div className="w-full max-w-md">
      <Outlet />
    </div>
  </main>
);

export default AuthLayout;

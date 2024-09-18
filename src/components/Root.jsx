import { Outlet } from "react-router";
import MainNavigation from "./MainNavigation";

function Root() {
  return (
    <>
      <MainNavigation />
      <main >
        <Outlet />
      </main>
    </>
  );
}

export default Root;

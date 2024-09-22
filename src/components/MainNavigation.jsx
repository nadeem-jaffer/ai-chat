import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
} from "@clerk/clerk-react";

export default function MainNavigation() {
  return (
    <nav className="flex m-5">
      <ul className="flex justify-between w-full">
        <li className="text-2xl font-bold">
          <Link to="/">Home</Link>
        </li>
        <li>
          <SignedOut>
            <SignInButton/>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </li>
      </ul>
    </nav>
  );
}

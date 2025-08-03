"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Home, User } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { data: session } = useSession();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      // Prevent automatic redirect
      await signOut({ redirect: false });
      // Manually go to login page
      router.push("/login");
    } catch (err) {
      console.error("Error during sign out:", err);
    }
  };

  return (
    <div className="navbar bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-4 py-2">
        <Link
          href="/"
          className="flex items-center text-xl font-semibold text-indigo-600 hover:text-indigo-800 gap-2"
        >
          <Home className="w-5 h-5" />
          <span>Video with AI</span>
        </Link>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-sm btn-outline rounded-full flex items-center gap-1 hover:bg-indigo-50"
          >
            <User className="w-5 h-5 text-indigo-600" />
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[100] shadow-xl bg-white border border-gray-200 rounded-lg w-64 mt-3 py-2"
          >
            {session ? (
              <>
                <li className="px-4 py-2 text-sm text-gray-600 border-b">
                  {session.user?.email?.split("@")[0]}
                </li>
                <li>
                  <Link
                    href="/upload"
                    className="block px-4 py-2 text-sm hover:bg-indigo-50 text-indigo-600"
                  >
                    Video Upload
                  </Link>
                </li>
                <li>
                  <button
                    onClick={handleSignOut}
                    className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login"
                  className="block px-4 py-2 text-sm hover:bg-indigo-50 text-indigo-600"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

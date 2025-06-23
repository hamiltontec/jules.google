import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link as RemixLink,
  NavLink // For active styling
} from "@remix-run/react";
import type { LinksFunction, MetaFunction } from "@remix-run/node";

import tailwindStylesUrl from "./tailwind.css?url"; // Correct path to Tailwind CSS
import { Button } from "@/components/ui/button"; // Import Shadcn Button

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesUrl },
];

export const meta: MetaFunction = () => {
  return [
    { title: "Apartment Hosting Pro" }, // Site-wide title
    { name: "description", content: "Find your next perfect stay!" },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex h-full flex-col antialiased">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-14 max-w-screen-2xl items-center">
            <RemixLink to="/" className="mr-6 flex items-center space-x-2">
              {/* <MountainIcon className="h-6 w-6" /> Replace with actual logo if available */}
              <span className="font-bold sm:inline-block">HostingPro</span>
            </RemixLink>
            <nav className="flex flex-1 items-center space-x-4 sm:justify-end">
              <NavLink to="/" prefetch="intent">
                {({ isActive }) => (
                  <Button variant={isActive ? "secondary" : "ghost"} size="sm">Home</Button>
                )}
              </NavLink>
              <NavLink to="/properties" prefetch="intent">
                 {({ isActive }) => (
                  <Button variant={isActive ? "secondary" : "ghost"} size="sm">Properties</Button>
                )}
              </NavLink>
              {/* TODO: Conditional auth links */}
              <NavLink to="/login" prefetch="intent">
                {({ isActive }) => (
                  <Button variant={isActive ? "secondary" : "ghost"} size="sm">Login</Button>
                )}
              </NavLink>
              <NavLink to="/register" prefetch="intent">
                {({ isActive }) => (
                  <Button variant={isActive ? "secondary" : "ghost"} size="sm">Register</Button>
                )}
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="flex-1 py-6">
          <div className="container max-w-screen-2xl">
            {children}
          </div>
        </main>

        <footer className="border-t border-border/40 py-6 md:px-8 md:py-0">
          <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
              Built by Jules (AI). Inspired by modern hosting platforms.
            </p>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} HostingPro Inc.
            </p>
          </div>
        </footer>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

// Placeholder for MountainIcon or any other icon/logo component
// function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//       <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
//     </svg>
//   );
// }

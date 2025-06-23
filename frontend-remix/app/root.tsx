import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link as RemixLink // Import Link for navigation
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";

// Import global styles
import globalStylesUrl from "./styles/global.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: globalStylesUrl },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <div className="container">
            <h1>
              <RemixLink to="/">Apartment Hosting</RemixLink>
            </h1>
            <nav>
              <ul>
                <li><RemixLink to="/">Home</RemixLink></li>
                <li><RemixLink to="/properties">Properties</RemixLink></li>
                <li><RemixLink to="/login">Login</RemixLink></li>
                <li><RemixLink to="/register">Register</RemixLink></li>
                {/* TODO: Add user-specific links, e.g., Dashboard, My Bookings, Logout */}
              </ul>
            </nav>
          </div>
        </header>
        <main>
          <div className="container">
            {children}
          </div>
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  // The Outlet here will render the matched child route component within the Layout
  return <Outlet />;
}

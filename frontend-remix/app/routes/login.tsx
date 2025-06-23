import type { MetaFunction } from "@remix-run/node";
import { Link as RemixLink } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Login - Apartment Hosting" }];
};

export default function LoginPage() {
  return (
    <div>
      <h2>Login</h2>
      <p>Login form will go here.</p>
      <p>
        Don't have an account? <RemixLink to="/register">Register here</RemixLink>.
      </p>
    </div>
  );
}

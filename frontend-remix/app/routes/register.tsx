import type { MetaFunction } from "@remix-run/node";
import { Link as RemixLink } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [{ title: "Register - Apartment Hosting" }];
};

export default function RegisterPage() {
  return (
    <div>
      <h2>Register</h2>
      <p>Registration form will go here.</p>
      <p>
        Already have an account? <RemixLink to="/login">Login here</RemixLink>.
      </p>
    </div>
  );
}

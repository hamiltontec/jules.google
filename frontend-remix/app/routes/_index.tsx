import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Apartment Hosting" },
    { name: "description", content: "Welcome to our Apartment Hosting platform!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to the Apartment Hosting Platform</h1>
      <p>Your next stay is just a few clicks away!</p>
      {/* Navigation links will be added to the main layout (root.tsx) */}
    </div>
  );
}

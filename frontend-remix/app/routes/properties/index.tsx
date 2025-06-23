import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Properties - Apartment Hosting" }];
};

export default function PropertiesPage() {
  return (
    <div>
      <h2>Available Properties</h2>
      <p>List of properties will go here.</p>
      {/* We will later fetch and display properties from the API */}
    </div>
  );
}

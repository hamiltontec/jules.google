import type { MetaFunction, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const propertyName = data?.propertyName || "Property";
  return [{ title: `${propertyName} Details - Apartment Hosting` }];
};

// Example Loader: In a real app, this would fetch property data by ID
export async function loader({ params }: LoaderFunctionArgs) {
  // Simulate fetching data based on params.propertyId
  // In a real app: const property = await fetchPropertyById(params.propertyId);
  // if (!property) throw new Response("Not Found", { status: 404 });
  // return json({ propertyName: property.name, propertyId: params.propertyId });

  // Placeholder data for now
  return { propertyName: `Property ${params.propertyId}`, propertyId: params.propertyId };
}

export default function PropertyDetailPage() {
  const { propertyName, propertyId } = useLoaderData<typeof loader>();

  return (
    <div>
      <h2>{propertyName} (ID: {propertyId})</h2>
      <p>Detailed information about this property will go here.</p>
      {/* We will later fetch and display full property details from the API */}
    </div>
  );
}

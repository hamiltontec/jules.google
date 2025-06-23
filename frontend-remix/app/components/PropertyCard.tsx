import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "@remix-run/react";

interface PropertyCardProps {
  id: string | number;
  imageUrl?: string; // Placeholder for now
  title: string;
  city: string;
  pricePerNight: number;
  descriptionSnippet?: string;
}

export function PropertyCard({
  id,
  imageUrl = "https://via.placeholder.com/400x300?text=Property+Image", // Default placeholder
  title,
  city,
  pricePerNight,
  descriptionSnippet = "A lovely place to stay.",
}: PropertyCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
      <CardHeader className="p-0">
        <img
          src={imageUrl}
          alt={`Image of ${title}`}
          className="object-cover w-full h-48" // Fixed height for consistency
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-1 truncate">{title}</CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-2">{city}</CardDescription>
        <p className="text-xs text-gray-600 dark:text-gray-400 mb-3 min-h-[30px]">
          {descriptionSnippet}
        </p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-primary">
            ${pricePerNight} <span className="text-xs font-normal text-muted-foreground">/ night</span>
          </p>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link to={`/properties/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

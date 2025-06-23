import type { MetaFunction } from "@remix-run/node";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"; // For Date Picker
// import { Calendar } from "@/components/ui/calendar"; // For Date Picker
// import { CalendarIcon, SearchIcon } from "lucide-react"; // Example icons
import { PropertyCard } from "@/components/PropertyCard"; // Reusable property card

export const meta: MetaFunction = () => {
  return [
    { title: "HostingPro - Find Your Perfect Stay" },
    { name: "description", content: "Discover amazing places to stay at unbeatable prices." },
  ];
};

// Placeholder data for featured properties
const featuredProperties = [
  { id: "1", title: "Modern Downtown Loft", city: "New York", pricePerNight: 250, imageUrl: "/placeholder-images/property1.jpg", descriptionSnippet: "Stylish loft with stunning city views." },
  { id: "2", title: "Cozy Beachfront Cottage", city: "Malibu", pricePerNight: 350, imageUrl: "/placeholder-images/property2.jpg", descriptionSnippet: "Relax by the ocean in this charming cottage." },
  { id: "3", title: "Rustic Mountain Cabin", city: "Aspen", pricePerNight: 450, imageUrl: "/placeholder-images/property3.jpg", descriptionSnippet: "Escape to nature with this beautiful cabin." },
  { id: "4", title: "Chic Urban Apartment", city: "Paris", pricePerNight: 180, imageUrl: "/placeholder-images/property4.jpg", descriptionSnippet: "Experience Parisian life in this elegant flat." },
];


export default function Index() {
  // const [date, setDate] = React.useState<DateRange | undefined>() // For Date Picker

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] min-h-[400px] max-h-[700px] w-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 text-white">
          {/* Placeholder for background image if needed:
          <img src="/placeholder-hero.jpg" alt="Scenic view" className="absolute inset-0 object-cover w-full h-full opacity-50" />
          */}
          <div className="container relative z-10 flex h-full flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Find Your Next <span className="text-primary-foreground/90">Perfect Stay</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg text-slate-300 sm:text-xl md:text-2xl">
              Discover unique homes and experiences. Unforgettable trips start here.
            </p>
            <div className="mt-10">
              <Button size="lg" className="text-lg px-8 py-6 bg-white text-slate-900 hover:bg-slate-200">
                Explore Properties
              </Button>
            </div>
          </div>
        </section>

        {/* Search Bar Section - UI Only */}
        <section className="py-12 bg-slate-50 dark:bg-slate-800/50">
          <div className="container">
            <form className="mx-auto max-w-3xl rounded-lg bg-background p-6 shadow-lg -mt-20 relative z-20 border">
              <h3 className="text-xl font-semibold mb-4 text-center">Search for a Stay</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 items-end">
                <div className="md:col-span-2 lg:col-span-1">
                  <label htmlFor="location" className="block text-sm font-medium text-foreground mb-1">Location</label>
                  <Input id="location" type="text" placeholder="e.g., New York, Paris, Tokyo" />
                </div>
                <div>
                  <label htmlFor="checkin" className="block text-sm font-medium text-foreground mb-1">Check-in</label>
                  <Input id="checkin" type="text" placeholder="Select Date" />
                  {/* TODO: Replace with Shadcn Date Picker:
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? format(date.from, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={date?.from} onSelect={(d) => setDate(prev => ({...prev, from: d}))} initialFocus />
                    </PopoverContent>
                  </Popover>
                  */}
                </div>
                <div>
                  <label htmlFor="checkout" className="block text-sm font-medium text-foreground mb-1">Check-out</label>
                  <Input id="checkout" type="text" placeholder="Select Date" />
                   {/* TODO: Replace with Shadcn Date Picker */}
                </div>
                <div className="lg:col-span-1">
                  <Button type="submit" className="w-full">
                    {/* <SearchIcon className="mr-2 h-4 w-4" /> */}
                     Search
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </section>

        {/* Featured Properties Section */}
        <section className="py-12 md:py-16 lg:py-20">
          <div className="container">
            <h2 className="mb-8 text-3xl font-bold tracking-tight text-center">
              Featured Stays
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {featuredProperties.map((property) => (
                <PropertyCard
                  key={property.id}
                  id={property.id}
                  title={property.title}
                  city={property.city}
                  pricePerNight={property.pricePerNight}
                  imageUrl={property.imageUrl} // Will use placeholder for now
                  descriptionSnippet={property.descriptionSnippet}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

 import { Link } from "react-router-dom";
 import { Home, Droplets } from "lucide-react";
 import { Button } from "@/components/ui/button";
 
 const NotFound = () => {
   return (
     <div className="min-h-[70vh] flex items-center justify-center bg-background">
       <div className="text-center px-4">
         <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
           <Droplets className="w-10 h-10 text-primary" />
         </div>
         <h1 className="text-6xl font-display font-bold gradient-text mb-4">404</h1>
         <p className="text-xl text-muted-foreground mb-8">
           Oops! This page doesn't exist.
         </p>
         <Button asChild size="lg">
           <Link to="/">
             <Home className="w-5 h-5 mr-2" />
             Return to Home
           </Link>
         </Button>
       </div>
     </div>
   );
 };
 
 export default NotFound;

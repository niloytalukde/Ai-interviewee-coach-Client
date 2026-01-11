import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl bg-linear-to-br from-primary to-primary/80 p-8 text-center sm:p-12 lg:p-16">
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-white" />
            <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-white" />
          </div>

          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground sm:text-4xl lg:text-5xl">
              Ready to Ace Your Interview?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-primary-foreground/90">
              Join thousands of developers who have improved their interview skills with our AI coach. Start practicing today — it's free!
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" className="gap-2 px-8">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="ghost" className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                View Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;

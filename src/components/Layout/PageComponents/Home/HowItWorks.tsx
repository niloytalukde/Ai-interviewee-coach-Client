import { Badge } from "@/components/ui/badge";
import { steps } from "@/Constance";



const HowItWorks = () => {
  return (
    <section className="bg-muted/30 py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            Simple Process
          </Badge>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground">
            Get started in minutes. Our streamlined process makes interview prep efficient and effective.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <div className="grid gap-8 md:grid-cols-2">
            {steps.map((item, index) => (
              <div key={item.step} className="relative flex gap-4">
                {/* Step number */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-primary-foreground">
                  {item.step}
                </div>
                
                {/* Content */}
                <div className="pt-2">
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>

                {/* Connector line for larger screens */}
                {index < steps.length - 1 && index % 2 === 0 && (
                  <div className="absolute right-0 top-7 hidden h-0.5 w-8 bg-border md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

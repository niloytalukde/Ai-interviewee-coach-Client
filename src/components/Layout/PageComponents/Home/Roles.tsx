import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

const roles = [
  {
    title: "Frontend Developer",
    description: "React, Vue, Angular, CSS, JavaScript, TypeScript, and more.",
    topics: ["React Hooks", "State Management", "CSS Layouts", "Performance", "Accessibility"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Backend Developer",
    description: "Node.js, Python, Java, Databases, APIs, and system design.",
    topics: ["REST APIs", "Databases", "Authentication", "Caching", "Microservices"],
    color: "from-green-500 to-emerald-500",
  },
  {
    title: "Fullstack Developer",
    description: "Complete end-to-end development skills and architecture.",
    topics: ["Full Stack", "DevOps", "System Design", "Testing", "Deployment"],
    color: "from-primary to-accent",
  },
];

const RolesSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Choose Your Path
          </h2>
          <p className="text-lg text-muted-foreground">
            Practice interviews tailored to your specific role and tech stack.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {roles.map((role) => (
            <Card key={role.title} className="group relative overflow-hidden border-border/50 transition-all hover:shadow-xl">
              {/* Gradient header */}
              <div className={`h-2 bg-linear-to-r ${role.color}`} />
              
              <CardHeader>
                <CardTitle className="text-2xl">{role.title}</CardTitle>
                <CardDescription className="text-base">{role.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {role.topics.map((topic) => (
                    <Badge key={topic} variant="secondary">
                      {topic}
                    </Badge>
                  ))}
                </div>
                
                <Button className="w-full gap-2 group-hover:gap-3 transition-all">
                  Start Practice
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RolesSection;

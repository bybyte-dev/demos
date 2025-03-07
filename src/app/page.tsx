import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { projects } from "@/lib/projects";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">ByteDemo</h1>
          <p className="text-xl text-muted-foreground">
            Коллекция реальных проектов и решений от bybyte
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link key={project.slug} href={`/${project.slug}`}>
              <Card className="h-full hover:bg-accent transition-colors">
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.pages.map((page) => (
                      <span
                        key={page.path}
                        className="text-sm px-2 py-1 bg-muted rounded-md"
                      >
                        {page.title}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

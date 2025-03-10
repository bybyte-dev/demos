import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { projects } from "@/lib/projects";
import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 space-y-8">
          {/* Лого */}
          <div className="flex justify-center mb-8">
            <Image
              src="/bybyte-logo-white.svg"
              alt="bybyte logo"
              width={180}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-zinc-400">
            demos
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Коллекция реальных проектов и решений от bybyte
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/${project.slug}`}
              className="block"
            >
              <Card className="h-full transition-all duration-300 hover:translate-y-[-2px] bg-zinc-900/40 hover:bg-zinc-800/50 border-zinc-800/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white/90 text-xl">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-zinc-400 text-base">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.pages.map((page) => (
                      <span
                        key={page.path}
                        className="text-sm px-3 py-1.5 bg-zinc-800/70 text-zinc-200 rounded-full border border-zinc-700/50 hover:border-zinc-600/50 transition-colors"
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

        {/* Нижний колонтитул */}
        <footer className="mt-20 text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} bybyte. Все права защищены.</p>
        </footer>
      </div>
    </div>
  );
}

import { Card } from "@/components/ui/card"
import Link from 'next/link'
import { projects } from '@/lib/projects'

const projectPages = projects.find(p => p.slug === 'reproexport')?.pages || []

export default function ReproexportPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Reproexport - Обзор</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projectPages.map((page) => (
          <Card key={page.path} className="p-6 hover:bg-accent transition-colors">
            <Link href={page.path} className="block">
              <h2 className="text-xl font-semibold mb-2">{page.title}</h2>
              <p className="text-muted-foreground">
                Перейти к разделу →
              </p>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  )
}
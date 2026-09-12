import { projectSlugs } from "@/lib/projects"

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }))
}

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}



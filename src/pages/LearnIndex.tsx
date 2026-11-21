import { PageHeader } from '@/components/PageHeader'
import { ModuleGrid } from './Home'

export function LearnIndex() {
  return (
    <div className="mx-auto max-w-6xl">
      <PageHeader eyebrow="Curriculum" title="Learning modules">
        Physiology first, then benign, malignant, hemostasis and transfusion. Each section is tagged pediatric, adult, or both; use the focus toggle to filter.
      </PageHeader>
      <ModuleGrid />
    </div>
  )
}

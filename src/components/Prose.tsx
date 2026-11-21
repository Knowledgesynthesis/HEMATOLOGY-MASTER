import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'

/** Renders trusted, build-time content HTML and routes internal links through the SPA router. */
export function Prose({ html, className }: { html: string; className?: string }) {
  const navigate = useNavigate()
  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = (e.target as HTMLElement).closest('a')
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    const href = a.getAttribute('href') ?? ''
    if (href.startsWith('#')) {
      e.preventDefault()
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      history.replaceState(null, '', href)
    } else if (href.startsWith('/') && a.target !== '_blank') {
      e.preventDefault()
      navigate(href)
    }
  }
  return (
    <div
      className={cn('prose prose-sm max-w-none dark:prose-invert sm:prose-[15px] prose-a:font-medium prose-a:no-underline hover:prose-a:underline', className)}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}

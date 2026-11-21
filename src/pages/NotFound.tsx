import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/Button'

export function NotFound() {
  return (
    <div className="mx-auto max-w-md py-20 text-center">
      <h1 className="text-5xl font-bold text-primary">404</h1>
      <p className="mt-3 text-muted-foreground">That page doesn’t exist. Try search (⌘K or /).</p>
      <Link to="/">
        <Button className="mt-6">Go home</Button>
      </Link>
    </div>
  )
}

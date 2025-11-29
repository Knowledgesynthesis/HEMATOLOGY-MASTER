import { Link, useLocation } from 'react-router-dom'
import { Home, Settings, FlaskConical } from 'lucide-react'
import { cn } from '@/lib/utils'

export function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4">
          <div className="mr-4 flex">
            <Link to="/" className="mr-6 flex items-center space-x-2">
              <FlaskConical className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Hematology Master</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-1">
              <Link
                to="/"
                className={cn(
                  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2',
                  location.pathname === '/' && 'bg-accent'
                )}
              >
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
              <Link
                to="/settings"
                className={cn(
                  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2',
                  location.pathname === '/settings' && 'bg-accent'
                )}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container py-6 px-4">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for educational purposes only. Not for clinical use.
          </p>
        </div>
      </footer>
    </div>
  )
}

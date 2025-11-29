import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { useThemeStore } from '@/store/themeStore'
import { Moon, Sun } from 'lucide-react'

export function Settings() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your application preferences
        </p>
      </div>

      {/* Theme Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize how the app looks on your device
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <div className="text-sm font-medium">Theme</div>
              <div className="text-sm text-muted-foreground">
                Current theme: {theme === 'dark' ? 'Dark' : 'Light'}
              </div>
            </div>
            <Button
              variant="outline"
              size="default"
              onClick={toggleTheme}
              className="gap-2"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="h-4 w-4" />
                  Switch to Light
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4" />
                  Switch to Dark
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle>About Hematology Master</CardTitle>
          <CardDescription>
            Learn more about this educational platform
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold">Mission</h3>
            <p className="text-sm text-muted-foreground">
              Hematology Master is a comprehensive educational platform designed to make hematology
              intuitive, digestible, and memorable. Our goal is to help medical students, residents,
              and fellows master everything from basic physiology to complex diagnostic pathways.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Features</h3>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
              <li>Complete coverage of benign and malignant hematology</li>
              <li>Interactive tools for lab interpretation and pattern recognition</li>
              <li>Case-based learning with immediate feedback</li>
              <li>Mobile-first design for learning on the go</li>
              <li>Offline capability for uninterrupted access</li>
              <li>Session-only assessments with no data tracking</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Version</h3>
            <p className="text-sm text-muted-foreground">
              Version 1.0.0
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Disclaimers */}
      <Card className="border-yellow-500/50">
        <CardHeader>
          <CardTitle>Important Disclaimers</CardTitle>
          <CardDescription>
            Please read carefully before using this application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-yellow-600 dark:text-yellow-500">
              Educational Purpose Only
            </h3>
            <p className="text-sm text-muted-foreground">
              This application is designed solely for educational purposes. It is NOT intended for
              clinical use, medical diagnosis, treatment decisions, or patient care.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-yellow-600 dark:text-yellow-500">
              Not Medical Advice
            </h3>
            <p className="text-sm text-muted-foreground">
              The content provided does not constitute medical advice, diagnosis, or treatment.
              Always seek the advice of qualified health providers with questions regarding medical
              conditions.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-yellow-600 dark:text-yellow-500">
              Synthetic Data
            </h3>
            <p className="text-sm text-muted-foreground">
              All cases, laboratory values, and clinical scenarios presented are synthetic and
              created for educational purposes. They do not represent real patients or actual
              clinical data.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-yellow-600 dark:text-yellow-500">
              No Data Collection
            </h3>
            <p className="text-sm text-muted-foreground">
              This application does not track, store, or collect user data. All quiz results and
              progress are session-only and are not saved when you close the application.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-yellow-600 dark:text-yellow-500">
              Accuracy and Currency
            </h3>
            <p className="text-sm text-muted-foreground">
              While we strive for accuracy, medical knowledge evolves rapidly. This content should
              be used as a learning supplement alongside current textbooks, peer-reviewed
              literature, and expert instruction.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-yellow-600 dark:text-yellow-500">
              Professional Responsibility
            </h3>
            <p className="text-sm text-muted-foreground">
              Users are responsible for verifying information and using appropriate clinical
              judgment in their professional practice. Never rely solely on this application for
              clinical decision-making.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

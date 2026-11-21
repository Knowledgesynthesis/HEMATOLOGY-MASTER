import { useState } from 'react'
import { FocusToggle } from '@/components/Layout'
import { PageHeader } from '@/components/PageHeader'
import { Button } from '@/components/ui/Button'
import { Segmented } from '@/components/ui/Field'
import { usePrefs, type Theme } from '@/store/prefs'
import { useProgress } from '@/store/progress'

export function Settings() {
  const { theme, setTheme } = usePrefs()
  const reset = useProgress((s) => s.reset)
  const [confirm, setConfirm] = useState(false)
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader title="Settings" />
      <div className="space-y-5 rounded-2xl border bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="font-medium">Theme</div>
            <div className="text-sm text-muted-foreground">Dark is the default.</div>
          </div>
          <Segmented<Theme>
            label="Theme"
            value={theme}
            onChange={setTheme}
            options={[
              { value: 'dark', label: 'Dark' },
              { value: 'light', label: 'Light' },
              { value: 'system', label: 'System' },
            ]}
          />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-5">
          <div>
            <div className="font-medium">Content focus</div>
            <div className="text-sm text-muted-foreground">Filters sections, questions and cases. Shared content always shows.</div>
          </div>
          <FocusToggle />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t pt-5">
          <div>
            <div className="font-medium">Progress</div>
            <div className="text-sm text-muted-foreground">Stored only in this browser. Nothing is sent anywhere.</div>
          </div>
          {confirm ? (
            <div className="flex gap-2">
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  reset()
                  setConfirm(false)
                }}
              >
                Erase all progress
              </Button>
              <Button variant="outline" size="sm" onClick={() => setConfirm(false)}>
                Cancel
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setConfirm(true)}>
              Reset progress
            </Button>
          )}
        </div>
      </div>
      <div className="rounded-2xl border bg-card p-5 text-sm text-muted-foreground">
        <div className="mb-1 font-medium text-foreground">About</div>
        Hematology Master is a free, offline-capable study and bedside reference. Content is cited to current guidelines and trials (see References) and is reviewed for
        currency. It works offline once loaded, and can be installed to your home screen.
      </div>
    </div>
  )
}

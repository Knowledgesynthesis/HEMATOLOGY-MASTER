import { NumberField, SelectField } from '@/components/ui/Field'
import { ageToDays, type AgeUnit, type Sex } from '@/lib/ranges'
import { num } from '@/lib/interpret/types'

export interface AgeSexState {
  age: string
  unit: AgeUnit
  sex: Sex
}

export const defaultAgeSex: AgeSexState = { age: '', unit: 'years', sex: 'female' }

export function ageDaysOf(s: AgeSexState): number | undefined {
  const a = num(s.age)
  return a === undefined || a < 0 ? undefined : ageToDays(a, s.unit)
}

export function AgeSexInput({ value, onChange }: { value: AgeSexState; onChange: (v: AgeSexState) => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      <NumberField label="Age" value={value.age} onChange={(age) => onChange({ ...value, age })} placeholder="e.g. 3" />
      <SelectField<AgeUnit>
        label="Unit"
        value={value.unit}
        onChange={(unit) => onChange({ ...value, unit })}
        options={[
          { value: 'days', label: 'days' },
          { value: 'weeks', label: 'weeks' },
          { value: 'months', label: 'months' },
          { value: 'years', label: 'years' },
        ]}
      />
      <div className="col-span-2 sm:col-span-1">
      <SelectField<Sex>
        label="Sex"
        value={value.sex}
        onChange={(sex) => onChange({ ...value, sex })}
        options={[
          { value: 'female', label: 'Female' },
          { value: 'male', label: 'Male' },
        ]}
      />
      </div>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export default function SearchPage() {
  const [from, setFrom] = useState('JFK')
  const [to, setTo] = useState('LHR')
  const [date, setDate] = useState('2025-10-20')
  const [cabin, setCabin] = useState<'Business' | 'First'>('Business')
  const router = useRouter()

  return (
    <div className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold mb-6">Search Business / First</h1>
      <div className="grid gap-4 grid-cols-2">
        <div>
          <Label htmlFor="from">From (IATA)</Label>
          <Input id="from" value={from} onChange={e=>setFrom(e.target.value.toUpperCase())} placeholder="JFK" />
        </div>
        <div>
          <Label htmlFor="to">To (IATA)</Label>
          <Input id="to" value={to} onChange={e=>setTo(e.target.value.toUpperCase())} placeholder="LHR" />
        </div>
        <div>
          <Label htmlFor="date">Date</Label>
          <Input id="date" type="date" value={date} onChange={e=>setDate(e.target.value)} />
        </div>
        <div>
          <Label>Class</Label>
          <Select value={cabin} onValueChange={(v)=>setCabin(v as any)}>
            <SelectTrigger>
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Business">Business</SelectItem>
              <SelectItem value="First">First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Button className="mt-6" onClick={() => router.push(`/results?from=${from}&to=${to}&date=${date}&class=${cabin}`)}>
        Search
      </Button>
    </div>
  )
}



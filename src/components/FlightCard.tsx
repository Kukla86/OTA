import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import type { FlightOffer } from '@/lib/types'
import { Badge } from '@/components/ui/badge'

export function FlightCard({ offer, action }: { offer: FlightOffer; action?: React.ReactNode }) {
  return (
    <Card className="card-hover">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">
          {offer.airline} <span className="text-sm text-muted-foreground">({offer.provider})</span>
        </CardTitle>
        <Badge variant="secondary">{offer.class}</Badge>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
        <div>
          <div className="font-medium text-foreground">{offer.from} → {offer.to}</div>
          <div>{offer.departure} → {offer.arrival}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-semibold text-foreground">${'{'}offer.price{'}'}</div>
        </div>
      </CardContent>
      {action && (
        <CardFooter className="flex justify-end">
          {action}
        </CardFooter>
      )}
    </Card>
  )
}



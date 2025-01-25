"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

export default function SubmitBid() {
  const [date, setDate] = useState()

  return (
    (<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Submit Bid</h1>
      <Card>
        <CardHeader>
          <CardTitle>Bid Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="bidAmount">Bid Amount (USD)</Label>
              <Input id="bidAmount" placeholder="Enter bid amount" type="number" />
            </div>
            <div className="space-y-2">
              <Label>Proposed Timeline</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-neutral-500 dark:text-neutral-400"
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <Label htmlFor="proposal">Proposal</Label>
              <Textarea id="proposal" placeholder="Enter your proposal details" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fileUpload">Upload Documents</Label>
              <Input id="fileUpload" type="file" multiple />
            </div>
            <Button type="submit" className="w-full">
              Submit Bid
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>)
  );
}


"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPinIcon, BuildingIcon, DollarSignIcon, CalendarIcon } from "lucide-react"

const tenders = [
  {
    id: 1,
    title: "City Center Redevelopment",
    location: "New York, NY",
    sector: "Infrastructure",
    budget: "10M - 15M USD",
    deadline: "2023-08-15",
  },
  {
    id: 2,
    title: "Smart Traffic Management System",
    location: "San Francisco, CA",
    sector: "IT",
    budget: "5M - 7M USD",
    deadline: "2023-09-01",
  },
  {
    id: 3,
    title: "Public Library Renovation",
    location: "Chicago, IL",
    sector: "Construction",
    budget: "2M - 3M USD",
    deadline: "2023-07-30",
  },
]

export default function TenderSearch() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSector, setSelectedSector] = useState("")
  const [budgetRange, setBudgetRange] = useState([0, 20])

  return (
    (<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tender Search</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Input
          placeholder="Search tenders..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} />
        <Select value={selectedSector} onValueChange={setSelectedSector}>
          <SelectTrigger>
            <SelectValue placeholder="Select sector" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="construction">Construction</SelectItem>
            <SelectItem value="it">IT</SelectItem>
            <SelectItem value="infrastructure">Infrastructure</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Budget Range (M USD):</span>
          <Slider
            min={0}
            max={20}
            step={1}
            value={budgetRange}
            onValueChange={setBudgetRange} />
          <span className="text-sm text-gray-500">
            {budgetRange[0]} - {budgetRange[1]}
          </span>
        </div>
        <Button>Search</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tenders.map((tender) => (
          <Card key={tender.id}>
            <CardHeader>
              <CardTitle>{tender.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  {tender.location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <BuildingIcon className="mr-2 h-4 w-4" />
                  {tender.sector}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <DollarSignIcon className="mr-2 h-4 w-4" />
                  {tender.budget}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Deadline: {tender.deadline}
                </div>
              </div>
              <Button className="mt-4 w-full">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>)
  );
}


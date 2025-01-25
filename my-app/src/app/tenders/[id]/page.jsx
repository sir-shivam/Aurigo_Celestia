"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MapPinIcon, BuildingIcon, DollarSignIcon, CalendarIcon, TrendingUpIcon } from "lucide-react";

const budgetTrendsData = [
  { year: "2020", amount: 12 },
  { year: "2021", amount: 15 },
  { year: "2022", amount: 14 },
  { year: "2023", amount: 18 },
]

const competitorAnalysisData = [
  { name: "Our Bid", value: 15 },
  { name: "Competitor A", value: 16 },
  { name: "Competitor B", value: 14 },
  { name: "Competitor C", value: 17 },
]

export default function TenderDetails() {
  return (
    (<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">City Center Redevelopment</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tender Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-500">
                <MapPinIcon className="mr-2 h-4 w-4" />
                New York, NY
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <BuildingIcon className="mr-2 h-4 w-4" />
                Infrastructure
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <DollarSignIcon className="mr-2 h-4 w-4" />
                10M - 15M USD
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <CalendarIcon className="mr-2 h-4 w-4" />
                Deadline: 2023-08-15
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">AI Recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 mb-2">$13.5M</div>
            <div className="text-sm text-gray-500 mb-4">Recommended Bid Amount</div>
            <div className="flex items-center">
              <TrendingUpIcon className="mr-2 h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-600">85% Confidence Level</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button className="w-full">Submit Proposal</Button>
            <Button variant="outline" className="w-full">
              Add to Watchlist
            </Button>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="description" className="space-y-4">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="budgetTrends">Budget Trends</TabsTrigger>
          <TabsTrigger value="competitorAnalysis">Competitor Analysis</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <Card>
            <CardHeader>
              <CardTitle>Project Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">
                The City Center Redevelopment project aims to revitalize the downtown area, creating a modern,
                sustainable, and vibrant urban space. The project includes the renovation of existing structures,
                construction of new buildings, and improvement of public spaces and infrastructure.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="budgetTrends">
          <Card>
            <CardHeader>
              <CardTitle>Budget Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  amount: {
                    label: "Budget Amount (M USD)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={budgetTrendsData}>
                    <CartesianGrid strokeDasharray="3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="amount" fill="var(--color-amount)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="competitorAnalysis">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  value: {
                    label: "Bid Amount (M USD)",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={competitorAnalysisData}>
                    <CartesianGrid strokeDasharray="3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="value" fill="var(--color-value)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>)
  );
}


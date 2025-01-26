"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { MapPinIcon, FileTextIcon, TrendingUpIcon, AlertTriangleIcon } from "lucide-react"
import fetchCSV from "../Data/exel"





const data = [
  { name: "Jan", won: 4, lost: 2, pending: 1 },
  { name: "Feb", won: 3, lost: 3, pending: 2 },
  { name: "Mar", won: 5, lost: 1, pending: 3 },
  { name: "Apr", won: 6, lost: 2, pending: 1 },
  { name: "May", won: 4, lost: 3, pending: 2 },
  { name: "Jun", won: 7, lost: 1, pending: 1 },
]

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  useEffect(() => {

    fetchCSV();
    console.log("hello");
  
    
  }, []);

  return (
    (<div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button>Download</Button>
          <Button>Create New Bid</Button>
        </div>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Active Tenders</CardTitle>
                <FileTextIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">127</div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">+5.9% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                <TrendingUpIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">74%</div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">+2.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Decisions</CardTitle>
                <AlertTriangleIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">-2 from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Regions</CardTitle>
                <MapPinIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">7</div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">+1 new region this month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    won: {
                      label: "Won Bids",
                      color: "hsl(var(--chart-1))",
                    },
                    lost: {
                      label: "Lost Bids",
                      color: "hsl(var(--chart-2))",
                    },
                    pending: {
                      label: "Pending Bids",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="won" stroke="var(--color-won)" />
                      <Line type="monotone" dataKey="lost" stroke="var(--color-lost)" />
                      <Line type="monotone" dataKey="pending" stroke="var(--color-pending)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">New tender added: Highway Construction Project</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Bid submitted: Office Building Renovation</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">Tender won: Bridge Maintenance Contract</p>
                      <p className="text-sm text-neutral-500 dark:text-neutral-400">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>)
  );
}


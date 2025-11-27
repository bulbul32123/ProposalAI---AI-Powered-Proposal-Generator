"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, Crown, Check } from "lucide-react"
import { getUsage, getUsageLimit, getSubscription, setSubscription } from "@/lib/storage"
import { toast } from "sonner"

export default function DashboardPage() {
  const [usage, setUsage] = useState({ used: 0 })
  const [limit, setLimit] = useState(5)
  const [plan, setPlan] = useState("free")

  useEffect(() => {
    setUsage(getUsage())
    setLimit(getUsageLimit())
    setPlan(getSubscription())
  }, [])

  const percentage = Math.round((usage.used / limit) * 100)
  const remaining = limit - usage.used

  function handleUpgrade() {
    setSubscription("pro")
    setPlan("pro")
    setLimit(30)
    toast.success("Upgraded to Pro! You now have 30 proposals per month.")
  }

  const benefits = ["Unlimited proposals", "Advanced AI models", "Custom templates", "Priority support"]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-navy">Dashboard</h2>
          <p className="text-muted-foreground">Track your proposal usage and subscription status</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <TrendingUp className="w-5 h-5 text-teal" />
                Monthly Usage
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {usage.used} of {limit} proposals used
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{percentage}%</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-navy to-gray-400 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="bg-teal-light border border-teal/20 rounded-xl p-6 text-center">
                  <p className="text-4xl font-bold text-amber">{remaining}</p>
                  <p className="text-sm text-teal font-medium">Proposals Remaining</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Crown className="w-5 h-5 text-amber" />
                Subscription
              </CardTitle>
              <p className="text-sm text-muted-foreground">Current plan and billing</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{plan === "pro" ? "Pro Plan" : "Free Plan"}</p>
                    <p className="text-sm text-muted-foreground">{plan === "pro" ? "30" : "5"} proposals per month</p>
                  </div>
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-medium rounded-full">
                    Active
                  </span>
                </div>

                {plan === "free" && (
                  <>
                    <div className="border-t pt-4">
                      <p className="text-sm font-medium mb-3">Upgrade Benefits:</p>
                      <ul className="space-y-2">
                        {benefits.map((benefit) => (
                          <li key={benefit} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Check className="w-4 h-4 text-teal" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Button onClick={handleUpgrade} className="w-full bg-teal hover:bg-teal/90 text-white">
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Pro
                    </Button>
                  </>
                )}

                {plan === "pro" && (
                  <div className="bg-teal-light border border-teal/20 rounded-lg p-4 text-center">
                    <p className="text-sm text-teal font-medium">You're on the Pro plan with unlimited features!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

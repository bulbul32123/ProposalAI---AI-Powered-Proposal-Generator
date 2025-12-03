"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, DollarSign, RefreshCw } from "lucide-react"

const pricingPlans = [
    {
        name: "Free",
        description: "Perfect for testing & small projects (Powered by Gemini Flash)",
        isFree: true,
        popular: false,
        prices: {
            monthly: { BDT: 0, USD: 0 },
            yearly: { BDT: 0, USD: 0 },
        },
        features: [
            "10 Proposals per Month (Usage Cap)",
            "Basic Template Library (3 Styles)",
            "AI Draft Generation (Max 500 words)",
            "Copy & Paste Output (Text Only)",
            "Standard Language Tones",
            "Community Support Forum"
        ],
    },
    {
        name: "Pro",
        description: "Close more deals with high-quality, professional proposals (Powered by GPT-4o Mini)",
        isFree: false,
        popular: true,
        prices: {
            monthly: { BDT: 99, USD: 2 },
            yearly: { BDT: 1089, USD: 22 },
        },
        features: [
            "150 Proposals per Month (20x Cap)",
            "GPT-4o Mini for Superior Quality",
            "Advanced Template Library (15+ Styles)",
            "Full Brand Customization (Logo & Colors)",
            "Advanced Analytics (Client View Tracking)",
        ],
    },
]

const formatCurrency = (amount, currency) => {
    if (currency === 'BDT') {
        return `৳${amount}`;
    }
    return `$${amount}`;
};


export default function PricingSection() {

    const [isYearly, setIsYearly] = useState(false)
    const [isBDT, setIsBDT] = useState(true)
    const proPlan = pricingPlans.find(p => p.name === 'Pro');
    const monthlyPrice = isBDT ? proPlan.prices.monthly.BDT : proPlan.prices.monthly.USD;
    const yearlyPrice = isBDT ? proPlan.prices.yearly.BDT : proPlan.prices.yearly.USD;
    const calculatedSavings = ((monthlyPrice * 12) - yearlyPrice) / (monthlyPrice * 12);
    const savingsPercentage = Math.round(calculatedSavings * 100);


    return (
        <section className="py-24 px-4" aria-labelledby="pricing-heading">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 id="pricing-heading" className="text-4xl font-bold text-balance mb-4">
                        Choose Your Plan
                    </h1>
                    <p className="text-xl text-muted-foreground text-balance mb-8">
                        Select the perfect plan for your needs. Prices adjust automatically based on your currency selection.
                    </p>

                    <div className="flex flex-col items-center gap-6 mb-8">
                        <div className="flex items-center justify-center gap-4">
                            <span
                                className={`text-sm font-medium w-16 text-center transition-colors ${isBDT ? "text-foreground" : "text-muted-foreground"}`}
                            >
                                Local (BDT)
                            </span>
                            <button
                                onClick={() => setIsBDT(!isBDT)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${!isBDT ? "bg-primary" : "bg-muted"
                                    }`}
                                role="switch"
                                aria-checked={!isBDT}
                                aria-label="Toggle currency between BDT and USD"
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${!isBDT ? "translate-x-6" : "translate-x-1"
                                        }`}
                                    aria-hidden="true"
                                />
                            </button>
                            <span
                                className={`text-sm font-medium w-16 text-center transition-colors ${!isBDT ? "text-foreground" : "text-muted-foreground"}`}
                            >
                                Global (USD)
                            </span>
                        </div>

                        <div className="flex items-center justify-center gap-4">
                            <span
                                className={`text-sm font-medium w-16 text-center ${!isYearly ? "text-foreground" : "text-muted-foreground"}`}
                            >
                                Monthly
                            </span>
                            <button
                                onClick={() => setIsYearly(!isYearly)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${isYearly ? "bg-primary" : "bg-muted"
                                    }`}
                                role="switch"
                                aria-checked={isYearly}
                                aria-label="Toggle between monthly and yearly billing"
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isYearly ? "translate-x-6" : "translate-x-1"
                                        }`}
                                    aria-hidden="true"
                                />
                            </button>
                            <span
                                className={`text-sm font-medium w-16 text-center ${isYearly ? "text-foreground" : "text-muted-foreground"}`}
                            >
                                Yearly
                            </span>
                        </div>

                        <div className="min-h-[24px] flex justify-center">
                            {isYearly && (
                                <Badge variant="secondary" aria-label={`${savingsPercentage}% savings with yearly billing`}>
                                    Save {savingsPercentage}% (1 Month Free)
                                </Badge>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto" role="list" aria-label="Pricing plans">
                    {pricingPlans.map((plan, index) => {
                        const currentCurrency = isBDT ? 'BDT' : 'USD';
                        const currentPrice = isYearly
                            ? plan.prices.yearly[currentCurrency]
                            : plan.prices.monthly[currentCurrency];

                        const currencySymbol = isBDT ? '৳' : '$';
                        const timeUnit = isYearly ? "year" : "month";

                        const priceDisplay = plan.isFree ? (
                            <span className="text-4xl font-bold">Free</span>
                        ) : (
                            <span className="text-4xl font-bold">{formatCurrency(currentPrice, currentCurrency)}</span>
                        );


                        return (
                            <Card
                                key={plan.name}
                                className={`relative flex flex-col h-[600px] ${plan.popular ? "border-primary shadow-lg scale-105" : ""}`}
                                role="listitem"
                                aria-labelledby={`plan-${index}-title`}
                            >
                                {plan.popular && (
                                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2" aria-label="Most popular plan">
                                        Most Popular
                                    </Badge>
                                )}

                                <CardHeader className="text-center pb-8">
                                    <CardTitle className="text-2xl font-bold" id={`plan-${index}-title`}>
                                        {plan.name}
                                    </CardTitle>
                                    <CardDescription className="text-balance" id={`plan-${index}-description`}>
                                        {plan.description}
                                    </CardDescription>
                                    <div className="mt-4" id={`plan-${index}-price`}>
                                        {priceDisplay}
                                        {!plan.isFree && (
                                            <span className="text-muted-foreground" aria-hidden="true">
                                                /{timeUnit}
                                            </span>
                                        )}
                                        {isYearly && !plan.isFree && (
                                            <div
                                                className="text-sm text-muted-foreground mt-1"
                                                aria-label={`Billed annually`}
                                            >
                                                Billed Annually
                                            </div>
                                        )}
                                    </div>
                                </CardHeader>

                                <CardContent className="flex-grow">
                                    <ul className="space-y-3" aria-label={`${plan.name} plan features`}>
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start gap-3">
                                                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" aria-hidden="true" />
                                                <span className="text-sm">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>

                                <CardFooter>
                                    <Button
                                        className={`w-full ${!plan.popular
                                            ? "dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 dark:hover:border-gray-600"
                                            : ""
                                            }`}
                                        variant={plan.popular ? "default" : "outline"}
                                        size="lg"
                                        aria-label={`Get started with ${plan.name} plan for ${formatCurrency(currentPrice, currentCurrency)} per ${timeUnit}`}
                                    >
                                        {plan.isFree ? "Currently" : "Get Started"}
                                    </Button>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>

                <div className="text-center mt-16">
                    <p className="text-muted-foreground">Local payments supported via bKash/Nagad. International payments via Credit Card.</p>
                </div>
            </div>
        </section>
    )
}
git add app/pricing/page.jsx
git commit -m "pricing updated" --date="2025-12-03"
git push -u origin main
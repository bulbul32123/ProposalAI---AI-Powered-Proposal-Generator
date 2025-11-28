"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sparkles, Copy, RefreshCw, Check, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { getProfile, saveProposal, getUsage, incrementUsage, getUsageLimit } from "@/lib/storage"
import { cn } from "@/lib/utils"

const tones = ["Professional", "Friendly", "Urgent"]

export default function GeneratePage() {
  const [jobDescription, setJobDescription] = useState("")
  const [tone, setTone] = useState("Professional")
  const [proposal, setProposal] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)
  const [profile, setProfile] = useState(null)
  const [displayedText, setDisplayedText] = useState("")

  useEffect(() => {
    setProfile(getProfile())
  }, [])

  useEffect(() => {
    if (proposal && !isGenerating) {
      let index = 0
      setDisplayedText("")
      const interval = setInterval(() => {
        if (index < proposal.length) {
          setDisplayedText(proposal.slice(0, index + 1))
          index++
        } else {
          clearInterval(interval)
        }
      }, 10)
      return () => clearInterval(interval)
    }
  }, [proposal, isGenerating])

  async function handleGenerate() {
    if (!jobDescription.trim()) {
      toast.error("Please enter a job description")
      return
    }

    const usage = getUsage()
    const limit = getUsageLimit()

    if (usage.used >= limit) {
      toast.error("Monthly usage limit reached. Please upgrade to Pro!")
      return
    }

    setIsGenerating(true)
    setProposal("")
    setDisplayedText("")

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobDescription,
          tone,
          profile,
        }),
      })

      const data = await response.json()

      if (data.error) {
        toast.error(data.error)
        return
      }

      setProposal(data.proposal)
      incrementUsage()

      saveProposal({
        id: Date.now(),
        jobTitle: jobDescription.slice(0, 60) + (jobDescription.length > 60 ? "..." : ""),
        jobDescription,
        proposal: data.proposal,
        tone,
        date: new Date().toISOString(),
      })

      toast.success("Proposal generated successfully!")
    } catch (error) {
      toast.error("Failed to generate proposal. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(proposal)
    setCopied(true)
    toast.success("Copied!")
    setTimeout(() => setCopied(false), 2000)
  }

  function handleRegenerate() {
    handleGenerate()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-navy">Generate Proposal</h2>
          <p className="text-muted-foreground">Create a winning proposal for your next freelance job</p>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Job Description</label>
                <Textarea
                  placeholder="Paste the job description here..."
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="min-h-[150px] resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tone</label>
                <div className="flex gap-2">
                  {tones.map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={cn(
                        "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                        tone === t ? "bg-teal text-white" : "bg-secondary text-muted-foreground hover:bg-secondary/80",
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="w-full bg-teal hover:bg-teal/90 text-white"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Winning Proposal
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {(proposal || isGenerating) && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Generated Proposal</CardTitle>
              {proposal && !isGenerating && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={handleCopy} className="gap-2 bg-transparent">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleRegenerate} className="gap-2 bg-transparent">
                    <RefreshCw className="w-4 h-4" />
                    Regenerate
                  </Button>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {isGenerating ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-teal" />
                </div>
              ) : (
                <div className="prose prose-sm max-w-none">
                  <p className="whitespace-pre-wrap text-foreground leading-relaxed">
                    {displayedText}
                    {displayedText.length < proposal.length && <span className="animate-pulse">|</span>}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

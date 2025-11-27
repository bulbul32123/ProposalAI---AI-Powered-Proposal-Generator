"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Eye, Copy, Calendar, Check } from "lucide-react"
import { toast } from "sonner"
import { getProposals } from "@/lib/storage"
import { cn } from "@/lib/utils"

export default function HistoryPage() {
  const [proposals, setProposals] = useState([])
  const [selectedProposal, setSelectedProposal] = useState(null)
  const [copiedId, setCopiedId] = useState(null)

  useEffect(() => {
    setProposals(getProposals())
  }, [])

  function handleCopy(proposal, e) {
    e.stopPropagation()
    navigator.clipboard.writeText(proposal.proposal)
    setCopiedId(proposal.id)
    toast.success("Copied!")
    setTimeout(() => setCopiedId(null), 2000)
  }

  function formatDate(dateString) {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-navy">Proposal History</h2>
          <p className="text-muted-foreground">View and manage your previously generated proposals</p>
        </div>

        {proposals.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No proposals yet. Generate your first proposal!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <Card key={proposal.id} className="hover:shadow-md transition-shadow">
                <CardContent className="py-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate mb-1">{proposal.jobTitle}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(proposal.date)}
                        </span>
                        <span className={cn("px-2 py-0.5 rounded-full text-xs font-medium", "bg-teal/10 text-teal")}>
                          {proposal.tone}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{proposal.proposal}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedProposal(proposal)}
                        className="gap-1"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      <Button variant="outline" size="sm" onClick={(e) => handleCopy(proposal, e)} className="gap-1">
                        {copiedId === proposal.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={!!selectedProposal} onOpenChange={() => setSelectedProposal(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedProposal?.jobTitle}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Job Description</h4>
                <p className="text-sm bg-secondary p-3 rounded-lg">{selectedProposal?.jobDescription}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Generated Proposal</h4>
                <p className="text-sm whitespace-pre-wrap leading-relaxed">{selectedProposal?.proposal}</p>
              </div>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(selectedProposal?.proposal)
                  toast.success("Copied!")
                }}
                className="w-full bg-teal hover:bg-teal/90 text-white"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Proposal
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}

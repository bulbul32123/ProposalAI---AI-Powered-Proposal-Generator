export function getProfile() {
  if (typeof window === "undefined") return null
  const stored = localStorage.getItem("proposalai_profile")
  return stored ? JSON.parse(stored) : null
}

export function saveProfile(profile) {
  if (typeof window === "undefined") return
  localStorage.setItem("proposalai_profile", JSON.stringify(profile))
}

export function getProposals() {
  if (typeof window === "undefined") return []
  const stored = localStorage.getItem("proposalai_proposals")
  return stored ? JSON.parse(stored) : []
}

export function saveProposal(proposal) {
  if (typeof window === "undefined") return
  const proposals = getProposals()
  proposals.unshift(proposal)
  localStorage.setItem("proposalai_proposals", JSON.stringify(proposals))
}

export function getUsage() {
  if (typeof window === "undefined") return { used: 0, month: new Date().getMonth() }
  const stored = localStorage.getItem("proposalai_usage")
  const usage = stored ? JSON.parse(stored) : { used: 0, month: new Date().getMonth() }

  // Reset if new month
  if (usage.month !== new Date().getMonth()) {
    return { used: 0, month: new Date().getMonth() }
  }
  return usage
}

export function incrementUsage() {
  if (typeof window === "undefined") return
  const usage = getUsage()
  usage.used += 1
  localStorage.setItem("proposalai_usage", JSON.stringify(usage))
}

export function getSubscription() {
  if (typeof window === "undefined") return "free"
  return localStorage.getItem("proposalai_subscription") || "free"
}

export function setSubscription(plan) {
  if (typeof window === "undefined") return
  localStorage.setItem("proposalai_subscription", plan)
}

export function getUsageLimit() {
  const plan = getSubscription()
  return plan === "pro" ? 30 : 5
}


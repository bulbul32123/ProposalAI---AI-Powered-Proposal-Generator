"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { User, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { getProfile, saveProfile } from "@/lib/storage"

export default function ProfilePage() {
  const [profile, setProfile] = useState({
    name: "",
    skills: "",
    experience: "",
    bio: "",
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const stored = getProfile()
    if (stored) {
      setProfile(stored)
    }
  }, [])

  async function handleSave() {
    setIsSaving(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    saveProfile(profile)
    setIsSaving(false)
    toast.success("Profile Saved!")
  }

  function getPreviewText() {
    const name = profile.name || "Your name"
    const experience = profile.experience || "X"
    const skills = profile.skills || "your skills"

    return `"I'm ${name}, with ${experience} years of experience. My expertise in ${skills} enables me to deliver exceptional results."`
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-navy">My Profile</h2>
          <p className="text-muted-foreground">
            Your profile helps AI generate more personalized and effective proposals
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="w-5 h-5 text-teal" />
                  Profile Information
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  This information will be used by AI to personalize your proposals
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input
                      placeholder="Enter your full name"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="focus:border-teal focus:ring-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Skills</label>
                    <Input
                      placeholder="e.g., React, Node.js, Python, UI/UX Design"
                      value={profile.skills}
                      onChange={(e) => setProfile({ ...profile, skills: e.target.value })}
                      className="focus:border-teal focus:ring-teal"
                    />
                    <p className="text-xs text-teal mt-1">Separate multiple skills with commas</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Years of Experience</label>
                    <Input
                      type="number"
                      placeholder="e.g., 5"
                      value={profile.experience}
                      onChange={(e) => setProfile({ ...profile, experience: e.target.value })}
                      className="focus:border-teal focus:ring-teal"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Personal Bio / Value Summary</label>
                    <Textarea
                      placeholder="Write a brief summary of your expertise and what makes you unique..."
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      className="min-h-[100px] resize-none focus:border-teal focus:ring-teal"
                    />
                  </div>

                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full bg-teal hover:bg-teal/90 text-white"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      "Save Profile"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="bg-teal-light border-teal/20">
              <CardHeader>
                <CardTitle className="text-base text-navy">How AI Uses Your Data</CardTitle>
                <p className="text-sm text-muted-foreground">Preview of personalized proposal content</p>
              </CardHeader>
              <CardContent>
                <div className="bg-card border border-teal/20 rounded-lg p-4 mb-4">
                  <p className="text-sm italic text-foreground leading-relaxed">{getPreviewText()}</p>
                </div>
                <div className="text-xs text-muted-foreground space-y-1">
                  <p className="font-medium">AI will incorporate:</p>
                  <ul className="list-disc list-inside space-y-1 ml-1">
                    <li>Your name and experience</li>
                    <li>Relevant skills for each job</li>
                    <li>Your unique value proposition</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

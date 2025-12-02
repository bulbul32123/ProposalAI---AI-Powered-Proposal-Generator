export async function POST(request) {
  const { jobDescription, tone, profile } = await request.json()

  // --- REFINED SYSTEM MESSAGE ---
  const systemMessage = `
 You are an expert Proposal Architect and persuasive freelance copywriter. Your primary goal is to generate a highly effective, concise, and scannable proposal tailored to a specific job posting.

 Output Constraint: The final proposal MUST be strictly between 200 and 300 words total. Prioritize clarity, immediate value, and a strong call-to-action.
  `.trim()

  const toneInstructions = {
    Professional: "Use a formal, business-like tone. Be respectful and emphasize expertise and proven methodology.",
    Friendly: "Use a warm, conversational tone. Be approachable while maintaining professionalism and highlighting collaborative fit.",
    Urgent: "Convey enthusiasm and quick, reliable turnaround. Emphasize immediate availability, speed, and efficiency in delivery.",
  }

  let profileContext = ""
  if (profile) {
    if (profile.name) profileContext += `\nFreelancer Name: ${profile.name}`
    if (profile.skills) profileContext += `\nSkills: ${profile.skills}`
    if (profile.experience) profileContext += `\nYears of Experience: ${profile.experience}`
    if (profile.bio) profileContext += `\nBio: ${profile.bio}`
  }

const prompt = `
Generate a winning freelance proposal based on the details below.

Job Posting:
${jobDescription}

${profileContext ? `Profile: ${profileContext}` : ""}

Tone: ${toneInstructions[tone] || toneInstructions.Professional}

Rules: 
1. Focus on client value/results, not just features.
2. Use natural, human phrasing and do not use Dear.
3. Total length MUST be 200-300 words.
4. Use freelancer information to give it a professionalism

Structure:
1. Greeting (Personalized hook).
2. Demonstrate you understand their pain point better than they do. Validate their problem.
3. Great Fit (2-3 key, results-driven points linking skills to job).
4. Detail your specific approach and unique methodology. This should focus on how you solve the problem.
5. Call to Action & Compliance: (Single, direct next step PLUS compliance with all client-requested application materials, e.g., portfolio, estimates, etc.).
`.trim()
  console.log(prompt);
  

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini", // Excellent choice for cost and speed with concise proposals
        messages: [
          { role: "system", content: systemMessage },
          { role: "user", content: prompt }
        ],
        temperature: 0.7 // Good balance between creativity and consistency
      })
    })

    const data = await response.json()

    if (!data.choices || !data.choices.length) {
      throw new Error("Invalid API response")
    }

    const proposal = data.choices[0].message.content
    return Response.json({ proposal })

  } catch (error) {
    console.error("OpenRouter API Error:", error)
    return Response.json(
      { error: "Failed to generate proposal. Please try again." },
      { status: 500 }
    )
  }
}
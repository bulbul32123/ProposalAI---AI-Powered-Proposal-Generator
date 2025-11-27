import { OpenAI } from 'openai'; 
const openai = new OpenAI();

export async function POST(request) {
  const { jobDescription, tone, profile } = await request.json()

  const systemMessage = `You are an expert freelance proposal writer. Generate compelling, professional proposals that win projects. Keep proposals concise (200-300 words), personalized, and focused on client value.`

  const toneInstructions = {
    Professional: "Use a formal, business-like tone. Be respectful and emphasize expertise.",
    Friendly: "Use a warm, conversational tone. Be approachable while maintaining professionalism.",
    Urgent: "Convey enthusiasm and quick turnaround. Emphasize availability and fast delivery.",
  }

  let profileContext = ""
  if (profile) {
    if (profile.name) profileContext += `\nFreelancer Name: ${profile.name}`
    if (profile.skills) profileContext += `\nSkills: ${profile.skills}`
    if (profile.experience) profileContext += `\nYears of Experience: ${profile.experience}`
    if (profile.bio) profileContext += `\nBio: ${profile.bio}`
  }

  const prompt = `Write a winning freelance proposal for this job posting:

${jobDescription}
${profileContext ? `\nFreelancer Profile:${profileContext}` : ""}

Tone: ${toneInstructions[tone] || toneInstructions.Professional}

Structure:
1. Brief personalized greeting
2. Why you're a great fit (2-3 key points)
3. Relevant experience or approach
4. Clear next steps/call to action

Keep it concise and compelling.`

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const proposal = completion.choices[0].message.content;

    return Response.json({ proposal });

  } catch (error) {
    console.error("Generate error:", error.message || error)
    const freelancerName = profile?.name || "An Expert Freelancer";
    const selectedTone = toneInstructions[tone] || toneInstructions.Professional;

    const mockProposal = `Dear Hiring Manager,

Thank you for posting the job opportunity. Based on your requirements and my profile, I am an excellent fit. I specialize in the exact skills you've highlighted, and my ${profile?.experience || 'several'} years of experience align perfectly with this scope. I prioritize clear communication and delivering results that exceed expectations.

I am expertise in ${profile?.skills || 'development and design'} ensures a high-quality outcome. I have successfully completed similar projects for clients in your industry, providing a reliable and professional approach.

I am ready to start immediately. Let's schedule a brief call next week to discuss your project goals in more detail.

Best regards,
${freelancerName}
`
    return Response.json({
      proposal: mockProposal,
      isMock: true
    });
  }
}
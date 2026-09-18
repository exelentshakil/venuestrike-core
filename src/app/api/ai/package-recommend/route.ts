import { NextRequest, NextResponse } from 'next/server';

interface PackagePromptRequest {
  eventType?: string;
  partySize?: number;
  durationHours?: number;
  budget?: string;
  vibe?: string;
  dietary?: string;
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();
  try {
    const body: PackagePromptRequest = await req.json();
    const eventType = body.eventType || 'Corporate Social';
    const partySize = body.partySize || 12;
    const durationHours = body.durationHours || 2;
    const budget = body.budget || '$1,200';
    const vibe = body.vibe || 'High-energy competitive socializing';
    const dietary = body.dietary || 'Standard (with 2 vegetarian / gluten-sensitive options)';

    const prompt = `You are VenueStrike AI, an expert revenue management & event package architect for premier entertainment venues (bowling centers, darts lounges, axe throwing, and sports bars).
Design an optimal booking package for:
- Event Type: ${eventType}
- Group Size: ${partySize} guests
- Duration: ${durationHours} hours
- Target Budget: ${budget}
- Atmosphere: ${vibe}
- Dietary Preferences: ${dietary}

Respond STRICTLY in valid JSON matching this schema:
{
  "packageName": "Creative catchy name",
  "resourceAllocation": "e.g. Lanes 7 & 8 (connected pair) + High-Top Lounge Table 4",
  "playDurationMinutes": 120,
  "cateringMenu": [
    "Platter or item 1 with description",
    "Platter or item 2 with description",
    "Beverage package (e.g. 2 craft drink tickets/guest or local beer pitcher tier)"
  ],
  "financials": {
    "playRentalCost": 320,
    "foodAndDrinkCost": 580,
    "shoeOrGearRental": 60,
    "serviceAndTax": 153,
    "totalPackagePrice": 1113,
    "requiredDeposit": 400,
    "balanceDueAtVenue": 713
  },
  "concurrencyAdvice": "Recommendation for front desk peak hour management",
  "upsellHook": "High-margin addon to suggest on confirmation call"
}`;

    const openAiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    let replyData: any = null;
    let providerUsed = 'DETERMINISTIC_RULES';
    let modelUsed = 'rule-engine-v1';

    // 1. Try OpenAI gpt-4o-mini
    if (openAiKey) {
      try {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o-mini',
            messages: [
              { role: 'system', content: 'You are VenueStrike AI. Return only valid JSON.' },
              { role: 'user', content: prompt },
            ],
            response_format: { type: 'json_object' },
            temperature: 0.2,
            max_tokens: 800,
          }),
        });

        if (res.ok) {
          const json = await res.json();
          const content = json.choices?.[0]?.message?.content;
          if (content) {
            replyData = JSON.parse(content);
            providerUsed = 'OPENAI';
            modelUsed = 'gpt-4o-mini';
          }
        }
      } catch (e) {
        console.warn('OpenAI call failed, falling back to Gemini:', e);
      }
    }

    // 2. Try Gemini gemini-2.0-flash Fallback
    if (!replyData && geminiKey) {
      try {
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ parts: [{ text: `${prompt}\nRespond ONLY in JSON.` }] }],
              generationConfig: {
                responseMimeType: 'application/json',
                temperature: 0.2,
              },
            }),
          }
        );

        if (res.ok) {
          const json = await res.json();
          const rawText = json.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            replyData = JSON.parse(rawText);
            providerUsed = 'GEMINI';
            modelUsed = 'gemini-2.0-flash';
          }
        }
      } catch (e) {
        console.warn('Gemini fallback failed:', e);
      }
    }

    // 3. Deterministic Local Fallback (Always 100% Reliable)
    if (!replyData) {
      const baseLaneRate = durationHours * 75 * Math.ceil(partySize / 6);
      const fbCost = partySize * 45;
      const gearCost = partySize * 5;
      const subtotal = baseLaneRate + fbCost + gearCost;
      const taxService = Math.round(subtotal * 0.18);
      const total = subtotal + taxService;
      const deposit = Math.round(total * 0.4);

      replyData = {
        packageName: `${eventType} Strike & Social Experience`,
        resourceAllocation: `Lanes ${Math.floor(Math.random() * 8) + 1} & ${Math.floor(Math.random() * 8) + 9} + VIP High-Top`,
        playDurationMinutes: durationHours * 60,
        cateringMenu: [
          'Artisan Wagyu Sliders with Truffle Aioli & Hand-Cut Fries',
          'Loaded Social Nacho Platter with Fire-Roasted Queso & Guacamole',
          'Two Premium Beverage Tickets per Guest (Drafts, Cocktails, Non-Alcoholic)',
        ],
        financials: {
          playRentalCost: baseLaneRate,
          foodAndDrinkCost: fbCost,
          shoeOrGearRental: gearCost,
          serviceAndTax: taxService,
          totalPackagePrice: total,
          requiredDeposit: deposit,
          balanceDueAtVenue: total - deposit,
        },
        concurrencyAdvice: 'Lock lanes 15 minutes prior to peak Saturday window to prevent front-desk walk-in collisions.',
        upsellHook: 'Add 30 minutes of interactive dartboard challenge for just $12/person.',
      };
    }

    const latencyMs = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      data: replyData,
      provider: providerUsed,
      model: modelUsed,
      latencyMs,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Recommendation engine error' },
      { status: 500 }
    );
  }
}

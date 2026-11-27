export const siteName = 'Daily Curio'
export const siteTagline = 'Smart reads for curious minds'
export const siteDescription =
  'Daily Curio publishes practical, easy-to-read guides on technology, money, health, travel, food, science, lifestyle, and entertainment.'
export const contactEmail = 'hello@dailycurio.example'

/** Categories shown in the main navigation, in display order. */
export const featuredCategories = [
  'Tech',
  'Money',
  'Health',
  'Travel',
  'Food',
  'Science',
  'Lifestyle',
  'Entertainment',
] as const

export const categoryBlurbs: Record<string, string> = {
  Tech: 'Gadgets, apps, and tips that make tech work for you.',
  Money: 'Budgeting, saving, and simple personal finance.',
  Health: 'Everyday habits for a stronger body and calmer mind.',
  Travel: 'Weekend escapes and smart travel planning.',
  Food: 'Quick recipes and nutrition made simple.',
  Science: 'Big questions, explained in plain language.',
  Lifestyle: 'Productivity, habits, and better routines.',
  Entertainment: 'Movies, streaming, and pop culture explained.',
}

/** Hand-picked slugs for the homepage "Trending now" list. */
export const trendingSlugs = [
  'smartphone-battery',
  'budget-rule',
  'two-minute-rule',
  'walking-steps',
  'ai-tools-students',
]

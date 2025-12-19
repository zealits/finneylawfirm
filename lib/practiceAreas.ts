export interface PracticeArea {
  id: string;
  title: string;
  slug: string;
  icon: string;
}

// Practice areas matching the admin form options
export const practiceAreas: PracticeArea[] = [
  { id: '1', title: 'Commercial Real Estate', slug: 'commercial-real-estate', icon: '🏢' },
  { id: '2', title: 'Residential Real Estate', slug: 'residential-real-estate', icon: '🏠' },
  { id: '3', title: 'Corporate Transactional', slug: 'corporate-transactional', icon: '💼' },
  { id: '4', title: 'Business & Commercial Litigation', slug: 'business-commercial-litigation', icon: '🤝' },
  { id: '5', title: 'Labor & Employment Law', slug: 'labor-employment-law', icon: '📄' },
  { id: '6', title: 'Small Business Solutions Group', slug: 'small-business-solutions-group', icon: '👥' },
  { id: '7', title: 'Estate Planning & Administration', slug: 'estate-planning-administration', icon: '📋' },
  { id: '8', title: 'Public Interest Law', slug: 'public-interest-law', icon: '📢' },
  { id: '9', title: 'Personal Injury', slug: 'personal-injury', icon: '⚠️' },
  { id: '10', title: 'Property Tax Valuation', slug: 'property-tax-valuation', icon: '🏘️' },
  { id: '11', title: 'Ivy Pointe Title', slug: 'ivy-pointe-title', icon: '🏷️' },
];

export function getPracticeAreaBySlug(slug: string): PracticeArea | undefined {
  return practiceAreas.find(area => area.slug === slug);
}

export function getPracticeAreaSlug(title: string): string {
  const area = practiceAreas.find(area => 
    area.title.toLowerCase() === title.toLowerCase()
  );
  return area?.slug || title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');
}



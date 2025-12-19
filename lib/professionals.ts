export type ProfessionalCategory = 'attorneys' | 'of-counsel' | 'paralegals' | 'admin-staff' | 'law-clerks-and-interns';

export interface Professional {
  id: string;
  slug: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  title: string;
  category: ProfessionalCategory;
  phone: string;
  email: string;
  practiceAreas?: string;
  imagePath?: string; // Path relative to public/images, e.g., 'attorneys/christopher-finney.jpg'
  biography?: string;
  education?: {
    degree: string;
    institution: string;
    year: string;
  }[];
  admittedToPractice?: string[];
}

// Sample data - you can expand this with actual data
export const professionals: Professional[] = [
  // Attorneys
  {
    id: '1',
    slug: 'christopher-p-finney',
    firstName: 'Christopher',
    middleName: 'P.',
    lastName: 'Finney',
    title: 'Attorney',
    category: 'attorneys',
    phone: '513-943-6655',
    email: 'chris@finneylawfirm.com',
    practiceAreas: 'Real estate, commercial litigation, and public interest litigation',
    imagePath: 'attorneys/christopher-p-finney.jpg',
  },
  {
    id: '2',
    slug: 'bradley-m-gibson',
    firstName: 'Bradley',
    middleName: 'M.',
    lastName: 'Gibson',
    title: 'Attorney',
    category: 'attorneys',
    phone: '513-943-6661',
    email: 'brad@finneylawfirm.com',
    practiceAreas: 'Commercial litigation, wrongful death and personal injury, and medical malpractice',
    imagePath: 'attorneys/bradley-m-gibson.jpg',
  },
  {
    id: '3',
    slug: 'julie-m-gugino',
    firstName: 'Julie',
    middleName: 'M.',
    lastName: 'Gugino',
    title: 'Attorney',
    category: 'attorneys',
    phone: '513-943-5669',
    email: 'julie@finneylawfirm.com',
    practiceAreas: 'Real estate and real estate-based litigation, public interest law',
    imagePath: 'attorneys/julie-m-gugino.jpg',
  },
  {
    id: '4',
    slug: 'rebecca-l-simpson',
    firstName: 'Rebecca',
    middleName: 'L.',
    lastName: 'Simpson',
    title: 'Attorney',
    category: 'attorneys',
    phone: '513-797-2856',
    email: 'rebecca@finneylawfirm.com',
    practiceAreas: 'Government and public affairs, civil and commercial litigation, labor and employment law, constitutional and elections litigation, small business solutions group and public interest law',
    imagePath: 'attorneys/rebecca-l-simpson.jpg',
  },
  {
    id: '5',
    slug: 'ashley-l-duckworth',
    firstName: 'Ashley',
    middleName: 'L.',
    lastName: 'Duckworth',
    title: 'Attorney',
    category: 'attorneys',
    phone: '513-797-2864',
    email: 'ashley@finneylawfirm.com',
    practiceAreas: 'Commercial real estate and business & civil litigation',
    imagePath: 'attorneys/ashley-l-duckworth.jpg',
    biography: 'Ashley is an associate attorney focused primarily in real estate and civil litigation. During law school, she served as a law clerk to Christopher P. Finney, Esq., Julie M. Gugino, Esq., and Jessica D. Gibson, Esq., and she continues to work closely with them in her role as an attorney. Ashley graduated from Western Kentucky University in 2021 with a Bachelor\'s Degree in Communication and subsequently earned her J.D. from the Salmon P. Chase College of Law in 2024.',
    education: [
      { degree: 'B.A. in Communication', institution: 'Western Kentucky University', year: '2021' },
      { degree: 'J.D.', institution: 'Salmon P. Chase College of Law', year: '2024' }
    ],
    admittedToPractice: ['Ohio (2024)']
  },
  {
    id: '6',
    slug: 'j-andrew-gray',
    firstName: 'J.',
    middleName: 'Andrew',
    lastName: 'Gray',
    title: 'Attorney',
    category: 'attorneys',
    phone: '513-943-6658',
    email: 'andrew@finneylawfirm.com',
    practiceAreas: 'Commercial real estate and business & civil litigation',
    imagePath: 'attorneys/j-andrew-gray.jpg',
  },
  // Of Counsel
  {
    id: '7',
    slug: 'curt-c-hartman',
    firstName: 'Curt',
    middleName: 'C.',
    lastName: 'Hartman',
    title: 'Of Counsel',
    category: 'of-counsel',
    phone: '513-943-6657',
    email: 'curt@finneylawfirm.com',
    imagePath: 'of-counsel/curt-c-hartman.jpg',
  },
  {
    id: '8',
    slug: 'bruce-g-hopkins',
    firstName: 'Bruce',
    middleName: 'G.',
    lastName: 'Hopkins',
    title: 'Of Counsel',
    category: 'of-counsel',
    phone: '513-797-2860',
    email: 'bruce@finneylawfirm.com',
    imagePath: 'of-counsel/bruce-g-hopkins.jpg',
  },
  {
    id: '9',
    slug: 'kevin-j-hopper',
    firstName: 'Kevin',
    middleName: 'J.',
    lastName: 'Hopper',
    title: 'Of Counsel',
    category: 'of-counsel',
    phone: '513-943-6662',
    email: 'kevin@finneylawfirm.com',
    imagePath: 'of-counsel/kevin-j-hopper.jpg',
  },
  {
    id: '10',
    slug: 'paul-s-sian',
    firstName: 'Paul',
    middleName: 'S.',
    lastName: 'Sian',
    title: 'Of Counsel',
    category: 'of-counsel',
    phone: '513-943-5668',
    email: 'paul@finneylawfirm.com',
    imagePath: 'of-counsel/paul-s-sian.jpg',
  },
];

export function getProfessionalsByCategory(category: ProfessionalCategory): Professional[] {
  return professionals.filter(p => p.category === category);
}

export function getProfessionalBySlug(slug: string): Professional | undefined {
  return professionals.find(p => p.slug === slug);
}

export function getAllProfessionals(): Professional[] {
  return professionals;
}



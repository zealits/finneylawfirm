import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding blog data...');

  // Create categories
  const categories = await Promise.all([
    prisma.blogCategory.upsert({
      where: { slug: 'legal-advice' },
      update: {},
      create: {
        name: 'Legal Advice',
        slug: 'legal-advice',
        description: 'Expert legal advice and insights',
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'case-studies' },
      update: {},
      create: {
        name: 'Case Studies',
        slug: 'case-studies',
        description: 'Real-world case studies and outcomes',
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'legal-news' },
      update: {},
      create: {
        name: 'Legal News',
        slug: 'legal-news',
        description: 'Latest legal news and updates',
      },
    }),
    prisma.blogCategory.upsert({
      where: { slug: 'personal-injury' },
      update: {},
      create: {
        name: 'Personal Injury',
        slug: 'personal-injury',
        description: 'Information about personal injury law',
      },
    }),
  ]);

  console.log('✅ Created categories:', categories.map((c) => c.name).join(', '));

  // Create tags
  const tags = await Promise.all([
    prisma.blogTag.upsert({
      where: { slug: 'accident-claims' },
      update: {},
      create: { name: 'Accident Claims', slug: 'accident-claims' },
    }),
    prisma.blogTag.upsert({
      where: { slug: 'workers-compensation' },
      update: {},
      create: { name: 'Workers Compensation', slug: 'workers-compensation' },
    }),
    prisma.blogTag.upsert({
      where: { slug: 'medical-malpractice' },
      update: {},
      create: { name: 'Medical Malpractice', slug: 'medical-malpractice' },
    }),
    prisma.blogTag.upsert({
      where: { slug: 'insurance' },
      update: {},
      create: { name: 'Insurance', slug: 'insurance' },
    }),
    prisma.blogTag.upsert({
      where: { slug: 'legal-tips' },
      update: {},
      create: { name: 'Legal Tips', slug: 'legal-tips' },
    }),
  ]);

  console.log('✅ Created tags:', tags.map((t) => t.name).join(', '));

  // Get first professional (if exists)
  const professional = await prisma.professional.findFirst();

  // Create sample blog posts
  const posts = [
    {
      title: 'Understanding Your Rights After a Car Accident',
      slug: 'understanding-your-rights-after-car-accident',
      content: `<h2>What to Do Immediately After an Accident</h2>
<p>Being involved in a car accident can be overwhelming and confusing. Knowing your rights and the proper steps to take can make a significant difference in protecting your interests and ensuring you receive fair compensation.</p>

<h3>1. Ensure Safety First</h3>
<p>Your first priority should always be safety. Check yourself and others for injuries and call 911 if anyone needs medical attention. If possible, move vehicles to a safe location to prevent further accidents.</p>

<h3>2. Document Everything</h3>
<p>Take photos of the accident scene, vehicle damage, injuries, road conditions, and any relevant traffic signs or signals. Collect contact information from all parties involved and any witnesses.</p>

<h3>3. Report the Accident</h3>
<p>Notify the police and file an accident report. This official documentation will be crucial for insurance claims and any potential legal action.</p>

<h3>4. Seek Medical Attention</h3>
<p>Even if you feel fine, it's important to see a doctor as soon as possible. Some injuries may not be immediately apparent, and medical records will be essential for your claim.</p>

<h3>5. Contact an Attorney</h3>
<p>Before speaking with insurance companies, consult with an experienced personal injury attorney. They can protect your rights and help you navigate the claims process.</p>

<h2>Common Mistakes to Avoid</h2>
<ul>
  <li>Admitting fault at the scene</li>
  <li>Accepting the first settlement offer</li>
  <li>Posting about the accident on social media</li>
  <li>Signing documents without legal review</li>
  <li>Waiting too long to file a claim</li>
</ul>

<h2>Your Rights as an Accident Victim</h2>
<p>As an accident victim, you have the right to:</p>
<ul>
  <li>Receive compensation for medical expenses</li>
  <li>Recover lost wages and future earning capacity</li>
  <li>Get compensation for pain and suffering</li>
  <li>Repair or replacement of your vehicle</li>
  <li>Legal representation throughout the process</li>
</ul>

<p>If you've been injured in a car accident, don't navigate this challenging time alone. Contact our experienced personal injury attorneys for a free consultation to discuss your case and protect your rights.</p>`,
      excerpt:
        'Learn about your legal rights after a car accident and the crucial steps you should take to protect your interests and ensure fair compensation.',
      featuredImage: '/images/blog/car-accident.jpg',
      published: true,
      publishedAt: new Date('2024-12-15'),
      readingTime: 5,
      authorId: professional?.id,
      authorName: professional
        ? undefined
        : 'Finney Law Firm',
      categories: {
        connect: [{ id: categories[0].id }, { id: categories[3].id }],
      },
      tags: {
        connect: [{ id: tags[0].id }, { id: tags[4].id }],
      },
    },
    {
      title: 'Workers Compensation: What Every Employee Should Know',
      slug: 'workers-compensation-what-every-employee-should-know',
      content: `<h2>Understanding Workers Compensation Benefits</h2>
<p>Workers compensation is a form of insurance that provides benefits to employees who suffer work-related injuries or illnesses. Understanding your rights and the claims process is essential for protecting yourself in the workplace.</p>

<h3>What is Covered?</h3>
<p>Workers compensation typically covers:</p>
<ul>
  <li>Medical expenses related to the injury or illness</li>
  <li>Temporary or permanent disability benefits</li>
  <li>Rehabilitation and physical therapy</li>
  <li>Lost wages during recovery</li>
  <li>Death benefits for dependents</li>
</ul>

<h3>When Should You File a Claim?</h3>
<p>It's crucial to report any work-related injury or illness to your employer immediately. Most states have strict deadlines for filing workers compensation claims, often ranging from 30 to 90 days after the incident.</p>

<h2>The Claims Process</h2>
<ol>
  <li><strong>Report the Injury:</strong> Notify your supervisor or HR department immediately</li>
  <li><strong>Seek Medical Treatment:</strong> Get treatment from an approved healthcare provider</li>
  <li><strong>File a Claim:</strong> Complete the necessary paperwork with your employer</li>
  <li><strong>Wait for Decision:</strong> The insurance company will review your claim</li>
  <li><strong>Receive Benefits:</strong> If approved, you'll begin receiving benefits</li>
</ol>

<h2>Common Reasons Claims Are Denied</h2>
<p>Workers compensation claims can be denied for various reasons:</p>
<ul>
  <li>Late reporting of the injury</li>
  <li>Lack of medical evidence</li>
  <li>Injury occurred outside of work</li>
  <li>Employee was under the influence</li>
  <li>Pre-existing condition disputes</li>
</ul>

<h3>What to Do If Your Claim Is Denied</h3>
<p>Don't give up if your claim is denied. You have the right to appeal the decision. An experienced workers compensation attorney can help you:</p>
<ul>
  <li>Understand why your claim was denied</li>
  <li>Gather additional evidence</li>
  <li>File an appeal within the deadline</li>
  <li>Represent you at hearings</li>
  <li>Negotiate a fair settlement</li>
</ul>

<h2>Protecting Your Rights</h2>
<p>Remember, you have rights as an injured worker. Your employer cannot retaliate against you for filing a workers compensation claim. If you experience discrimination or termination after filing a claim, you may have additional legal options.</p>

<p>Contact our experienced workers compensation attorneys for a free consultation to ensure you receive the benefits you deserve.</p>`,
      excerpt:
        'A comprehensive guide to workers compensation benefits, the claims process, and how to protect your rights as an injured employee.',
      featuredImage: '/images/blog/workers-comp.jpg',
      published: true,
      publishedAt: new Date('2024-12-10'),
      readingTime: 6,
      authorId: professional?.id,
      authorName: professional ? undefined : 'Finney Law Firm',
      categories: {
        connect: [{ id: categories[0].id }],
      },
      tags: {
        connect: [{ id: tags[1].id }, { id: tags[4].id }],
      },
    },
    {
      title: '5 Signs You May Have a Medical Malpractice Case',
      slug: '5-signs-you-may-have-medical-malpractice-case',
      content: `<h2>Recognizing Medical Malpractice</h2>
<p>Medical malpractice occurs when a healthcare provider's negligence causes injury or harm to a patient. Not every medical error constitutes malpractice, but certain signs may indicate you have a valid case.</p>

<h3>1. Unexpected Treatment Outcomes</h3>
<p>If your treatment resulted in unexpected complications, worsening of your condition, or outcomes that were not properly explained as risks, you may have experienced medical malpractice. While not all bad outcomes are malpractice, deviations from the standard of care warrant investigation.</p>

<h3>2. Misdiagnosis or Delayed Diagnosis</h3>
<p>A significant number of medical malpractice cases involve:</p>
<ul>
  <li>Failure to diagnose a serious condition</li>
  <li>Incorrect diagnosis leading to wrong treatment</li>
  <li>Delayed diagnosis that worsens your prognosis</li>
  <li>Failure to order appropriate tests</li>
</ul>

<h3>3. Surgical Errors</h3>
<p>Surgical mistakes can have devastating consequences. Warning signs include:</p>
<ul>
  <li>Surgery performed on wrong body part</li>
  <li>Instruments left inside the body</li>
  <li>Unnecessary surgery performed</li>
  <li>Nerve damage or punctured organs</li>
  <li>Infections due to unsanitary conditions</li>
</ul>

<h3>4. Medication Errors</h3>
<p>Prescription and medication administration errors can be life-threatening:</p>
<ul>
  <li>Wrong medication prescribed</li>
  <li>Incorrect dosage</li>
  <li>Failure to consider drug interactions</li>
  <li>Pharmacy dispensing errors</li>
</ul>

<h3>5. Lack of Informed Consent</h3>
<p>Healthcare providers must obtain your informed consent before treatment. This means they should explain:</p>
<ul>
  <li>The nature of the treatment or procedure</li>
  <li>Potential risks and complications</li>
  <li>Alternative treatment options</li>
  <li>Likely outcomes if left untreated</li>
</ul>

<h2>Proving Medical Malpractice</h2>
<p>To have a valid medical malpractice case, you must typically prove four elements:</p>
<ol>
  <li><strong>Duty:</strong> A doctor-patient relationship existed</li>
  <li><strong>Breach:</strong> The provider breached the standard of care</li>
  <li><strong>Causation:</strong> The breach directly caused your injury</li>
  <li><strong>Damages:</strong> You suffered measurable harm or losses</li>
</ol>

<h2>Time Limits for Filing</h2>
<p>Medical malpractice cases have strict statutes of limitations that vary by state. In many jurisdictions, you must file within 2-3 years of discovering the injury. Don't delay in seeking legal advice.</p>

<h2>What to Do If You Suspect Malpractice</h2>
<ol>
  <li>Seek immediate medical attention from another provider</li>
  <li>Request copies of your medical records</li>
  <li>Document all symptoms and complications</li>
  <li>Keep all medical bills and related expenses</li>
  <li>Consult with a medical malpractice attorney</li>
</ol>

<p>Medical malpractice cases are complex and require expert legal representation. If you believe you've been a victim of medical negligence, contact our experienced medical malpractice attorneys for a confidential consultation.</p>`,
      excerpt:
        'Learn the key warning signs that may indicate you have a medical malpractice case and understand your legal options for seeking justice and compensation.',
      featuredImage: '/images/blog/medical-malpractice.jpg',
      published: true,
      publishedAt: new Date('2024-12-05'),
      readingTime: 7,
      authorId: professional?.id,
      authorName: professional ? undefined : 'Finney Law Firm',
      categories: {
        connect: [{ id: categories[0].id }, { id: categories[2].id }],
      },
      tags: {
        connect: [{ id: tags[2].id }, { id: tags[4].id }],
      },
    },
    {
      title: 'Dealing with Insurance Companies After an Injury',
      slug: 'dealing-with-insurance-companies-after-injury',
      content: `<h2>Navigating Insurance Claims After an Injury</h2>
<p>Dealing with insurance companies after suffering an injury can be one of the most frustrating aspects of your recovery. Understanding how insurance companies operate and your rights can help you avoid common pitfalls.</p>

<h3>How Insurance Companies Operate</h3>
<p>Remember, insurance companies are businesses focused on profit. Their adjusters are trained to minimize payouts, and their initial settlement offers are often far below what your claim is worth.</p>

<h2>Common Insurance Company Tactics</h2>

<h3>1. Quick Settlement Offers</h3>
<p>Insurance companies often make quick, lowball settlement offers shortly after an accident, hoping you'll accept before understanding the full extent of your injuries and damages.</p>

<h3>2. Recorded Statements</h3>
<p>Adjusters may ask for recorded statements, which they can use against you later. Never give a recorded statement without consulting an attorney first.</p>

<h3>3. Requesting Excessive Documentation</h3>
<p>While they have the right to investigate claims, insurance companies may overwhelm you with paperwork requests, hoping you'll make mistakes or give up.</p>

<h3>4. Claim Denials</h3>
<p>Initial claim denials are common tactics to discourage claimants. Many denials can be successfully appealed with proper legal representation.</p>

<h3>5. Surveillance</h3>
<p>Insurance companies may conduct surveillance or monitor your social media to find reasons to deny or reduce your claim.</p>

<h2>Protecting Yourself</h2>

<h3>Do's:</h3>
<ul>
  <li>Report the accident promptly</li>
  <li>Document everything thoroughly</li>
  <li>Keep detailed records of all expenses</li>
  <li>Follow your doctor's treatment plan</li>
  <li>Consult with an attorney before signing anything</li>
  <li>Be honest and consistent in all communications</li>
</ul>

<h3>Don'ts:</h3>
<ul>
  <li>Don't admit fault or apologize</li>
  <li>Don't give recorded statements without legal counsel</li>
  <li>Don't accept the first settlement offer</li>
  <li>Don't post about your accident on social media</li>
  <li>Don't sign medical releases without review</li>
  <li>Don't miss medical appointments</li>
</ul>

<h2>Understanding Your Insurance Policy</h2>
<p>Review your insurance policy to understand:</p>
<ul>
  <li>Coverage limits and exclusions</li>
  <li>Deductibles and co-pays</li>
  <li>Time limits for filing claims</li>
  <li>Your rights and responsibilities</li>
</ul>

<h2>When to Get an Attorney</h2>
<p>Consider hiring a personal injury attorney if:</p>
<ul>
  <li>You've suffered serious injuries</li>
  <li>Liability is disputed</li>
  <li>Multiple parties are involved</li>
  <li>The insurance company denies your claim</li>
  <li>The settlement offer seems too low</li>
  <li>You're unsure about your legal rights</li>
</ul>

<h2>The Value of Legal Representation</h2>
<p>Studies show that accident victims with attorneys receive significantly higher settlements than those who handle claims themselves. An experienced attorney can:</p>
<ul>
  <li>Accurately value your claim</li>
  <li>Handle all communications with insurers</li>
  <li>Gather and present evidence effectively</li>
  <li>Negotiate for maximum compensation</li>
  <li>Take your case to trial if necessary</li>
</ul>

<h2>Know Your Rights</h2>
<p>As an injury victim, you have the right to:</p>
<ul>
  <li>Fair and prompt claim processing</li>
  <li>Full disclosure of policy terms</li>
  <li>Legal representation</li>
  <li>Appeal denied claims</li>
  <li>File a complaint with state insurance regulators</li>
</ul>

<p>Don't let insurance companies take advantage of you during a vulnerable time. Contact our experienced personal injury attorneys for a free consultation to protect your rights and maximize your compensation.</p>`,
      excerpt:
        'Understand insurance company tactics and learn how to protect your rights when dealing with insurers after suffering an injury.',
      featuredImage: '/images/blog/insurance-claims.jpg',
      published: true,
      publishedAt: new Date('2024-12-01'),
      readingTime: 8,
      authorId: professional?.id,
      authorName: professional ? undefined : 'Finney Law Firm',
      categories: {
        connect: [{ id: categories[0].id }, { id: categories[1].id }],
      },
      tags: {
        connect: [{ id: tags[3].id }, { id: tags[4].id }],
      },
    },
    {
      title: 'Recent Changes in Ohio Personal Injury Law',
      slug: 'recent-changes-ohio-personal-injury-law',
      content: `<h2>2024 Updates to Ohio Personal Injury Law</h2>
<p>Ohio's personal injury law landscape continues to evolve. Staying informed about recent changes is crucial for anyone pursuing or considering a personal injury claim.</p>

<h3>Statute of Limitations Update</h3>
<p>Recent legislative changes have affected the time limits for filing personal injury claims in Ohio. Understanding these deadlines is critical, as missing them can permanently bar your claim.</p>

<h3>Comparative Negligence Modifications</h3>
<p>Ohio follows a modified comparative negligence rule. Recent court decisions have clarified how fault is apportioned when multiple parties are responsible for an injury.</p>

<h2>Key Changes Affecting Injury Victims</h2>

<h3>1. Damage Caps</h3>
<p>The state legislature has reviewed and adjusted caps on non-economic damages in certain types of cases. These changes impact potential compensation for pain and suffering.</p>

<h3>2. Medical Malpractice Reforms</h3>
<p>New requirements for expert testimony and case review have been implemented, affecting how medical malpractice claims are pursued and proven.</p>

<h3>3. Insurance Requirements</h3>
<p>Updated minimum insurance requirements for motor vehicles affect what compensation may be available after auto accidents.</p>

<h3>4. Product Liability Standards</h3>
<p>Recent court rulings have clarified manufacturer liability standards, impacting product defect cases.</p>

<h2>Implications for Injury Claims</h2>

<h3>For Auto Accidents</h3>
<p>New insurance regulations mean accident victims should:</p>
<ul>
  <li>Review their coverage limits</li>
  <li>Understand uninsured motorist protection</li>
  <li>Be aware of medical payment options</li>
  <li>Know their rights when dealing with insurers</li>
</ul>

<h3>For Premises Liability</h3>
<p>Property owner responsibilities have been clarified in recent decisions, affecting slip-and-fall and other premises liability cases.</p>

<h3>For Workplace Injuries</h3>
<p>Workers compensation law updates have modified benefit calculations and claim procedures.</p>

<h2>What This Means for You</h2>

<h3>Act Quickly</h3>
<p>With modified statutes of limitations, it's more important than ever to consult with an attorney promptly after an injury.</p>

<h3>Document Thoroughly</h3>
<p>Changes in evidence requirements make comprehensive documentation of injuries and damages crucial.</p>

<h3>Seek Expert Guidance</h3>
<p>Navigating recent legal changes requires knowledge of current law and recent court interpretations.</p>

<h2>Looking Ahead</h2>
<p>Several additional legislative proposals are under consideration that may further affect personal injury law in Ohio:</p>
<ul>
  <li>Modifications to joint and several liability rules</li>
  <li>Changes to pain and suffering damage calculations</li>
  <li>Updates to wrongful death claim procedures</li>
  <li>Reforms to medical malpractice screening panels</li>
</ul>

<h2>Why Legal Representation Matters More Than Ever</h2>
<p>With the evolving legal landscape, having experienced legal counsel is increasingly important. Our attorneys stay current with all changes to Ohio personal injury law and understand how they impact your case.</p>

<h3>We Can Help You:</h3>
<ul>
  <li>Navigate complex legal changes</li>
  <li>Ensure compliance with new requirements</li>
  <li>Maximize compensation under current law</li>
  <li>Protect your rights throughout the process</li>
  <li>Appeal unfavorable decisions effectively</li>
</ul>

<p>If you've been injured and need guidance on how recent legal changes affect your case, contact our experienced Ohio personal injury attorneys for a complimentary consultation.</p>`,
      excerpt:
        'Stay informed about the latest changes to Ohio personal injury law and understand how these updates may affect your potential claim.',
      featuredImage: '/images/blog/ohio-law-changes.jpg',
      published: true,
      publishedAt: new Date('2024-11-25'),
      readingTime: 6,
      authorId: professional?.id,
      authorName: professional ? undefined : 'Finney Law Firm',
      categories: {
        connect: [{ id: categories[2].id }],
      },
      tags: {
        connect: [{ id: tags[4].id }],
      },
    },
  ];

  for (const postData of posts) {
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: postData.slug },
    });

    if (!existingPost) {
      await prisma.blogPost.create({ data: postData });
      console.log('✅ Created post:', postData.title);
    } else {
      console.log('⏭️  Skipped existing post:', postData.title);
    }
  }

  console.log('✨ Blog seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding blog data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

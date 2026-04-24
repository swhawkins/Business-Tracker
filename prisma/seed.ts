import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.business.deleteMany();
  await prisma.watchZone.deleteMany();
  await prisma.briefing.deleteMany();

  const starters = [
    {
      businessName: "Cavender's Boot City",
      city: 'Shawnee',
      businessType: 'Retail / Western Apparel',
      status: 'Confirmed',
      stage: 'Opening Soon',
      confidenceScore: 100,
      notes: 'Located in the Kickapoo corridor; confirmed retail addition.',
    },
    {
      businessName: 'Unknown Retail — Harrison Corridor Expansion',
      city: 'Shawnee',
      businessType: 'Retail / Restaurant',
      status: 'Early Signal',
      stage: 'Site Activity / Growth Cluster',
      confidenceScore: 40,
      notes: 'Area showing retail and restaurant clustering.',
    },
    {
      businessName: 'Shawnee Mall Redevelopment Watch',
      city: 'Shawnee',
      businessType: 'Mixed Retail',
      status: 'Monitoring',
      stage: 'Pre-Planning',
      confidenceScore: 25,
      notes: 'Potential future anchor opportunities.',
    },
    {
      businessName: 'King Street Housing Development',
      city: 'Shawnee',
      businessType: 'Residential / Retail Trigger',
      status: 'Monitoring',
      stage: 'Approved',
      confidenceScore: 60,
      notes: 'Additional rooftops may increase future retail demand.',
    },
  ];

  for (const seed of starters) {
    const business = await prisma.business.create({ data: seed });
    await prisma.confidenceHistory.create({
      data: { businessId: business.id, score: seed.confidenceScore, note: 'Initial seed value' },
    });
    await prisma.activityLog.create({
      data: { businessId: business.id, action: 'SEED_CREATED', newValue: JSON.stringify(seed) },
    });
  }

  await prisma.watchZone.createMany({
    data: [
      { zoneName: 'Kickapoo Corridor', description: 'Retail corridor with high momentum.', city: 'Shawnee', priorityLevel: 'High' },
      { zoneName: 'Harrison Street Corridor', description: 'Commercial infill and expansion activity.', city: 'Shawnee', priorityLevel: 'High' },
      { zoneName: 'Shawnee Mall Area', description: 'Redevelopment opportunities and anchor watch.', city: 'Shawnee', priorityLevel: 'Medium' },
      { zoneName: 'I-40 Access Points', description: 'High-visibility logistics and fuel stop corridors.', city: 'Shawnee', priorityLevel: 'Medium' },
      { zoneName: 'Downtown Shawnee', description: 'Main street infill and small business redevelopment.', city: 'Shawnee', priorityLevel: 'Medium' },
    ],
  });

  await prisma.appSetting.createMany({
    data: [
      { key: 'adminEmail', value: 'admin@pottco-tracker.local' },
      { key: 'defaultCounty', value: 'Pottawatomie' },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

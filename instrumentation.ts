import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const connectionString = `${process.env.DATABASE_URL}`;

const register = async () => {
  // dedicated prisma client for edge runtime
  const pool = new Pool({ connectionString });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  const profiles = await prisma.profile.count();
  const sponsorships = await prisma.sponsorship.count();

  if (!profiles && !sponsorships) {
    // Then we need to create a new sponsorship key
    console.log('No profile in DB. Creating sponsorship key...');

    const generatedKey = 'crypto-random-key';

    const sponsorship = await prisma.sponsorship.create({
      data: {
        key: generatedKey,
      }
    });

    console.log('New sponsorship key generated:', sponsorship.key);
  } else if (!profiles && sponsorships) {
    const sponsorship = await prisma.sponsorship.findFirst();

    console.log('Old sponsorship found:', sponsorship?.key);
  }

  console.log('Gallery project initialized. Enjoy !')
  console.log('=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~=~')
}

export { register };

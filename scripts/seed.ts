import { seedDatabase } from '../lib/seed';
import mongoose from 'mongoose';

seedDatabase()
  .then(() => {
    console.log('Seed complete');
    return mongoose.disconnect();
  })
  .then(() => process.exit(0))
  .catch((err: any) => {
    console.error('Seed error:', err);
    process.exit(1);
  });

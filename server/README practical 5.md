### Practical 5
---

This practical demonstrates how to migrate from local file storage to cloud storage using Supabase for a TikTok-like application. The implementation provides scalable, reliable file storage with global CDN benefits.

### Key Benefits
- Scalability: Unlimited storage capacity

- Reliability: Built-in redundancy and backups

- Performance: Global CDN distribution

- Security: Fine-grained access controls

- Cost-effective: Pay-as-you-go pricing

### Implementation Steps
1. Supabase Setup
- Create a Supabase account at supabase.com

- Create a new project (e.g., "tiktok")

- Set up storage buckets:

    - videos (Public access)

    - thumbnails (Public access)

2. Backend Configuration
- Install Supabase SDK:
```
cd server
npm install @supabase/supabase-js
```
Create src/lib/supabase.js:
```
javascript

const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);
module.exports = supabase;
```
Update .env:
```
env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=your-service-key
SUPABASE_PUBLIC_KEY=your-public-key
```
3. Frontend Configuration
- Install Supabase client:
```
cd tiktok_frontend
npm install @supabase/supabase-js
```
Create src/lib/supabase.js:
```
javascript

import { createClient } from '@supabase/supabase-js';
export default createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY
);
```
- Update .env.local:
```
env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLIC_KEY=your-public-key
```
### Key Changes
**Backend Updates**
- Modified video controller to use Supabase storage

- Updated Prisma schema with new storage path fields

- Created storage service for file operations

- Added migration script for existing videos

**Frontend Updates**
- Implemented direct uploads to Supabase

- Updated VideoCard component for Supabase URLs

- Modified upload page for cloud storage

### Testing the Implementation
1. Upload Test:

- Verify files upload directly to Supabase

- Check files appear in the correct bucket

2. Playback Test:

- Confirm videos play from Supabase URLs

- Test different network conditions

3. Security Test:

- Verify access controls work as expected

- Test unauthorized access attempts

### Migration Process
Run migration script for existing videos:
```
node scripts/migrateVideosToSupabase.js
```
Verify all videos are accessible

Backup and remove local uploads directory
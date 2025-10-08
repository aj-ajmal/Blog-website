// const path = require('path');
// const fs = require('fs');
// const mongoose = require('mongoose');

// require('dotenv').config({ path: path.join(__dirname, '.env') });

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   console.error('Missing MONGODB_URI environment variable. Set it in server/.env or in the environment.');
//   process.exit(1);
// }

// // Load the blog schema used by the server (keep in-sync with server/index.js)
// const blogSchema = new mongoose.Schema({
//   title: { type: String, required: true, trim: true, maxLength: 200 },
//   author: { type: String, required: true, trim: true, maxLength: 100 },
//   about: { type: String, trim: true, maxLength: 500 },
//   body: { type: String, required: true, minLength: 250 },
//   publishdate: { type: Date, default: Date.now },
//   default: { type: String, default: 'user' }
// }, { timestamps: true });

// const Blog = mongoose.model('Blog', blogSchema);

// // Helper to map old records to the new schema
// function mapRecord(old) {
//   // Common old field names: content -> body, owner -> author, description/summary -> about
//   const mapped = {
//     title: old.title || old.name || old.heading || '',
//     author: old.author || old.owner || old.writer || 'Unknown',
//     about: old.about || old.description || old.summary || '',
//     body: old.body || old.content || old.text || '',
//     publishdate: old.publishdate || old.publish_date || old.date || undefined,
//     default: old.default || 'imported'
//   };

//   // Ensure types and trim
//   if (typeof mapped.title === 'string') mapped.title = mapped.title.trim();
//   if (typeof mapped.author === 'string') mapped.author = mapped.author.trim();
//   if (typeof mapped.about === 'string') mapped.about = mapped.about.trim();
//   if (typeof mapped.body === 'string') mapped.body = mapped.body.trim();

//   // If publishdate is a string, try to parse it
//   if (mapped.publishdate && typeof mapped.publishdate === 'string') {
//     const d = new Date(mapped.publishdate);
//     if (!isNaN(d)) mapped.publishdate = d;
//   }

//   return mapped;
// }

// async function run() {
//   try {
//     await mongoose.connect(MONGODB_URI);
//     console.log('Connected to MongoDB for migration');

//     const dataPath = path.join(__dirname, '..', 'data', 'db.json');
//     if (!fs.existsSync(dataPath)) {
//       console.error('Could not find data/db.json at', dataPath);
//       process.exit(1);
//     }

//     const raw = fs.readFileSync(dataPath, 'utf8');
//     const parsed = JSON.parse(raw);

//     if (!Array.isArray(parsed.blogs)) {
//       console.error('No blogs array found in db.json');
//       process.exit(1);
//     }

//     for (const old of parsed.blogs) {
//       const mapped = mapRecord(old);

//       // Basic validation checks before upsert
//       if (!mapped.title) {
//         console.warn('Skipping record with missing title:', old);
//         continue;
//       }
//       if (!mapped.body || mapped.body.length < 20) {
//         console.warn('Skipping record because body looks too short or missing for title:', mapped.title);
//         continue;
//       }

//       // Upsert by title (assumes imported titles are unique). If your real data uses IDs, update accordingly.
//       const existing = await Blog.findOne({ title: mapped.title });

//       if (existing) {
//         // Check if an update is necessary
//         let needsUpdate = false;
//         ['author', 'about', 'body', 'publishdate', 'default'].forEach((k) => {
//           const a = existing[k];
//           const b = mapped[k];
//           if (b && (a == null || (a.toString() !== b.toString()))) needsUpdate = true;
//         });

//         if (needsUpdate) {
//           existing.author = mapped.author || existing.author;
//           existing.about = mapped.about || existing.about;
//           existing.body = mapped.body || existing.body;
//           existing.publishdate = mapped.publishdate || existing.publishdate;
//           existing.default = mapped.default || existing.default;
//           await existing.save();
//           console.log('Updated existing blog:', mapped.title);
//         } else {
//           console.log('No changes for existing blog:', mapped.title);
//         }
//       } else {
//         // Create new blog
//         try {
//           const created = await Blog.create(mapped);
//           console.log('Inserted blog:', created.title);
//         } catch (err) {
//           console.error('Error inserting blog', mapped.title, err.message);
//         }
//       }
//     }

//     console.log('Migration complete');
//     process.exit(0);
//   } catch (err) {
//     console.error('Migration failed:', err.message);
//     process.exit(1);
//   }
// }

// run();

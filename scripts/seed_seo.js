const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const path = require("path");

const prisma = new PrismaClient();

// Read DEFAULT_PAGE_CATALOG from src/lib/meta.ts
const metaFile = fs.readFileSync(path.join(__dirname, "../src/lib/meta.ts"), "utf-8");
const match = metaFile.match(/export const DEFAULT_PAGE_CATALOG:\s*PageMetaItem\[\]\s*=\s*(\[[\s\S]*?\n\]);/);

if (!match) {
  console.error("Could not find DEFAULT_PAGE_CATALOG in src/lib/meta.ts");
  process.exit(1);
}

// Simple evaluation of the JSON-like array
let catalog;
try {
  catalog = eval(match[1]);
} catch (e) {
  console.error("Failed to parse catalog:", e);
  process.exit(1);
}

async function main() {
  console.log(`Found ${catalog.length} pages in DEFAULT_PAGE_CATALOG. Seeding into MySQL...`);
  let created = 0;
  let skipped = 0;

  for (const page of catalog) {
    const existing = await prisma.pageMeta.findUnique({
      where: { path: page.path },
    });

    if (!existing) {
      await prisma.pageMeta.create({
        data: {
          path: page.path,
          title: page.title,
          description: page.description,
          keywords: page.keywords,
          ogTitle: page.ogTitle || null,
          ogDesc: page.ogDesc || null,
          ogImage: page.ogImage || null,
          canonical: page.canonical || null,
          schemaType: page.schemaType || null,
          noIndex: Boolean(page.noIndex),
        },
      });
      created++;
    } else {
      skipped++;
    }
  }

  const total = await prisma.pageMeta.count();
  console.log(`Seeding complete! Created: ${created}, Skipped/Existing: ${skipped}, Total in DB: ${total}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

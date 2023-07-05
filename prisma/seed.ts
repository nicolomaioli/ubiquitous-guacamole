import { faker } from '@faker-js/faker';
import { prisma } from '~/server/db';

async function main() {
  console.log('Clear posts');
  await prisma.post.deleteMany();
  await prisma.category.deleteMany();

  console.log('Insert categories');
  const categoryNames = ['Tech', 'Lifestyle', 'Finance'];

  console.log('Insert posts');
  for (let i = 0; i < 100; i++) {
    const title = faker.company.buzzPhrase();
    const content = faker.lorem.paragraphs();
    const createdAt = faker.date.past();
    const image = faker.image.urlPicsumPhotos({ width: 720 });
    const categoryName = faker.helpers.arrayElement(categoryNames);

    await prisma.post.create({
      data: {
        title: title.charAt(0).toUpperCase() + title.slice(1),
        content,
        image,
        createdAt,
        updatedAt: createdAt,
        category: {
          connectOrCreate: {
            where: {
              name: categoryName,
            },
            create: {
              name: categoryName,
            },
          },
        },
      },
    });
  }
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

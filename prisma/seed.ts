import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting to seed database...')

  // 1. Create Admin User
  const adminMobile = process.env.ADMIN_MOBILE || '9999999999'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123'

  const existingAdmin = await prisma.users.findUnique({
    where: { mobile: adminMobile }
  })

  if (!existingAdmin) {
    await prisma.users.create({
      data: {
        mobile: adminMobile,
        name: 'Super Admin',
        password: adminPassword,
        role: 'admin',
        is_verified: true,
        created_at: new Date(),
        updated_at: new Date()
      }
    })
    console.log(`Created admin user with mobile: ${adminMobile}`)
  } else {
    console.log(`Admin user with mobile ${adminMobile} already exists.`)
  }

  // 2. Create Default Award Categories
  const categoriesToSeed = [
    { name: 'Best Fine Dining Restaurant', slug: 'best-fine-dining' },
    { name: 'Best Casual Dining', slug: 'best-casual-dining' },
    { name: 'Best Cafe', slug: 'best-cafe' },
    { name: 'Best Pub/Bar', slug: 'best-pub-bar' },
    { name: 'Best Bakery & Dessert', slug: 'best-bakery-dessert' },
    { name: 'Best Cloud Kitchen', slug: 'best-cloud-kitchen' },
    { name: 'Best South Indian', slug: 'best-south-indian' },
    { name: 'Best North Indian', slug: 'best-north-indian' },
    { name: 'Best Biryani', slug: 'best-biryani' },
    { name: 'Best Vegetarian', slug: 'best-vegetarian' }
  ]

  let categoriesAdded = 0
  for (const cat of categoriesToSeed) {
    const existingCat = await prisma.categories.findUnique({
      where: { slug: cat.slug }
    })

    if (!existingCat) {
      await prisma.categories.create({
        data: {
          name: cat.name,
          slug: cat.slug,
          status: 'active',
          created_at: new Date(),
          updated_at: new Date()
        }
      })
      categoriesAdded++
    }
  }
  
  if (categoriesAdded > 0) {
    console.log(`Successfully added ${categoriesAdded} default categories.`)
  } else {
    console.log('All default categories already exist.')
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

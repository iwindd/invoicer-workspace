import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt';
const prisma = new PrismaClient()
async function main() {
  const superadmin_data = {
    firstname: "Super Admin",
    lastname: "change me",
    password: await bcrypt.hash("12341234", 16),
    email: "superadmin@gmail.com",
    permission: 1,
    isDeleted: false,
    canRemove: false
  };

  await prisma.user.upsert({
    where: { email: superadmin_data.email },
    update: superadmin_data,
    create: superadmin_data
  })

  const admin_data = {
    firstname: "Admin",
    lastname: "change me",
    password: await bcrypt.hash("12341234", 16),
    email: "admin@gmail.com",
    permission: 0,
    isDeleted: false
  }

  await prisma.user.upsert({
    where: { email: admin_data.email },
    update: admin_data,
    create: admin_data
  })

  const payment_count = await prisma.payment.count({ where: { isDeleted: false, active: true } });

  if (payment_count <= 0) {
    await prisma.payment.create({
      data: {
        bankId: "002",
        phone: "0000000000",
        account: "change me",
        idcard: "change me",
        firstname_thai: "change me",
        lastname_thai: "change me",
        firstname_eng: "change me",
        lastname_eng: "change me",
        active: true,
      }
    })
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
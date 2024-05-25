import { z } from 'zod';

export type Inputs = z.infer<typeof Schema>

export const Schema = z.object({
  bank: z.string().min(1, "กรุณาเลือกธนาคาร"),
  account: z.string().min(1),
  idcard: z.string().min(13).max(13),
  phone: z.string().min(10).max(10),
  firstname_thai: z.string().min(3).max(100),
  lastname_thai: z.string().min(3).max(100),
  firstname_eng: z.string().min(3).max(100),
  lastname_eng: z.string().min(3).max(100),
})

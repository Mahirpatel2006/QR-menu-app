import * as z from 'zod'

export const menuItemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  description: z.string().optional(),
  price: z.number().min(0, 'Price must be 0 or greater'),
  is_veg: z.boolean().default(false),
  image_url: z.string().url().optional().or(z.literal('')),
})

export const categorySchema = z.object({
  name: z.string().min(1, 'Category name is required'),
  items: z.array(menuItemSchema).min(1, 'At least one item is required per category'),
})

export const createMenuSchema = z.object({
  restaurant: z.object({
    name: z.string().min(1, 'Restaurant name is required'),
    address: z.string().min(1, 'Address is required'),
    phone: z.string().optional(),
    business_type: z.string().optional(),
  }),
  menu: z.object({
    theme: z.string().default('default'),
  }),
  categories: z.array(categorySchema).min(1, 'At least one category is required'),
})

export type CreateMenuInput = z.infer<typeof createMenuSchema>
export type CategoryInput = z.infer<typeof categorySchema>
export type MenuItemInput = z.infer<typeof menuItemSchema>

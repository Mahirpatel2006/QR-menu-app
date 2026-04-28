export interface MenuData {
  restaurant: {
    name: string;
    logo_url: string | null;
    address: string | null;
    business_type: string | null;
  };
  categories: {
    id: string;
    name: string;
    menu_items: {
      id: string;
      name: string;
      description: string | null;
      price: number;
      image_url: string | null;
      is_veg: boolean;
    }[];
  }[];
}

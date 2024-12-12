export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    roles: string[];
    status:number;
}

export interface VariationValues {
    variation_attribute_id: number;
    variation_id : number;
    price:number;
    sale_price: number;
    values:string;
    type:string;
  }

  interface Attribute {
    attribute_name: string;
    attribute_value: string;
  }
  
  export interface ProductVariation {
    variation_id: number;
    price: string;
    sale_price: string;
    sku: string;
    stock: number | null;
    attributes: Attribute[];
    }
    
    export interface ProductType {
        id: number;
        name: string;
        slug: string;
        description: string;
        content: string;
        status: string;
        images: string[];
        video_media: string | null;
        sku: string;
        material: string | null;
        order: number;
        quantity: number;
        allow_checkout_when_out_of_stock: number;
        with_storehouse_management: number;
        is_featured: number;
        brand_id: number | null;
        is_variation: number;
        sale_type: number;
        price: number;
        sale_price: number;
        start_date: string | null;
        end_date: string | null;
        length: number;
        wide: number;
        height: number;
        weight: number;
        tax_id: number | null;
        views: number;
        stock_status: string;
        created_by_id: number;
        created_by_type: string;
        image: string | null;
        product_type: string;
        barcode: string | null;
        cost_per_item: string | null;
        generate_license_code: number;
        minimum_order_quantity: number;
        maximum_order_quantity: number;
        notify_attachment_updated: number;
        specification_table_id: number | null;
        store_id: number | null;
        approved_by: number;
        created_at: string;
        updated_at: string;
        variation_id: number;
        stock: number | null;
        attribute_id: number;
        variation_attribute_id: number;
        value_id: number;
        attribute_value: string;
        attribute_name: string;
        variations: ProductVariation[];
        categories: Category[];
        discount: number | null;
    }



export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        [x: string]: any;
        user: User;
        permissions: String[];
        roles: string[];
    };
    roles:string[];
};

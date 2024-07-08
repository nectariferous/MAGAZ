export interface ProductInterface {
	_id: string;
	product_id: number;
	name: string;
	description: string;
	brand: string;
	category: string[];
	attributes: Record<string, string>;
	variations: ProductVariationInterface[];
	seller: string;
	seller_id: number;
	seller_wallet: string;
	likes: number | null;
	comments: ProductCommentInterface[] | null;
}

export interface ProductCommentInterface {
	user: string;
	date: string;
	text: string;
	rating: number;
}

export interface ProductVariationInterface {
	name: string;
	avatar_small: string;
	product_card_images: string[];
	images: string[];
	types: ProductSingleVariationInterface[];
}

export interface ProductSingleVariationInterface {
	name: string | number;
	stock: number;
	price: number;
	attributes: Record<string, string>[] | null;
}

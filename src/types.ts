export type ProductType = 'tricycle' | 'bicycle' | 'motorcycle' | 'generator' | 'spare_part' | 'electric_bike';

export interface Product {
  id: string;
  name: string;
  type: ProductType;
  priceNGN: number;
  outrightDiscount?: number; // percentage discount for outright purchase
  rating: number;
  reviewCount: number;
  description: string;
  tagline: string;
  image: string;
  features: string[];
  specs: {
    engine?: string; // e.g., "200cc robust engine"
    loadCapacity: string; // e.g., "500 kg"
    fuelTank?: string; // e.g., "12 Litres"
    gears?: string; // e.g., "5-Speed Shimano"
    frameMaterial: string; // e.g., "Reinforced high-tensile steel"
    brakes: string; // e.g., "Hydraulic drum brakes"
  };
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  comment: string;
  rating: number;
  avatarUrl: string;
  purchasedProduct: string;
}

export interface Inquiry {
  id: string;
  name: string;
  phone: string;
  email?: string;
  city: string;
  productInterest: string;
  paymentOption: 'outright' | '6month' | '12month';
  message?: string;
  timestamp: string;
  status: 'pending' | 'completed' | 'canceled';
}

export interface CartItem {
  id: string; // Unique ID for this cart row (composite of product + payment plan)
  product: Product;
  quantity: number;
  paymentOption: 'outright' | '6month' | '12month';
  depositPercent: number; // For hire purchase (e.g. 30 to 60)
  depositAmount: number; // Deposit calculated per item
  monthlyRepayment: number; // Per item monthly installment
  weeklyRepayment: number; // Per item weekly installment
  pricePerItem: number; // Base price or outright discounted price
  totalCost: number; // Lifetime cost of this item
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  items: CartItem[];
  totalDepositAmount: number; // Cumulative immediate payment needed
  totalOutrightPrice: number; // Total price of non-HP items
  paymentMethod: 'bank_transfer' | 'card_payment' | 'finance_approved';
  timestamp: string;
  createdAt: string;
  status: 'pending' | 'assembling' | 'dispatched' | 'delivered';
}


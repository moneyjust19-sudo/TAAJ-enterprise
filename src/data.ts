import { Product, Testimonial } from './types';

export const NIGERIAN_PRODUCTS: Product[] = [
  {
    id: 'keke-tvs-passenger',
    name: 'TVS King Deluxe Passenger Keke',
    type: 'tricycle',
    priceNGN: 1950000,
    outrightDiscount: 5,
    rating: 4.8,
    reviewCount: 142,
    tagline: 'Brand New TVS Passenger Tricycle (Keke Maruwa)',
    description: 'The absolute standard for commuter transport in Nigeria. Features low fuel consumption, highly reliable TVS 200cc engine, spacious 4-seater cabin, and robust build quality.',
    image: '',
    features: [
      'Genuine TVS 200cc high-reliability engine',
      'Comfortable 4-seater configuration with heavy-duty black cushions',
      'Waterproof side curtains and canvas roof',
      'Dual multi-focus halogen headlights',
      'Original TVS dashboard with USB charging'
    ],
    specs: {
      engine: '200cc, Single Cylinder, 4-Stroke, Air-Cooled',
      loadCapacity: '500 kg (Driver + 3 Passengers + Luggage)',
      fuelTank: '12 Litres (+2L Reserve)',
      frameMaterial: 'Reinforced Tubular Steel Chassis',
      brakes: 'Hydraulic Expandable Drum Brakes'
    }
  },
  {
    id: 'keke-cargo-master',
    name: 'TAAJ Heavy-Duty Cargo Keke',
    type: 'tricycle',
    priceNGN: 2200000,
    outrightDiscount: 7,
    rating: 4.9,
    reviewCount: 88,
    tagline: 'High-Payload Local Logistics & Agricultural Carrier',
    description: 'Perfect for hauling agricultural produce, wholesale goods, or delivery parcels. Features a massive lockable steel payload container box, heavy-duty leaf springs, and high-torque rear axle.',
    image: '',
    features: [
      'Reinforced leaf-spring rear suspension for high loads',
      'Lockable weather-sealed steel storage compartment',
      'Low-ratio transmission for easy hill climbing',
      'Ergonomic driver cabin with wide-angle side mirrors',
      'Mudguards and solid steel bumper guards'
    ],
    specs: {
      engine: '225cc, High-Torque Heavy Duty Engine',
      loadCapacity: '800 kg (Cargo Payload)',
      fuelTank: '15 Litres',
      frameMaterial: 'Industrial Grade Heavy Steel C-Channel',
      brakes: 'Dual Line Hydraulic Drum Brakes with Parking Brake'
    }
  },
  {
    id: 'motorcycle-bajaj-boxer',
    name: 'Bajaj Boxer BM150 (Brand New)',
    type: 'motorcycle',
    priceNGN: 850000,
    outrightDiscount: 4,
    rating: 4.9,
    reviewCount: 115,
    tagline: 'The Undisputed King of Nigerian Okada and Delivery Roads',
    description: 'Extremely rugged 150cc motorcycle preferred across Nigeria for its absolute reliability, fuel economy, and strong resale value. Perfect for commercial passenger transit or logistics.',
    image: '',
    features: [
      'Indestructible 150cc engine block',
      'Extra-long padded seat with reinforced rear luggage carrier rack',
      'Front and rear hydraulic shock absorbers for rough terrains',
      'SNS (Spring-in-Spring) suspension system',
      'Durable leg guards and wide handlebars'
    ],
    specs: {
      engine: '150cc, Single Cylinder, 4-Stroke, SNS Suspension',
      loadCapacity: '250 kg (Rider + Passenger + Load)',
      fuelTank: '11 Litres',
      frameMaterial: 'Heavy-Duty Reinforced Steel Frame',
      brakes: 'Mechanical Drum Brakes (Front & Rear)'
    }
  },
  {
    id: 'motorcycle-tvs-hlx',
    name: 'TVS HLX 125 (Brand New)',
    type: 'motorcycle',
    priceNGN: 780000,
    outrightDiscount: 3,
    rating: 4.7,
    reviewCount: 92,
    tagline: 'Reliable, Comfortable, and High Fuel-Efficiency Bike',
    description: 'An excellent commercial option for delivery services and daily commuting. Features an eco-thrust engine that delivers incredible mileage, smooth suspension, and a sturdy build.',
    image: '',
    features: [
      'Eco-Thrust TVS engine for maximum fuel efficiency',
      'Broad fuel tank with stylish protective rubber grips',
      'Reinforced chassis with heavy rear carrier luggage plate',
      'Bright halogen headlight and loud horn',
      'USB mobile phone charging port'
    ],
    specs: {
      engine: '125cc, 4-Stroke, Air-Cooled Spark Ignition',
      loadCapacity: '220 kg',
      fuelTank: '10 Litres',
      frameMaterial: 'Tubular High-Carbon Steel',
      brakes: 'Drum Brakes Front & Rear'
    }
  },
  {
    id: 'electric-spiro',
    name: 'Spiro Commuter Electric Bike',
    type: 'electric_bike',
    priceNGN: 950000,
    outrightDiscount: 6,
    rating: 4.8,
    reviewCount: 41,
    tagline: 'Modern Zero-Emission Green Electric Bike',
    description: 'Tackle rising fuel costs with this high-performance electric commuter bike. Features a swappable lithium battery, strong electric motor, and high-traction tires. Excellent for city delivery runs.',
    image: '',
    features: [
      'High-capacity swappable Lithium-Ion Battery (72V)',
      'No fuel required—100% electric clean motor',
      'Quiet, vibration-free ride with instant electric torque',
      'Digital LED dashboard with battery percentage and speed display',
      'Hydraulic front fork suspension'
    ],
    specs: {
      engine: '3000W High-Efficiency Electric Hub Motor',
      loadCapacity: '180 kg',
      fuelTank: 'Dual Swappable Batteries (Up to 100km range)',
      frameMaterial: 'Aviation Grade Aluminium Alloy',
      brakes: 'Front Disc and Rear Drum Brakes'
    }
  },
  {
    id: 'tokunbo-keke-maruwa',
    name: 'Tokunbo TVS Passenger Keke',
    type: 'tricycle',
    priceNGN: 1250000,
    outrightDiscount: 2,
    rating: 4.6,
    reviewCount: 73,
    tagline: 'Premium Handpicked Foreign Used (Tokunbo) Keke Maruwa',
    description: 'Freshly cleared, clean foreign-used TVS Passenger Keke. Fully inspected, serviced, and tested by our in-house Ibadan mechanics. Extremely sound engine and neat frame at a pocket-friendly price.',
    image: '',
    features: [
      'Direct Tokunbo (Foreign Used), never registered in Nigeria',
      '100% original factory gear system and engine block',
      'Full body paint touch-ups and chassis rust prevention coat',
      'Comes with full customs clearing documents and purchase receipt',
      'Free first engine oil change and filter check at our depot'
    ],
    specs: {
      engine: '200cc, Single Cylinder, Original TVS Engine',
      loadCapacity: '450 kg',
      fuelTank: '12 Litres',
      frameMaterial: 'Standard TVS High-Tensile Steel',
      brakes: 'Hydraulic Expandable Drum Brakes'
    }
  },
  {
    id: 'generator-honda-elemax',
    name: 'Honda Elemax 6.5KVA Generator',
    type: 'generator',
    priceNGN: 1100000,
    outrightDiscount: 5,
    rating: 4.9,
    reviewCount: 39,
    tagline: 'Heavy-Duty Commercial Generator with Key Starter',
    description: 'Ensure stable and uninterrupted power for your business or residence. The Honda Elemax features a genuine commercial-grade Honda GX390 engine, low noise levels, and automatic voltage regulation (AVR).',
    image: '',
    features: [
      'Original Honda GX390 OHV commercial engine',
      'Built-in Automatic Voltage Regulator (AVR) for sensitive electronics',
      'Electric Key-start system with included maintenance-free battery',
      'Low oil alert shutdown sensor',
      'Heavy-duty protective steel pipes cage and transport wheels'
    ],
    specs: {
      engine: '389cc, Honda GX390 4-Stroke Engine',
      loadCapacity: '6.5 KVA Max Output / 5.5 KVA Rated Output',
      fuelTank: '25 Litres (Up to 12 hours continuous run)',
      frameMaterial: 'Extra-Thick Steel Pipes Guard Rail Frame',
      brakes: 'N/A'
    }
  },
  {
    id: 'spare-tvs-engine-block',
    name: 'TVS Keke Complete Engine Block (Brand New)',
    type: 'spare_part',
    priceNGN: 38000,
    outrightDiscount: 4,
    rating: 4.9,
    reviewCount: 61,
    tagline: '100% Original TVS Factory Engine Assembly',
    description: 'Upgrade or restore your Keke Maruwa with our brand new, original TVS factory engine assembly. Directly imported, certified, and fully loaded with internal pistons, valves, and spark ports.',
    image: '',
    features: [
      'Genuine TVS original spare part with serial number tracking',
      'Comes fully sealed and ready for immediate mounting',
      'Delivers original compression ratios, torque, and power output',
      'Provides standard TVS fuel economy and low emissions',
      'Includes original spark plug and standard engine oil starter bottle'
    ],
    specs: {
      engine: '200cc, Single Cylinder, 4-Stroke',
      loadCapacity: 'Standard TVS fit',
      fuelTank: 'N/A',
      frameMaterial: 'Precision Cast Iron and Aluminium Alloy',
      brakes: 'N/A'
    }
  },
  {
    id: 'spare-clutch-assembly',
    name: 'Bajaj Boxer Complete Clutch Assembly',
    type: 'spare_part',
    priceNGN: 35000,
    outrightDiscount: 5,
    rating: 4.7,
    reviewCount: 89,
    tagline: 'Original Bajaj Spare Parts - Smooth Gear Shifts',
    description: 'Avoid gear slippage and high fuel consumption. Our original Bajaj Boxer clutch assembly includes high-friction plates, pressure plate, springs, and outer housing for a perfect fit.',
    image: '',
    features: [
      'Original Bajaj Boxer BM100 / BM150 compatible replacement',
      'Includes pre-installed premium clutch plates and steel friction plates',
      'Heavy-duty springs resist fatigue and clutch fade',
      'Guarantees crisp, effortless shifting even in heavy traffic'
    ],
    specs: {
      loadCapacity: 'Standard Bajaj Fit',
      frameMaterial: 'High-Strength Cast Iron & Friction Materials',
      brakes: 'N/A'
    }
  },
  {
    id: 'spare-tire-rim-set',
    name: 'Heavy-Duty Keke Tire & Rim Set',
    type: 'spare_part',
    priceNGN: 48000,
    outrightDiscount: 10,
    rating: 4.8,
    reviewCount: 154,
    tagline: 'Reinforced 3-Lug Tubeless Tire with Solid Steel Rim',
    description: 'Perfect replacement wheel assembly for TVS, Bajaj, or Piaggio tricycles. Built to resist roadside punctures, glass cuts, and potholes. High rubber density guarantees a long lifespan.',
    image: '',
    features: [
      'Reinforced 8-ply tubeless tire tread pattern',
      'Solid heavy-duty steel rim with rust-resistant paint coat',
      'Perfect 3-lug standard pattern matching TVS and Bajaj',
      'Superior grip on wet asphalt and sandy city bypass roads',
      'Designed to handle heavy passenger and freight loads'
    ],
    specs: {
      loadCapacity: '350 kg per tire',
      frameMaterial: 'Sturdy Press-Formed Carbon Steel Rim',
      brakes: 'N/A'
    }
  }
];

export const NIGERIAN_CITIES = [
  'Ibadan (Bodija, Ring Road, Challenge, Ojoo, Idikan)',
  'Lagos (Ikeja, Yaba, Lekki, Alimosho, Oshodi)',
  'Abuja (Wuse, Garki, Gwarinpa, Kubwa)',
  'Kano (Fagge, Nassarawa, Gwale)',
  'Port Harcourt (GRA, Trans-Amadi, Mile 1)',
  'Enugu (Independence Layout, Uwani)',
  'Kaduna (Barnawa, Kakuri, Tudu)',
  'Benin City (Uselu, GRA, Ikpoba Hill)',
  'Onitsha (Fegge, Omagba)',
  'Aba (Ariaria, Ogbor Hill)'
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Alhaji Babatunde Ayinde',
    role: 'Transport Fleet Owner',
    location: 'Ojoo, Ibadan',
    comment: 'I bought my first Bajaj Boxer and TVS tricycles from TAAJ Shasha Road. Their hire purchase terms are extremely fair, and their original spare parts warehouse makes it very easy to keep my fleet running 24/7.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
    purchasedProduct: 'TVS King Deluxe Passenger Keke'
  },
  {
    id: 'test-2',
    name: 'Chinedu Amadi',
    role: 'Market Logistics Operator',
    location: 'Feleye, Ibadan',
    comment: 'TAAJ is my go-to for parts and engines. I bought a Tokunbo TVS Keke from their Idikan office, and it works exactly like brand new! Whenever I need replacement tires or clutch cables, they are always in stock.',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80',
    purchasedProduct: 'TAAJ Heavy-Duty Cargo Keke'
  },
  {
    id: 'test-3',
    name: 'Aisha Bello',
    role: 'Business Owner',
    location: 'Bodija, Ibadan',
    comment: 'We use the Spiro Electric Bike for our local deliveries in Bodija. No petrol costs! We also bought a Honda Elemax generator from TAAJ to power our bakery during grid outages. Best customer service in Oyo State!',
    rating: 5,
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80',
    purchasedProduct: 'Spiro Commuter Electric Bike'
  }
];

export const FAQS = [
  {
    question: 'Where is TAAJ Commercial Enterprises located?',
    answer: 'Our HEAD OFFICE is located beside Total Filling Station, Shasha Road Ojoo, Ibadan (Tel: 08036664739). Our BRANCH OFFICE is at NW3/2, Adebisi Street, Idikan Feleye, Ibadan (Tel: 08084746856 - WhatsApp).'
  },
  {
    question: 'Do you sell original spare parts and motors?',
    answer: 'Yes! We are direct distributors of new motorcycles, motors, generators, and original spare parts for BAJAJ BOXERS, TVS, HONDA, HAOJUE, HERO, YAMAHA, SPIRO, etc. We also deal in all types of Tokunbo (foreign-used) motors, motorcycles, motor engines, tricycles (keke maruwa), and electric bikes.'
  },
  {
    question: 'Do you offer Hire-Purchase or installment payment plans?',
    answer: 'Yes! For vehicles (Tricycles, Motorcycles, and Electric Bikes), we offer flexible hire-purchase options with an initial deposit (typically 30%) and easy weekly or monthly repayments spread over 6 or 12 months.'
  },
  {
    question: 'How do you handle delivery outside of Ibadan?',
    answer: 'We dispatch vehicles, generators, and bulk spare parts to all 36 states across Nigeria. All engines and tricycles are tested by our expert mechanics before being carefully loaded onto transport trailers.'
  },
  {
    question: 'What is the warranty on brand-new vehicles and parts?',
    answer: 'All our brand-new TVS and Bajaj Boxer vehicles come with a 12-Month/15,000km warranty on the engine block. Our brand-new generators also come with direct manufacturer service guarantees.'
  }
];

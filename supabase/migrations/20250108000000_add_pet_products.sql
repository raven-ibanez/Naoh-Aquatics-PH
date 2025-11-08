/*
  # Add Pet Products and Categories
  
  1. Categories
    - Add pet-related categories
  
  2. Products
    - Add pet grooming supplies
    - Add pet essentials
    - Add pet food & treats
    - Add pet toys & accessories
*/

-- Insert new pet-related categories
INSERT INTO categories (id, name, icon, sort_order, active) VALUES
  ('pet-grooming', 'Other Pet Grooming Supplies', '🧼', 5, true),
  ('pet-essentials', 'Other Pet Essentials', '🐾', 6, true),
  ('pet-food-treats', 'Other Food & Treats', '🍖', 7, true),
  ('pet-toys-accessories', 'Others Pet Toys & Accessories', '🎾', 8, true)
ON CONFLICT (id) DO NOTHING;

-- Insert pet grooming supplies
INSERT INTO menu_items (name, description, base_price, category, popular, available, discount_active) VALUES
  ('KAIJU Bloodworm Pellets with Probiotics by Noah Aquatics', 'High-quality bloodworm pellets enhanced with probiotics for optimal fish health and digestion.', 145.00, 'pet-grooming', false, true, false),
  ('Grooming Potion for Betta Guppy Molly Tetra Goldfish', 'Specialized grooming solution for various tropical fish species including Betta, Guppy, Molly, Tetra, and Goldfish.', 65.00, 'pet-grooming', false, true, false),
  ('Aqua Vita Vitamins & Minerals for Fish by Noah Aquatics', 'Complete vitamin and mineral supplement to promote fish health, vitality, and immune system support.', 390.00, 'pet-grooming', false, true, false),
  ('Kaiju Carophyll Blue & Astaxanthin Powder Color Enhancer', 'Premium color enhancer powder with Carophyll Blue and Astaxanthin for vibrant fish coloration.', 210.00, 'pet-grooming', false, true, false),
  ('Carophyll Yellow Powder by Noah Aquatics - Color Enhancer', 'Natural yellow pigment powder to enhance the yellow and gold colors in ornamental fish.', 180.00, 'pet-grooming', false, true, false);

-- Insert pet essentials
INSERT INTO menu_items (name, description, base_price, category, popular, available, discount_active) VALUES
  ('Baby Kaiju Brine Shrimp Tablets by Noah Aquatics 50 Grams', 'Convenient brine shrimp tablets perfect for feeding young fish and small aquatic species.', 90.00, 'pet-essentials', false, true, false),
  ('Pro-Boost Probiotics by Noah Aquatics 300ml Liquid', 'Liquid probiotic supplement to improve water quality and support beneficial bacteria in aquariums.', 65.00, 'pet-essentials', false, true, false),
  ('Intense Carophyll Red by Noah Aquatics 250ml Liquid', 'Liquid color enhancer to intensify red pigmentation in ornamental fish.', 120.00, 'pet-essentials', false, true, false),
  ('Astaxanthin Caro Red Yellow & Spirulina Powder', 'Multi-purpose color enhancement powder with Astaxanthin, Carophyll Red, Yellow pigments, and Spirulina.', 150.00, 'pet-essentials', false, true, false),
  ('Carophyll Red Powder by Noah Aquatics - Color Enhancer', 'Premium red pigment powder for enhancing red coloration in fish.', 150.00, 'pet-essentials', false, true, false),
  ('Freeze Dried Superworms by Noah Aquatics 40g & 60g', 'Nutritious freeze-dried superworms, a protein-rich treat for fish and other aquatic pets.', 130.00, 'pet-essentials', false, true, false),
  ('Nitro-Bac Pond Water Conditioner 50g by Noah Aquatics', 'Bacterial water conditioner for ponds, promotes healthy water conditions and biological filtration.', 210.00, 'pet-essentials', false, true, false),
  ('Carophyll Blue by Noah Aquatics 10g (Blue Pigment)', 'Concentrated blue pigment for enhancing blue coloration in ornamental fish.', 210.00, 'pet-essentials', false, true, false),
  ('Nitro-Bac Pond Water Conditioner 100g by Noah Aquatics', 'Larger size bacterial water conditioner for ponds and large aquarium systems.', 210.00, 'pet-essentials', false, true, false);

-- Insert pet food & treats
INSERT INTO menu_items (name, description, base_price, category, popular, available, discount_active) VALUES
  ('Tropical Fish Granules - Health Booster with Vitamins', 'Nutrient-rich granules formulated with vitamins for tropical fish health and vitality.', 40.00, 'pet-food-treats', false, true, false),
  ('APK by ANA Taiwan 50g & 100g (Pagkain para sa Isda)', 'Premium fish food from Taiwan, specially formulated for optimal fish nutrition and growth.', 220.00, 'pet-food-treats', false, true, false),
  ('Freeze Dried Antarctic Krill by Noah Aquatics 25g', 'High-quality freeze-dried Antarctic krill, rich in natural color enhancers and protein.', 155.00, 'pet-food-treats', false, true, false),
  ('DIY Probiotics Liquid Kit by Noah Aquatics', 'Complete kit to create your own probiotic solution for aquarium and pond water treatment.', 280.00, 'pet-food-treats', false, true, false),
  ('Baby Kaiju Brine Shrimp Tibet Artemia Cysts 100g', 'Premium Tibet Artemia cysts for hatching fresh brine shrimp, ideal for feeding fry and small fish.', 800.00, 'pet-food-treats', false, true, false);

-- Insert pet toys & accessories
INSERT INTO menu_items (name, description, base_price, category, popular, available, discount_active) VALUES
  ('Nitro-Bac Pond Water Conditioner by Noah Aquatics', 'Professional-grade bacterial water conditioner for maintaining healthy pond environments.', 209.00, 'pet-toys-accessories', false, true, false),
  ('Nitro-Bac Pond Water Conditioner 100g by Noah Aquatics (Large)', 'Economy size pond water conditioner for regular maintenance of large pond systems.', 390.00, 'pet-toys-accessories', false, true, false),
  ('Bio Filter Cotton Balls Super Filtration & Clean Water', 'High-efficiency biological filter media for mechanical and biological filtration in aquariums.', 120.00, 'pet-toys-accessories', false, true, false);


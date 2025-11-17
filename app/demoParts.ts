// app/demoParts.ts
// Demo data for multiple Subaru platforms.
//
// platformId values:
// - 'gen2_outback'  → 2000–2004 Subaru Outback (Gen 2)
// - 'gen2_wrx'      → 2002–2005 Subaru Impreza WRX (GD)
// - 'sg_forester'   → 2003–2008 Subaru Forester (SG)
//
// NOTE: This is demo data, NOT guaranteed real-world-perfect fitment.

// ============================
// Affiliate helper functions
// ============================
const AFFILIATE = {
  amazonTag: 'carbuild20-20', // TODO: replace with your real Amazon tag later
  // Later you can add eBay, AutoZone, Summit, etc.
};

function amazon(asin: string): string {
  return `https://www.amazon.com/dp/${asin}/?tag=${AFFILIATE.amazonTag}`;
}

// ============================
// Demo Parts Database
// ============================
export const demoParts = [
  // ===== Gen 2 Outback (2000–2004) =====
  {
    id: 1,
    platformId: 'gen2_outback',
    brand: 'Akebono',
    name: 'ProACT Front Brake Pads',
    category: 'brake_pad_front',
    description: 'Ceramic front pads for daily driving and light towing.',
    msrp: 89.99,
    fitmentNotes: 'Non-H6 models only.',
    productUrl: amazon('B07RN9WMTJ'),
    compatibleEngines: ['EJ251'],
    compatibleTrims: ['25_base', '25_limited']
  },
  {
    id: 2,
    platformId: 'gen2_outback',
    brand: 'Centric',
    name: 'Premium Front Brake Rotors (Pair)',
    category: 'rotor_front',
    description: 'Premium rotors for smooth braking and reduced noise.',
    msrp: 120,
    fitmentNotes: 'Works with stock calipers.',
    productUrl: amazon('B0OUTBKROT02'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 3,
    platformId: 'gen2_outback',
    brand: 'PowerStop',
    name: 'Drilled & Slotted Rear Rotors (Pair)',
    category: 'rotor_rear',
    description:
      'Improved cooling and bite for heavier loads and mountain driving.',
    msrp: 140,
    fitmentNotes: 'Fits rear brakes on 2000–2004 Outback Gen 2.',
    productUrl: amazon('B0OUTBKROT03'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 4,
    platformId: 'gen2_outback',
    brand: 'StopTech',
    name: 'Stainless Steel Brake Lines (Front & Rear)',
    category: 'brake_lines',
    description: 'Improves brake pedal feel and reduces line expansion.',
    msrp: 120,
    fitmentNotes: 'Fits 2000–2004 Subaru Outback Gen 2 AWD.',
    productUrl: amazon('B0OUTBKBLN04'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 5,
    platformId: 'gen2_outback',
    brand: 'KYB',
    name: 'Excel-G Front Struts',
    category: 'strut_front',
    description: 'OEM-style replacement front struts for a controlled ride.',
    msrp: 190,
    fitmentNotes: 'Best paired with new springs if lifting or lowering.',
    productUrl: amazon('B0OUTBKSTRT5'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 6,
    platformId: 'gen2_outback',
    brand: 'KYB',
    name: 'Excel-G Rear Struts',
    category: 'strut_rear',
    description: 'OEM-style replacement rear struts.',
    msrp: 180,
    fitmentNotes: 'Fits all Gen 2 Outback models.',
    productUrl: amazon('B0OUTBKSTRT6'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 7,
    platformId: 'gen2_outback',
    brand: 'King Springs',
    name: 'Raised Height Springs (Full Set)',
    category: 'lift_springs',
    description: 'Mild lift for extra clearance and load capacity.',
    msrp: 450,
    fitmentNotes: 'Approx. 1–1.5 inch lift. Recommend new struts.',
    productUrl: amazon('B0OUTBKLIFT7'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 8,
    platformId: 'gen2_outback',
    brand: 'Whiteline',
    name: 'Rear Sway Bar',
    category: 'suspension_sway_bar_rear',
    description: 'Thicker rear bar for reduced body roll and better cornering.',
    msrp: 240,
    fitmentNotes: 'Fits 2000–2004 Outback Gen 2 AWD.',
    productUrl: amazon('B0OUTBKSWAY8'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 9,
    platformId: 'gen2_outback',
    brand: 'Whiteline',
    name: 'Front Endlinks (Upgraded)',
    category: 'endlinks_front',
    description: 'Stronger links to pair with sway bar upgrades.',
    msrp: 110,
    fitmentNotes: 'Fits OEM and aftermarket sway bars on Gen 2 Outback.',
    productUrl: amazon('B0OUTBKENDL9'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 10,
    platformId: 'gen2_outback',
    brand: 'Whiteline',
    name: 'Rear Endlinks (Upgraded)',
    category: 'endlinks_rear',
    description: 'Heavy-duty rear endlinks for sway bar upgrades.',
    msrp: 105,
    fitmentNotes: 'Fits OEM and aftermarket rear sway bars on Gen 2 Outback.',
    productUrl: amazon('B0OUTBKENDL10'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 11,
    platformId: 'gen2_outback',
    brand: 'NGK',
    name: 'Iridium IX Spark Plugs (Set of 4)',
    category: 'spark_plugs',
    description: 'High-performance iridium plugs for smoother ignition.',
    msrp: 32,
    fitmentNotes: 'Fits EJ251 engines on 2000–2004 Outback Gen 2.',
    productUrl: amazon('B0OUTBKPLUG11'),
    compatibleEngines: ['EJ251'],
    compatibleTrims: ['25_base', '25_limited']
  },
  {
    id: 12,
    platformId: 'gen2_outback',
    brand: 'Mishimoto',
    name: 'Aluminum Performance Radiator',
    category: 'radiator',
    description: 'Upgraded aluminum radiator for improved cooling.',
    msrp: 275,
    fitmentNotes: 'Direct fit for EJ25 engines on Gen 2 Outback (2000–2004).',
    productUrl: amazon('B0OUTBKRAD12'),
    compatibleEngines: ['EJ251'],
    compatibleTrims: ['25_base', '25_limited']
  },
  {
    id: 13,
    platformId: 'gen2_outback',
    brand: 'Gates',
    name: 'Timing Belt Kit w/ Water Pump',
    category: 'timing_belt_kit',
    description: 'Complete kit including belt, tensioners, pulleys, pump.',
    msrp: 310,
    fitmentNotes: 'Fits EJ251/EJ252 engines (2000–2004 Outback).',
    productUrl: amazon('B0OUTBKTIME13'),
    compatibleEngines: ['EJ251'],
    compatibleTrims: ['25_base', '25_limited']
  },
  {
    id: 14,
    platformId: 'gen2_outback',
    brand: 'Subaru OEM',
    name: 'MLS Head Gasket Upgrade Kit',
    category: 'engine_gasket_kit',
    description: 'Multi-layer steel gaskets to replace stock units.',
    msrp: 190,
    fitmentNotes: 'Fits EJ251/EJ252 engines — common reliability upgrade.',
    productUrl: amazon('B0OUTBKHGKT14'),
    compatibleEngines: ['EJ251'],
    compatibleTrims: ['25_base', '25_limited']
  },
  {
    id: 15,
    platformId: 'gen2_outback',
    brand: 'K&N',
    name: 'High-Flow Drop-In Air Filter',
    category: 'air_filter',
    description: 'Reusable performance panel filter with improved airflow.',
    msrp: 65,
    fitmentNotes: 'Fits factory airbox on 2000–2004 Outback.',
    productUrl: amazon('B0OUTBKAFIL15'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 16,
    platformId: 'gen2_outback',
    brand: 'AVO',
    name: 'Cold Air Intake Kit',
    category: 'intake',
    description: 'Improves throttle response and intake sound.',
    msrp: 280,
    fitmentNotes: 'Fits 2.5L non-turbo Outback Gen 2.',
    productUrl: amazon('B0OUTBKINT16'),
    compatibleEngines: ['EJ251'],
    compatibleTrims: ['25_base', '25_limited']
  },
  {
    id: 17,
    platformId: 'gen2_outback',
    brand: 'Borla',
    name: 'Cat-Back Exhaust System',
    category: 'exhaust_catback',
    description: 'Stainless exhaust for better sound and slight gains.',
    msrp: 620,
    fitmentNotes:
      'Fits 2000–2004 Outback Gen 2. May need minor hanger adjustment.',
    productUrl: amazon('B0OUTBKEXH17'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 18,
    platformId: 'gen2_outback',
    brand: 'Falken',
    name: 'Wildpeak A/T Trail Tires (Set of 4)',
    category: 'tires_all_terrain',
    description: 'All-terrain tire for mixed on/off-road use.',
    msrp: 520,
    fitmentNotes: 'Ideal size: 225/60R16 for Gen 2 Outback.',
    productUrl: amazon('B0OUTBKTIRE18'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 19,
    platformId: 'gen2_outback',
    brand: 'Odyssey',
    name: 'Extreme Series AGM Battery',
    category: 'battery',
    description: 'High durability AGM battery for strong starts.',
    msrp: 230,
    fitmentNotes: 'Fits Gen 2 Outback battery tray with no modification.',
    productUrl: amazon('B0OUTBKBATT19'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 20,
    platformId: 'gen2_outback',
    brand: 'Mevotech',
    name: 'Front Control Arms (Pair)',
    category: 'control_arms_front',
    description: 'Reinforced control arms with upgraded bushings.',
    msrp: 260,
    fitmentNotes: 'Direct replacement for 2000–2004 Outback.',
    productUrl: amazon('B0OUTBKCARM20'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 21,
    platformId: 'gen2_outback',
    brand: 'Moog',
    name: 'Front Lower Ball Joints',
    category: 'ball_joints_front',
    description: 'Heavy-duty ball joints with grease fittings.',
    msrp: 80,
    fitmentNotes: 'Fits 2000–2004 Outback Gen 2 front control arms.',
    productUrl: amazon('B0OUTBKBALL21'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 22,
    platformId: 'gen2_outback',
    brand: 'GMB',
    name: 'Heavy-Duty Wheel Bearings (Front Pair)',
    category: 'wheel_bearings_front',
    description: 'Durable, quiet, and reliable front wheel bearings.',
    msrp: 150,
    fitmentNotes: 'Fits front hubs on 2000–2004 Outback Gen 2.',
    productUrl: amazon('B0OUTBKWBER22'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 23,
    platformId: 'gen2_outback',
    brand: 'Subaru OEM',
    name: 'Radiator Hoses (Upper + Lower)',
    category: 'cooling_hoses',
    description: 'OEM-grade rubber hoses for cooling system refresh.',
    msrp: 70,
    fitmentNotes: 'Fits EJ25 Gen 2 Outback.',
    productUrl: amazon('B0OUTBKHose23'),
    compatibleEngines: ['EJ251'],
    compatibleTrims: ['25_base', '25_limited']
  },
  {
    id: 24,
    platformId: 'gen2_outback',
    brand: 'Gates',
    name: 'Accessory Belt Kit (A/C + Alternator + P/S)',
    category: 'accessory_belts',
    description: 'Full belt kit for front engine accessories.',
    msrp: 55,
    fitmentNotes: 'Fits EJ251/EJ252 engines.',
    productUrl: amazon('B0OUTBKBLTS24'),
    compatibleEngines: ['EJ251'],
    compatibleTrims: ['25_base', '25_limited']
  },
  {
    id: 25,
    platformId: 'gen2_outback',
    brand: 'Energy Suspension',
    name: 'Polyurethane Steering Rack Bushings',
    category: 'steering_bushings',
    description: 'Sharpens steering response and reduces play in the rack.',
    msrp: 45,
    fitmentNotes: 'Fits Gen 2 Outback steering rack.',
    productUrl: amazon('B0OUTBKRACK25'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 26,
    platformId: 'gen2_outback',
    brand: 'Curt',
    name: 'Class 2 Trailer Hitch',
    category: 'hitch',
    description: 'Bolt-on hitch for light towing and racks.',
    msrp: 220,
    fitmentNotes: 'Wagon only. Verify tongue weight for your use.',
    productUrl: amazon('B0OUTBKHITCH26'),
    compatibleEngines: ['EJ251', 'EZ30'],
    compatibleTrims: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },

  // ===== 2nd Gen WRX (2002–2005 GD) =====
  {
    id: 101,
    platformId: 'gen2_wrx',
    brand: 'Hawk',
    name: 'HPS Front Brake Pads',
    category: 'brake_pad_front',
    description: 'Performance street pads with improved bite and heat capacity.',
    msrp: 120,
    fitmentNotes: 'Fits 2002–2005 WRX front 2-piston calipers.',
    productUrl: amazon('B0WRXPAD101'),
    compatibleEngines: ['EJ205'],
    compatibleTrims: ['wrx_base', 'wrx_premium']
  },
  {
    id: 102,
    platformId: 'gen2_wrx',
    brand: 'StopTech',
    name: 'Slotted Front Rotors (Pair)',
    category: 'rotor_front',
    description: 'Slotted rotors to reduce fade during spirited driving.',
    msrp: 260,
    fitmentNotes: 'Fits 2002–2005 WRX (5x100 hub).',
    productUrl: amazon('B0WRXROTR102'),
    compatibleEngines: ['EJ205'],
    compatibleTrims: ['wrx_base', 'wrx_premium']
  },
  {
    id: 103,
    platformId: 'gen2_wrx',
    brand: 'COBB',
    name: 'Accessport V3',
    category: 'tuning_device',
    description:
      'Handheld tuner for reflashing WRX ECU with off-the-shelf maps.',
    msrp: 675,
    fitmentNotes: 'Supports 2002–2005 WRX EJ205. Check map notes for mods list.',
    productUrl: amazon('B0WRXAP103'),
    compatibleEngines: ['EJ205'],
    compatibleTrims: ['wrx_base', 'wrx_premium']
  },
  {
    id: 104,
    platformId: 'gen2_wrx',
    brand: 'Invidia',
    name: 'Bellmouth Downpipe',
    category: 'downpipe',
    description:
      'Stainless bellmouth downpipe for turbo spool and power gains.',
    msrp: 520,
    fitmentNotes:
      'Off-road / track use where allowed. Requires tuning. Fits 2002–2005 WRX.',
    productUrl: amazon('B0WRXDOWN104'),
    compatibleEngines: ['EJ205'],
    compatibleTrims: ['wrx_base', 'wrx_premium']
  },
  {
    id: 105,
    platformId: 'gen2_wrx',
    brand: 'BC Racing',
    name: 'BR Series Coilovers',
    category: 'coilovers',
    description: 'Height and damping adjustable coilovers for street/track.',
    msrp: 1150,
    fitmentNotes: 'Fits 2002–2005 WRX sedan/wagon.',
    productUrl: amazon('B0WRXCOIL105'),
    compatibleEngines: ['EJ205'],
    compatibleTrims: ['wrx_base', 'wrx_premium']
  },
  {
    id: 106,
    platformId: 'gen2_wrx',
    brand: 'Exedy',
    name: 'Stage 1 Clutch Kit',
    category: 'clutch_kit',
    description: 'Upgraded clutch for mild power increases and spirited driving.',
    msrp: 520,
    fitmentNotes: 'Fits 2002–2005 WRX 5-speed transmission.',
    productUrl: amazon('B0WRXCLTC106'),
    compatibleEngines: ['EJ205'],
    compatibleTrims: ['wrx_base', 'wrx_premium']
  },
  {
    id: 107,
    platformId: 'gen2_wrx',
    brand: 'Whiteline',
    name: '22mm Adjustable Rear Sway Bar',
    category: 'suspension_sway_bar_rear',
    description:
      'Reduces understeer and adds rotation for a more neutral balance.',
    msrp: 260,
    fitmentNotes: 'Fits 2002–2005 WRX sedan/wagon. Use with upgraded endlinks.',
    productUrl: amazon('B0WRXSWAY107'),
    compatibleEngines: ['EJ205'],
    compatibleTrims: ['wrx_base', 'wrx_premium']
  },
  {
    id: 108,
    platformId: 'gen2_wrx',
    brand: 'Mishimoto',
    name: 'Aluminum WRX Radiator',
    category: 'radiator',
    description:
      'Increased cooling capacity for track days or tuned street cars.',
    msrp: 310,
    fitmentNotes: 'Fits 2002–2005 WRX EJ205.',
    productUrl: amazon('B0WRXRAD108'),
    compatibleEngines: ['EJ205'],
    compatibleTrims: ['wrx_base', 'wrx_premium']
  },
  {
    id: 109,
    platformId: 'gen2_wrx',
    brand: 'Group N',
    name: 'Engine & Transmission Mounts',
    category: 'mounts_drivetrain',
    description: 'Stiffer mounts to reduce drivetrain slop and wheel hop.',
    msrp: 380,
    fitmentNotes: 'Fits 2002–2005 WRX manual trans.',
    productUrl: amazon('B0WRXMNT109'),
    compatibleEngines: ['EJ205'],
    compatibleTrims: ['wrx_base', 'wrx_premium']
  },
  {
    id: 110,
    platformId: 'gen2_wrx',
    brand: 'Greddy',
    name: 'Front-Mount Intercooler Kit',
    category: 'intercooler',
    description:
      'Large front-mount intercooler for big-turbo or high-boost builds.',
    msrp: 980,
    fitmentNotes:
      'Cutting/trimming bumper may be required. Tuning recommended.',
    productUrl: amazon('B0WRXFMIC110'),
    compatibleEngines: ['EJ205'],
    compatibleTrims: ['wrx_base', 'wrx_premium']
  },

  // ===== SG Forester (2003–2008) =====
  {
    id: 201,
    platformId: 'sg_forester',
    brand: 'KYB',
    name: 'Excel-G Strut Set (Front & Rear)',
    category: 'strut_front',
    description: 'OEM-style dampers to refresh tired SG Forester suspension.',
    msrp: 360,
    fitmentNotes: 'Fits 2003–2008 Forester SG (non-turbo and XT).',
    productUrl: amazon('B0SGFSTRT201'),
    compatibleEngines: ['EJ253', 'EJ255'],
    compatibleTrims: ['sg_x', 'sg_x_premium', 'sg_xt']
  },
  {
    id: 202,
    platformId: 'sg_forester',
    brand: 'King Springs',
    name: 'Raised Height Springs (SG Forester)',
    category: 'lift_springs',
    description:
      '1–1.5 inch lift for light overland builds and extra clearance.',
    msrp: 480,
    fitmentNotes:
      'Fits 2003–2008 Forester SG. Recommend new struts and alignment.',
    productUrl: amazon('B0SGFLIFT202'),
    compatibleEngines: ['EJ253', 'EJ255'],
    compatibleTrims: ['sg_x', 'sg_x_premium', 'sg_xt']
  },
  {
    id: 203,
    platformId: 'sg_forester',
    brand: 'Hawk',
    name: 'HPS Front Brake Pads (SG)',
    category: 'brake_pad_front',
    description: 'Performance street brakes for spirited Forester driving.',
    msrp: 125,
    fitmentNotes: 'Fits 2003–2008 Forester SG front calipers.',
    productUrl: amazon('B0SGFPADS203'),
    compatibleEngines: ['EJ253', 'EJ255'],
    compatibleTrims: ['sg_x', 'sg_x_premium', 'sg_xt']
  },
  {
    id: 204,
    platformId: 'sg_forester',
    brand: 'StopTech',
    name: 'Slotted Front Rotors (Pair)',
    category: 'rotor_front',
    description: 'Improved bite and heat management for Forester SG.',
    msrp: 260,
    fitmentNotes: 'Fits 5x100 SG Forester front hubs.',
    productUrl: amazon('B0SGFROTR204'),
    compatibleEngines: ['EJ253', 'EJ255'],
    compatibleTrims: ['sg_x', 'sg_x_premium', 'sg_xt']
  },
  {
    id: 205,
    platformId: 'sg_forester',
    brand: 'COBB',
    name: 'Accessport V3 (Forester XT)',
    category: 'tuning_device',
    description: 'Off-the-shelf tunes for EJ255 Forester XT.',
    msrp: 675,
    fitmentNotes:
      'Fits turbo 2004–2008 Forester XT EJ255 only. Not for NA models.',
    productUrl: amazon('B0SGFAP205'),
    compatibleEngines: ['EJ255'],
    compatibleTrims: ['sg_xt']
  },
  {
    id: 206,
    platformId: 'sg_forester',
    brand: 'Invidia',
    name: 'Cat-Back Exhaust (Forester SG)',
    category: 'exhaust_catback',
    description:
      'Stainless exhaust for deeper tone and mild flow gains on SG.',
    msrp: 640,
    fitmentNotes:
      'Fits 2003–2008 Forester SG. Check tip clearance with tow hitches.',
    productUrl: amazon('B0SGFEXH206'),
    compatibleEngines: ['EJ253', 'EJ255'],
    compatibleTrims: ['sg_x', 'sg_x_premium', 'sg_xt']
  },
  {
    id: 207,
    platformId: 'sg_forester',
    brand: 'Falken',
    name: 'Wildpeak A/T3W Tires (Set of 4)',
    category: 'tires_all_terrain',
    description: 'All-terrain tires ideal for light trail and snow duty.',
    msrp: 540,
    fitmentNotes: 'Popular size: 215/65R16 on SG Forester.',
    productUrl: amazon('B0SGFTIRE207'),
    compatibleEngines: ['EJ253', 'EJ255'],
    compatibleTrims: ['sg_x', 'sg_x_premium', 'sg_xt']
  },
  {
    id: 208,
    platformId: 'sg_forester',
    brand: 'Curt',
    name: 'Class 3 Trailer Hitch (Forester SG)',
    category: 'hitch',
    description: 'Tow small trailers or run a hitch-mounted rack.',
    msrp: 260,
    fitmentNotes:
      'Fits 2003–2008 Forester SG, bolt-on, drilling may be required.',
    productUrl: amazon('B0SGFHITCH208'),
    compatibleEngines: ['EJ253', 'EJ255'],
    compatibleTrims: ['sg_x', 'sg_x_premium', 'sg_xt']
  },// ===== XV30 Camry (2002–2006) =====
  {
    id: 301,
    platformId: 'xv30_camry',
    brand: 'Akebono',
    name: 'ProACT Front Brake Pads (Camry 2.4)',
    category: 'brake_pad_front',
    description: 'Ceramic pads for quiet, low-dust daily driving.',
    msrp: 75,
    fitmentNotes: 'Fits 2002–2006 Camry 2.4L I4 (front).',
    productUrl: amazon('B0CAMRYPAD301'),
    compatibleEngines: ['2AZFE'],
    compatibleTrims: ['camry_le_24', 'camry_xle_24']
  },
  {
    id: 302,
    platformId: 'xv30_camry',
    brand: 'Akebono',
    name: 'ProACT Front Brake Pads (Camry V6)',
    category: 'brake_pad_front',
    description: 'V6-specific ceramic pads for smooth braking.',
    msrp: 85,
    fitmentNotes: 'Fits 2004–2006 Camry V6 (3MZ-FE) front calipers.',
    productUrl: amazon('B0CAMRYPAD302'),
    compatibleEngines: ['3MZFE'],
    compatibleTrims: ['camry_se_v6']
  },
  {
    id: 303,
    platformId: 'xv30_camry',
    brand: 'Centric',
    name: 'Premium Front Brake Rotors (Pair)',
    category: 'rotor_front',
    description: 'High-quality rotors for stock or mild upgrade pads.',
    msrp: 130,
    fitmentNotes: 'Fits 2002–2006 Camry 2.4L and V6 (verify diameter).',
    productUrl: amazon('B0CAMRYROT303'),
    compatibleEngines: ['2AZFE', '3MZFE'],
    compatibleTrims: ['camry_le_24', 'camry_xle_24', 'camry_se_v6']
  },
  {
    id: 304,
    platformId: 'xv30_camry',
    brand: 'PowerStop',
    name: 'Rear Drilled & Slotted Rotors (Pair)',
    category: 'rotor_rear',
    description:
      'Rear rotor upgrade for better cooling and bite on long grades.',
    msrp: 145,
    fitmentNotes: 'Fits rear of 2002–2006 Camry with rear disc brakes.',
    productUrl: amazon('B0CAMRYROT304'),
    compatibleEngines: ['2AZFE', '3MZFE'],
    compatibleTrims: ['camry_le_24', 'camry_xle_24', 'camry_se_v6']
  },
  {
    id: 305,
    platformId: 'xv30_camry',
    brand: 'KYB',
    name: 'Excel-G Front Struts (Pair)',
    category: 'strut_front',
    description: 'OEM-style front struts to tighten up the front end.',
    msrp: 210,
    fitmentNotes: 'Fits 2002–2006 Camry, all engines.',
    productUrl: amazon('B0CAMRYSTR305'),
    compatibleEngines: ['2AZFE', '3MZFE'],
    compatibleTrims: ['camry_le_24', 'camry_xle_24', 'camry_se_v6']
  },
  {
    id: 306,
    platformId: 'xv30_camry',
    brand: 'KYB',
    name: 'Excel-G Rear Struts (Pair)',
    category: 'strut_rear',
    description: 'Rear struts to match Excel-G fronts for balanced ride.',
    msrp: 205,
    fitmentNotes: 'Fits 2002–2006 Camry, all engines.',
    productUrl: amazon('B0CAMRYSTR306'),
    compatibleEngines: ['2AZFE', '3MZFE'],
    compatibleTrims: ['camry_le_24', 'camry_xle_24', 'camry_se_v6']
  },
  {
    id: 307,
    platformId: 'xv30_camry',
    brand: 'Moog',
    name: 'Front Lower Control Arms (Pair)',
    category: 'control_arms_front',
    description: 'Includes bushings and ball joints for a full front refresh.',
    msrp: 260,
    fitmentNotes: 'Fits 2002–2006 Camry XV30 front suspension.',
    productUrl: amazon('B0CAMRYARM307'),
    compatibleEngines: ['2AZFE', '3MZFE'],
    compatibleTrims: ['camry_le_24', 'camry_xle_24', 'camry_se_v6']
  },
  {
    id: 308,
    platformId: 'xv30_camry',
    brand: 'NGK',
    name: 'Iridium Spark Plugs (Set of 4, 2.4L)',
    category: 'spark_plugs',
    description: 'Long-life iridium plugs for the 2.4L 2AZ-FE.',
    msrp: 40,
    fitmentNotes: 'Fits 2AZ-FE 2.4L I4 Camry only.',
    productUrl: amazon('B0CAMRYPLG308'),
    compatibleEngines: ['2AZFE'],
    compatibleTrims: ['camry_le_24', 'camry_xle_24']
  },
  {
    id: 309,
    platformId: 'xv30_camry',
    brand: 'Denso',
    name: 'Ignition Coil Pack (Single, 2.4L)',
    category: 'coil_pack',
    description: 'OEM-style ignition coil for misfire repair or spares.',
    msrp: 65,
    fitmentNotes:
      'Fits 2AZ-FE 2.4L I4. Order 4 for full set, match part number by VIN.',
    productUrl: amazon('B0CAMRYCOIL309'),
    compatibleEngines: ['2AZFE'],
    compatibleTrims: ['camry_le_24', 'camry_xle_24']
  },
  {
    id: 310,
    platformId: 'xv30_camry',
    brand: 'Falken',
    name: 'Sincera All-Season Tires (Set of 4)',
    category: 'tires_all_terrain',
    description:
      'Comfort-focused all-season tires for daily commuting and highway use.',
    msrp: 480,
    fitmentNotes: 'Common size: 205/65R15 or 215/60R16 — verify by door jamb.',
    productUrl: amazon('B0CAMRYTIRE310'),
    compatibleEngines: ['2AZFE', '3MZFE'],
    compatibleTrims: ['camry_le_24', 'camry_xle_24', 'camry_se_v6']
  },

  // ===== 3rd Gen Ram 2500 (2003–2008) =====
  {
    id: 401,
    platformId: 'ram3g_2500',
    brand: 'Raybestos',
    name: 'Severe Duty Front Brake Pads',
    category: 'brake_pad_front',
    description:
      'Fleet-grade pads designed for towing, hauling, and frequent stops.',
    msrp: 120,
    fitmentNotes: 'Fits 2003–2008 Ram 2500 front disc brakes (check rotor size).',
    productUrl: amazon('B0RAMPAD401'),
    compatibleEngines: ['57HEMI', '59CUMMINS'],
    compatibleTrims: ['ram2500_57_hemi', 'ram2500_59_cummins']
  },
  {
    id: 402,
    platformId: 'ram3g_2500',
    brand: 'PowerStop',
    name: 'Front Drilled & Slotted Rotors (Pair)',
    category: 'rotor_front',
    description: 'Heavy-duty rotors to handle heat from towing and mountain descents.',
    msrp: 260,
    fitmentNotes: 'Fits most 2003–2008 Ram 2500 front hubs (verify by VIN).',
    productUrl: amazon('B0RAMROTR402'),
    compatibleEngines: ['57HEMI', '59CUMMINS'],
    compatibleTrims: ['ram2500_57_hemi', 'ram2500_59_cummins']
  },
  {
    id: 403,
    platformId: 'ram3g_2500',
    brand: 'Raybestos',
    name: 'Severe Duty Rear Brake Pads',
    category: 'brake_pad_front', // re-using brake category so filters catch it
    description: 'Severe duty compound for loaded work trucks.',
    msrp: 115,
    fitmentNotes: 'Fits 2003–2008 Ram 2500 rear disc brakes (where equipped).',
    productUrl: amazon('B0RAMPAD403'),
    compatibleEngines: ['57HEMI', '59CUMMINS'],
    compatibleTrims: ['ram2500_57_hemi', 'ram2500_59_cummins']
  },
  {
    id: 404,
    platformId: 'ram3g_2500',
    brand: 'PowerStop',
    name: 'Rear Drilled & Slotted Rotors (Pair)',
    category: 'rotor_rear',
    description:
      'Rear rotor upgrade for better heat management with heavy trailers.',
    msrp: 240,
    fitmentNotes:
      'Fits 2003–2008 Ram 2500 with rear discs. Drum models need different kit.',
    productUrl: amazon('B0RAMROTR404'),
    compatibleEngines: ['57HEMI', '59CUMMINS'],
    compatibleTrims: ['ram2500_57_hemi', 'ram2500_59_cummins']
  },
  {
    id: 405,
    platformId: 'ram3g_2500',
    brand: 'Russell',
    name: 'Stainless Steel Brake Line Kit',
    category: 'brake_lines',
    description: 'Braided stainless lines for firmer pedal feel under load.',
    msrp: 190,
    fitmentNotes:
      'Fits many 2003–2008 Ram 2500 applications — confirm by axle and lift height.',
    productUrl: amazon('B0RAMBLN405'),
    compatibleEngines: ['57HEMI', '59CUMMINS'],
    compatibleTrims: ['ram2500_57_hemi', 'ram2500_59_cummins']
  },
  {
    id: 406,
    platformId: 'ram3g_2500',
    brand: 'Bilstein',
    name: '5100 Series Front Shocks',
    category: 'strut_front', // using strut_front so it appears in suspension filter
    description:
      'Height-corrected front shocks for leveled / mild lift Ram 2500 trucks.',
    msrp: 220,
    fitmentNotes:
      'Common for 0–2.5" front leveling kits. Verify part number for your lift.',
    productUrl: amazon('B0RAMSHCK406'),
    compatibleEngines: ['57HEMI', '59CUMMINS'],
    compatibleTrims: ['ram2500_57_hemi', 'ram2500_59_cummins']
  },
  {
    id: 407,
    platformId: 'ram3g_2500',
    brand: 'Bilstein',
    name: '5100 Series Rear Shocks',
    category: 'strut_rear', // using strut_rear for same filter reason
    description:
      'Matched rear shocks to control heavy loads and trailers without wallow.',
    msrp: 220,
    fitmentNotes:
      'Designed for 0–2" rear lift — check bed configuration and axle code.',
    productUrl: amazon('B0RAMSHCK407'),
    compatibleEngines: ['57HEMI', '59CUMMINS'],
    compatibleTrims: ['ram2500_57_hemi', 'ram2500_59_cummins']
  },
  {
    id: 408,
    platformId: 'ram3g_2500',
    brand: 'Synergy',
    name: 'Heavy-Duty Track Bar',
    category: 'control_arms_front',
    description:
      'Adjustable track bar to fight death wobble and recenter the front axle.',
    msrp: 380,
    fitmentNotes:
      'Fits many 3rd gen Ram 2500/3500 4x4 trucks. Verify lift height compatibility.',
    productUrl: amazon('B0RAMTRKB408'),
    compatibleEngines: ['57HEMI', '59CUMMINS'],
    compatibleTrims: ['ram2500_57_hemi', 'ram2500_59_cummins']
  },
  {
    id: 409,
    platformId: 'ram3g_2500',
    brand: 'BD Diesel',
    name: 'Steering Box Stabilizer',
    category: 'steering_bushings',
    description:
      'Frame-mounted brace to support the steering box and reduce wander.',
    msrp: 260,
    fitmentNotes:
      'Fits many 2003–2008 Ram 2500/3500 4x4 trucks. Check steering box style.',
    productUrl: amazon('B0RAMSTAB409'),
    compatibleEngines: ['57HEMI', '59CUMMINS'],
    compatibleTrims: ['ram2500_57_hemi', 'ram2500_59_cummins']
  },
  {
    id: 410,
    platformId: 'ram3g_2500',
    brand: 'Curt',
    name: 'Class 5 XD Hitch',
    category: 'hitch',
    description:
      'High-capacity receiver hitch for serious towing with a weight distribution setup.',
    msrp: 380,
    fitmentNotes:
      'Fits many 2003–2008 Ram 2500 frames. Confirm frame spacing and bumper style.',
    productUrl: amazon('B0RAMHITCH410'),
    compatibleEngines: ['57HEMI', '59CUMMINS'],
    compatibleTrims: ['ram2500_57_hemi', 'ram2500_59_cummins']
  }
];

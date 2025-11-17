'use client';

import { useState, useEffect } from 'react';
import { demoParts } from './demoParts';

// ========== Types ==========
type Part = {
  id: number;
  platformId: string;
  brand: string;
  name: string;
  category: string;
  description: string;
  msrp: number;
  fitmentNotes: string;
  productUrl: string;
  compatibleEngines: string[];
  compatibleTrims: string[];
};

type VehicleOption = {
  id: string;
  label: string;
  make: string;
  model: string;
  yearMin: number;
  yearMax: number;
  supportedTrimValues: string[];
};

type TrimOption = {
  value: string;
  label: string;
  engineCode: string;
  engineLabel: string;
  isH6: boolean;
  yearMin: number;
  yearMax: number;
};

type CategoryFilter = {
  id: string;
  label: string;
  description: string;
};

type Build = {
  id: string;
  name: string;
  vehicleId: string;
  year: number;
  trimValue: string;
  partIds: number[];
  createdAt: string;
};

const BUILD_STORAGE_KEY = 'buildplanner_builds_v1';

// ========== Vehicle + Trim Definitions ==========

const VEHICLES: VehicleOption[] = [
  {
    id: 'gen2_outback',
    label: '2000–2004 Subaru Outback (Gen 2)',
    make: 'Subaru',
    model: 'Outback',
    yearMin: 2000,
    yearMax: 2004,
    supportedTrimValues: ['25_base', '25_limited', '30_llbean', '30_vdc']
  },
  {
    id: 'gen2_wrx',
    label: '2002–2005 Subaru Impreza WRX (GD)',
    make: 'Subaru',
    model: 'Impreza WRX',
    yearMin: 2002,
    yearMax: 2005,
    supportedTrimValues: ['wrx_base', 'wrx_premium']
  },
  {
    id: 'sg_forester',
    label: '2003–2008 Subaru Forester (SG)',
    make: 'Subaru',
    model: 'Forester',
    yearMin: 2003,
    yearMax: 2008,
    supportedTrimValues: ['sg_x', 'sg_x_premium', 'sg_xt']
  },
  {
    id: 'xv30_camry',
    label: '2002–2006 Toyota Camry (XV30)',
    make: 'Toyota',
    model: 'Camry',
    yearMin: 2002,
    yearMax: 2006,
    supportedTrimValues: ['camry_le_24', 'camry_xle_24', 'camry_se_v6']
  },
  {
    id: 'ram3g_2500',
    label: '2003–2008 Dodge Ram 2500 (3rd Gen)',
    make: 'Dodge',
    model: 'Ram 2500',
    yearMin: 2003,
    yearMax: 2008,
    supportedTrimValues: ['ram2500_57_hemi', 'ram2500_59_cummins']
  }
];

// ========== TRIM OPTIONS ==========

const TRIM_OPTIONS: TrimOption[] = [
  // Outback
  { value: '25_base', label: 'Outback 2.5 Base', engineCode: 'EJ251', engineLabel: 'EJ251 • 2.5L H4', isH6: false, yearMin: 2000, yearMax: 2004 },
  { value: '25_limited', label: 'Outback 2.5 Limited', engineCode: 'EJ251', engineLabel: 'EJ251 • 2.5L H4', isH6: false, yearMin: 2000, yearMax: 2004 },
  { value: '30_llbean', label: 'Outback 3.0 LL Bean', engineCode: 'EZ30', engineLabel: 'EZ30 • 3.0L H6', isH6: true, yearMin: 2001, yearMax: 2004 },
  { value: '30_vdc', label: 'Outback 3.0 VDC', engineCode: 'EZ30', engineLabel: 'EZ30 • 3.0L H6', isH6: true, yearMin: 2001, yearMax: 2004 },

  // WRX
  { value: 'wrx_base', label: 'WRX Base', engineCode: 'EJ205', engineLabel: 'EJ205 • 2.0L Turbo', isH6: false, yearMin: 2002, yearMax: 2005 },
  { value: 'wrx_premium', label: 'WRX Premium', engineCode: 'EJ205', engineLabel: 'EJ205 • 2.0L Turbo', isH6: false, yearMin: 2002, yearMax: 2005 },

  // Forester SG
  { value: 'sg_x', label: 'Forester X', engineCode: 'EJ253', engineLabel: 'EJ253 • 2.5L H4', isH6: false, yearMin: 2003, yearMax: 2008 },
  { value: 'sg_x_premium', label: 'Forester X Premium', engineCode: 'EJ253', engineLabel: 'EJ253 • 2.5L H4', isH6: false, yearMin: 2003, yearMax: 2008 },
  { value: 'sg_xt', label: 'Forester XT', engineCode: 'EJ255', engineLabel: 'EJ255 • 2.5L Turbo', isH6: false, yearMin: 2004, yearMax: 2008 },

  // Camry XV30
  { value: 'camry_le_24', label: 'Camry LE 2.4', engineCode: '2AZFE', engineLabel: '2AZ-FE • 2.4L I4', isH6: false, yearMin: 2002, yearMax: 2006 },
  { value: 'camry_xle_24', label: 'Camry XLE 2.4', engineCode: '2AZFE', engineLabel: '2AZ-FE • 2.4L I4', isH6: false, yearMin: 2002, yearMax: 2006 },
  { value: 'camry_se_v6', label: 'Camry SE V6', engineCode: '3MZFE', engineLabel: '3MZ-FE • 3.3L V6', isH6: false, yearMin: 2004, yearMax: 2006 },

  // Ram 2500
  { value: 'ram2500_57_hemi', label: 'Ram 2500 5.7 HEMI', engineCode: '57HEMI', engineLabel: '5.7L HEMI V8', isH6: false, yearMin: 2003, yearMax: 2008 },
  { value: 'ram2500_59_cummins', label: 'Ram 2500 5.9 Cummins', engineCode: '59CUMMINS', engineLabel: '5.9L Turbo Diesel', isH6: false, yearMin: 2003, yearMax: 2007 }
];

// Category groups
const CATEGORY_FILTERS: CategoryFilter[] = [
  { id: 'all', label: 'All', description: 'Everything that fits' },
  { id: 'brakes', label: 'Brakes', description: 'Pads, rotors, lines' },
  { id: 'suspension', label: 'Suspension', description: 'Struts, springs, coils' },
  { id: 'power', label: 'Power & Tuning', description: 'Intakes, exhaust, tuners' },
  { id: 'cooling', label: 'Cooling', description: 'Radiator, hoses, etc.' },
  { id: 'maintenance', label: 'Maintenance', description: 'Belts, plugs, gaskets' },
  { id: 'towing', label: 'Towing & Load', description: 'Hitches, HD parts' },
  { id: 'wheels_tires', label: 'Wheels & Tires', description: 'Tires' },
  { id: 'steering', label: 'Steering & Chassis', description: 'Arms, bushings, rack' }
];

// Map part→category group
function getCategoryGroup(part: Part): string {
  switch (part.category) {
    case 'brake_pad_front':
    case 'rotor_front':
    case 'rotor_rear':
    case 'brake_lines':
      return 'brakes';
    case 'strut_front':
    case 'strut_rear':
    case 'lift_springs':
    case 'coilovers':
    case 'suspension_sway_bar_rear':
    case 'endlinks_front':
    case 'endlinks_rear':
      return 'suspension';
    case 'intake':
    case 'exhaust_catback':
    case 'downpipe':
    case 'tuning_device':
    case 'intercooler':
      return 'power';
    case 'radiator':
    case 'cooling_hoses':
      return 'cooling';
    case 'timing_belt_kit':
    case 'engine_gasket_kit':
    case 'spark_plugs':
    case 'coil_pack':
    case 'accessory_belts':
      return 'maintenance';
    case 'hitch':
      return 'towing';
    case 'tires_all_terrain':
      return 'wheels_tires';
    case 'control_arms_front':
    case 'wheel_bearings_front':
    case 'steering_bushings':
    case 'mounts_drivetrain':
      return 'steering';
    default:
      return 'all';
  }
}

// Rough labor hours estimate
function estimateLaborHoursForPart(part: Part): number {
  const g = getCategoryGroup(part);
  switch (g) {
    case 'brakes': return 1.5;
    case 'suspension': return 2.0;
    case 'power': return 2.5;
    case 'cooling': return 2.0;
    case 'maintenance': return 1.0;
    case 'towing': return 1.5;
    case 'steering': return 2.0;
    case 'wheels_tires': return 0.8;
    default: return 1.0;
  }
}

// Visual badges
function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-slate-100">
      {children}
    </span>
  );
}

// Category pills
function CategoryPill({ category, active, onClick }: {
  category: CategoryFilter;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col gap-0.5 rounded-2xl border px-3 py-2 text-left transition
        ${
          active
            ? 'border-emerald-400/70 bg-emerald-500/10 text-emerald-100 shadow-sm'
            : 'border-white/10 bg-white/5 text-slate-200 hover:border-emerald-300/60 hover:bg-emerald-500/5'
        }`}
    >
      <span className="text-xs font-semibold uppercase tracking-wide">
        {category.label}
      </span>
      <span className="text-[0.65rem] text-slate-300/80">
        {category.description}
      </span>
    </button>
  );
}

// Part card
function PartCard({
  part, included, engineLabel, trimLabel, onToggleInclude
}: {
  part: Part;
  included: boolean;
  engineLabel?: string;
  trimLabel?: string;
  onToggleInclude: () => void;
}) {
  const group = getCategoryGroup(part);

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-white/10 bg-slate-900/70 p-4 shadow-sm backdrop-blur">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-wide text-emerald-300/80">
              {part.brand}
            </div>
            <h3 className="text-sm font-semibold text-slate-50">{part.name}</h3>
          </div>

          <div className="flex flex-col items-end gap-1">
            <Badge>${part.msrp.toFixed(2)}</Badge>
            <span className="text-[0.65rem] text-slate-400">{group}</span>
          </div>
        </div>

        <p className="line-clamp-2 text-xs text-slate-300">{part.description}</p>
        <p className="text-[0.7rem] text-slate-400/90">{part.fitmentNotes}</p>

        <div className="mt-1 flex flex-wrap gap-1.5">
          {engineLabel && <Badge>Engine: {engineLabel}</Badge>}
          {trimLabel && <Badge>Trim: {trimLabel}</Badge>}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onToggleInclude}
          className={`flex flex-1 items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold transition
            ${
              included
                ? 'bg-emerald-400 text-slate-900 shadow shadow-emerald-500/60'
                : 'bg-white/5 text-slate-100 hover:bg-emerald-500/20'
            }`}
        >
          {included ? '✓ In build' : '+ Add to build'}
        </button>

        <a
          href={part.productUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            // Click tracker (affiliate metrics)
            console.log('Affiliate click →', {
              id: part.id,
              brand: part.brand,
              name: part.name,
              url: part.productUrl
            });
          }}
          className="flex items-center justify-center rounded-xl bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-100 hover:bg-slate-700"
        >
          View / Buy
        </a>
      </div>
    </div>
  );
}

// ========== MAIN PAGE ==========
export default function Home() {
  const [selectedVehicleId, setSelectedVehicleId] = useState(VEHICLES[0].id);
  const [selectedYear, setSelectedYear] = useState(VEHICLES[0].yearMin);
  const [selectedTrim, setSelectedTrim] = useState('25_base');
  const [activeCategory, setActiveCategory] = useState('all');
  const [includedPartIds, setIncludedPartIds] = useState<Record<number, boolean>>({});

  const [builds, setBuilds] = useState<Build[]>([]);
  const [newBuildName, setNewBuildName] = useState('');

  // Load builds from localStorage on first render (browser only)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(BUILD_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Build[];
        setBuilds(parsed);
      }
    } catch (err) {
      console.error('Failed to read saved builds', err);
    }
  }, []);

  const selectedVehicle = VEHICLES.find(v => v.id === selectedVehicleId)!;

  const years = [...Array(selectedVehicle.yearMax - selectedVehicle.yearMin + 1)]
    .map((_, i) => selectedVehicle.yearMin + i);

  const trims = TRIM_OPTIONS.filter(t =>
    selectedVehicle.supportedTrimValues.includes(t.value)
  );

  const trim = trims.find(t => t.value === selectedTrim) ?? trims[0];
  const engineCode = trim.engineCode;
  const engineLabel = trim.engineLabel;
  const trimLabel = trim.label;

  const parts = demoParts.filter(part => {
    if (part.platformId !== selectedVehicleId) return false;
    if (!part.compatibleTrims.includes(trim.value)) return false;
    if (!part.compatibleEngines.includes(engineCode)) return false;

    if (activeCategory !== 'all' && getCategoryGroup(part) !== activeCategory)
      return false;

    return true;
  });

  const includedParts = parts.filter(p => includedPartIds[p.id]);
  const partsTotal = includedParts.reduce((a, p) => a + p.msrp, 0);
  const hours = includedParts.reduce((a, p) => a + estimateLaborHoursForPart(p), 0);
  const shopLow = hours * 120;
  const shopHigh = hours * 170;

  const persistBuilds = (updated: Build[]) => {
    setBuilds(updated);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(BUILD_STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save builds', err);
      }
    }
  };

  const handleSaveBuild = () => {
    const partIds = Object.entries(includedPartIds)
      .filter(([_, included]) => included)
      .map(([id]) => Number(id));

    if (partIds.length === 0) {
      alert('Add at least one part to your build before saving.');
      return;
    }

    const name =
      newBuildName.trim() ||
      `${selectedVehicle.make} ${selectedVehicle.model} ${selectedYear} — ${trimLabel}`;

    const newBuild: Build = {
      id: Date.now().toString(),
      name,
      vehicleId: selectedVehicleId,
      year: selectedYear,
      trimValue: trim.value,
      partIds,
      createdAt: new Date().toISOString()
    };

    const updated = [...builds, newBuild];
    persistBuilds(updated);
    setNewBuildName('');
  };

  const handleLoadBuild = (build: Build) => {
    setSelectedVehicleId(build.vehicleId);
    setSelectedYear(build.year);
    setSelectedTrim(build.trimValue);

    const nextIncluded: Record<number, boolean> = {};
    build.partIds.forEach(id => {
      nextIncluded[id] = true;
    });
    setIncludedPartIds(nextIncluded);
    setActiveCategory('all');
  };

  const handleDeleteBuild = (id: string) => {
    const updated = builds.filter(b => b.id !== id);
    persistBuilds(updated);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* HEADER */}
        <header className="mb-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-emerald-100">
            🔧 Build Planner — Demo
          </div>

          <h1 className="mt-3 text-3xl font-bold">
            Build your next car setup — your way.
          </h1>
          <p className="max-w-xl text-sm text-slate-300">
            Select a platform, filter upgrades, and create a realistic build with
            pricing and labor estimates. Save builds to come back later or share
            with a shop.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[2.2fr_1fr]">
          {/* LEFT SIDE */}
          <section className="space-y-6">
            {/* VEHICLE PICKER */}
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-lg">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Platform
                  </label>
                  <select
                    className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm"
                    value={selectedVehicleId}
                    onChange={(e) => {
                      const v = VEHICLES.find(x => x.id === e.target.value)!;
                      setSelectedVehicleId(v.id);
                      setSelectedYear(v.yearMin);
                      setSelectedTrim(v.supportedTrimValues[0]);
                      setIncludedPartIds({});
                      setActiveCategory('all');
                    }}
                  >
                    {VEHICLES.map(v => (
                      <option key={v.id} value={v.id}>{v.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Year
                  </label>
                  <select
                    className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(Number(e.target.value))}
                  >
                    {years.map(y => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Trim
                  </label>
                  <select
                    className="mt-1 w-full rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-sm"
                    value={selectedTrim}
                    onChange={(e) => setSelectedTrim(e.target.value)}
                  >
                    {trims.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* CATEGORY FILTERS */}
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-lg space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Categories
                  </div>
                  <p className="text-[0.75rem] text-slate-300">
                    Filter upgrades by type — or explore everything.
                  </p>
                </div>
                <button
                  type="button"
                  className="text-[0.7rem] text-emerald-300/90 underline-offset-2 hover:underline"
                  onClick={() => setActiveCategory('all')}
                >
                  Clear
                </button>
              </div>

              <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-4">
                {CATEGORY_FILTERS.map(cat => (
                  <CategoryPill
                    key={cat.id}
                    category={cat}
                    active={activeCategory === cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                  />
                ))}
              </div>
            </div>

            {/* PART LIST */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <h2 className="text-sm font-semibold">Compatible upgrades</h2>
                <span className="text-xs text-slate-400">
                  {parts.length} found
                </span>
              </div>

              {parts.length === 0 && (
                <div className="rounded-2xl border border-dashed border-emerald-400/40 bg-emerald-500/5 px-4 py-6 text-center text-xs text-slate-200">
                  Nothing here yet for this selection — try another filter or trim.
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {parts.map(p => (
                  <PartCard
                    key={p.id}
                    part={p}
                    included={!!includedPartIds[p.id]}
                    engineLabel={engineLabel}
                    trimLabel={trimLabel}
                    onToggleInclude={() =>
                      setIncludedPartIds(prev => ({ ...prev, [p.id]: !prev[p.id] }))
                    }
                  />
                ))}
              </div>
            </div>
          </section>

          {/* RIGHT SIDE — BUILD SUMMARY + SAVED BUILDS + NOTES */}
          <aside className="space-y-6">
            {/* Build summary */}
            <div className="rounded-3xl border border-emerald-400/40 bg-slate-950/80 p-5 shadow-xl">
              <h2 className="text-sm font-semibold">Build summary</h2>

              <div className="mt-2 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Parts subtotal</span>
                  <span className="font-semibold">${partsTotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>DIY time</span>
                  <span>{hours.toFixed(1)}h</span>
                </div>

                <div className="flex justify-between">
                  <span>Shop labor (est)</span>
                  <span className="font-semibold text-amber-300">
                    ${shopLow.toFixed(0)} – ${shopHigh.toFixed(0)}
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-2xl bg-slate-900/80 p-3 text-[0.75rem]">
                <div className="text-[0.7rem] font-semibold uppercase text-emerald-300/80 mb-1">
                  How this will be used
                </div>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Select platform / decode VIN later.</li>
                  <li>Filter upgrades by goals.</li>
                  <li>Save named builds (tow, stage 1, safety).</li>
                  <li>Export or share with shops.</li>
                </ol>
              </div>
            </div>

            {/* Saved builds */}
            <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4 text-[0.8rem] shadow-lg">
              <div className="mb-2 flex items-center justify-between gap-2">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Saved builds
                </h3>
                <span className="text-[0.7rem] text-slate-400">
                  {builds.length} saved
                </span>
              </div>

              <div className="mb-3 flex gap-2">
                <input
                  className="flex-1 rounded-xl border border-white/10 bg-slate-900 px-2.5 py-1.5 text-xs text-slate-100 outline-none ring-emerald-500/60 focus:border-emerald-400 focus:ring"
                  placeholder="Name this build (e.g. Outback Tow Prep)"
                  value={newBuildName}
                  onChange={(e) => setNewBuildName(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleSaveBuild}
                  className="rounded-xl bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-emerald-400"
                >
                  Save
                </button>
              </div>

              {builds.length === 0 && (
                <p className="text-[0.7rem] text-slate-400">
                  No builds saved yet. Select some parts and hit &quot;Save&quot;
                  to stash this combo for later.
                </p>
              )}

              {builds.length > 0 && (
                <ul className="space-y-2">
                  {builds
                    .slice()
                    .reverse()
                    .map((b) => (
                      <li
                        key={b.id}
                        className="flex items-center justify-between gap-2 rounded-xl border border-white/10 bg-slate-900/80 px-3 py-2"
                      >
                        <div className="flex-1">
                          <div className="text-[0.78rem] font-semibold text-slate-100 line-clamp-1">
                            {b.name}
                          </div>
                          <div className="text-[0.65rem] text-slate-400">
                            {b.year}{' '}
                            {
                              VEHICLES.find(v => v.id === b.vehicleId)
                                ?.model
                            }{' '}
                            •{' '}
                            {
                              TRIM_OPTIONS.find(t => t.value === b.trimValue)
                                ?.label
                            }{' '}
                            • {b.partIds.length} parts
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleLoadBuild(b)}
                            className="rounded-lg bg-slate-800 px-2 py-1 text-[0.7rem] text-slate-100 hover:bg-slate-700"
                          >
                            Load
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBuild(b.id)}
                            className="rounded-lg bg-transparent px-2 py-1 text-[0.7rem] text-slate-500 hover:text-red-400"
                            aria-label="Delete build"
                          >
                            ✕
                          </button>
                        </div>
                      </li>
                    ))}
                </ul>
              )}
            </div>

            {/* Affiliate / product notes */}
            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4 text-[0.75rem] text-slate-300 shadow-lg">
              <div className="text-[0.7rem] font-semibold uppercase tracking-wide text-slate-400 mb-1">
                Notes
              </div>

              <p className="mb-2">
                Some parts shown may use affiliate links. If someone buys after clicking,
                this platform may earn a small commission — at no extra cost to them.
              </p>

              <ul className="list-disc pl-4 space-y-1">
                <li>Hook into live parts APIs.</li>
                <li>Let users log in and sync builds.</li>
                <li>Track clicks for real analytics.</li>
                <li>Generate shareable build URLs.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const CATEGORY_FILTERS = [
  {
    id: 'brakes',
    label: 'Brakes',
    categories: ['brake_pad_front', 'rotor_front', 'rotor_rear', 'brake_lines']
  },
  {
    id: 'suspension',
    label: 'Suspension & Steering',
    categories: [
      'strut_front',
      'strut_rear',
      'lift_springs',
      'coilovers',
      'suspension_sway_bar_rear',
      'endlinks_front',
      'endlinks_rear',
      'control_arms_front',
      'steering_bushings',
      'ball_joints_front',
      'wheel_bearings_front'
    ]
  },
  {
    id: 'engine',
    label: 'Engine & Cooling',
    categories: [
      'spark_plugs',
      'radiator',
      'timing_belt_kit',
      'engine_gasket_kit',
      'cooling_hoses',
      'accessory_belts',
      'battery',
      'fuel_pump',
      'coil_pack',
      'mounts_drivetrain'
    ]
  },
  {
    id: 'power',
    label: 'Power & Tuning',
    categories: [
      'intake',
      'exhaust_catback',
      'downpipe',
      'catalytic_converter',
      'tuning_device',
      'intercooler'
    ]
  },
  {
    id: 'wheels_tires',
    label: 'Tires',
    categories: ['tires_all_terrain']
  },
  {
    id: 'towing',
    label: 'Towing',
    categories: ['hitch']
  },
  {
    id: 'other',
    label: 'Other / Misc',
    categories: ['air_filter', 'steering_bushings', 'mounts_drivetrain']
  }
];

type SavedBuild = {
  id: number;
  name: string;
  platform: string;
  vehicleTitle: string;
  trim: string;
  engineCode: string;
  drivetrain: string;
  selectedIds: number[];
  diyLabor: boolean;
  partsTotal: number;
  createdAt: string;
};

const STORAGE_KEY = 'car_builds_demo_v1';

export default function Results() {
  const params = useSearchParams();
  const router = useRouter();

  const partsParam = params.get('parts');
  let allParts: any[] = [];

  try {
    allParts = partsParam ? JSON.parse(partsParam) : [];
  } catch {
    allParts = [];
  }

  const platform = params.get('platform') || '';
  const year = params.get('year');
  const make = params.get('make');
  const model = params.get('model');
  const trim = params.get('trim') || '';
  const trimValue = params.get('trimValue') || '';
  const engineCode = params.get('engineCode') || '';
  const drivetrain = params.get('drivetrain') || '';

  const vehicleTitle = `${year} ${make} ${model}`;
  const isH6 = engineCode.toUpperCase().startsWith('EZ');

  // 1️⃣ First: figure out all compatible parts (no category filters yet)
  const compatibleParts = allParts.filter((part) => {
    // Platform match
    if (platform && part.platformId && part.platformId !== platform) {
      return false;
    }

    const engines: string[] | undefined = part.compatibleEngines;
    const trims: string[] | undefined = part.compatibleTrims;

    // Engine-specific compatibility
    if (engines && engineCode && !engines.includes(engineCode)) {
      return false;
    }

    // Trim-specific compatibility
    if (trims && trimValue && !trims.includes(trimValue)) {
      return false;
    }

    // Extra guard for H6 via notes
    if (isH6 && part.fitmentNotes) {
      const notes = String(part.fitmentNotes).toLowerCase();
      if (notes.includes('non-h6')) return false;
      if (
        notes.includes('ej25') ||
        notes.includes('ej251') ||
        notes.includes('ej252') ||
        notes.includes('ej253')
      ) {
        return false;
      }
    }

    return true;
  });

  // 2️⃣ State
  const [diyLabor, setDiyLabor] = useState(false);
  const [activeCategoryIds, setActiveCategoryIds] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>(
    () => compatibleParts.map((p: any) => p.id) // by default everything compatible is selected
  );

  const [buildName, setBuildName] = useState('');
  const [savedBuilds, setSavedBuilds] = useState<SavedBuild[]>([]);

  // Load saved builds from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setSavedBuilds(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  const persistBuilds = (builds: SavedBuild[]) => {
    setSavedBuilds(builds);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(builds));
    }
  };

  const toggleCategory = (id: string) => {
    setActiveCategoryIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const clearCategories = () => setActiveCategoryIds([]);

  const categoryFilterActive = activeCategoryIds.length > 0;

  // 3️⃣ Apply category filters just for what is VISIBLE
  const filteredParts = compatibleParts.filter((part) => {
    if (!categoryFilterActive) return true;

    const matchesCategory = CATEGORY_FILTERS.some(
      (group) =>
        activeCategoryIds.includes(group.id) &&
        group.categories.includes(part.category)
    );
    return matchesCategory;
  });

  // 4️⃣ The "build" is ONLY the parts that are selected (even if hidden by filters)
  const selectedParts = compatibleParts.filter((p) =>
    selectedIds.includes(p.id)
  );

  const togglePartSelected = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const clearSelected = () => setSelectedIds([]);

  const selectAllVisible = () => {
    const visibleIds = filteredParts.map((p) => p.id);
    setSelectedIds((prev) => {
      const set = new Set(prev);
      visibleIds.forEach((id) => set.add(id));
      return Array.from(set);
    });
  };

  // 💾 Save / load builds
  const handleSaveBuild = () => {
    const name = buildName.trim();
    if (!name) return;

    const newBuild: SavedBuild = {
      id: Date.now(),
      name,
      platform,
      vehicleTitle,
      trim,
      engineCode,
      drivetrain,
      selectedIds,
      diyLabor,
      partsTotal: selectedParts.reduce((sum, p) => {
        const price = typeof p.msrp === 'number' ? p.msrp : 0;
        return sum + price;
      }, 0),
      createdAt: new Date().toISOString()
    };

    const next = [...savedBuilds, newBuild];
    persistBuilds(next);
    setBuildName('');
  };

  const handleLoadBuild = (build: SavedBuild) => {
    // Only strictly apply selectedIds + DIY toggle.
    // Vehicle might differ; in a real app you'd navigate to the matching vehicle.
    setSelectedIds(build.selectedIds || []);
    setDiyLabor(build.diyLabor || false);
  };

  const handleDeleteBuild = (id: number) => {
    const next = savedBuilds.filter((b) => b.id !== id);
    persistBuilds(next);
  };

  // 💰 Parts total (based on selected parts)
  const totalMsrp = selectedParts.reduce((sum, part) => {
    const price = typeof part.msrp === 'number' ? part.msrp : 0;
    return sum + price;
  }, 0);

  // 🧰 Base labor + shop ranges (shop-does-all mode)
  const baseLaborEstimate = totalMsrp * 0.9; // 90% of parts total
  const baseShopLow = totalMsrp * 1.6; // “small shop / friend mechanic”
  const baseShopHigh = totalMsrp * 2.2; // “dealer / premium shop”

  // 🎚️ Apply DIY toggle
  const effectiveLabor = diyLabor ? 0 : baseLaborEstimate;
  // For DIY mode, "range" is parts budget (parts to parts+10%)
  const effectiveLow = diyLabor ? totalMsrp : baseShopLow;
  const effectiveHigh = diyLabor ? totalMsrp * 1.1 : baseShopHigh;

  const totalFormatted = totalMsrp > 0 ? `$${totalMsrp.toFixed(2)}` : '—';
  const laborFormatted =
    totalMsrp > 0 ? `$${effectiveLabor.toFixed(2)}` : '—';
  const shopRangeFormatted =
    totalMsrp > 0
      ? `$${effectiveLow.toFixed(0)} – $${effectiveHigh.toFixed(0)}`
      : '—';

  const partsShown = filteredParts.length;
  const partsCompatible = compatibleParts.length;
  const partsSelected = selectedParts.length;

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top, #1e293b 0, #020617 45%, #000 100%)',
        color: '#e5e7eb',
        display: 'flex',
        justifyContent: 'center',
        padding: '1.5rem'
      }}
    >
      <main
        style={{
          width: '100%',
          maxWidth: '1100px',
          backgroundColor: 'rgba(15,23,42,0.96)',
          borderRadius: '18px',
          padding: '1.75rem',
          boxShadow: '0 20px 45px rgba(0,0,0,0.6)',
          border: '1px solid rgba(148,163,184,0.35)',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}
      >
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <div>
            <button
              onClick={() => router.push('/')}
              style={{
                borderRadius: '999px',
                border: '1px solid rgba(148,163,184,0.7)',
                backgroundColor: 'transparent',
                color: '#e5e7eb',
                padding: '0.25rem 0.75rem',
                fontSize: '0.8rem',
                cursor: 'pointer',
                marginBottom: '0.5rem'
              }}
            >
              ⬅ Back to vehicle selection
            </button>
            <h1
              style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                letterSpacing: '0.03em'
              }}
            >
              Upgrade list for {vehicleTitle}
            </h1>
            <p style={{ color: '#9ca3af', marginTop: '0.25rem' }}>
              Trim: <strong>{trim || '—'}</strong> • Engine:{' '}
              <strong>{engineCode}</strong> • Drivetrain:{' '}
              <strong>{drivetrain}</strong>
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '0.25rem',
              fontSize: '0.8rem'
            }}
          >
            <div
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: '999px',
                border: '1px solid rgba(148,163,184,0.5)',
                background:
                  'linear-gradient(135deg, rgba(37,99,235,0.35), rgba(15,23,42,0.95))'
              }}
            >
              {partsShown} shown • {partsCompatible} compatible •{' '}
              {partsSelected} in build
            </div>
            <div style={{ color: '#9ca3af' }}>
              Use filters and checkboxes to shape your build.
            </div>
          </div>
        </header>

        <section
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)',
            gap: '1.5rem'
          }}
        >
          {/* Left: filters + parts list */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.9rem',
              maxHeight: '70vh',
              overflowY: 'auto',
              paddingRight: '0.25rem'
            }}
          >
            {/* Category filters */}
            <div
              style={{
                position: 'sticky',
                top: 0,
                zIndex: 5,
                paddingBottom: '0.6rem',
                background:
                  'linear-gradient(to bottom, rgba(15,23,42,0.98), rgba(15,23,42,0.9))'
              }}
            >
              <div
                style={{
                  padding: '0.7rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(55,65,81,0.9)',
                  backgroundColor: 'rgba(15,23,42,0.98)',
                  fontSize: '0.8rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.4rem'
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ fontWeight: 600 }}>Filter by category</span>
                  <button
                    onClick={clearCategories}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: categoryFilterActive ? '#f97316' : '#6b7280',
                      fontSize: '0.75rem',
                      cursor: categoryFilterActive ? 'pointer' : 'default'
                    }}
                  >
                    Clear
                  </button>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns:
                      'repeat(auto-fit,minmax(120px,1fr))',
                    gap: '0.35rem'
                  }}
                >
                  {CATEGORY_FILTERS.map((group) => {
                    const checked = activeCategoryIds.includes(group.id);
                    return (
                      <label
                        key={group.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          cursor: 'pointer',
                          padding: '0.3rem 0.45rem',
                          borderRadius: '999px',
                          backgroundColor: checked
                            ? 'rgba(37,99,235,0.3)'
                            : 'rgba(15,23,42,1)',
                          border: checked
                            ? '1px solid rgba(59,130,246,0.9)'
                            : '1px solid rgba(55,65,81,0.9)'
                        }}
                        onClick={() => toggleCategory(group.id)}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          readOnly
                          style={{ display: 'none' }}
                        />
                        <span
                          style={{
                            width: '12px',
                            height: '12px',
                            borderRadius: '3px',
                            border: checked
                              ? 'none'
                              : '1px solid rgba(148,163,184,0.9)',
                            backgroundColor: checked ? '#bfdbfe' : 'transparent'
                          }}
                        />
                        <span>{group.label}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Quick build controls */}
                <div
                  style={{
                    marginTop: '0.35rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    gap: '0.5rem'
                  }}
                >
                  <button
                    onClick={selectAllVisible}
                    style={{
                      flex: 1,
                      borderRadius: '999px',
                      border: '1px solid rgba(96,165,250,0.8)',
                      backgroundColor: 'rgba(15,23,42,1)',
                      color: '#bfdbfe',
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.4rem',
                      cursor: 'pointer'
                    }}
                  >
                    Add all shown to build
                  </button>
                  <button
                    onClick={clearSelected}
                    style={{
                      flex: 1,
                      borderRadius: '999px',
                      border: '1px solid rgba(148,163,184,0.8)',
                      backgroundColor: 'rgba(15,23,42,1)',
                      color: '#fca5a5',
                      fontSize: '0.75rem',
                      padding: '0.25rem 0.4rem',
                      cursor: 'pointer'
                    }}
                  >
                    Clear build
                  </button>
                </div>
              </div>
            </div>

            {/* Parts list */}
            {filteredParts.length === 0 ? (
              <div
                style={{
                  padding: '1rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(15,23,42,0.9)',
                  border: '1px dashed rgba(75,85,99,0.9)',
                  textAlign: 'center',
                  color: '#9ca3af',
                  fontSize: '0.9rem'
                }}
              >
                No compatible parts found for this trim/engine with the current
                filters. Try clearing some categories or changing the vehicle.
              </div>
            ) : (
              filteredParts.map((part) => (
                <PartCard
                  key={part.id}
                  part={part}
                  selected={selectedIds.includes(part.id)}
                  onToggle={() => togglePartSelected(part.id)}
                />
              ))
            )}
          </div>

          {/* Right: summary + save/load */}
          <aside
            style={{
              borderRadius: '14px',
              padding: '1.25rem',
              background:
                'radial-gradient(circle at top left, rgba(79,70,229,0.25), rgba(15,23,42,0.96))',
              border: '1px solid rgba(79,70,229,0.6)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <h2
              style={{
                fontSize: '1rem',
                fontWeight: 600,
                marginBottom: '0.25rem'
              }}
            >
              Build summary
            </h2>
            <p style={{ fontSize: '0.9rem', color: '#d1d5db' }}>
              These are rough estimates for planning only — real shops will
              quote based on labor rate, rust, part brand, and how much of this
              you do yourself.
            </p>

            {/* DIY toggle */}
            <div
              style={{
                marginTop: '0.35rem',
                padding: '0.55rem 0.7rem',
                borderRadius: '999px',
                backgroundColor: 'rgba(15,23,42,0.9)',
                border: '1px solid rgba(129,140,248,0.7)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '0.5rem',
                fontSize: '0.8rem'
              }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>
                  Mode: {diyLabor ? 'DIY (you do the labor)' : 'Shop does labor'}
                </div>
                <div style={{ color: '#9ca3af', marginTop: '0.1rem' }}>
                  Toggle this if you&apos;re planning to wrench on it yourself.
                </div>
              </div>
              <label
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  cursor: 'pointer'
                }}
              >
                <span style={{ fontSize: '0.75rem', color: '#e5e7eb' }}>
                  DIY
                </span>
                <div
                  onClick={() => setDiyLabor(!diyLabor)}
                  style={{
                    width: '40px',
                    height: '20px',
                    borderRadius: '999px',
                    backgroundColor: diyLabor ? '#4ade80' : '#4b5563',
                    padding: '2px',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: diyLabor ? 'flex-end' : 'flex-start',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div
                    style={{
                      width: '16px',
                      height: '16px',
                      borderRadius: '999px',
                      backgroundColor: '#0f172a'
                    }}
                  />
                </div>
              </label>
            </div>

            <div
              style={{
                marginTop: '0.75rem',
                padding: '0.75rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(15,23,42,0.9)',
                border: '1px solid rgba(55,65,81,0.9)',
                fontSize: '0.85rem'
              }}
            >
              <SummaryRow label="Vehicle" value={vehicleTitle} />
              <SummaryRow label="Trim" value={trim || ''} />
              <SummaryRow label="Engine" value={engineCode || ''} />
              <SummaryRow label="Drivetrain" value={drivetrain || ''} />

              <div
                style={{
                  borderTop: '1px solid rgba(55,65,81,0.9)',
                  marginTop: '0.5rem',
                  paddingTop: '0.5rem',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <span style={{ color: '#9ca3af' }}>Parts in build</span>
                <span>
                  {partsSelected} / {partsCompatible}
                </span>
              </div>

              <div
                style={{
                  marginTop: '0.4rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ color: '#9ca3af' }}>Est. parts total</span>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: '0.95rem'
                  }}
                >
                  {totalFormatted}
                </span>
              </div>

              <div
                style={{
                  marginTop: '0.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ color: '#9ca3af' }}>
                  {diyLabor ? 'Est. labor (DIY)' : 'Est. labor (shop)'}
                </span>
                <span
                  style={{
                    fontWeight: 500,
                    fontSize: '0.9rem'
                  }}
                >
                  {laborFormatted}
                </span>
              </div>

              <div
                style={{
                  marginTop: '0.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ color: '#9ca3af' }}>
                  {diyLabor ? 'DIY parts budget range' : 'Shop quote range'}
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: '0.95rem'
                  }}
                >
                  {shopRangeFormatted}
                </span>
              </div>

              <p
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.7rem',
                  lineHeight: 1.4,
                  color: '#9ca3af'
                }}
              >
                Estimates are for rough budgeting only and assume average parts
                pricing and shop rates. They are not a formal quote or offer of
                service. Always confirm final pricing with a licensed shop or
                mechanic before approving work.
              </p>
            </div>

            {/* Save / load builds */}
            <div
              style={{
                marginTop: '0.5rem',
                padding: '0.75rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(15,23,42,0.95)',
                border: '1px solid rgba(129,140,248,0.8)',
                fontSize: '0.8rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem'
              }}
            >
              <h3
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                Save this build
              </h3>
              <div
                style={{
                  display: 'flex',
                  gap: '0.4rem',
                  alignItems: 'center'
                }}
              >
                <input
                  type="text"
                  value={buildName}
                  onChange={(e) => setBuildName(e.target.value)}
                  placeholder="e.g. Outback Tow Prep, WRX Stage 1"
                  style={{
                    flex: 1,
                    borderRadius: '999px',
                    border: '1px solid rgba(75,85,99,0.9)',
                    backgroundColor: '#020617',
                    color: '#e5e7eb',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.8rem',
                    outline: 'none'
                  }}
                />
                <button
                  onClick={handleSaveBuild}
                  style={{
                    borderRadius: '999px',
                    border: '1px solid rgba(129,140,248,0.9)',
                    background:
                      'linear-gradient(135deg, rgba(129,140,248,0.6), rgba(79,70,229,0.9))',
                    color: '#e5e7eb',
                    padding: '0.35rem 0.8rem',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Save build
                </button>
              </div>
              <p
                style={{
                  fontSize: '0.7rem',
                  color: '#9ca3af'
                }}
              >
                Builds are saved in your browser only (localStorage). Clearing
                browser data will remove them.
              </p>

              {savedBuilds.length > 0 && (
                <div
                  style={{
                    marginTop: '0.5rem',
                    borderTop: '1px solid rgba(55,65,81,0.9)',
                    paddingTop: '0.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}
                  >
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}
                    >
                      Saved builds
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.35rem',
                      maxHeight: '180px',
                      overflowY: 'auto'
                    }}
                  >
                    {savedBuilds.map((b) => (
                      <div
                        key={b.id}
                        style={{
                          borderRadius: '10px',
                          border: '1px solid rgba(75,85,99,0.9)',
                          padding: '0.4rem 0.55rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '0.2rem',
                          backgroundColor: 'rgba(15,23,42,0.98)'
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            gap: '0.5rem'
                          }}
                        >
                          <span
                            style={{
                              fontSize: '0.8rem',
                              fontWeight: 600
                            }}
                          >
                            {b.name}
                          </span>
                          <div
                            style={{
                              display: 'flex',
                              gap: '0.25rem'
                            }}
                          >
                            <button
                              onClick={() => handleLoadBuild(b)}
                              style={{
                                borderRadius: '999px',
                                border:
                                  '1px solid rgba(96,165,250,0.9)',
                                backgroundColor: 'transparent',
                                color: '#bfdbfe',
                                fontSize: '0.7rem',
                                padding: '0.15rem 0.5rem',
                                cursor: 'pointer'
                              }}
                            >
                              Load
                            </button>
                            <button
                              onClick={() => handleDeleteBuild(b.id)}
                              style={{
                                borderRadius: '999px',
                                border:
                                  '1px solid rgba(248,113,113,0.9)',
                                backgroundColor: 'transparent',
                                color: '#fecaca',
                                fontSize: '0.7rem',
                                padding: '0.15rem 0.5rem',
                                cursor: 'pointer'
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                        <div
                          style={{
                            fontSize: '0.7rem',
                            color: '#9ca3af',
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <span>
                            {b.platform || '—'} •{' '}
                            {b.trim || 'trim unknown'}
                          </span>
                          <span>
                            ${b.partsTotal.toFixed(0)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Next steps */}
            <div
              style={{
                marginTop: '0.5rem',
                padding: '0.75rem',
                borderRadius: '12px',
                backgroundColor: 'rgba(15,23,42,0.95)',
                border: '1px dashed rgba(129,140,248,0.8)',
                fontSize: '0.8rem'
              }}
            >
              <h3
                style={{
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  marginBottom: '0.35rem'
                }}
              >
                Suggested next steps
              </h3>
              <ol
                style={{
                  margin: 0,
                  paddingLeft: '1.1rem',
                  display: 'grid',
                  gap: '0.25rem'
                }}
              >
                <li>
                  Use the checkboxes to select only the parts you actually plan
                  to do in this phase.
                </li>
                <li>
                  Save named builds for different goals (towing prep, stage 1,
                  overland, etc.).
                </li>
                <li>
                  Screenshot or print this build to bring to your mechanic or
                  parts counter.
                </li>
                <li>
                  Ask a shop to confirm fitment using your VIN and adjust brands
                  or part numbers as needed.
                </li>
              </ol>
            </div>

            <button
              disabled
              style={{
                marginTop: '0.5rem',
                width: '100%',
                padding: '0.6rem 1rem',
                borderRadius: '999px',
                border: 'none',
                backgroundColor: 'rgba(55,65,81,0.9)',
                color: '#9ca3af',
                fontSize: '0.85rem',
                cursor: 'not-allowed'
              }}
            >
              Future: Cloud account + shareable links
            </button>
          </aside>
        </section>
      </main>
    </div>
  );
}

function PartCard({
  part,
  selected,
  onToggle
}: {
  part: any;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <article
      style={{
        borderRadius: '14px',
        padding: '1rem',
        backgroundColor: 'rgba(15,23,42,0.95)',
        border: selected
          ? '1px solid rgba(96,165,250,0.9)'
          : '1px solid rgba(55,65,81,0.9)',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 2.5fr) minmax(0, 1fr)',
        gap: '0.75rem',
        alignItems: 'center'
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.25rem'
          }}
        >
          <button
            onClick={onToggle}
            style={{
              width: '18px',
              height: '18px',
              borderRadius: '6px',
              border: selected
                ? '1px solid rgba(96,165,250,1)'
                : '1px solid rgba(75,85,99,1)',
              backgroundColor: selected ? 'rgba(96,165,250,0.9)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              padding: 0
            }}
            aria-label={selected ? 'Remove from build' : 'Add to build'}
          >
            {selected && (
              <span
                style={{
                  fontSize: '0.7rem',
                  color: '#0f172a',
                  fontWeight: 700
                }}
              >
                ✓
              </span>
            )}
          </button>
          <h2
            style={{
              fontSize: '1rem',
              fontWeight: 600
            }}
          >
            {part.brand} – {part.name}
          </h2>
        </div>
        <p
          style={{
            fontSize: '0.8rem',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: '#9ca3af',
            marginBottom: '0.4rem'
          }}
        >
          {part.category}
        </p>
        {part.description && (
          <p style={{ fontSize: '0.9rem', color: '#d1d5db' }}>
            {part.description}
          </p>
        )}
        {part.fitmentNotes && (
          <p
            style={{
              fontSize: '0.8rem',
              color: '#9ca3af',
              marginTop: '0.4rem'
            }}
          >
            <strong>Fitment:</strong> {part.fitmentNotes}
          </p>
        )}
      </div>

      <div
        style={{
          textAlign: 'right',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.4rem'
        }}
      >
        {part.msrp && (
          <div>
            <div
              style={{
                fontSize: '0.75rem',
                color: '#9ca3af',
                marginBottom: '0.1rem'
              }}
            >
              Est. part cost
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>
              ${part.msrp}
            </div>
          </div>
        )}

        <span
          style={{
            fontSize: '0.75rem',
            padding: '0.15rem 0.5rem',
            borderRadius: '999px',
            border: '1px solid rgba(148,163,184,0.8)',
            color: selected ? '#bbf7d0' : '#e5e7eb',
            backgroundColor: selected
              ? 'rgba(22,163,74,0.2)'
              : 'rgba(15,23,42,0.9)'
          }}
        >
          {selected ? 'Included in build' : 'Not in build'}
        </span>

        {part.productUrl ? (
          <a
            href={part.productUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              borderRadius: '999px',
              padding: '0.4rem 0.9rem',
              border: '1px solid rgba(96,165,250,0.8)',
              fontSize: '0.8rem',
              textDecoration: 'none',
              color: '#bfdbfe',
              background:
                'linear-gradient(135deg, rgba(37,99,235,0.35), rgba(15,23,42,1))'
            }}
          >
            View / Buy (demo link)
          </a>
        ) : (
          <span
            style={{
              fontSize: '0.75rem',
              color: '#6b7280',
              fontStyle: 'italic'
            }}
          >
            No product link set yet
          </span>
        )}
      </div>
    </article>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '0.35rem'
      }}
    >
      <span style={{ color: '#9ca3af' }}>{label}</span>
      <span>{value}</span>
    </div>
  );
}

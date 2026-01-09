"use client";
import { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/maps/kemaps.geojson";

export default function KenyaMap({
  onSelectCounty,
  liveCounties = [],
}: {
  onSelectCounty: (county: string) => void;
  liveCounties?: string[];
}) {
  const [geographies, setGeographies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCounty, setHoveredCounty] = useState<string | null>(null);

  useEffect(() => {
    fetch(geoUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load map");
        return res.json();
      })
      .then((data) => {
        setGeographies(data.features || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load map data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="h-125 w-full rounded-xl bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600 animate-pulse">Loading Kenya map...</p>
      </div>
    );
  }

  if (error || geographies.length === 0) {
    return (
      <div className="h-125 w-full rounded-xl bg-red-50 border border-red-200 flex items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative h-98 w-full rounded-xl overflow-hidden shadow-lg bg-linear-to-br from-blue-50 to-indigo-100">
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          scale: 3000,
          center: [37.9, 0.5],
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geographies}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countyName =
                geo.properties?.COUNTY ||
                geo.properties?.County ||
                geo.properties?.COUNTY_NAME ||
                geo.properties?.COUNTY_NAM ||
                geo.properties?.name ||
                geo.properties?.COUNTY3_ ||
                "Unknown";

              const isLive = liveCounties.includes(countyName);

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => isLive && onSelectCounty(countyName)}
                  onMouseEnter={() => setHoveredCounty(countyName)}
                  onMouseLeave={() => setHoveredCounty(null)}
                  style={{
                    default: {
                      fill: isLive ? "#10b981" : "#e2e8f0", // emerald-500 vs slate-200
                      stroke: "#4c1d95", // deep purple
                      strokeWidth: 0.7,
                      outline: "none",
                      transition: "all 0.3s ease",
                    },
                    hover: {
                      fill: isLive ? "#059669" : "#cbd5e1", // darker emerald on hover
                      stroke: "#7c3aed",
                      strokeWidth: 1.2,
                      outline: "none",
                      cursor: isLive ? "pointer" : "default",
                    },
                    pressed: {
                      fill: isLive ? "#047857" : "#94a3b8",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
      {geographies.map((geo, index) => {
        const countyName =
          geo.properties?.COUNTY ||
          geo.properties?.County ||
          geo.properties?.COUNTY_NAME ||
          geo.properties?.COUNTY_NAM ||
          geo.properties?.name ||
          geo.properties?.COUNTY3_ ||
          `Unknown-${index}`;

        const isLive = liveCounties.includes(countyName);

        if (!isLive) return null;

        const pulseKey = geo.rsmKey 
          ? `pulse-${geo.rsmKey}` 
          : `pulse-${countyName}-${index}`;

        // Approximate centroid using bbox
        const bbox = geo.bbox || [0, 0, 0, 0];
        const cx = ((bbox[0] + bbox[2]) / 2);
        const cy = ((bbox[1] + bbox[3]) / 2);

        return (
          <svg 
            key={pulseKey} 
            className="absolute pointer-events-none inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Pulsing ring */}
            <circle
              cx={`${cx}%`}
              cy={`${cy}%`}
              r="0"
              fill="#10b981"
              opacity="0.6"
            >
              <animate
                attributeName="r"
                values="0;15;0"
                dur="4s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="opacity"
                values="0.7;0;0.7"
                dur="4s"
                repeatCount="indefinite"
              />
            </circle>

            {/* Solid center dot */}
            <circle
              cx={`${cx}%`}
              cy={`${cy}%`}
              r="6"
              fill="#10b981"
              opacity="0.95"
            />
          </svg>
        );
      })}

      {/* Tooltip */}
      {hoveredCounty && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-xl px-4 py-2 text-sm font-medium text-gray-800 border border-gray-200 z-10">
          <p>{hoveredCounty}</p>
          {liveCounties.includes(hoveredCounty) && (
            <span className="inline-block mt-1 px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full">
              Live Poll Active
            </span>
          )}
        </div>
      )}

      {/* Legend */}
      <div className="absolute bottom-2 right-2 text-sm">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 rounded bg-emerald-500"></div>
          <span className="text-gray-700">Live Poll Active</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-300"></div>
          <span className="text-gray-700">No Active Poll</span>
        </div>
      </div>
    </div>
  );
}
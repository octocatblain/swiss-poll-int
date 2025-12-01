"use client";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl = "/maps/Kemaps.geojson";

export default function KenyaMap({
  onSelectCounty,
}: {
  onSelectCounty: (county: string) => void;
}) {
  return (
    <div className="h-[500px] rounded-xl shadow-md">
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          scale: 3000,
          center: [37.9, 0.5],
        }}
        style={{ width: "100%", height: "100%" }} 
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() =>
                  onSelectCounty(geo.properties?.COUNTY || "Unknown") // use COUNTY
                }
                style={{
                  default: {
                    fill: "#bfdbfe",
                    stroke: "#6070ea",
                    outline: "#bfdbfe",
                  },
                  hover: {
                    fill: "#2563eb",
                    cursor: "pointer",
                  },    pressed: {
      fill: "#bfdbfe",
      outline: "none",
    },
                            }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

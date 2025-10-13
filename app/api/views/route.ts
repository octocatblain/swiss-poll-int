import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "views.json");

function readData() {
  try {
    const raw = fs.readFileSync(dataFile, "utf-8");
    return JSON.parse(raw || "{}");
  } catch (e) {
    return {};
  }
}

function writeData(data: any) {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const data = readData();
  const count = slug && data[slug] ? data[slug] : 0;
  return new Response(JSON.stringify({ views: count }), { status: 200 });
}

export async function POST(request: Request) {
  const body = await request.json();
  const slug = body.slug;
  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), {
      status: 400,
    });
  }
  const data = readData();
  data[slug] = (data[slug] || 0) + 1;
  writeData(data);
  return new Response(JSON.stringify({ views: data[slug] }), { status: 200 });
}

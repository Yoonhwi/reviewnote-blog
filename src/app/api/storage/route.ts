import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(process.env.PROJECT_URL!, process.env.ANON_KEY!);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ message: "File is empty" }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const contentType = file.type;
    const fileName = file.name;

    const { data } = await supabase.storage
      .from(process.env.BUCKET_NAME!)
      .upload(`${Date.now()}-${fileName}`, buffer, {
        contentType,
      });

    const loadUrl = `https://${process.env.SUPABASE_DOMAIN}${process.env.SUPABASE_STORAGE_URL}`;

    return NextResponse.json(
      { data: `${loadUrl}${data?.path}` },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: err }, { status: 500 });
  }
}

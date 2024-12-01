import fs from "fs/promises";
import path from "path";
import { getServerSession } from "next-auth";

// Updated GET function
export async function GET(request: Request) {
  try {
    const session = await getServerSession();

    // Redirect user if not authenticated
    if (!session) {
      return new Response(null, { status: 302, headers: { Location: "/login" } }); // Server-side redirect
    }

    // Extract slug from URL
    const url = new URL(request.url);
    const slug = url.pathname.split("/").pop();

    if (!slug) {
      return new Response("Slug is required", { status: 400 });
    }

    const filePath = path.join(process.cwd(), "articles", `${slug}.md`);

    try {
      await fs.access(filePath);
    } catch {
      return new Response("Article not found", { status: 404 });
    }

    const fileContent = await fs.readFile(filePath, "utf-8");
    return new Response(JSON.stringify({ content: fileContent }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error reading article:", error);
    return new Response("Error reading article", { status: 500 });
  }
}

// Updated POST function
export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    // Extract slug from URL
    const url = new URL(request.url);
    const slug = url.pathname.split("/").pop();

    if (!slug) {
      return new Response("Slug is required", { status: 400 });
    }

    const { content } = await request.json();

    if (!content) {
      return new Response("Content is required", { status: 400 });
    }

    const filePath = path.join(process.cwd(), "articles", `${slug}.md`);
    await fs.writeFile(filePath, content, "utf-8");

    return new Response("Article saved", { status: 200 });
  } catch (error) {
    console.error("Error saving article:", error);
    return new Response("Error saving article", { status: 500 });
  }
}

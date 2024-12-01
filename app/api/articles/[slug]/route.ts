export async function POST(request: Request) {
  try {
    const session = await getServerSession();

    if (!session) {
      return new Response("Unauthorized", {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow all origins (replace '*' with specific domain in production)
          "Content-Type": "application/json",
        },
      });
    }

    // Extract slug from URL
    const url = new URL(request.url);
    const slug = url.pathname.split("/").pop();

    if (!slug) {
      return new Response("Slug is required", {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    }

    const { content } = await request.json();

    if (!content) {
      return new Response("Content is required", {
        status: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    }

    const filePath = path.join(process.cwd(), "articles", `${slug}.md`);
    await fs.writeFile(filePath, content, "utf-8");

    return new Response("Article saved", {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error saving article:", error);
    return new Response("Error saving article", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }
}

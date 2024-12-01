'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function EditArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [markdown, setMarkdown] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchParamsAndData = async () => {
      try {
        const resolvedParams = await params; // Unwrap the params promise
        const slug = resolvedParams.slug;

        // Redirect to login if not authenticated
        if (status === "unauthenticated") {
          router.push("/login");
          return;
        }

        // Fetch article data
        if (status === "authenticated") {
          const res = await fetch(`/api/articles/${slug}`, {
            method: "GET",
          });

          if (!res.ok) {
            if (res.status === 401) {
              alert("Unauthorized access");
              router.push("/login");
            } else if (res.status === 404) {
              alert("Article not found");
              router.push("/articles");
            }
            return;
          }

          const data = await res.json();
          setMarkdown(data.content || "");
        }
      } catch (error) {
        console.error("Error fetching params or data:", error);
        alert("An error occurred while loading the page.");
      }
    };

    fetchParamsAndData();
  }, [params, status, router]);

  // Save article
  const handleSave = async () => {
    setIsSaving(true);

    try {
      const resolvedParams = await params; // Unwrap the params promise
      const slug = resolvedParams.slug;

      const contentToSave = { content: markdown };

      const response = await fetch(`/api/articles/${slug}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contentToSave),
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert("Unauthorized");
          router.push("/login");
        } else {
          alert("Error saving article.");
        }
        return;
      }

      alert("Article updated!");
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Error saving article.");
    } finally {
      setIsSaving(false);
    }
  };

  // Render only if authenticated
  if (status !== "authenticated") {
    return null;
  }

  return (
    <section className="container mt-5">
      <textarea
        className="w-full border p-2"
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        rows={20}
      />
      <button
        className="bg-black text-white px-4 py-2 mt-4"
        onClick={handleSave}
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save"}
      </button>
    </section>
  );
}

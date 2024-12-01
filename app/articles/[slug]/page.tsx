import { getArticleData } from "@/articles";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";

interface ArticleData {
    title: string;
    date: string;
    summary: string;
    contentHtml: string;
}

interface PageProps {
    params: Promise<{ slug: string }>;
}

// Async metadata generator for dynamic SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const articleData: ArticleData | null = await getArticleData(resolvedParams.slug);

    if (!articleData) {
        return {
            title: "Article Not Found",
            description: "This article does not exist.",
        };
    }
    return {
        title: articleData.title,
        description: articleData.summary,
    };
}

// Article Component
const Article = async ({ params }: PageProps) => {
    try {
        const resolvedParams = await params;
        const articleData: ArticleData | null = await getArticleData(resolvedParams.slug);

        if (!articleData) {
            return <div>Article not found</div>;
        }

        const session = await getServerSession();

        return (
            <div className="container article">
                {session && (
                    <div className="mt-4">
                        <Link href={`/articles/${resolvedParams.slug}/edit`} className="text-blue-500 underline">
                            Edit Article
                        </Link>
                    </div>
                )}
                <h2 className="mb-0">{articleData.title}</h2>
                <i>{articleData.date}</i>
                <i>{articleData.summary}</i>
                <article
                    dangerouslySetInnerHTML={{ __html: articleData.contentHtml }}
                />
            </div>
        );
    } catch (error) {
        console.error("Error fetching article data:", error);
        return <div>Error loading article</div>;
    }
};

export default Article;

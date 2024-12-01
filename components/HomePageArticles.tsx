import Link from "next/link";
import type { ArticleItem } from "@/types";

interface Props {
  articles: ArticleItem[];
}

const HomePageArticles = ({ articles }: Props) => {
  return (
    <div className="post-preview">
      {articles.map((article) => (
        <div key={article.id} className="post">
          <Link
            href={`articles/${article.id}`}
            className=""
          >
            <h2 className="font-medium text-lg m-0">{article.title}</h2>
          </Link>
          <p className="post-meta">{new Date(article.date).toLocaleDateString()}</p>
          <i className="post-meta">{article.summary}</i>
        </div>
      ))}
    </div>
  );
};

export default HomePageArticles;

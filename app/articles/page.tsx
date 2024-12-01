import Link from "next/link"
import { getSortedArticles } from "@/articles"
import HomePageArticles from "@/components/HomePageArticles"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Articles',
  description: ''
};

const ArticleList = () => {
    const articles = getSortedArticles()

  return (
      <section className="container mt-5">
       <h2>Article</h2>
       <section className="container">
      <div className="mt-5">
        {articles !== null && <HomePageArticles articles={articles} />}
      </div>
    </section>
      </section>
  )
}

export default ArticleList
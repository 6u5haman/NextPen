import fs from "fs"
import matter from "gray-matter"
import path from "path"
import moment from "moment"
import { remark } from "remark"
import html from "remark-html"

import type { ArticleItem } from "@/types"

const articlesDir = path.join(process.cwd(), "articles")

export const getSortedArticles = (): ArticleItem[] => {
    const fileNames = fs.readdirSync(articlesDir)

    const allArticlesData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "")
        const fullPath = path.join(articlesDir, fileName)
        const fileContents = fs.readFileSync(fullPath, "utf-8")
        const matterResults = matter(fileContents)
        return {
            id,
            title: matterResults.data.title,
            date: matterResults.data.date,
            summary: matterResults.data.summary,
            category: matterResults.data.category
        }
    })
    return allArticlesData.sort((a, b) => {
        const format = 'DD-MM-YYYY'
        const dateOne = moment(a.date, format)
        const dateTwo = moment(a.date, format)
        if (dateOne.isBefore(dateTwo)) {
            return -1
        } else if (dateTwo.isAfter(dateOne)) {
            return 1
        } else {
            return 0
        }
    })
}

export const getArticleData = async (id: string) => {
    const fullPath = path.join(articlesDir, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    const matterResults = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResults.content);
    
    const contentHtml = processedContent.toString(); 

    return {
        id,
        contentHtml,
        title: matterResults.data.title,
        category: matterResults.data.category,
        summary: matterResults.data.summary,
        date: moment(matterResults.data.date, "DD-MM-YYYY").format("MMMM DD YYYY")
    };
};
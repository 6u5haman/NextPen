import Link from "next/link"
import { Metadata } from "next";

const website = process.env.WEBSITE_NAME;
const description = process.env.META_DESCRIPTION || '';

export const metadata: Metadata = {
  title: 'NextPen',
  description: description
};

const HomePage = () => {
  return (
    <section className="container">
      <div className="mt-5">
      </div>
    </section>
  )
}

export default HomePage
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
        <p>
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer congue, libero sit amet interdum consequat, orci nibh interdum lorem, nec vehicula nisl libero in quam. Nam cursus, leo sed efficitur sagittis, est erat lacinia odio, at vehicula lacus tortor a nulla. Vivamus et nulla id ipsum consequat malesuada. Nullam ac magna vitae lorem gravida mollis id non lacus. Quisque pharetra purus sed mi consectetur, sit amet scelerisque magna faucibus.
        </p>
        <p>
          Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer congue, libero sit amet interdum consequat, orci nibh interdum lorem, nec vehicula nisl libero in quam. Nam cursus, leo sed efficitur sagittis, est erat lacinia odio, at vehicula lacus tortor a nulla. Vivamus et nulla id ipsum consequat malesuada. Nullam ac magna vitae lorem gravida mollis id non lacus. Quisque pharetra purus sed mi consectetur, sit amet scelerisque magna faucibus.
        </p>
      </div>
    </section>
  )
}

export default HomePage
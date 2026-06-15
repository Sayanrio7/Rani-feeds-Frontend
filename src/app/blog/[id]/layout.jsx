export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(`http://127.0.0.1:5000/api/blogs/get/${id}`, {
      cache: "no-store",
    });

    const data = await res.json();

    const blog = data?.data;

    const title = blog?.title || "Blog Details";

    const description =
      blog?.excerpt ||
      "Read the latest fish farming, aquaculture, and fish feed articles from Rani Feeds.";

    return {
      title: {
        absolute: `${title} | Rani Feeds`,
      },

      description,

      keywords: [
        title,
        blog?.category || "Fish Farming",
        "Rani Feeds Blog",
        "Fish Feed",
        "Aquaculture",
        "Fish Farming India",
        "Fish Feed Manufacturer Kolkata",
      ],

      openGraph: {
        title: `${title} | Rani Feeds`,
        description,
        type: "article",
        images: [
          {
            url: blog?.image,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },

      twitter: {
        card: "summary_large_image",
        title: `${title} | Rani Feeds`,
        description,
        images: [blog?.image],
      },
    };
  } catch (error) {
    console.error("Blog Metadata Error:", error);

    return {
      title: {
        absolute: "Blog Details | Rani Feeds",
      },

      description:
        "Read the latest blogs and aquaculture insights from Rani Feeds.",
    };
  }
}

export default function BlogLayout({ children }) {
  return children;
}

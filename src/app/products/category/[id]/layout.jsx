export async function generateMetadata({ params }) {
  const { id } = await params;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/products/category/${id}`,
      {
        cache: "no-store",
      },
    );

    const data = await res.json();

    const categoryName =
      data?.data?.[0]?.category?.name || "Fish Feed Category";

    const categoryDescription =
      data?.data?.[0]?.category?.description ||
      "Premium quality fish feed solutions designed for healthy fish growth and sustainable aquaculture.";

    return {
      title: {
        absolute: `${categoryName} | Rani Feeds`,
      },

      description: `Explore ${categoryName} products from Rani Feeds. ${categoryDescription}`,

      keywords: [
        categoryName,
        `${categoryName} Fish Feed`,
        "Rani Feeds",
        "Fish Feed Manufacturer",
        "Fish Feed Manufacturer Kolkata",
        "Aquaculture Feed",
        "Fish Farming India",
        "Premium Fish Feed",
      ],

      openGraph: {
        title: `${categoryName} | Rani Feeds`,
        description: `Explore ${categoryName} products from Rani Feeds.`,
        type: "website",
      },

      twitter: {
        card: "summary_large_image",
        title: `${categoryName} | Rani Feeds`,
        description: `Explore ${categoryName} products from Rani Feeds.`,
      },
    };
  } catch (error) {
    console.error("Category Metadata Error:", error);

    return {
      title: {
        absolute: "Fish Feed Category | Rani Feeds",
      },

      description: "Explore premium fish feed categories from Rani Feeds.",

      keywords: ["Rani Feeds", "Fish Feed", "Aquaculture Feed", "Fish Farming"],
    };
  }
}

export default function CategoryLayout({ children }) {
  return children;
}

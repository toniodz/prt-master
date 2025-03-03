interface Post {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  slug: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: {
        sizes?: {
          medium_large?: {
            source_url: string;
          };
          large?: {
            source_url: string;
          };
        };
      };
    }>;
  };
}

const WP_API_URL = 'https://wordpress-416581-5252380.cloudwaysapps.com/wp-json/wp/v2';

// Fallback posts for when the API is unavailable
const fallbackPosts = [
  {
    id: 1,
    title: "Pain Reprocessing: A Breakthrough Treatment",
    excerpt: "Discover how Pain Reprocessing Therapy is revolutionizing chronic pain treatment with evidence-based approaches that target the source of pain in the brain.",
    content: "Full article content coming soon...",
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    slug: "pain-reprocessing-breakthrough",
    featuredImage: {
      url: "https://wordpress-416581-5252380.cloudwaysapps.com/wp-content/uploads/2025/02/CAROLINE0124.jpg",
      alt: "Pain Reprocessing Therapy Session",
      thumbnail: "https://wordpress-416581-5252380.cloudwaysapps.com/wp-content/uploads/2025/02/CAROLINE0124.jpg"
    },
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Understanding the Mind-Body Connection",
    excerpt: "Learn about the intricate relationship between your mind and body, and how this understanding can be key to overcoming chronic pain.",
    content: "Full article content coming soon...",
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    slug: "mind-body-connection",
    featuredImage: {
      url: "https://wordpress-416581-5252380.cloudwaysapps.com/wp-content/uploads/2025/02/CAROLINE0084.jpg",
      alt: "Mind-Body Connection Illustration",
      thumbnail: "https://wordpress-416581-5252380.cloudwaysapps.com/wp-content/uploads/2025/02/CAROLINE0084.jpg"
    },
    readTime: "4 min read"
  },
  {
    id: 3,
    title: "Breaking Free from Chronic Pain",
    excerpt: "Real stories and practical strategies from patients who have successfully overcome chronic pain using Pain Reprocessing Therapy.",
    content: "Full article content coming soon...",
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    slug: "breaking-free-chronic-pain",
    featuredImage: {
      url: "https://wordpress-416581-5252380.cloudwaysapps.com/wp-content/uploads/2025/02/CAROLINE0067.jpg",
      alt: "Patient Success Story",
      thumbnail: "https://wordpress-416581-5252380.cloudwaysapps.com/wp-content/uploads/2025/02/CAROLINE0067.jpg"
    },
    readTime: "6 min read"
  }
];

export async function getPosts() {
  try {
    const response = await fetch(`${WP_API_URL}/posts?_embed&per_page=100`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts: Post[] = await response.json();
    
    return posts.map(post => ({
      id: post.id,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      date: new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      slug: post.slug,
      featuredImage: {
        url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
        alt: post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered,
        thumbnail: 
          post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium_large?.source_url ||
          post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.large?.source_url ||
          post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
          null
      },
      readTime: calculateReadTime(post.content.rendered)
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return fallbackPosts;
  }
}

export async function getPost(slug: string) {
  try {
    const response = await fetch(`${WP_API_URL}/posts?slug=${slug}&_embed`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const posts: Post[] = await response.json();
    
    if (!posts.length) {
      const fallbackPost = fallbackPosts.find(post => post.slug === slug);
      if (!fallbackPost) return null;
      return fallbackPost;
    }

    const post = posts[0];
    return {
      id: post.id,
      title: post.title.rendered,
      content: post.content.rendered,
      date: new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      slug: post.slug,
      featuredImage: {
        url: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null,
        alt: post._embedded?.['wp:featuredmedia']?.[0]?.alt_text || post.title.rendered,
        thumbnail: 
          post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.medium_large?.source_url ||
          post._embedded?.['wp:featuredmedia']?.[0]?.media_details?.sizes?.large?.source_url ||
          post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
          null
      },
      readTime: calculateReadTime(post.content.rendered)
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    const fallbackPost = fallbackPosts.find(post => post.slug === slug);
    return fallbackPost || null;
  }
}

function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
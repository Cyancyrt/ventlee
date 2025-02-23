import { GetAllBlog } from '@/api/blogHook'

export default async function BlogPage() {
  const pageRes = await GetAllBlog()
  const posts = pageRes?.docs?.filter((doc) => doc?.contentType?.description === 'blog') || []

  const chunkArray = (arr, size) => {
    return arr.reduce((acc, _, i) => {
      if (i % size === 0) acc.push(arr.slice(i, i + size))
      return acc
    }, [])
  }

  return (
    <>
      <div className="relative h-[80vh]">
        <img
          src={posts[0]?.image?.url || 'list-aset/article.jpeg'}
          alt="background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <h1 className="text-white text-4xl font-bold mb-4">ARTICLE</h1>
        </div>
      </div>

      <section className="max-w-7xl ml-14 mr-14 px-4 py-8">
        {chunkArray(posts, 2).map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid ${rowIndex % 2 === 0 ? 'grid-cols-2' : 'grid-cols-3'} gap-14 mb-14 mt-10`}
          >
            {row.map((post, postIndex) => (
              <div key={postIndex} className="flex flex-col">
                <a href={`article/${post.slug}.html`} className="relative group mb-4">
                  <img
                    src={post.image?.url || `list-aset/list-${rowIndex * 2 + postIndex + 1}.jpeg`}
                    alt={post.title}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                </a>
                <a
                  href={`Blog/${post.slug}`}
                  className="text-xl font-medium mb-3 hover:text-gray-600"
                >
                  {post.title}
                </a>
                <div
                  className="text-gray-600 mb-3"
                  dangerouslySetInnerHTML={{ __html: post.description_html }}
                ></div>
                <a
                  href={`Blog/${post.slug}`}
                  className="text-black hover:text-gray-600 inline-flex items-center"
                >
                  DISCOVER MORE &gt;
                </a>
              </div>
            ))}
          </div>
        ))}
      </section>
    </>
  )
}

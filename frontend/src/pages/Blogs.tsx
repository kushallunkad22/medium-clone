import { useBlogs } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { Card, CardContent } from "../components/Card"
import { Appbar } from "../components/Appbar"

export const Blogs = () => {
    const {loading , blogs} = useBlogs();
    if(loading) {
        return (
        <div>
             <div>
        <div className="flex min-h-screen flex-col">
          <Appbar />
          <section className="w-full bg-[#ffd700] py-20">
            <div className="container flex items-center justify-between">
              <div className="max-w-2xl space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Medium Is A Place To Write, Read, And Connect
                </h1>
                <p className="text-xl text-muted-foreground">
                  Its easy and free to post your thinking on any topic and connect with millions of readers
                </p>
              </div>
              <div className="hidden lg:block">
                <span className="text-[20rem] font-bold leading-none">M</span>
              </div>
            </div>
          </section>
          </div>
            <div  className="flex justify-center">
                <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
        </div>
        )
    }
    return <div>
        <div className="flex min-h-screen flex-col">
        <Appbar />
          <section className="w-full bg-[#ffd700] py-20">
            <div className="container flex items-center justify-between">
              <div className="max-w-2xl space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Medium Is A Place To Write, Read, And Connect
                </h1>
                <p className="text-xl text-muted-foreground">
                  Its easy and free to post your thinking on any topic and connect with millions of readers
                </p>
              </div>
              <div className="hidden lg:block">
                <span className="text-[20rem] font-bold leading-none">M</span>
              </div>
            </div>
          </section>
          <section className="container py-12">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
              <Card
              authorName={blog.author.name} 
              title={blog.title}
              content={blog.content}
              publishedDate={"2022-01-01"}
              id={blog.id}
              image={blog.image}
            >
              <CardContent className="p-0">
                <a href="#" className="block overflow-hidden">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="aspect-[3/2] w-full object-cover"
                  />
                  <div className="p-4">
                    <h2 className="text-xl font-semibold">{blog.title}</h2>
                    <div className="mt-4 flex justify-end">
                      <img
                        src={blog.author.name}
                        alt="Author"
                        className="h-10 w-10 rounded-full"
                      />
                    </div>
                  </div>
                </a>
              </CardContent>
            </Card>
            
              ))}
            </div>
          </section>
        </div>
        </div>
      
}
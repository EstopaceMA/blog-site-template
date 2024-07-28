import { Card, CardContent } from "@/components/ui/card";
import { simpleBlogCard } from "./lib/interface";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

async function getData() {
  const query = `*[_type == 'post'] | order(_createdAt desc) {
    title,
    body,
    "currentSlug": slug.current,
    mainImage,
  }`;
  const data = await client.fetch(query);
  return data;
}

export default async function Home() {
  const data: simpleBlogCard[] = await getData();

  // console.log(JSON.stringify(data));
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5">
      {data.map((post, idx) => (
        <Card key={idx}>
          <Image
            alt={post.title + "image"}
            src={urlFor(post.mainImage).url()}
            width={500}
            height={500}
            className="rounded-t-lg h-[200px] object-cover"
          />
          <CardContent className="mt-5">
            <h3 className="text-lg line-clamp-2">{post.title}</h3>
            <p className="line-clamp-3 text-sm mt-2">{"body here"}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

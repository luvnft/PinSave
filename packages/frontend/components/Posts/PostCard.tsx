import Image from "next/future/image";
import Link from "next/link";
import { Paper, Text } from "@mantine/core";
import { useNetwork } from "wagmi";

import type { Post } from "@/services/upload";

const PostCard = (post: Post) => {
  const { chain } = useNetwork();
  let y;
  let x;

  if (post.image) {
    if (post.image.charAt(0) === "i") {
      y = post.image.replace("ipfs://", "");
      x = y.replace("/", ".ipfs.dweb.link/");
    }
    if (post.image.charAt(0) === "s") {
      y = post.image.replace("sia://", "");
      x = "siasky.net/" + y;
    }
  }

  const imgSrc = `https://${x ?? "dspyt.com/PinSaveL.png"}`;
  return (
    <Link href={`/${chain?.network ?? "maticmum"}/posts/${post.token_id}`}>
      <Paper
        component="a"
        withBorder
        radius="lg"
        shadow="md"
        p="md"
        sx={{ cursor: "pointer" }}
      >
        <div
          style={{
            position: "relative",
            width: 200,
            height: 200,
          }}
        >
          <Image
            src={imgSrc}
            alt={post.name}
            placeholder="blur"
            fill
            blurDataURL={imgSrc}
            sizes="200px"
            style={{ objectFit: "cover" }}
          />
        </div>
        <Text align="center" mt="sm">
          {post.name}
        </Text>
      </Paper>
    </Link>
  );
};

export default PostCard;

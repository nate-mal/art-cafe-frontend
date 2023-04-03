import * as React from "react";
import Card from "@mui/material/Card";

import Link from "../../Link";
import { CardActionArea } from "@mui/material";
import Image from "next/image";

export default function MartItem(props) {
  const { name, id, _meilisearch_id } = props;

  const image_path = `/marks/mark-${id}.png`;

  return (
    <Card>
      <CardActionArea
        sx={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <Link href={`${_meilisearch_id}`}>
          <Image
            src={image_path}
            alt={name}
            width={150}
            height={100}
            style={{
              objectFit: "scale-down",
              fontWeight: "bolder",
            }}
          />
        </Link>
      </CardActionArea>
    </Card>
  );
}

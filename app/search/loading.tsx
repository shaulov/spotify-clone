'use client';

import { BounceLoader } from "react-spinners";
import Box from "@/components/Box";

function Loading () {
  return (
    <Box className="flex justify-center items-center h-full">
        <BounceLoader color="#22c55e" size={40} />
    </Box>
  );
}

export default Loading;
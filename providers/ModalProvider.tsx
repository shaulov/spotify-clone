'use client';

import { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";
import SubscribeModal from "@/components/SubscribeModal";
import { ProductWithPrice } from "@/types";

interface ModalProviderProps {
  products: ProductWithPrice[];
}

function ModalProvider({ products }: ModalProviderProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {
        isMounted && 
        <>
          <AuthModal />
          <UploadModal />
          <SubscribeModal products={products} />
        </>
      }
    </>
  );
}

export default ModalProvider;
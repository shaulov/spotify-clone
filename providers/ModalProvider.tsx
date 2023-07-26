'use client';

import { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";
import UploadModal from "@/components/UploadModal";

function ModalProvider() {
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
        </>
      }
    </>
  );
}

export default ModalProvider;
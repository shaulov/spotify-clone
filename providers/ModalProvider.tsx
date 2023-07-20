'use client';

import { useEffect, useState } from "react";
import AuthModal from "@/components/AuthModal";

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {
        isMounted && 
        <AuthModal />
      }
    </>
  );
}

export default ModalProvider;
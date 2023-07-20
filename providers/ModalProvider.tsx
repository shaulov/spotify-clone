'use client';

import { useEffect, useState } from "react";
import Modal from "@/components/Modal";

function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      {
        isMounted && 
        <Modal 
          isOpen 
          onChange={() => {}} 
          title="Test modal" 
          description="test description"
        >
          Test children
        </Modal>
      }
    </>
  );
}

export default ModalProvider;
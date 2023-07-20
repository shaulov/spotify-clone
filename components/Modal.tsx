import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

interface ModalProps {
  isOpen: boolean;
  onChange: (open: boolean) => void;
  title: string;
  description: string;
  children: ReactNode;
}

function Modal({ isOpen, onChange, title, description, children }: ModalProps) {
  return (
    <Dialog.Root
      open={isOpen}
      defaultOpen={isOpen}
      onOpenChange={onChange}
    >
      <Dialog.Portal>
        <Dialog.Overlay 
          className="
            fixed inset-0
            bg-neutral-900/90
            backdrop-blur-sm
          "
        />
        <Dialog.Content
          className="
            fixed top-[50%] left-[50%]
            w-full md:w-[90vw] md:max-w-[450px]
            max-h-full h-full md:max-h-[85vh] md:h-auto
            p-[25px]
            bg-neutral-800
            border border-neutral-700 rounded-md
            drop-shadow-md
            translate-x-[-50%] translate-y-[-50%]
          "
        >
          <Dialog.Title
            className="
              mb-4
              text-xl font-bold
              text-center
            "
          >
            {title}
          </Dialog.Title>
          <Dialog.Description
            className="
              mb-5
              text-sm leading-normal
              text-center
            "
          >
            {description}
          </Dialog.Description>
          <div>
            {children}
          </div>
          <Dialog.Close asChild>
            <button 
              className="
                absolute top-[10px] right-[10px]
                inline-flex items-center justify-center
                w-[25px] h-[25px]
                text-neutral-400
                rounded-full
                hover:text-white
              "
            >
              <IoMdClose />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default Modal;
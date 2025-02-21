import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
export default function Modal({ open, children, className = " ", onClose }) {
  const dialog = useRef();
  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal.showModal();
    }
    return () => {
      modal.close();
    };
  }, [open]);
  // const dialog = useRef();

  // useEffect(() => {
  //   if (open && dialog.current) {
  //     dialog.current.showModal();
  //   }
  //   return () => {
  //     if (dialog.current) {
  //       dialog.current.close();
  //     }
  //   };
  // }, [open]);
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal")
  );
}

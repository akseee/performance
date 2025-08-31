import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import styles from "./Modal.module.css";

interface IModalPeops {
  children: ReactNode;
  isOpen: boolean;
  handleClose: () => void;
}

export const Modal = ({ children, isOpen, handleClose }: IModalPeops) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen) return null;
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <>
      <div
        data-testid="overlay"
        className={styles.overlay}
        onClick={handleClose}
      ></div>
      <div className={styles.modal}>
        <button onClick={handleClose} className={styles.button}>
          close
        </button>
        <div className={styles.content}>{children}</div>
      </div>
    </>,
    modalRoot
  );
};

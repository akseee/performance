import { useCallback, useState } from "react";
import { Modal } from "../../components/Modal/Modal";
import { Settings } from "../Settings/Settings";

export const SettingsModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <button onClick={handleOpenModal}>Select extra fields</button>

      {isModalOpen && (
        <Modal isOpen={isModalOpen} handleClose={handleCloseModal}>
          <Settings />
        </Modal>
      )}
    </>
  );
};

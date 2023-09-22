import { create } from "zustand";

interface RentModal {
  isOPen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useRentModal = create<RentModal>((set) => ({
  isOPen: false,
  onOpen: () => set({ isOPen: true }),
  onClose: () => ({ isOpen: false }),
}));

export default useRentModal;

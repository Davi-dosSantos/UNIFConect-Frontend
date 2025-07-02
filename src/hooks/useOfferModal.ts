import { useState } from "react";
import type { Offer } from "../types";

export function useOfferModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const handleOpenModal = (offer: Offer) => {
    setSelectedOffer(offer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    selectedOffer,
    handleOpenModal,
    handleCloseModal,
    setSelectedOffer,
  };
}

import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";

interface Props {
  listingId: string;
  currentUser?: SafeUser | null
}

const useFavorite = ({listingId, currentUser} : Props) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(listingId);
  }, [listingId, currentUser])

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return loginModal.onOpen();
    }

    try {
      let req
      if (hasFavorited) {
        req = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        req = () => axios.post(`/api/favorites/${listingId}`);
      }

      await req();
      router.refresh();
      toast.success('Success');
    } catch(error) {
      toast.error('Something error')
      console.log(error);
    }

  }, [router , currentUser ,hasFavorited, loginModal, listingId])

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite
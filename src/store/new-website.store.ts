import { create } from 'zustand';
import { persist } from 'zustand/middleware';

//@ts-ignore
import { Tag } from "react-tag-input";

interface FormData {
  siteName: string;
  name: string;
  crp: string;
  about: string;
  specialties: Tag[];
  logo: File | null;
  serviceType: string;
  postalCode: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  template: string;
}

const defaultFormData: FormData = {
  siteName: "",
  name: "",
  crp: "",
  about: "",
  specialties: [],
  logo: null,
  serviceType: "online",
  postalCode: "",
  address: "",
  neighborhood: "",
  city: "",
  state: "",
  template: "",
};

interface FormStore {
  formData: FormData;
  setFormData: (data: Partial<FormData>) => void;
  resetFormData: () => void;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      formData: defaultFormData,
      setFormData: (data) => set((state) => ({
        formData: { ...state.formData, ...data },
      })),
      resetFormData: () => set({ formData: defaultFormData }),
    }),
    {
      name: 'form-storage',
    }
  )
);
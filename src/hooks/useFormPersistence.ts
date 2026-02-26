// src/hooks/useFormPersistence.ts
import { useEffect } from "react";
import type { UseFormReturn } from "react-hook-form";

export function useFormPersistence<T>(
  form: UseFormReturn<T>,
  storageKey: string
) {
  const { watch, reset } = form;

    useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      reset(JSON.parse(saved));
    }
  }, [reset, storageKey]);

    useEffect(() => {
    const subscription = watch((value) => {
      const timeout = setTimeout(() => {
        localStorage.setItem(storageKey, JSON.stringify(value));
      }, 500);

      return () => clearTimeout(timeout);
    });

    return () => subscription.unsubscribe();
  }, [watch, storageKey]);
}
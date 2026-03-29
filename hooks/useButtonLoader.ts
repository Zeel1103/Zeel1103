import { useState, useCallback } from "react";

/**
 * Hook to manage button loading state during async operations
 * 
 * @example
 * const { isLoading, handleClick } = useButtonLoader();
 * 
 * const onSubmit = async () => {
 *   await handleClick(async () => {
 *     await fetchData();
 *   });
 * };
 * 
 * return <LoadingButton isLoading={isLoading} onClick={onSubmit}>Submit</LoadingButton>
 */
export function useButtonLoader() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async (callback: () => Promise<void> | void) => {
    try {
      setIsLoading(true);
      await callback();
    } catch (error) {
      console.error("Button action error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { isLoading, handleClick };
}

/**
 * Hook to manage multiple button states (useful for forms with multiple buttons)
 * 
 * @example
 * const { isLoading, setLoading } = useMultipleLoaders();
 * 
 * const handleSubmit = async () => {
 *   setLoading('submit', true);
 *   try {
 *     await submitForm();
 *   } finally {
 *     setLoading('submit', false);
 *   }
 * };
 * 
 * return (
 *   <>
 *     <LoadingButton isLoading={isLoading.submit} onClick={handleSubmit}>Submit</LoadingButton>
 *     <LoadingButton isLoading={isLoading.save} onClick={handleSave}>Save</LoadingButton>
 *   </>
 * )
 */
export function useMultipleLoaders() {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>({});

  const setLoading = useCallback((key: string, value: boolean) => {
    setLoadingStates((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const isLoading = (key: string) => loadingStates[key] || false;

  return { isLoading, setLoading, loadingStates };
}

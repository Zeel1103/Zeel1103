// components/ui/use-toast.tsx
import { useCallback } from "react"

export function useToast() {
  const showToast = useCallback(({
    title,
    description,
    type = "success",
  }: {
    title: string;
    description?: string;
    type?: "success" | "error";
  }) => {
    const toastContainer = document.createElement("div")
    toastContainer.innerHTML = `
      <div style="
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 16px;
        background: ${type === "error" ? "#f87171" : "#4ade80"};
        color: white;
        border-radius: 8px;
        font-family: sans-serif;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
      ">
        <strong>${title}</strong><br/>
        ${description || ""}
      </div>
    `
    document.body.appendChild(toastContainer)

    setTimeout(() => {
      toastContainer.remove()
    }, 3000)
  }, [])

  return { toast: showToast }
}

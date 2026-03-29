# LoadingButton Implementation Guide

## Quick Start

### 1. Single Button with Loader

```tsx
"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { useButtonLoader } from "@/hooks/useButtonLoader";

export default function MyComponent() {
  const { isLoading, handleClick } = useButtonLoader();

  const onSubmit = async () => {
    await handleClick(async () => {
      const response = await fetch("/api/some-endpoint", {
        method: "POST",
        body: JSON.stringify({ /* data */ }),
      });
      // Handle response
    });
  };

  return (
    <LoadingButton 
      isLoading={isLoading} 
      onClick={onSubmit}
      loadingText="Submitting..."
    >
      Submit
    </LoadingButton>
  );
}
```

### 2. Form with Multiple Buttons

```tsx
"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { useMultipleLoaders } from "@/hooks/useButtonLoader";

export default function FormComponent() {
  const { isLoading, setLoading } = useMultipleLoaders();

  const handleSubmit = async () => {
    setLoading("submit", true);
    try {
      await fetch("/api/submit", { method: "POST" });
    } finally {
      setLoading("submit", false);
    }
  };

  const handleSave = async () => {
    setLoading("save", true);
    try {
      await fetch("/api/save", { method: "POST" });
    } finally {
      setLoading("save", false);
    }
  };

  const handleCancel = async () => {
    setLoading("cancel", true);
    try {
      // Do something
    } finally {
      setLoading("cancel", false);
    }
  };

  return (
    <div className="flex gap-2">
      <LoadingButton 
        isLoading={isLoading("submit")} 
        onClick={handleSubmit}
        loadingText="Submitting..."
      >
        Submit
      </LoadingButton>
      <LoadingButton 
        variant="secondary"
        isLoading={isLoading("save")} 
        onClick={handleSave}
        loadingText="Saving..."
      >
        Save
      </LoadingButton>
      <LoadingButton 
        variant="ghost"
        isLoading={isLoading("cancel")} 
        onClick={handleCancel}
        loadingText="Cancelling..."
      >
        Cancel
      </LoadingButton>
    </div>
  );
}
```

### 3. Example: Appointment Booking Modal

```tsx
"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { useButtonLoader } from "@/hooks/useButtonLoader";
import { useToast } from "@/components/ui/use-toast";

export default function DoctorBookingModal() {
  const { isLoading, handleClick } = useButtonLoader();
  const { toast } = useToast();

  const handleBookAppointment = async () => {
    await handleClick(async () => {
      const response = await fetch("/api/appointments/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorId: selectedDoctorId,
          sessionId,
          slotTime: appointmentDateTime.toISOString(),
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Appointment booked successfully!",
        });
        // Close modal, redirect, etc
      } else {
        const error = await response.json();
        throw new Error(error.error || "Booking failed");
      }
    });
  };

  return (
    <LoadingButton
      isLoading={isLoading}
      onClick={handleBookAppointment}
      loadingText="Booking..."
      className="w-full"
    >
      Confirm Booking
    </LoadingButton>
  );
}
```

### 4. With Toast Notifications

```tsx
"use client";

import { LoadingButton } from "@/components/ui/loading-button";
import { useButtonLoader } from "@/hooks/useButtonLoader";
import { useToast } from "@/components/ui/use-toast";

export default function ActionButton() {
  const { isLoading, handleClick } = useButtonLoader();
  const { toast } = useToast();

  const handleAction = async () => {
    try {
      await handleClick(async () => {
        const response = await fetch("/api/action", { method: "POST" });
        
        if (!response.ok) {
          throw new Error("Action failed");
        }

        toast({
          title: "Success",
          description: "Action completed successfully!",
        });
      });
    } catch (error) {
      toast({
        type: "error",
        title: "Error",
        description: (error as Error).message || "Something went wrong",
      });
    }
  };

  return (
    <LoadingButton isLoading={isLoading} onClick={handleAction}>
      Click Me
    </LoadingButton>
  );
}
```

## Component Props

### LoadingButton Props

```typescript
interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // Standard button variants from shadcn/ui
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  
  // Size variants
  size?: "default" | "sm" | "lg" | "icon";
  
  // Loading state
  isLoading?: boolean;           // When true, shows spinner and disables button
  loadingText?: string;          // Text to show while loading (default: "Loading...")
  
  // All standard HTML button attributes
  disabled?: boolean;            // Additional disable state
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children?: React.ReactNode;
}
```

## Hook Return Values

### useButtonLoader()
```typescript
{
  isLoading: boolean;           // Whether action is in progress
  handleClick: (callback: () => Promise<void>) => Promise<void>;  // Wrapper function
}
```

### useMultipleLoaders()
```typescript
{
  isLoading: (key: string) => boolean;        // Function to check if specific button is loading
  setLoading: (key: string, value: boolean) => void;  // Set loading state for a button
  loadingStates: Record<string, boolean>;     // Raw state object
}
```

## Examples for Your Pages

### Apply to DoctorBookingModal.tsx
Replace the submit button with:
```tsx
const { isLoading, handleClick } = useButtonLoader();

<LoadingButton
  isLoading={isLoading}
  onClick={() => handleClick(() => handleBookAppointment())}
  loadingText="Booking..."
  className="mt-4"
>
  Confirm Booking
</LoadingButton>
```

### Apply to Dashboard Buttons
```tsx
const { isLoading, setLoading } = useMultipleLoaders();

// In your button click handlers:
const onAddSession = async () => {
  await handleClick(async () => {
    // your logic
  });
};

<LoadingButton isLoading={isLoading("addSession")} onClick={onAddSession}>
  Add New Session
</LoadingButton>
```

## Features

✅ Spinner animation while loading  
✅ Button disabled while loading  
✅ Custom loading text  
✅ Works with all button variants and sizes  
✅ TypeScript support  
✅ Automatic error handling  
✅ Easy to use with forms  
✅ No external dependencies (uses existing lucide-react)  

## Customization

### Change Spinner Style
Edit `/components/ui/loading-button.tsx` and replace the `Loader2` icon:
```tsx
import { Loader2, Loader, RefreshCw } from "lucide-react";

// Use any of these:
<Loader2 className="size-4 animate-spin" />
<Loader className="size-4 animate-spin" />
<RefreshCw className="size-4 animate-spin" />
```

### Custom Loading Messages
```tsx
<LoadingButton 
  isLoading={isLoading} 
  loadingText="Please wait..." 
  onClick={handleClick}
>
  Submit
</LoadingButton>
```

## Complete Example: Add New Session Dialog

```tsx
"use client";

import { useState } from "react";
import { LoadingButton } from "@/components/ui/loading-button";
import { useButtonLoader } from "@/hooks/useButtonLoader";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function AddNewSessionDialog({ open, onClose }) {
  const [topic, setTopic] = useState("");
  const { isLoading, handleClick } = useButtonLoader();
  const { toast } = useToast();

  const handleAddSession = async () => {
    try {
      await handleClick(async () => {
        const response = await fetch("/api/sessions/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic }),
        });

        if (!response.ok) throw new Error("Failed to create session");

        toast({
          title: "Success",
          description: "Session created successfully!",
        });
        onClose();
        setTopic("");
      });
    } catch (error) {
      toast({
        type: "error",
        title: "Error",
        description: (error as Error).message,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Session</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Enter topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={isLoading}
          />
          <div className="flex gap-2">
            <LoadingButton
              isLoading={isLoading}
              onClick={handleAddSession}
              loadingText="Creating..."
              className="flex-1"
            >
              Create
            </LoadingButton>
            <button onClick={onClose} disabled={isLoading}>
              Cancel
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

---

All set! Now every button can show a loader. Just import `LoadingButton` and the hook to use it anywhere in your app. 🎉

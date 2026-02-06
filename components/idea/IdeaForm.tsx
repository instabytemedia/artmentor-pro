"use client";

import { useState } from "react";
import type { CreateIdea } from "@/lib/schemas/idea";

interface IdeaFormProps {
  initialData?: Partial<CreateIdea>;
  onSubmit: (data: CreateIdea) => Promise<void>;
  isSubmitting?: boolean;
}

export function IdeaForm({ initialData, onSubmit, isSubmitting }: IdeaFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState(initialData?.title ?? "");
  const [description, setDescription] = useState(initialData?.description ?? "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await onSubmit({
        title,
        description,
      } as CreateIdea);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ein Fehler ist aufgetreten");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          required
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">
          Description
        </label>
        <input
          id="description"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          
        />
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? "Speichern..." : "Speichern"}
        </button>
      </div>
    </form>
  );
}

"use client";

import { useCreateReviewByUser } from "../_hooks/useCreateReview";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function ReviewPage() {
  const { eventId } = useParams();
  const router = useRouter();
  const { createReview } = useCreateReviewByUser();

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async () => {
    if (!eventId || typeof eventId !== "string") {
      return;
    }

    try {
      await createReview({
        eventId,
        rating,
        comment,
      });

      router.push(`/events/${eventId}`);
    } catch (error) {
        console.log(error)
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-lg shadow">
      <h1 className="text-xl font-semibold mb-4">Tulis Ulasanmu</h1>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Rating (1-5)</label>
        <Input
          type="number"
          min={1}
          max={5}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Komentar</label>
        <Textarea
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Ceritakan pengalamanmu..."
        />
      </div>

      <Button onClick={handleSubmit}>Kirim Ulasan</Button>
    </div>
  );
}

// app/(organizer)/dashboard/voucher/create-voucher/page.tsx
"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCreateVoucher } from "../../_hooks/useCreateVoucher";
import { toast } from "sonner";
import { useGetMyEvents } from "../../_hooks/useGetEventsByOrganizerId";
import { withAuthGuard } from "@/hoc/AuthGuard";


 function CreateVoucherPage() {
  const router = useRouter();
  const { organizerId } = useParams() as { organizerId: string };

  const mutation = useCreateVoucher();

  const { data: events, isLoading: loadingEvents } = useGetMyEvents();

  const [form, setForm] = useState({
    code: "",
    quota: 1,
    discountAmount: 0,
    startDate: "",
    endDate: "",
    eventId: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "quota" || name === "discountAmount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      await mutation.mutateAsync({
        organizerId,
        payload: form,
      });
      toast.success("Voucher created!");
      router.push("/organizer/dashboard/vouchers"); 
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4 border rounded-xl shadow mt-8 space-y-4">
      <h1 className="text-2xl font-semibold">Create New Voucher</h1>

      <div className="space-y-2">
        <Label>Code</Label>
        <Input name="code" value={form.code} onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label>Quota</Label>
        <Input
          name="quota"
          type="number"
          value={form.quota}
          onChange={handleChange}
          min={1}
        />
      </div>

      <div className="space-y-2">
        <Label>Discount Amount</Label>
        <Input
          name="discountAmount"
          type="number"
          value={form.discountAmount}
          onChange={handleChange}
          min={0}
        />
      </div>

      <div className="space-y-2">
        <Label>Start Date</Label>
        <Input name="startDate" type="datetime-local" onChange={handleChange} />
      </div>

      <div className="space-y-2">
        <Label>End Date</Label>
        <Input name="endDate" type="datetime-local" onChange={handleChange} />
      </div>

      {/* Event Dropdown */}
      <div className="space-y-2">
        <Label>Event</Label>
        {loadingEvents ? (
          <p>Loading events...</p>
        ) : (
          <select
            name="eventId"
            value={form.eventId}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          >
            <option value="">-- Select Event --</option>
            {events?.map((event: any) => (
              <option key={event.id} value={event.id}>
                {event.title} ({new Date(event.startDay).toLocaleDateString()})
              </option>
            ))}
          </select>
        )}
      </div>

      <Button onClick={handleSubmit} disabled={mutation.isPending}>
        {mutation.isPending ? "Creating..." : "Create Voucher"}
      </Button>
    </div>
  );
}

export default withAuthGuard(CreateVoucherPage, {
  allowedRoles: ["ORGANIZER"], redirectTo: "/organizer/login",});

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { validationCreateEventSchema } from "@/features/organizer/create-event/schema/validationCreateEventSchema";
import { useFormik } from "formik";
import useCreateEventHook, {
  CreateEventFormValues,
} from "../../_hooks/createEvent";
import { withAuthGuard } from "@/hoc/AuthGuard";

const categories = [
  "CULINARY",
  "MUSIC",
  "SPORT",
  "COMEDY",
  "WORKSHOP",
  "ART",
  "TRAVEL",
  "EDUCATION",
  "COMMUNITY",
  "FASHION",
  "GAMING",
  "HEALTH",
  "FAMILY",
  "RELIGION",
  "OTHER",
];

const statuses = ["UPCOMING", "ONGOING", "DONE"];

 function CreateEventPage() {
  const { createEventMutation } = useCreateEventHook();

  const formik = useFormik<CreateEventFormValues>({
    initialValues: {
      title: "",
      startDay: "",
      endDay: "",
      startTime: "",
      endTime: "",
      category: "",
      location: "",
      description: "",
      maxCapacity: "",
      status: "UPCOMING",
      image: null,
      ticketCategories: [{ name: "", price: 0, quota: 0 }],
    },
    validationSchema: validationCreateEventSchema,
    onSubmit: (values) => {
      createEventMutation.mutate({
        ...values,
        maxCapacity: values.maxCapacity, // tetap string
        startDay: new Date(values.startDay).toISOString(),
        endDay: new Date(values.endDay).toISOString(),
      });
    },
  });

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Create New Event</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
          />
          {formik.errors.title && formik.touched.title && (
            <p className="text-red-500 text-sm">{formik.errors.title}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startDay">Start Date</Label>
            <Input
              type="date"
              name="startDay"
              value={formik.values.startDay}
              onChange={formik.handleChange}
            />
            {formik.errors.startDay && formik.touched.startDay && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.startDay}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="endDay">End Date</Label>
            <Input
              type="date"
              name="endDay"
              value={formik.values.endDay}
              onChange={formik.handleChange}
            />
            {formik.errors.endDay && formik.touched.endDay && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.endDay}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="startTime">Start Time</Label>
            <Input
              type="time"
              name="startTime"
              value={formik.values.startTime}
              onChange={formik.handleChange}
            />
            {formik.errors.startTime && formik.touched.startTime && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.startTime}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="endTime">End Time</Label>
            <Input
              type="time"
              name="endTime"
              value={formik.values.endTime}
              onChange={formik.handleChange}
            />
            {formik.errors.endTime && formik.touched.endTime && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.endTime}
              </p>
            )}
          </div>
        </div>

        <div>
          <Label htmlFor="category">Category</Label>
          <Select
            value={formik.values.category}
            onValueChange={(value) => formik.setFieldValue("category", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formik.errors.category && formik.touched.category && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.category}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
          />
          {formik.errors.location && formik.touched.location && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.location}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
          {formik.errors.description && formik.touched.description && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.description}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="ticketCategories" className="mb-2 block">
            Ticket Categories
          </Label>
          {formik.errors.ticketCategories &&
            typeof formik.errors.ticketCategories === "string" && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.ticketCategories}
              </p>
            )}
          <div className="space-y-4">
            {formik.values.ticketCategories.map((ticket, index) => (
              <div key={index} className="grid grid-cols-3 gap-4">
                <div>
                  <Label
                    htmlFor={`ticketCategories[${index}].name`}
                    className="text-sm"
                  >
                    Name
                  </Label>
                  <Input
                    id={`ticketCategories[${index}].name`}
                    placeholder="e.g. VIP, Regular"
                    value={ticket.name}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `ticketCategories[${index}].name`,
                        e.target.value
                      )
                    }
                  />
                </div>

                <div>
                  <Label
                    htmlFor={`ticketCategories[${index}].price`}
                    className="text-sm"
                  >
                    Price (Rp)
                  </Label>
                  <Input
                    id={`ticketCategories[${index}].price`}
                    placeholder="Harga tiket"
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="0"
                    value={ticket.price}
                    onChange={(e) => {
                      const value = e.target.value;
                      const cleaned =
                        value === "0" ? 0 : value.replace(/^0+/, "");
                      formik.setFieldValue(
                        `ticketCategories[${index}].price`,
                        Number(cleaned)
                      );
                    }}
                  />
                </div>

                <div>
                  <Label
                    htmlFor={`ticketCategories[${index}].quota`}
                    className="text-sm"
                  >
                    Quota
                  </Label>
                  <Input
                    id={`ticketCategories[${index}].quota`}
                    placeholder="Jumlah tiket"
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min="0"
                    value={ticket.quota}
                    onChange={(e) => {
                      const value = e.target.value;
                      const cleaned =
                        value === "0" ? 0 : value.replace(/^0+/, "");
                      formik.setFieldValue(
                        `ticketCategories[${index}].quota`,
                        Number(cleaned)
                      );
                    }}
                  />
                </div>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              onClick={() =>
                formik.setFieldValue("ticketCategories", [
                  ...formik.values.ticketCategories,
                  { name: "", price: 0, stock: 0 },
                ])
              }
            >
              + Add Ticket Category
            </Button>
          </div>
        </div>

        <div>
          <Label htmlFor="maxCapacity">Max Capacity</Label>
          <Input
            type="number"
            name="maxCapacity"
            value={formik.values.maxCapacity}
            onChange={formik.handleChange}
          />
          {formik.errors.maxCapacity && formik.touched.maxCapacity && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.maxCapacity}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="status">Status</Label>
          <Select
            value={formik.values.status}
            onValueChange={(value) => formik.setFieldValue("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {formik.errors.status && formik.touched.status && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.status}</p>
          )}
        </div>

        <div>
          <Label htmlFor="image">Image</Label>
          <Input
            type="file"
            name="image"
            accept="image/*"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0] ?? null;
              formik.setFieldValue("image", file);
            }}
          />
          {formik.errors.image && formik.touched.image && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
          Create Event
        </Button>
      </form>
    </div>
  );
}

export default withAuthGuard(CreateEventPage, {
  allowedRoles: ["ORGANIZER"], redirectTo: "/organizer/login",});
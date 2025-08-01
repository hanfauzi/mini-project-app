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
import useCreateEventHook, { CreateEventFormValues } from "./_hooks/createEvent";

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

export default function CreateEventPage() {
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
    price: "",
    maxCapacity: "",
    status: "UPCOMING",
    image: null,
  },
  validationSchema: validationCreateEventSchema,
  onSubmit: (values) => {
    createEventMutation.mutate({
      ...values,
      price: values.price, // tetap string
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
          </div>
          <div>
            <Label htmlFor="endDay">End Date</Label>
            <Input
              type="date"
              name="endDay"
              value={formik.values.endDay}
              onChange={formik.handleChange}
            />
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
          </div>
          <div>
            <Label htmlFor="endTime">End Time</Label>
            <Input
              type="time"
              name="endTime"
              value={formik.values.endTime}
              onChange={formik.handleChange}
            />
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
        </div>

        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            name="location"
            value={formik.values.location}
            onChange={formik.handleChange}
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
          />
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Input
            type="number"
            name="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
        </div>

        <div>
          <Label htmlFor="maxCapacity">Max Capacity</Label>
          <Input
            type="number"
            name="maxCapacity"
            value={formik.values.maxCapacity}
            onChange={formik.handleChange}
          />
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
        </div>

        <Button type="submit" className="w-full" disabled={formik.isSubmitting}>
          Create Event
        </Button>
      </form>
    </div>
  );
}
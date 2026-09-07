import AdminNav from "@/components/admin/AdminNav";
import EventForm from "@/components/admin/EventForm";

export default function NewEventPage() {
  return (
    <div className="min-h-screen bg-mist">
      <AdminNav />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <p className="section-label mb-1">Create</p>
        <h1 className="mb-8 font-serif text-2xl font-medium text-ink">New Event</h1>
        <EventForm mode="create" />
      </div>
    </div>
  );
}

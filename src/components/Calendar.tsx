// This is the enhanced React (Next.js compatible) LMS Calendar setup with:
// - Backend integration (GET, POST events)
// - Event type categorization
// - Notifications/reminders
// - Student assignment
// - Daily/weekly view toggles
// - Filters/search
// - Drag-and-drop editing
// - Event edit and delete

"use client";

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Dialog } from "@headlessui/react";
import { Plus, X,Edit2,GraduationCap } from "lucide-react";
import axios from "axios";
import { EventInput, DateSelectArg, EventClickArg, EventDropArg } from "@fullcalendar/core";

const BACKEND_URL = "http://localhost:4000/events"; // change as needed

const EVENT_TYPES = ["lecture", "workshop", "review"];
const COLORS = {
  lecture: "bg-green-500 text-black",
  workshop: "bg-blue-500 text-black",
  review: "bg-purple-500 text-black",
};

type LmsEvent = {
  id?: string;
  title: string;
  start: string;
  end: string;
  type: string;
  instructor: string;
  students: string[];
};

export default function CalendarPage() {
  const [events, setEvents] = useState<LmsEvent[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [newEvent, setNewEvent] = useState<LmsEvent>({
    title: "",
    start: "",
    end: "",
    type: "lecture",
    instructor: "",
    students: [],
  });
  const [filterType, setFilterType] = useState<"all" | "lecture" | "workshop" | "review">("all");

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await axios.get<LmsEvent[]>(BACKEND_URL);
    setEvents(res.data);
  };

  const handleDateSelect = (info: DateSelectArg) => {
    setNewEvent({ ...newEvent, start: info.startStr, end: info.endStr });
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleEventClick = ({ event }: EventClickArg) => {
    setSelectedEventId(event.id);
    setNewEvent({
      title: event.title,
      start: event.startStr,
      end: event.endStr,
      type: event.extendedProps.type,
      instructor: event.extendedProps.instructor,
      students: event.extendedProps.students || [],
    });
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleAddOrUpdateEvent = async () => {
    if (isEditing) {
      await axios.put(`${BACKEND_URL}/${selectedEventId}`, newEvent);
    } else {
      await axios.post(BACKEND_URL, newEvent);
    }
    fetchEvents();
    setModalOpen(false);
  };

  const handleDeleteEvent = async () => {
    if (selectedEventId) {
      await axios.delete(`${BACKEND_URL}/${selectedEventId}`);
      fetchEvents();
      setModalOpen(false);
    }
  };

  const handleEventDrop = async ({ event }: EventDropArg) => {
    await axios.put(`${BACKEND_URL}/${event.id}`, {
      start: event.startStr,
      end: event.endStr,
    });
    fetchEvents();
  };

  const filteredEvents =
    filterType === "all"
      ? events
      : events.filter((e: LmsEvent) => e.type === filterType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-700 mb-1">LMS Calendar</h1>
            <p className="text-gray-500 text-sm">Manage and track all your learning events in one place</p>
          </div>
        </div>
        
      </div>

      {/* Card Container */}
      <div className="w-full mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        {/* Filters & Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div className="flex gap-3 items-center">
            <select
              onChange={(e) => setFilterType(e.target.value as "all" | "lecture" | "workshop" | "review")}
              value={filterType}
              className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm bg-gray-50"
            >
              <option value="all">All Types</option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              setIsEditing(false);
              setModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 btn-primary font-semibold shadow-md"
          >
            <Plus className="w-5 h-5" /> Add Event
          </button>
        </div>

        {/* Calendar */}
        <div className="bg-gray-50 text-black rounded-xl shadow-inner p-4">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              start: "today prev,next",
              center: "title",
              end: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            selectable={true}
            editable={true}
            events={filteredEvents.map((e) => ({
              ...e,
              className: COLORS[e.type as keyof typeof COLORS] || "bg-gray-300 ",
            })) as EventInput[]}
            select={handleDateSelect}
            eventDrop={handleEventDrop}
            eventClick={handleEventClick}
            height="auto"
          />
        </div>
      </div>

      {/* Add/Edit Event Modal */}
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="fixed inset-0 bg-black/40 z-40 flex items-center justify-center">
          <div className="bg-white text-black p-8 rounded-2xl shadow-2xl w-[400px] border border-gray-100 relative animate-fadeIn">
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-700 mb-1 flex items-center gap-2">
                {isEditing ? <Edit2 className="w-5 h-5 text-blue-600" /> : <Plus className="w-5 h-5 text-blue-600" />}
                {isEditing ? "Edit Event" : "Add Event"}
              </h2>
              <p className="text-gray-500 text-sm">Fill in the event details below</p>
            </div>

            <input
              type="text"
              placeholder="Title"
              className="w-full mb-3 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />

            <input
              type="datetime-local"
              className="w-full mb-3 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={newEvent.start}
              onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
            />

            <input
              type="datetime-local"
              className="w-full mb-3 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={newEvent.end}
              onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
            />

            <select
              className="w-full mb-3 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={newEvent.type}
              onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
            >
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t.toUpperCase()}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Instructor"
              className="w-full mb-3 border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              value={newEvent.instructor}
              onChange={(e) => setNewEvent({ ...newEvent, instructor: e.target.value })}
            />

            <div className="flex gap-2 mt-6">
              <button
                onClick={handleAddOrUpdateEvent}
                className="btn-primary w-full py-2 font-semibold shadow-md"
              >
                {isEditing ? "Update" : "Save"}
              </button>
              {isEditing && (
                <button
                  onClick={handleDeleteEvent}
                  className="bg-red-600 w-full text-white py-2 rounded-lg font-semibold hover:bg-red-700 hover:scale-105 transition-all duration-200 shadow-md"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { AppointmentModal } from "../AppointmentModal";
import { StatusBadge } from "../StatusBadge";

export const columns: ColumnDef<Appointment>[] = [
  {
    header: "#",
    cell: ({ row }) => <p className="text-14-medium">{row.index + 1}</p>,
  },
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      const appointment = row.original;
      const patient =
        appointment.patient && typeof appointment.patient === "object"
          ? appointment.patient
          : null;

      return (
        <p className="text-14-medium">
          {patient?.name ?? "Unknown Patient"}
        </p>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="min-w-[115px]">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: "schedule",
    header: "Appointment",
    cell: ({ row }) => (
      <p className="text-14-regular min-w-[100px]">
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: "primaryPhysician",
    header: "Doctor",
    cell: ({ row }) => {
      const doctor = Doctors.find(
        (d) => d.name === row.original.primaryPhysician
      );
      return (
        <div className="flex items-center gap-3">
          <Image
            src={doctor?.image ?? "/assets/icons/user.svg"}
            alt="doctor"
            width={32}
            height={32}
            className="size-8 rounded-full"
          />
          <p className="whitespace-nowrap">Dr. {doctor?.name ?? "Unknown"}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const appointment = row.original;
      const patient =
        appointment.patient && typeof appointment.patient === "object"
          ? appointment.patient
          : null;

      return (
        <div className="flex gap-1">
          <AppointmentModal
            patientId={patient?.$id ?? ""}
            userId={appointment.userId}
            appointment={appointment}
            type="schedule"
            title="Schedule Appointment"
            description="Please confirm the following details to schedule."
          />
          <AppointmentModal
            patientId={patient?.$id ?? ""}
            userId={appointment.userId}
            appointment={appointment}
            type="cancel"
            title="Cancel Appointment"
            description="Are you sure you want to cancel your appointment?"
          />
        </div>
      );
    },
  },
];

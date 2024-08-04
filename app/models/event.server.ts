import type { User, Event } from "@prisma/client";

import { prisma } from "~/db.server";

export function getEvent({
  id}: Pick<Event, "id">) {
  return prisma.event.findFirst({
    select: { id: true, body: true, title: true, image:true },
    where: { id },
  });
}

export function getEventListItems({ userId }: { userId: User["id"] }) {
  return prisma.event.findMany({
    where: { userId },
    select: { id: true, title: true, image:true },
    orderBy: { updatedAt: "desc" },
  });
}

export function getEventAllListItems() {
  return prisma.event.findMany({
    select: { id: true, title: true, body: true, image: true },
    orderBy: { updatedAt: "desc" },
  });
}

export function createEvent({
  body,
  title,
  userId,
}: Pick<Event, "body" | "title"> & {
  userId: User["id"];
}) {
  return prisma.event.create({
    data: {
      title,
      body,
      //image,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteEvent({
  id,
  userId,
}: Pick<Event, "id"> & { userId: User["id"] }) {
  return prisma.event.deleteMany({
    where: { id, userId },
  });
}

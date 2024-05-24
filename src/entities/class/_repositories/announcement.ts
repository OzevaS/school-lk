import { dbClient } from "@/shared/lib/db";
import { AnnouncementEntity } from "../_domain/types";

export class AnnouncementRepository {
  async create(announcement: AnnouncementEntity, classIds: number[]) {
    const createdAnnouncement = await dbClient.announcement.create({
      data: announcement,
    });
    await dbClient.announcementClass.createMany({
      data: classIds.map((classId) => ({
        announcement_id: createdAnnouncement.id,
        class_id: classId,
      })),
    });
    return createdAnnouncement;
  }

  async getAnnouncementsByClassId(
    classId: number,
  ): Promise<AnnouncementEntity[]> {
    const classAnnouncements = await dbClient.announcementClass.findMany({
      where: {
        class_id: classId,
      },
    });

    return await dbClient.announcement.findMany({
      where: {
        id: {
          in: classAnnouncements.map(
            (announcement) => announcement.announcement_id,
          ),
        },
      },
    });
  }

  async getAnnouncementById(id: number): Promise<AnnouncementEntity> {
    return await dbClient.announcement.findUniqueOrThrow({
      where: {
        id,
      },
    });
  }

  async update(id: number, data: Partial<AnnouncementEntity>) {
    return await dbClient.announcement.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    return await dbClient.announcement.delete({
      where: {
        id,
      },
    });
  }

  async getAnnouncementsByTeacherId(teacherId: number) {
    return await dbClient.announcement.findMany({
      where: {
        staff_id: teacherId,
      },
    });
  }
}

export const announcementRepository = new AnnouncementRepository();

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ClassSchedule } from "@/models/Class";
import { initialClasses } from "@/lib/initial-data";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const classes = await ClassSchedule.find({}).sort({ date: 1 });
      if (classes.length > 0) {
        const mapped = classes.map((c) => ({
          id: c._id.toString(),
          title: c.title,
          trainerName: c.trainerName,
          date: c.date,
          time: c.time,
          room: c.room,
          capacity: c.capacity,
          enrolled: c.enrolled,
          status: c.status,
        }));
        return NextResponse.json(mapped);
      }
    }
    return NextResponse.json(initialClasses);
  } catch (error) {
    console.error("GET /api/classes error:", error);
    return NextResponse.json(initialClasses);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const conn = await connectToDatabase();

    if (conn) {
      const newClass = await ClassSchedule.create(body);
      return NextResponse.json(
        {
          id: newClass._id.toString(),
          title: newClass.title,
          trainerName: newClass.trainerName,
          date: newClass.date,
          time: newClass.time,
          room: newClass.room,
          capacity: newClass.capacity,
          enrolled: newClass.enrolled,
          status: newClass.status,
        },
        { status: 201 }
      );
    }

    const mockCreated = {
      ...body,
      id: `cls-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json(mockCreated, { status: 201 });
  } catch (error) {
    console.error("POST /api/classes error:", error);
    return NextResponse.json(
      { error: "Failed to create class schedule" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const conn = await connectToDatabase();

    if (conn && id) {
      const updated = await ClassSchedule.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (updated) {
        return NextResponse.json({
          id: updated._id.toString(),
          title: updated.title,
          trainerName: updated.trainerName,
          date: updated.date,
          time: updated.time,
          room: updated.room,
          capacity: updated.capacity,
          enrolled: updated.enrolled,
          status: updated.status,
        });
      }
    }
    return NextResponse.json(body);
  } catch (error) {
    console.error("PUT /api/classes error:", error);
    return NextResponse.json(
      { error: "Failed to update class schedule" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const conn = await connectToDatabase();

    if (conn && id) {
      await ClassSchedule.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: "Class deleted" });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/classes error:", error);
    return NextResponse.json(
      { error: "Failed to delete class schedule" },
      { status: 500 }
    );
  }
}

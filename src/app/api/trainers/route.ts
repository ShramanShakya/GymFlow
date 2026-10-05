import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Trainer } from "@/models/Trainer";
import { initialTrainers } from "@/lib/initial-data";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const trainers = await Trainer.find({}).sort({ createdAt: -1 });
      if (trainers.length > 0) {
        const mapped = trainers.map((t) => ({
          id: t._id.toString(),
          name: t.name,
          email: t.email,
          phone: t.phone,
          specialization: t.specialization,
          experienceYears: t.experienceYears,
          status: t.status,
        }));
        return NextResponse.json(mapped);
      }
    }
    return NextResponse.json(initialTrainers);
  } catch (error) {
    console.error("GET /api/trainers error:", error);
    return NextResponse.json(initialTrainers);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const conn = await connectToDatabase();

    if (conn) {
      const newTrainer = await Trainer.create(body);
      return NextResponse.json(
        {
          id: newTrainer._id.toString(),
          name: newTrainer.name,
          email: newTrainer.email,
          phone: newTrainer.phone,
          specialization: newTrainer.specialization,
          experienceYears: newTrainer.experienceYears,
          status: newTrainer.status,
        },
        { status: 201 }
      );
    }

    const mockCreated = {
      ...body,
      id: `trn-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json(mockCreated, { status: 201 });
  } catch (error) {
    console.error("POST /api/trainers error:", error);
    return NextResponse.json(
      { error: "Failed to create trainer" },
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
      const updated = await Trainer.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (updated) {
        return NextResponse.json({
          id: updated._id.toString(),
          name: updated.name,
          email: updated.email,
          phone: updated.phone,
          specialization: updated.specialization,
          experienceYears: updated.experienceYears,
          status: updated.status,
        });
      }
    }
    return NextResponse.json(body);
  } catch (error) {
    console.error("PUT /api/trainers error:", error);
    return NextResponse.json(
      { error: "Failed to update trainer" },
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
      await Trainer.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: "Trainer deleted" });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/trainers error:", error);
    return NextResponse.json(
      { error: "Failed to delete trainer" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { Member } from "@/models/Member";
import { initialMembers } from "@/lib/initial-data";

export async function GET() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const members = await Member.find({}).sort({ createdAt: -1 });
      if (members.length > 0) {
        // Map _id to id for uniform frontend consumption
        const mapped = members.map((m) => ({
          id: m._id.toString(),
          name: m.name,
          email: m.email,
          phone: m.phone,
          membershipType: m.membershipType,
          startDate: m.startDate,
          endDate: m.endDate,
          status: m.status,
        }));
        return NextResponse.json(mapped);
      }
    }
    return NextResponse.json(initialMembers);
  } catch (error) {
    console.error("GET /api/members error:", error);
    return NextResponse.json(initialMembers);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const conn = await connectToDatabase();

    if (conn) {
      const newMember = await Member.create(body);
      return NextResponse.json(
        {
          id: newMember._id.toString(),
          name: newMember.name,
          email: newMember.email,
          phone: newMember.phone,
          membershipType: newMember.membershipType,
          startDate: newMember.startDate,
          endDate: newMember.endDate,
          status: newMember.status,
        },
        { status: 201 }
      );
    }

    const mockCreated = {
      ...body,
      id: `mem-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    return NextResponse.json(mockCreated, { status: 201 });
  } catch (error) {
    console.error("POST /api/members error:", error);
    return NextResponse.json(
      { error: "Failed to create member" },
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
      const updated = await Member.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (updated) {
        return NextResponse.json({
          id: updated._id.toString(),
          name: updated.name,
          email: updated.email,
          phone: updated.phone,
          membershipType: updated.membershipType,
          startDate: updated.startDate,
          endDate: updated.endDate,
          status: updated.status,
        });
      }
    }
    return NextResponse.json(body);
  } catch (error) {
    console.error("PUT /api/members error:", error);
    return NextResponse.json(
      { error: "Failed to update member" },
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
      await Member.findByIdAndDelete(id);
      return NextResponse.json({ success: true, message: "Member deleted" });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/members error:", error);
    return NextResponse.json(
      { error: "Failed to delete member" },
      { status: 500 }
    );
  }
}

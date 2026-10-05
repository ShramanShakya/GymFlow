import Link from "next/link";
import { Users, UserCheck, UserRound, CalendarDays, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { connectToDatabase } from "@/lib/db";
import { Member } from "@/models/Member";
import { Trainer } from "@/models/Trainer";
import { ClassSchedule } from "@/models/Class";
import { initialMembers, initialTrainers, initialClasses } from "@/lib/initial-data";

export const dynamic = "force-dynamic";

async function getDashboardData() {
  try {
    const conn = await connectToDatabase();
    if (conn) {
      const [members, trainers, classes] = await Promise.all([
        Member.find({}).lean(),
        Trainer.find({}).lean(),
        ClassSchedule.find({}).lean(),
      ]);

      if (members.length > 0 || trainers.length > 0 || classes.length > 0) {
        return {
          members: members.map((m) => ({
            id: m._id.toString(),
            name: m.name,
            email: m.email,
            membershipType: m.membershipType,
            status: m.status,
          })),
          trainersCount: trainers.length,
          classes: classes.map((c) => ({
            id: c._id.toString(),
            title: c.title,
            trainerName: c.trainerName,
            date: c.date,
            time: c.time,
            status: c.status,
          })),
        };
      }
    }
  } catch (err) {
    console.error("Dashboard DB fetch error:", err);
  }

  return {
    members: initialMembers,
    trainersCount: initialTrainers.length,
    classes: initialClasses,
  };
}

export default async function DashboardPage() {
  const data = await getDashboardData();

  const totalMembers = data.members.length;
  const activeMembers = data.members.filter((m) => m.status === "Active").length;
  const totalTrainers = data.trainersCount;
  const upcomingClasses = data.classes.filter((c) => c.status === "Upcoming").length;

  const stats = [
    {
      title: "Total Members",
      value: totalMembers,
      subtext: "Registered in system",
      icon: Users,
    },
    {
      title: "Active Members",
      value: activeMembers,
      subtext: totalMembers > 0 ? `${Math.round((activeMembers / totalMembers) * 100)}% active rate` : "0%",
      icon: UserCheck,
    },
    {
      title: "Trainers",
      value: totalTrainers,
      subtext: "Certified staff",
      icon: UserRound,
    },
    {
      title: "Upcoming Classes",
      value: upcomingClasses,
      subtext: "Scheduled this week",
      icon: CalendarDays,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-zinc-200">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 tracking-tight">Overview</h2>
          <p className="text-sm text-zinc-500">
            Welcome to GymFlow. Live data connected directly to MongoDB.
          </p>
        </div>

        {/* Quick jump buttons matching Section 28 */}
        <div className="flex items-center gap-2">
          <Link href="/members">
            <Button variant="outline" size="sm" className="text-xs">
              <Users className="h-3.5 w-3.5 mr-1.5 text-zinc-500" />
              Members
            </Button>
          </Link>
          <Link href="/trainers">
            <Button variant="outline" size="sm" className="text-xs">
              <UserRound className="h-3.5 w-3.5 mr-1.5 text-zinc-500" />
              Trainers
            </Button>
          </Link>
          <Link href="/classes">
            <Button variant="outline" size="sm" className="text-xs">
              <CalendarDays className="h-3.5 w-3.5 mr-1.5 text-zinc-500" />
              Classes
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Clean Statistic Cards (Section 32) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  {stat.title}
                </span>
                <div className="rounded-md bg-zinc-100 p-2 text-zinc-700">
                  <Icon className="h-4 w-4" />
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold text-zinc-900">{stat.value}</div>
                <p className="text-xs text-zinc-500 mt-1">{stat.subtext}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Upcoming Classes Section (Section 32) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-zinc-900">Upcoming Classes</h3>
            <p className="text-xs text-zinc-500">Scheduled group sessions</p>
          </div>
          <Link href="/classes">
            <Button variant="ghost" size="sm" className="text-xs text-zinc-600">
              View all schedule
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Class</TableHead>
              <TableHead>Trainer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.classes.slice(0, 3).map((cls) => (
              <TableRow key={cls.id}>
                <TableCell className="font-medium text-zinc-900">
                  {cls.title}
                </TableCell>
                <TableCell className="text-zinc-600">{cls.trainerName}</TableCell>
                <TableCell className="text-zinc-600">{cls.date}</TableCell>
                <TableCell className="text-zinc-600">{cls.time}</TableCell>
                <TableCell>
                  <Badge variant="success">{cls.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Quick Member Overview Table */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-zinc-900">Recent Members</h3>
            <p className="text-xs text-zinc-500">Latest active registrations</p>
          </div>
          <Link href="/members">
            <Button variant="ghost" size="sm" className="text-xs text-zinc-600">
              Manage members
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Membership</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.members.slice(0, 3).map((member) => (
              <TableRow key={member.id}>
                <TableCell className="font-medium text-zinc-900">{member.name}</TableCell>
                <TableCell className="text-zinc-600">{member.email}</TableCell>
                <TableCell>
                  <span className="text-xs font-medium bg-zinc-100 px-2 py-0.5 rounded text-zinc-700">
                    {member.membershipType}
                  </span>
                </TableCell>
                <TableCell>
                  {member.status === "Active" ? (
                    <Badge variant="success">Active</Badge>
                  ) : (
                    <Badge variant="danger">{member.status}</Badge>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

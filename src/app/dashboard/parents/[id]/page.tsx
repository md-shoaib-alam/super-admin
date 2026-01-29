'use client';

import { use } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Users,
  MessageSquare,
  Video,
  BookOpen,
} from 'lucide-react';
import Link from 'next/link';
import { mockParents, mockParentMeetings } from '@/lib/mock-data/parents';
import { mockStudents } from '@/lib/mock-data/students';

export default function ParentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const parent = mockParents.find((p) => p.id === id);
  const students = mockStudents.filter((s) => parent?.studentIds.includes(s.id));
  const meetings = mockParentMeetings.filter((m) => m.parentId === id);

  if (!parent) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h2 className="text-heading-2 text-muted-foreground">Parent not found</h2>
          <Button asChild className="mt-4">
            <Link href="/dashboard/parents">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Parents
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const communications = [
    {
      id: '1',
      type: 'email',
      subject: 'Monthly Progress Report',
      date: '2024-01-25',
      status: 'sent',
    },
    {
      id: '2',
      type: 'sms',
      subject: 'Reminder: Parent-Teacher Meeting',
      date: '2024-01-20',
      status: 'delivered',
    },
    {
      id: '3',
      type: 'email',
      subject: 'Upcoming School Event',
      date: '2024-01-15',
      status: 'sent',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/parents">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-heading-1">Parent Profile</h1>
          <p className="text-muted-foreground mt-1">Complete parent information and engagement history</p>
        </div>
        <Button variant="outline">
          <Calendar className="w-4 h-4 mr-2" />
          Schedule Meeting
        </Button>
        <Button>
          <Mail className="w-4 h-4 mr-2" />
          Send Message
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={parent.avatar} alt={parent.name} />
                <AvatarFallback className="text-2xl">{parent.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{parent.name}</h2>
              <p className="text-sm text-muted-foreground mt-1 capitalize">{parent.relationship}</p>
              <div className="flex gap-2 mt-3">
                <Badge variant={parent.status === 'active' ? 'default' : 'secondary'}>
                  {parent.status}
                </Badge>
                <Badge variant="outline">{students.length} {students.length === 1 ? 'Child' : 'Children'}</Badge>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-t pt-4">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium truncate">{parent.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium">{parent.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-sm font-medium">{parent.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Occupation</p>
                  <p className="text-sm font-medium">{parent.occupation || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Registered Date</p>
                  <p className="text-sm font-medium">
                    {new Date(parent.registeredDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Children Information</CardTitle>
            <CardDescription>Students associated with this parent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {students.map((student) => (
                <Link
                  key={student.id}
                  href={`/dashboard/students/${student.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {student.grade} - Class {student.class} • {student.schoolName}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Roll No: {student.rollNumber}
                      </p>
                    </div>
                  </div>
                  <Badge>{student.status}</Badge>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="meetings" className="space-y-6">
        <TabsList>
          <TabsTrigger value="meetings">
            <Video className="w-4 h-4 mr-2" />
            Meetings
          </TabsTrigger>
          <TabsTrigger value="communications">
            <MessageSquare className="w-4 h-4 mr-2" />
            Communications
          </TabsTrigger>
          <TabsTrigger value="engagement">
            <Users className="w-4 h-4 mr-2" />
            Engagement
          </TabsTrigger>
        </TabsList>

        <TabsContent value="meetings">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Parent-Teacher Meetings</CardTitle>
                  <CardDescription>Scheduled and completed meetings</CardDescription>
                </div>
                <Button>
                  <Calendar className="w-4 h-4 mr-2" />
                  Schedule New
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {meetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-start justify-between p-4 rounded-lg border"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          meeting.status === 'scheduled'
                            ? 'bg-primary/10'
                            : meeting.status === 'completed'
                            ? 'bg-(--success)/10'
                            : 'bg-muted'
                        }`}
                      >
                        <Video
                          className={`w-5 h-5 ${
                            meeting.status === 'scheduled'
                              ? 'text-primary'
                              : meeting.status === 'completed'
                              ? 'text-(--success)'
                              : 'text-muted-foreground'
                          }`}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{meeting.purpose}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          With {meeting.teacherName} • Student: {meeting.studentName}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                        </p>
                        {meeting.notes && (
                          <p className="text-sm mt-2 p-2 bg-muted rounded">{meeting.notes}</p>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant={
                        meeting.status === 'scheduled'
                          ? 'default'
                          : meeting.status === 'completed'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {meeting.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="communications">
          <Card>
            <CardHeader>
              <CardTitle>Communication History</CardTitle>
              <CardDescription>All messages and emails sent to parent</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {communications.map((comm) => (
                    <TableRow key={comm.id}>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {comm.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{comm.subject}</TableCell>
                      <TableCell>{new Date(comm.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{comm.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement">
          <Card>
            <CardHeader>
              <CardTitle>Parent Engagement Metrics</CardTitle>
              <CardDescription>Participation and involvement statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Meeting Attendance</span>
                    <Calendar className="w-4 h-4 text-primary" />
                  </div>
                  <div className="text-2xl font-bold">85%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    17 of 20 meetings attended
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Message Response Rate</span>
                    <MessageSquare className="w-4 h-4 text-(--success)" />
                  </div>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Responds within 24 hours
                  </p>
                </div>
                <div className="p-4 rounded-lg border">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Event Participation</span>
                    <Users className="w-4 h-4 text-secondary" />
                  </div>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground mt-1">
                    School events attended
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

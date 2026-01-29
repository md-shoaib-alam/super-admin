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
import { Progress } from '@/components/ui/progress';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  BookOpen,
  TrendingUp,
  Award,
  Clock,
  Check,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { mockStudents, mockAcademicRecords, mockAttendance } from '@/lib/mock-data/students';

export default function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const student = mockStudents.find((s) => s.id === id);
  const academicRecords = mockAcademicRecords.filter((r) => r.studentId === id);
  const attendance = mockAttendance.filter((a) => a.studentId === id);

  if (!student) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h2 className="text-heading-2 text-muted-foreground">Student not found</h2>
          <Button asChild className="mt-4">
            <Link href="/dashboard/students">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Students
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const avgPercentage =
    academicRecords.length > 0
      ? Math.round(
          (academicRecords.reduce((acc, r) => acc + (r.marks / r.totalMarks) * 100, 0) /
            academicRecords.length)
        )
      : 0;

  const attendancePercentage =
    attendance.length > 0
      ? Math.round((attendance.filter((a) => a.status === 'present').length / attendance.length) * 100)
      : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/students">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div className="flex-1">
          <h1 className="text-heading-1">Student Profile</h1>
          <p className="text-muted-foreground mt-1">Detailed student information and records</p>
        </div>
        <Button variant="outline">
          <Mail className="w-4 h-4 mr-2" />
          Email Parent
        </Button>
        <Button>Edit Profile</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={student.avatar} alt={student.name} />
                <AvatarFallback className="text-2xl">{student.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-bold">{student.name}</h2>
              <p className="text-sm text-muted-foreground mt-1">{student.rollNumber}</p>
              <div className="flex gap-2 mt-3">
                <Badge>{student.grade}</Badge>
                <Badge variant="outline">Class {student.class}</Badge>
                <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                  {student.status}
                </Badge>
              </div>
            </div>

            <div className="mt-6 space-y-4 border-t pt-4">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium truncate">{student.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Address</p>
                  <p className="text-sm font-medium">{student.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Calendar className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Date of Birth</p>
                  <p className="text-sm font-medium">
                    {new Date(student.dateOfBirth).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-4 h-4 text-muted-foreground mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-muted-foreground">Blood Group</p>
                  <p className="text-sm font-medium">{student.bloodGroup || 'N/A'}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium">Academic Average</span>
                  </div>
                  <span className="text-2xl font-bold">{avgPercentage}%</span>
                </div>
                <Progress value={avgPercentage} />
                <p className="text-xs text-muted-foreground">
                  Based on {academicRecords.length} subjects
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-(--success)" />
                    <span className="text-sm font-medium">Attendance</span>
                  </div>
                  <span className="text-2xl font-bold">{attendancePercentage}%</span>
                </div>
                <Progress value={attendancePercentage} />
                <p className="text-xs text-muted-foreground">
                  {attendance.filter((a) => a.status === 'present').length} / {attendance.length} days
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-6 pt-6 border-t">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Parent Information</p>
                <p className="font-medium">{student.parentName}</p>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <Mail className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{student.parentEmail}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm">
                  <Phone className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground">{student.parentPhone}</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">School Information</p>
                <p className="font-medium">{student.schoolName}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Emergency: {student.emergencyContact}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="academic" className="space-y-6">
        <TabsList>
          <TabsTrigger value="academic">
            <BookOpen className="w-4 h-4 mr-2" />
            Academic Records
          </TabsTrigger>
          <TabsTrigger value="attendance">
            <Clock className="w-4 h-4 mr-2" />
            Attendance
          </TabsTrigger>
          <TabsTrigger value="achievements">
            <Award className="w-4 h-4 mr-2" />
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="academic">
          <Card>
            <CardHeader>
              <CardTitle>Exam Results - Mid-term 2024</CardTitle>
              <CardDescription>Subject-wise performance breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Marks Obtained</TableHead>
                    <TableHead>Total Marks</TableHead>
                    <TableHead>Percentage</TableHead>
                    <TableHead>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {academicRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell className="font-medium">{record.subject}</TableCell>
                      <TableCell>{record.marks}</TableCell>
                      <TableCell>{record.totalMarks}</TableCell>
                      <TableCell>
                        {Math.round((record.marks / record.totalMarks) * 100)}%
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            record.grade.startsWith('A')
                              ? 'default'
                              : record.grade.startsWith('B')
                              ? 'secondary'
                              : 'outline'
                          }
                        >
                          {record.grade}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Record</CardTitle>
              <CardDescription>Daily attendance log</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {attendance.map((record) => (
                  <div
                    key={record.id}
                    className="flex items-center justify-between p-3 rounded-lg border"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          record.status === 'present'
                            ? 'bg-(--success)/10'
                            : record.status === 'late'
                            ? 'bg-(--warning)/10'
                            : 'bg-(--danger)/10'
                        }`}
                      >
                        {record.status === 'present' ? (
                          <Check className="w-5 h-5 text-(--success)" />
                        ) : (
                          <X className="w-5 h-5 text-(--danger)" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {new Date(record.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                        {record.remarks && (
                          <p className="text-xs text-muted-foreground mt-1">{record.remarks}</p>
                        )}
                      </div>
                    </div>
                    <Badge
                      variant={
                        record.status === 'present'
                          ? 'default'
                          : record.status === 'late'
                          ? 'secondary'
                          : 'destructive'
                      }
                    >
                      {record.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements">
          <Card>
            <CardHeader>
              <CardTitle>Achievements & Awards</CardTitle>
              <CardDescription>Recognition and accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Award className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground">
                  No achievements recorded yet
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

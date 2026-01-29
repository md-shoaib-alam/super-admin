'use client';

import { use } from 'react';
import { useSchoolsStore } from '@/lib/stores/schools-store';
import { useUsersStore } from '@/lib/stores/users-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, MapPin, Calendar, Users, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { StatsCard } from '@/components/dashboard/stats-card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function SchoolDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const getSchool = useSchoolsStore((state) => state.getSchool);
  const getUsersBySchool = useUsersStore((state) => state.getUsersBySchool);
  
  const school = getSchool(id);
  const users = getUsersBySchool(id);

  if (!school) {
    return (
      <div className="space-y-6">
        <div className="text-center py-12">
          <h2 className="text-heading-2 text-muted-foreground">School not found</h2>
          <Button asChild className="mt-4">
            <Link href="/dashboard/schools">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Schools
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const teachers = users.filter((u) => u.role === 'teacher');
  const students = users.filter((u) => u.role === 'student');

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/dashboard/schools">
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-heading-1">{school.name}</h1>
          <p className="text-muted-foreground mt-1">Detailed school information</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <StatsCard
          title="Total Students"
          value={school.studentCount}
          icon={GraduationCap}
          description={`${students.length} registered users`}
        />
        <StatsCard
          title="Total Teachers"
          value={school.teacherCount}
          icon={Users}
          description={`${teachers.length} registered users`}
        />
        <StatsCard
          title="Subscription"
          value={school.subscription}
          icon={Calendar}
          description={`Status: ${school.status}`}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>School Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm text-muted-foreground">{school.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Email</p>
                <p className="text-sm text-muted-foreground">{school.contactEmail}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Phone</p>
                <p className="text-sm text-muted-foreground">{school.contactPhone}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Principal</p>
                <p className="text-sm text-muted-foreground">{school.principalName}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium">Established</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(school.establishedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Status</p>
                <Badge className="mt-1" variant={school.status === 'active' ? 'default' : 'secondary'}>
                  {school.status}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.slice(0, 10).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{user.role.replace('_', ' ')}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                        {user.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

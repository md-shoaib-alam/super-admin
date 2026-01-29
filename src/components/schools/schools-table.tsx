'use client';

import { useState } from 'react';
import { School } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Eye, Edit, Trash2 } from 'lucide-react';
import { useSchoolsStore } from '@/lib/stores/schools-store';
import { SchoolDialog } from './school-dialog';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface SchoolsTableProps {
  selectedSchools?: string[];
  onSelectionChange?: (selected: string[]) => void;
}

export function SchoolsTable({ selectedSchools = [], onSelectionChange }: SchoolsTableProps) {
  const router = useRouter();
  const schools = useSchoolsStore((state) => state.schools);
  const deleteSchool = useSchoolsStore((state) => state.deleteSchool);
  
  const [editingSchool, setEditingSchool] = useState<School | null>(null);
  const [deletingSchool, setDeletingSchool] = useState<School | null>(null);

  const handleDelete = () => {
    if (deletingSchool) {
      deleteSchool(deletingSchool.id);
      setDeletingSchool(null);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (onSelectionChange) {
      onSelectionChange(checked ? schools.map((s) => s.id) : []);
    }
  };

  const handleSelectSchool = (schoolId: string, checked: boolean) => {
    if (onSelectionChange) {
      if (checked) {
        onSelectionChange([...selectedSchools, schoolId]);
      } else {
        onSelectionChange(selectedSchools.filter((id) => id !== schoolId));
      }
    }
  };

  const allSelected = schools.length > 0 && selectedSchools.length === schools.length;

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>School Name</TableHead>
              <TableHead>Principal</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Teachers</TableHead>
              <TableHead>Subscription</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schools.map((school) => (
              <TableRow key={school.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedSchools.includes(school.id)}
                    onCheckedChange={(checked) => handleSelectSchool(school.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="font-medium">{school.name}</TableCell>
                <TableCell>{school.principalName}</TableCell>
                <TableCell>{school.studentCount}</TableCell>
                <TableCell>{school.teacherCount}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      school.subscription === 'enterprise'
                        ? 'default'
                        : school.subscription === 'premium'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {school.subscription}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={school.status === 'active' ? 'default' : 'secondary'}>
                    {school.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => router.push(`/dashboard/schools/${school.id}`)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditingSchool(school)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-(--destructive)"
                        onClick={() => setDeletingSchool(school)}
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingSchool && (
        <SchoolDialog
          school={editingSchool}
          open={!!editingSchool}
          onOpenChange={(open) => !open && setEditingSchool(null)}
        />
      )}

      <AlertDialog open={!!deletingSchool} onOpenChange={() => setDeletingSchool(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete {deletingSchool?.name}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-(--destructive) text-(--destructive-foreground)">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

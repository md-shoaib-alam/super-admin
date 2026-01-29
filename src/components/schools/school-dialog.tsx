'use client';

import { useState, useEffect } from 'react';
import { School, SchoolStatus, SubscriptionPlan } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSchoolsStore } from '@/lib/stores/schools-store';

interface SchoolDialogProps {
  school?: School;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SchoolDialog({ school, open, onOpenChange }: SchoolDialogProps) {
  const addSchool = useSchoolsStore((state) => state.addSchool);
  const updateSchool = useSchoolsStore((state) => state.updateSchool);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
    principalName: '',
    studentCount: 0,
    teacherCount: 0,
    establishedDate: '',
    status: 'active' as SchoolStatus,
    subscription: 'basic' as SubscriptionPlan,
  });

  useEffect(() => {
    if (school) {
      setFormData({
        name: school.name,
        address: school.address,
        contactEmail: school.contactEmail,
        contactPhone: school.contactPhone,
        principalName: school.principalName,
        studentCount: school.studentCount,
        teacherCount: school.teacherCount,
        establishedDate: school.establishedDate,
        status: school.status,
        subscription: school.subscription,
      });
    } else {
      setFormData({
        name: '',
        address: '',
        contactEmail: '',
        contactPhone: '',
        principalName: '',
        studentCount: 0,
        teacherCount: 0,
        establishedDate: new Date().toISOString().split('T')[0],
        status: 'active',
        subscription: 'basic',
      });
    }
  }, [school, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (school) {
      updateSchool(school.id, formData);
    } else {
      addSchool(formData);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{school ? 'Edit School' : 'Add New School'}</DialogTitle>
          <DialogDescription>
            {school ? 'Update school information' : 'Fill in the details to add a new school'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">School Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="principalName">Principal Name</Label>
                <Input
                  id="principalName"
                  value={formData.principalName}
                  onChange={(e) => setFormData({ ...formData, principalName: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">Contact Phone</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentCount">Student Count</Label>
                <Input
                  id="studentCount"
                  type="number"
                  value={formData.studentCount}
                  onChange={(e) => setFormData({ ...formData, studentCount: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teacherCount">Teacher Count</Label>
                <Input
                  id="teacherCount"
                  type="number"
                  value={formData.teacherCount}
                  onChange={(e) => setFormData({ ...formData, teacherCount: parseInt(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="establishedDate">Established Date</Label>
                <Input
                  id="establishedDate"
                  type="date"
                  value={formData.establishedDate}
                  onChange={(e) => setFormData({ ...formData, establishedDate: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subscription">Subscription Plan</Label>
                <Select
                  value={formData.subscription}
                  onValueChange={(value) => setFormData({ ...formData, subscription: value as SubscriptionPlan })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value as SchoolStatus })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{school ? 'Update School' : 'Add School'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

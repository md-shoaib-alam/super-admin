'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useSchoolsStore } from '@/lib/stores/schools-store';
import { useUsersStore } from '@/lib/stores/users-store';
import { School, ArrowUpDown, Check, X } from 'lucide-react';

export default function ComparePage() {
  const schools = useSchoolsStore((state) => state.schools);
  const getUsersBySchool = useUsersStore((state) => state.getUsersBySchool);
  
  const [school1Id, setSchool1Id] = useState<string>(schools[0]?.id || '');
  const [school2Id, setSchool2Id] = useState<string>(schools[1]?.id || '');
  const [school3Id, setSchool3Id] = useState<string>(schools[2]?.id || '');

  const school1 = schools.find(s => s.id === school1Id);
  const school2 = schools.find(s => s.id === school2Id);
  const school3 = schools.find(s => s.id === school3Id);

  const getUsers1 = school1 ? getUsersBySchool(school1.id) : [];
  const getUsers2 = school2 ? getUsersBySchool(school2.id) : [];
  const getUsers3 = school3 ? getUsersBySchool(school3.id) : [];

  const comparisonRows = [
    {
      category: 'Basic Information',
      items: [
        { label: 'School Name', getValue: (s: typeof school1, _users?: any[]) => s?.name || '-', isNumeric: false },
        { label: 'Principal', getValue: (s: typeof school1, _users?: any[]) => s?.principalName || '-', isNumeric: false },
        { label: 'Established', getValue: (s: typeof school1, _users?: any[]) => s ? new Date(s.establishedDate).getFullYear().toString() : '-', isNumeric: false },
        { label: 'Status', getValue: (s: typeof school1, _users?: any[]) => s ? <Badge variant={s.status === 'active' ? 'default' : 'secondary'}>{s.status}</Badge> : '-', isNumeric: false },
      ]
    },
    {
      category: 'Enrollment',
      items: [
        { label: 'Total Students', getValue: (s: typeof school1, _users?: any[]) => s?.studentCount || 0, isNumeric: true },
        { label: 'Total Teachers', getValue: (s: typeof school1, _users?: any[]) => s?.teacherCount || 0, isNumeric: true },
        { label: 'Student-Teacher Ratio', getValue: (s: typeof school1, _users?: any[]) => s ? `${Math.round(s.studentCount / s.teacherCount)}:1` : '-', isNumeric: false },
        { label: 'Registered Users', getValue: (s: typeof school1, users?: any[]) => users?.length || 0, isNumeric: true },
      ]
    },
    {
      category: 'Subscription',
      items: [
        { label: 'Plan', getValue: (s: typeof school1, _users?: any[]) => s ? <Badge variant={s.subscription === 'enterprise' ? 'default' : s.subscription === 'premium' ? 'secondary' : 'outline'}>{s.subscription}</Badge> : '-', isNumeric: false },
        { label: 'Monthly Cost', getValue: (s: typeof school1, _users?: any[]) => s ? `$${s.subscription === 'basic' ? 99 : s.subscription === 'premium' ? 199 : 399}` : '-', isNumeric: false },
      ]
    },
    {
      category: 'Contact',
      items: [
        { label: 'Email', getValue: (s: typeof school1, _users?: any[]) => s?.contactEmail || '-', isNumeric: false },
        { label: 'Phone', getValue: (s: typeof school1, _users?: any[]) => s?.contactPhone || '-', isNumeric: false },
        { label: 'Address', getValue: (s: typeof school1, _users?: any[]) => s?.address || '-', isNumeric: false },
      ]
    },
  ];

  const getHighlightClass = (values: any[], isNumeric?: boolean) => {
    if (!isNumeric || values.some(v => typeof v !== 'number')) return '';
    const max = Math.max(...values);
    return (value: any) => value === max ? 'bg-success/10 font-semibold' : '';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-1">School Comparison</h1>
        <p className="text-muted-foreground mt-2">
          Compare multiple schools side by side
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Schools to Compare</CardTitle>
          <CardDescription>Choose up to 3 schools for comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">School 1</label>
              <Select value={school1Id} onValueChange={setSchool1Id}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">School 2</label>
              <Select value={school2Id} onValueChange={setSchool2Id}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">School 3</label>
              <Select value={school3Id} onValueChange={setSchool3Id}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {schools.map((school) => (
                    <SelectItem key={school.id} value={school.id}>
                      {school.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg border">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 font-semibold">Metric</th>
              <th className="text-left p-4 font-semibold">{school1?.name || 'School 1'}</th>
              <th className="text-left p-4 font-semibold">{school2?.name || 'School 2'}</th>
              <th className="text-left p-4 font-semibold">{school3?.name || 'School 3'}</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((section, sectionIdx) => (
              <>
                <tr key={`section-${sectionIdx}`} className="bg-muted/30">
                  <td colSpan={4} className="p-3 font-semibold text-sm">
                    {section.category}
                  </td>
                </tr>
                {section.items.map((item, itemIdx) => {
                  const val1 = item.label === 'Registered Users' 
                    ? item.getValue(school1, getUsers1)
                    : item.getValue(school1);
                  const val2 = item.label === 'Registered Users'
                    ? item.getValue(school2, getUsers2)
                    : item.getValue(school2);
                  const val3 = item.label === 'Registered Users'
                    ? item.getValue(school3, getUsers3)
                    : item.getValue(school3);
                  
                  const values = [val1, val2, val3];
                  const highlightFn = item.isNumeric ? getHighlightClass(values, true) : () => '';

                  return (
                    <tr key={`item-${sectionIdx}-${itemIdx}`} className="border-t">
                      <td className="p-4 text-sm text-muted-foreground">{item.label}</td>
                      <td className={`p-4 ${typeof highlightFn === 'function' ? highlightFn(val1) : ''}`}>{val1}</td>
                      <td className={`p-4 ${typeof highlightFn === 'function' ? highlightFn(val2) : ''}`}>{val2}</td>
                      <td className={`p-4 ${typeof highlightFn === 'function' ? highlightFn(val3) : ''}`}>{val3}</td>
                    </tr>
                  );
                })}
              </>
            ))}
          </tbody>
        </table>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comparison Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">{school1?.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {school1 && school1.studentCount === Math.max(school1.studentCount, school2?.studentCount || 0, school3?.studentCount || 0) && (
                    <>
                      <Check className="w-4 h-4 text-(--success)" />
                      <span>Highest enrollment</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {school1?.subscription === 'enterprise' && (
                    <>
                      <Check className="w-4 h-4 text-(--success)" />
                      <span>Premium subscription</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">{school2?.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {school2 && school2.studentCount === Math.max(school1?.studentCount || 0, school2.studentCount, school3?.studentCount || 0) && (
                    <>
                      <Check className="w-4 h-4 text-(--success)" />
                      <span>Highest enrollment</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {school2?.subscription === 'enterprise' && (
                    <>
                      <Check className="w-4 h-4 text-(--success)" />
                      <span>Premium subscription</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg border">
              <h3 className="font-semibold mb-2">{school3?.name}</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  {school3 && school3.studentCount === Math.max(school1?.studentCount || 0, school2?.studentCount || 0, school3.studentCount) && (
                    <>
                      <Check className="w-4 h-4 text-(--success)" />
                      <span>Highest enrollment</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {school3?.subscription === 'enterprise' && (
                    <>
                      <Check className="w-4 h-4 text-(--success)" />
                      <span>Premium subscription</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Trash2, Mail, Download } from 'lucide-react';
import { SchoolsTable } from '@/components/schools/schools-table';
import { SchoolDialog } from '@/components/schools/school-dialog';
import { Badge } from '@/components/ui/badge';
import { useSchoolsStore } from '@/lib/stores/schools-store';

export default function SchoolsPage() {
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const deleteSchool = useSchoolsStore((state) => state.deleteSchool);

  const handleBulkDelete = () => {
    if (confirm(`Are you sure you want to delete ${selectedSchools.length} schools?`)) {
      selectedSchools.forEach((id) => deleteSchool(id));
      setSelectedSchools([]);
    }
  };

  const handleBulkEmail = () => {
    alert(`Sending email to ${selectedSchools.length} schools...`);
  };

  const handleBulkExport = () => {
    alert(`Exporting data for ${selectedSchools.length} schools...`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-heading-1">Schools</h1>
          <p className="text-muted-foreground mt-2">
            Manage all schools in the system
          </p>
        </div>
        <Button onClick={() => setShowAddDialog(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add School
        </Button>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search schools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {selectedSchools.length > 0 && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {selectedSchools.length} selected
            </Badge>
            <Button variant="outline" size="sm" onClick={handleBulkEmail}>
              <Mail className="w-4 h-4 mr-2" />
              Send Email
            </Button>
            <Button variant="outline" size="sm" onClick={handleBulkExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="destructive" size="sm" onClick={handleBulkDelete}>
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        )}
      </div>

      <SchoolsTable 
        selectedSchools={selectedSchools}
        onSelectionChange={setSelectedSchools}
      />

      <SchoolDialog open={showAddDialog} onOpenChange={setShowAddDialog} />
    </div>
  );
}

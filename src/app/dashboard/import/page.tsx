'use client';

import { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Upload, Download, FileText, CheckCircle, AlertCircle, School as SchoolIcon, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSchoolsStore } from '@/lib/stores/schools-store';
import { useUsersStore } from '@/lib/stores/users-store';

export default function ImportPage() {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [recordsCount, setRecordsCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addSchool = useSchoolsStore((state) => state.addSchool);
  const addUser = useUsersStore((state) => state.addUser);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, type: 'schools' | 'users') => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      // Simulate processing
      setTimeout(() => {
        const count = Math.floor(Math.random() * 50) + 10;
        setRecordsCount(count);
        setUploadStatus('success');
      }, 1500);
    }
  };

  const downloadTemplate = (type: 'schools' | 'users') => {
    const templates = {
      schools: `School Name,Address,Contact Email,Contact Phone,Principal Name,Student Count,Teacher Count,Established Date,Status,Subscription
Greenwood High School,"123 Main St, Springfield, IL 62701",admin@greenwood.edu,+1-555-123-4567,Dr. Sarah Johnson,850,65,2005-08-15,active,premium`,
      users: `Name,Email,Role,School ID,Status,Phone,Joined Date
John Doe,john@example.com,teacher,1,active,+1-555-100-0001,2024-01-15`
    };

    const blob = new Blob([templates[type]], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_template.csv`;
    a.click();
  };

  const importHistory = [
    {
      id: '1',
      type: 'schools',
      fileName: 'schools_batch_2024.csv',
      records: 15,
      status: 'completed',
      timestamp: '2 hours ago',
    },
    {
      id: '2',
      type: 'users',
      fileName: 'teachers_jan_2024.csv',
      records: 42,
      status: 'completed',
      timestamp: '1 day ago',
    },
    {
      id: '3',
      type: 'schools',
      fileName: 'new_schools.csv',
      records: 8,
      status: 'failed',
      timestamp: '3 days ago',
      error: 'Invalid email format in row 5',
    },
  ];

  const guidelines = [
    'Ensure all required fields are filled',
    'Use the correct date format (YYYY-MM-DD)',
    'Email addresses must be valid and unique',
    'Phone numbers should include country code',
    'CSV file should be UTF-8 encoded',
    'Maximum file size: 10MB',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-1">Bulk Import</h1>
        <p className="text-muted-foreground mt-2">
          Import schools and users in bulk using CSV files
        </p>
      </div>

      <Tabs defaultValue="schools" className="space-y-6">
        <TabsList>
          <TabsTrigger value="schools">
            <SchoolIcon className="w-4 h-4 mr-2" />
            Import Schools
          </TabsTrigger>
          <TabsTrigger value="users">
            <Users className="w-4 h-4 mr-2" />
            Import Users
          </TabsTrigger>
        </TabsList>

        <TabsContent value="schools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Schools CSV</CardTitle>
              <CardDescription>
                Upload a CSV file containing school information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={(e) => handleFileUpload(e, 'schools')}
                  accept=".csv"
                  className="hidden"
                />
                <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-sm font-medium mb-2">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-muted-foreground mb-4">
                  CSV files only (max 10MB)
                </p>
                <Button onClick={() => fileInputRef.current?.click()}>
                  Choose File
                </Button>
              </div>

              {uploadStatus === 'success' && uploadedFile && (
                <Alert>
                  <CheckCircle className="w-4 h-4" />
                  <AlertDescription>
                    Successfully uploaded <strong>{uploadedFile}</strong>. Found {recordsCount} records ready to import.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <Button variant="outline" onClick={() => downloadTemplate('schools')}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
                {uploadStatus === 'success' && (
                  <Button>
                    Import {recordsCount} Schools
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Upload Users CSV</CardTitle>
              <CardDescription>
                Upload a CSV file containing user information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <input
                  type="file"
                  onChange={(e) => handleFileUpload(e, 'users')}
                  accept=".csv"
                  className="hidden"
                  id="user-upload"
                />
                <label htmlFor="user-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm font-medium mb-2">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground mb-4">
                    CSV files only (max 10MB)
                  </p>
                  <Button type="button">
                    Choose File
                  </Button>
                </label>
              </div>

              {uploadStatus === 'success' && uploadedFile && (
                <Alert>
                  <CheckCircle className="w-4 h-4" />
                  <AlertDescription>
                    Successfully uploaded <strong>{uploadedFile}</strong>. Found {recordsCount} records ready to import.
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex items-center justify-between pt-4 border-t">
                <Button variant="outline" onClick={() => downloadTemplate('users')}>
                  <Download className="w-4 h-4 mr-2" />
                  Download Template
                </Button>
                {uploadStatus === 'success' && (
                  <Button>
                    Import {recordsCount} Users
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Import Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {guidelines.map((guideline, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-(--success) mt-0.5 flex-shrink-0" />
                <span>{guideline}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Import History</CardTitle>
          <CardDescription>Previous bulk import operations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {importHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.status === 'completed' ? 'bg-(--success)/10' : 'bg-(--danger)/10'
                  }`}>
                    {item.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-(--success)" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-(--danger)" />
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{item.fileName}</p>
                      <Badge variant="outline" className="capitalize">
                        {item.type}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {item.records} records • {item.timestamp}
                    </p>
                    {item.error && (
                      <p className="text-xs text-(--danger) mt-1">{item.error}</p>
                    )}
                  </div>
                </div>
                <Badge variant={item.status === 'completed' ? 'default' : 'destructive'}>
                  {item.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageSquare, Bell, Send, Users, School as SchoolIcon, Clock } from 'lucide-react';
import { useSchoolsStore } from '@/lib/stores/schools-store';
import { useUsersStore } from '@/lib/stores/users-store';

const emailTemplates = [
  { id: 'welcome', name: 'Welcome Email', description: 'Welcome new schools to the platform' },
  { id: 'reminder', name: 'Payment Reminder', description: 'Remind schools about pending payments' },
  { id: 'update', name: 'System Update', description: 'Notify about new features or updates' },
  { id: 'report', name: 'Monthly Report', description: 'Send monthly performance reports' },
];

const recentMessages = [
  {
    id: '1',
    type: 'email',
    subject: 'Welcome to School Management System',
    recipients: 8,
    status: 'sent',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    type: 'notification',
    subject: 'System maintenance scheduled',
    recipients: 156,
    status: 'sent',
    timestamp: '1 day ago',
  },
  {
    id: '3',
    type: 'sms',
    subject: 'Payment confirmation',
    recipients: 12,
    status: 'scheduled',
    timestamp: 'Tomorrow at 9:00 AM',
  },
];

export default function CommunicationPage() {
  const schools = useSchoolsStore((state) => state.schools);
  const users = useUsersStore((state) => state.users);
  
  const [messageType, setMessageType] = useState('email');
  const [recipientType, setRecipientType] = useState('all');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [template, setTemplate] = useState('');

  const handleSend = () => {
    alert(`Sending ${messageType} to ${recipientType} recipients!\nSubject: ${subject}`);
    setSubject('');
    setMessage('');
  };

  const getRecipientCount = () => {
    if (recipientType === 'all') return schools.length + users.length;
    if (recipientType === 'schools') return schools.length;
    if (recipientType === 'students') return users.filter(u => u.role === 'student').length;
    if (recipientType === 'teachers') return users.filter(u => u.role === 'teacher').length;
    if (recipientType === 'admins') return users.filter(u => u.role === 'school_admin' || u.role === 'super_admin').length;
    return 0;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-heading-1">Communication Center</h1>
        <p className="text-muted-foreground mt-2">
          Send messages to schools and users across the platform
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Recipients</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{schools.length + users.length}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {schools.length} schools, {users.length} users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Messages Sent</CardTitle>
            <Send className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground mt-1">
              This month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground mt-1">
              Upcoming messages
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="compose" className="space-y-6">
        <TabsList>
          <TabsTrigger value="compose">Compose Message</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="history">Message History</TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>New Message</CardTitle>
              <CardDescription>Send emails, SMS, or push notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="messageType">Message Type</Label>
                  <Select value={messageType} onValueChange={setMessageType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          Email
                        </div>
                      </SelectItem>
                      <SelectItem value="sms">
                        <div className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          SMS
                        </div>
                      </SelectItem>
                      <SelectItem value="notification">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4" />
                          Push Notification
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <Select value={recipientType} onValueChange={setRecipientType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All ({schools.length + users.length})</SelectItem>
                      <SelectItem value="schools">All Schools ({schools.length})</SelectItem>
                      <SelectItem value="students">All Students ({users.filter(u => u.role === 'student').length})</SelectItem>
                      <SelectItem value="teachers">All Teachers ({users.filter(u => u.role === 'teacher').length})</SelectItem>
                      <SelectItem value="admins">All Admins ({users.filter(u => u.role === 'school_admin' || u.role === 'super_admin').length})</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template">Use Template (Optional)</Label>
                <Select value={template} onValueChange={(val) => {
                  setTemplate(val);
                  const selectedTemplate = emailTemplates.find(t => t.id === val);
                  if (selectedTemplate) {
                    setSubject(selectedTemplate.name);
                  }
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {emailTemplates.map((tmpl) => (
                      <SelectItem key={tmpl.id} value={tmpl.id}>
                        {tmpl.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Enter message subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  rows={8}
                  value={message}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Variables: {'{school_name}'}, {'{user_name}'}, {'{date}'}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
                  Will be sent to <strong>{getRecipientCount()} recipients</strong>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline">Schedule</Button>
                  <Button onClick={handleSend} disabled={!subject || !message}>
                    <Send className="w-4 h-4 mr-2" />
                    Send Now
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="space-y-4">
          {emailTemplates.map((tmpl) => (
            <Card key={tmpl.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">{tmpl.name}</CardTitle>
                    <CardDescription>{tmpl.description}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Edit</Button>
                    <Button variant="outline" size="sm" onClick={() => setTemplate(tmpl.id)}>
                      Use Template
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {recentMessages.map((msg) => (
            <Card key={msg.id}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      msg.type === 'email' ? 'bg-primary/10' :
                      msg.type === 'sms' ? 'bg-secondary/10' :
                      'bg-success/10'
                    }`}>
                      {msg.type === 'email' && <Mail className="w-5 h-5 text-primary" />}
                      {msg.type === 'sms' && <MessageSquare className="w-5 h-5 text-secondary" />}
                      {msg.type === 'notification' && <Bell className="w-5 h-5 text-(--success)" />}
                    </div>
                    <div>
                      <p className="font-medium">{msg.subject}</p>
                      <p className="text-sm text-muted-foreground">
                        {msg.recipients} recipients • {msg.timestamp}
                      </p>
                    </div>
                  </div>
                  <Badge variant={msg.status === 'sent' ? 'default' : 'secondary'}>
                    {msg.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}


import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Check, X, Eye, Users, Package, AlertTriangle, TrendingUp } from 'lucide-react';

const mockPendingItems = [
  {
    id: '1',
    title: 'Designer Handbag',
    uploader: 'Jane D.',
    category: 'Accessories',
    condition: 'Excellent',
    submittedDate: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=150&h=150'
  },
  {
    id: '2',
    title: 'Vintage Band T-Shirt',
    uploader: 'Alex R.',
    category: 'Tops',
    condition: 'Good',
    submittedDate: '2024-01-14',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=150&h=150'
  }
];

const mockReportedItems = [
  {
    id: '3',
    title: 'Suspicious Listing',
    uploader: 'Unknown User',
    reason: 'Inappropriate content',
    reportDate: '2024-01-13',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=150&h=150'
  }
];

const AdminPanel = () => {
  const { toast } = useToast();
  const [pendingItems, setPendingItems] = useState(mockPendingItems);
  const [reportedItems, setReportedItems] = useState(mockReportedItems);

  const handleApprove = (itemId: string) => {
    setPendingItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: 'Item approved',
      description: 'The item has been approved and is now visible to users.'
    });
  };

  const handleReject = (itemId: string) => {
    setPendingItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: 'Item rejected',
      description: 'The item has been rejected and the user has been notified.',
      variant: 'destructive'
    });
  };

  const handleRemoveReported = (itemId: string) => {
    setReportedItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: 'Item removed',
      description: 'The reported item has been removed from the platform.'
    });
  };

  const handleDismissReport = (itemId: string) => {
    setReportedItems(prev => prev.filter(item => item.id !== itemId));
    toast({
      title: 'Report dismissed',
      description: 'The report has been dismissed and the item remains active.'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Panel</h1>
        <p className="text-muted-foreground">Manage platform content and user activities</p>
      </div>

      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Items</CardTitle>
            <Package className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">856</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingItems.length}</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Swaps</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,147</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Content Management */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pending">Pending Items ({pendingItems.length})</TabsTrigger>
          <TabsTrigger value="reported">Reported Items ({reportedItems.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Items Pending Approval</CardTitle>
            </CardHeader>
            <CardContent>
              {pendingItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No items pending approval
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <span>by {item.uploader}</span>
                            <Badge variant="outline">{item.category}</Badge>
                            <Badge variant="outline">{item.condition}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Submitted on {item.submittedDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => handleApprove(item.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleReject(item.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reported" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Reported Items</CardTitle>
            </CardHeader>
            <CardContent>
              {reportedItems.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No reported items
                </div>
              ) : (
                <div className="space-y-4">
                  {reportedItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg border-red-200 bg-red-50">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-16 h-16 rounded object-cover"
                        />
                        <div>
                          <h3 className="font-medium">{item.title}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                            <span>by {item.uploader}</span>
                            <Badge variant="destructive">{item.reason}</Badge>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Reported on {item.reportDate}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleRemoveReported(item.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Remove
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDismissReport(item.id)}
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPanel;

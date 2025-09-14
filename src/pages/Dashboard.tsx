import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  MapPin,
  Calendar,
  Eye,
  Star,
  DollarSign,
  Download,
  RefreshCw,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const Dashboard = () => {
  const kpis = [
    {
      title: "Total Visitors",
      value: "24,567",
      change: "+12.5%",
      trend: "up",
      period: "This month"
    },
    {
      title: "Revenue Generated",
      value: "₹18.4L",
      change: "+8.3%",
      trend: "up",
      period: "This month"
    },
    {
      title: "Average Rating",
      value: "4.6",
      change: "+0.2",
      trend: "up",
      period: "This month"
    },
    {
      title: "Bookings",
      value: "1,234",
      change: "-2.1%",
      trend: "down",
      period: "This month"
    }
  ];

  const popularDestinations = [
    {
      name: "Netarhat",
      visitors: 3420,
      revenue: "₹4.2L",
      rating: 4.8,
      growth: "+15%"
    },
    {
      name: "Betla National Park",
      visitors: 2890,
      revenue: "₹3.6L",
      rating: 4.6,
      growth: "+22%"
    },
    {
      name: "Ranchi",
      visitors: 4156,
      revenue: "₹5.1L",
      rating: 4.4,
      growth: "+8%"
    },
    {
      name: "Hundru Falls",
      visitors: 2234,
      revenue: "₹2.8L",
      rating: 4.7,
      growth: "+18%"
    }
  ];

  const recentActivities = [
    {
      type: "booking",
      message: "New homestay booking in Netarhat",
      time: "5 minutes ago",
      status: "success"
    },
    {
      type: "review",
      message: "5-star review received for Betla Safari",
      time: "12 minutes ago",
      status: "success"
    },
    {
      type: "alert",
      message: "Low inventory alert for tribal handicrafts",
      time: "1 hour ago",
      status: "warning"
    },
    {
      type: "payment",
      message: "Payment of ₹2,500 received",
      time: "2 hours ago",
      status: "success"
    }
  ];

  const monthlyData = [
    { month: "Jan", visitors: 18500, revenue: 12.3 },
    { month: "Feb", visitors: 21200, revenue: 14.8 },
    { month: "Mar", visitors: 19800, revenue: 13.9 },
    { month: "Apr", visitors: 23400, revenue: 16.2 },
    { month: "May", visitors: 24567, revenue: 18.4 }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      default:
        return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-xl text-muted-foreground">
              Monitor tourism trends, revenue, and visitor insights
            </p>
          </div>
          <div className="flex gap-3">
            <Select defaultValue="30days">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 3 months</SelectItem>
                <SelectItem value="1year">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button className="bg-gradient-hero hover:opacity-90">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {kpis.map((kpi, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardTitle>
                  {getTrendIcon(kpi.trend)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-1">{kpi.value}</div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="secondary" 
                    className={kpi.trend === 'up' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}
                  >
                    {kpi.change}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{kpi.period}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Charts */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="visitors" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="visitors">Visitor Trends</TabsTrigger>
                <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
                <TabsTrigger value="satisfaction">Satisfaction Metrics</TabsTrigger>
              </TabsList>

              <TabsContent value="visitors">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Monthly Visitor Trends
                    </CardTitle>
                    <CardDescription>
                      Track visitor growth and seasonal patterns
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-20 w-20 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Interactive Chart</h3>
                        <p className="text-muted-foreground">Monthly visitor statistics and trends</p>
                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                          <div className="bg-white/50 p-2 rounded">
                            <div className="font-semibold">Peak Month</div>
                            <div className="text-primary">May 2024</div>
                          </div>
                          <div className="bg-white/50 p-2 rounded">
                            <div className="font-semibold">Growth Rate</div>
                            <div className="text-green-600">+12.5%</div>
                          </div>
                          <div className="bg-white/50 p-2 rounded">
                            <div className="font-semibold">Total YTD</div>
                            <div className="text-primary">107,567</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="revenue">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Revenue Analysis
                    </CardTitle>
                    <CardDescription>
                      Track income from various tourism activities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 bg-gradient-to-br from-green-50 to-yellow-50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <BarChart3 className="h-20 w-20 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Revenue Dashboard</h3>
                        <p className="text-muted-foreground">Income breakdown by source</p>
                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                          <div className="bg-white/50 p-2 rounded">
                            <div className="font-semibold">Accommodations</div>
                            <div className="text-primary">₹8.2L (45%)</div>
                          </div>
                          <div className="bg-white/50 p-2 rounded">
                            <div className="font-semibold">Activities</div>
                            <div className="text-secondary">₹6.1L (33%)</div>
                          </div>
                          <div className="bg-white/50 p-2 rounded">
                            <div className="font-semibold">Handicrafts</div>
                            <div className="text-accent">₹4.1L (22%)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="satisfaction">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Customer Satisfaction
                    </CardTitle>
                    <CardDescription>
                      Review ratings and satisfaction metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <Star className="h-20 w-20 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Satisfaction Metrics</h3>
                        <p className="text-muted-foreground">Customer feedback and ratings</p>
                        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                          <div className="bg-white/50 p-2 rounded">
                            <div className="font-semibold">Avg Rating</div>
                            <div className="text-primary">4.6/5.0</div>
                          </div>
                          <div className="bg-white/50 p-2 rounded">
                            <div className="font-semibold">Total Reviews</div>
                            <div className="text-secondary">1,234</div>
                          </div>
                          <div className="bg-white/50 p-2 rounded">
                            <div className="font-semibold">5-Star %</div>
                            <div className="text-green-600">68%</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Popular Destinations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Popular Destinations Performance
                </CardTitle>
                <CardDescription>
                  Track performance metrics for top tourist spots
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {popularDestinations.map((destination, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold text-muted-foreground">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="font-semibold">{destination.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {destination.visitors.toLocaleString()} visitors
                          </p>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className="font-semibold">{destination.revenue}</div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-green-600 bg-green-50">
                            {destination.growth}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{destination.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                    {getStatusIcon(activity.status)}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Monthly Goal</span>
                    <span className="text-sm font-medium">82%</span>
                  </div>
                  <Progress value={82} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revenue Target</span>
                    <span className="text-sm font-medium">74%</span>
                  </div>
                  <Progress value={74} className="h-2" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Satisfaction Score</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Listings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Review Feedback
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
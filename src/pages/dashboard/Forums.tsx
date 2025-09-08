import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { 
  MessageSquare,
  Heart,
  Reply,
  Search,
  Filter,
  TrendingUp,
  Clock,
  Users,
  Pin,
  Star,
  Eye
} from "lucide-react";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar?: string;
  createdAt: string;
  replies: number;
  likes: number;
  views: number;
  category: string;
  isPinned?: boolean;
  isHot?: boolean;
  tags?: string[];
}

const mockPosts: ForumPost[] = [
  {
    id: "1",
    title: "Austin Market Update - Cap Rates Trending Down",
    content: "Seeing cap rates compress in Austin submarkets. Class B properties now trading at 5.5-6.5%. This is a significant shift from 12 months ago. What's everyone's thoughts on sustainability? Are we seeing bubble territory or justified by fundamentals?",
    author: "MarketAnalyst",
    createdAt: "2 hours ago",
    replies: 15,
    likes: 23,
    views: 156,
    category: "Market Analysis",
    isPinned: true,
    isHot: true,
    tags: ["austin", "cap-rates", "market-trends"]
  },
  {
    id: "2",
    title: "Best Lenders for BRRRR Deals in 2024?",
    content: "Looking for recommendations on lenders who are BRRRR-friendly in current market. Portfolio lenders preferred. Rates, terms, and speed of execution are all important factors. What's working for everyone?",
    author: "FlipperPro",
    createdAt: "6 hours ago", 
    replies: 28,
    likes: 41,
    views: 234,
    category: "Financing",
    isHot: true,
    tags: ["brrrr", "lending", "financing"]
  },
  {
    id: "3",
    title: "Tax Lien Investing - Warning Signs to Watch",
    content: "Been doing tax lien investing for 5 years. Here are the red flags I've learned to avoid: 1) Properties with environmental issues 2) Liens with redemption periods too short 3) Areas with declining property values...",
    author: "TaxLienGuru",
    createdAt: "1 day ago",
    replies: 34,
    likes: 67,
    views: 445,
    category: "Investment Strategy",
    tags: ["tax-liens", "warning-signs", "due-diligence"]
  },
  {
    id: "4",
    title: "1031 Exchange Timing - Need Advice",
    content: "Selling a property in Q1 and need to complete 1031 exchange. Timeline is tight. Any recommendations for qualified intermediaries and replacement property strategies in current market?",
    author: "InvestorJane",
    createdAt: "2 days ago",
    replies: 12,
    likes: 18,
    views: 98,
    category: "Tax Strategy",
    tags: ["1031-exchange", "tax-planning", "intermediary"]
  }
];

const categories = [
  { name: "All Discussions", count: 234, color: "bg-primary/20 text-primary" },
  { name: "Market Analysis", count: 45, color: "bg-accent-green/20 text-accent-green" },
  { name: "Financing", count: 67, color: "bg-accent-blue/20 text-accent-blue" },
  { name: "Investment Strategy", count: 89, color: "bg-warning/20 text-warning" },
  { name: "Legal & Tax", count: 23, color: "bg-destructive/20 text-destructive" },
  { name: "Property Management", count: 34, color: "bg-muted/20 text-muted-foreground" },
  { name: "Technology & Tools", count: 19, color: "bg-secondary/20 text-secondary-foreground" }
];

const Forums = () => {
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "General Discussion",
    tags: ""
  });

  const [activeCategory, setActiveCategory] = useState("All Discussions");
  const [showNewPost, setShowNewPost] = useState(false);

  const handleCreatePost = () => {
    console.log("Creating post:", newPost);
    setNewPost({
      title: "",
      content: "",
      category: "General Discussion",
      tags: ""
    });
    setShowNewPost(false);
  };

  const filteredPosts = activeCategory === "All Discussions" 
    ? mockPosts 
    : mockPosts.filter(post => post.category === activeCategory);

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <DashboardHeader title="Community Forums" subtitle="Discuss strategies, share insights, and learn from the community" />
        <main className="flex-1 overflow-y-auto p-6">
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Categories */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Categories
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.name}
                      onClick={() => setActiveCategory(category.name)}
                      className={`w-full text-left p-3 rounded-lg transition-colors hover:bg-accent/10 ${
                        activeCategory === category.name ? 'bg-accent/20 border border-accent/30' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-sm">{category.name}</span>
                        <Badge className={category.color}>{category.count}</Badge>
                      </div>
                    </button>
                  ))}
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Trending Tags
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {["brrrr", "austin", "cap-rates", "financing", "tax-liens", "1031-exchange"].map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-accent/10">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              
              {/* Header Actions */}
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{activeCategory}</h2>
                  <p className="text-muted-foreground">
                    {filteredPosts.length} discussions • {filteredPosts.reduce((acc, post) => acc + post.views, 0)} total views
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Search
                  </Button>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button onClick={() => setShowNewPost(!showNewPost)}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    New Discussion
                  </Button>
                </div>
              </div>

              {/* New Post Form */}
              {showNewPost && (
                <Card>
                  <CardHeader>
                    <CardTitle>Start a New Discussion</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Discussion Title</label>
                        <Input
                          placeholder="e.g., Austin Market Update - Cap Rates Trending Down"
                          value={newPost.title}
                          onChange={(e) => setNewPost(prev => ({ ...prev, title: e.target.value }))}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Category</label>
                        <select 
                          className="w-full px-3 py-2 border border-input bg-background rounded-md"
                          value={newPost.category}
                          onChange={(e) => setNewPost(prev => ({ ...prev, category: e.target.value }))}
                        >
                          <option value="General Discussion">General Discussion</option>
                          <option value="Market Analysis">Market Analysis</option>
                          <option value="Financing">Financing</option>
                          <option value="Investment Strategy">Investment Strategy</option>
                          <option value="Legal & Tax">Legal & Tax</option>
                          <option value="Property Management">Property Management</option>
                          <option value="Technology & Tools">Technology & Tools</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Tags (comma-separated)</label>
                      <Input
                        placeholder="e.g., austin, cap-rates, market-trends"
                        value={newPost.tags}
                        onChange={(e) => setNewPost(prev => ({ ...prev, tags: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Discussion Content</label>
                      <Textarea
                        placeholder="Share your thoughts, questions, or insights..."
                        rows={6}
                        value={newPost.content}
                        onChange={(e) => setNewPost(prev => ({ ...prev, content: e.target.value }))}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleCreatePost}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Post Discussion
                      </Button>
                      <Button variant="outline" onClick={() => setShowNewPost(false)}>
                        Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Forum Posts */}
              <div className="space-y-4">
                {filteredPosts.map((post) => (
                  <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        
                        {/* Post Content */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2">
                                {post.isPinned && <Pin className="h-4 w-4 text-primary" />}
                                {post.isHot && (
                                  <Badge className="bg-destructive/20 text-destructive border-destructive/30 text-xs">
                                    🔥 Hot
                                  </Badge>
                                )}
                                <h4 className="font-semibold text-lg hover:text-primary transition-colors">{post.title}</h4>
                                <Badge variant="outline" className="text-xs">{post.category}</Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Users className="h-3 w-3" />
                                  <span>by {post.author}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>{post.createdAt}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="h-3 w-3" />
                                  <span>{post.views} views</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Post Stats */}
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <MessageSquare className="h-4 w-4" />
                                <span>{post.replies}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                <span>{post.likes}</span>
                              </div>
                            </div>
                          </div>
                          
                          <p className="text-muted-foreground text-sm line-clamp-2">{post.content}</p>
                          
                          {/* Tags */}
                          {post.tags && (
                            <div className="flex gap-2">
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="outline" className="text-xs cursor-pointer hover:bg-accent/10">
                                  #{tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          
                          {/* Action Buttons */}
                          <div className="flex gap-2 pt-2">
                            <Button variant="ghost" size="sm">
                              <Reply className="h-4 w-4 mr-1" />
                              Reply
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Heart className="h-4 w-4 mr-1" />
                              Like
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Star className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Forums;
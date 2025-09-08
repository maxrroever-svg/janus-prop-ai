import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, CheckCircle, Clock, FileText, Home } from "lucide-react";

const closingSteps = [
  {
    step: "Inspection",
    status: "completed",
    dueDate: "Dec 15, 2024",
    description: "Professional home inspection completed"
  },
  {
    step: "Appraisal", 
    status: "in-progress",
    dueDate: "Dec 20, 2024",
    description: "Bank appraisal scheduled"
  },
  {
    step: "Title Search",
    status: "pending",
    dueDate: "Dec 22, 2024", 
    description: "Title company review"
  },
  {
    step: "Final Walkthrough",
    status: "pending",
    dueDate: "Dec 28, 2024",
    description: "Final property inspection"
  },
  {
    step: "Closing",
    status: "pending", 
    dueDate: "Dec 30, 2024",
    description: "Sign documents & get keys"
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-success" />;
    case 'in-progress':
      return <Clock className="h-4 w-4 text-warning" />;
    default:
      return <Calendar className="h-4 w-4 text-muted-foreground" />;
  }
};

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'completed':
      return <Badge className="bg-success text-success-foreground">Completed</Badge>;
    case 'in-progress':
      return <Badge className="bg-warning text-warning-foreground">In Progress</Badge>;
    default:
      return <Badge variant="outline">Pending</Badge>;
  }
};

export const ClosingRoom = () => {
  const completedSteps = closingSteps.filter(step => step.status === 'completed').length;
  const progress = (completedSteps / closingSteps.length) * 100;

  return (
    <section className="space-y-6">
      <div className="flex justify-end mb-6">
        <Button className="btn-professional">
          <Home className="h-4 w-4 mr-2" />
          Start Closing Process
        </Button>
      </div>
      
      <Card className="institutional-card">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-accent" />
              <span>Closing Timeline</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {completedSteps} of {closingSteps.length} completed
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium text-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="space-y-4">
            {closingSteps.map((step, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all ${
                  step.status === 'completed'
                    ? 'border-success bg-success/5'
                    : step.status === 'in-progress'
                    ? 'border-warning bg-warning/5'
                    : 'border-border bg-card'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(step.status)}
                    <h3 className="font-semibold text-foreground">{step.step}</h3>
                    {getStatusBadge(step.status)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Due: {step.dueDate}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground ml-7">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};
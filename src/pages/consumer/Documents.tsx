import { SidebarProvider } from "@/components/ui/sidebar-simple";
import { ConsumerSidebar } from "@/components/consumer/ConsumerSidebar";
import { ConsumerHeader } from "@/components/consumer/ConsumerHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Lightbulb } from "lucide-react";

const Documents = () => {
  const documentCategories = [
    {
      title: "Financing / Bank",
      description: "Essential documents for mortgage and loan processing",
      documents: [
        { name: "Loan Application (1003 Form)", description: "Your master application for a mortgage." },
        { name: "Credit Report Authorization", description: "Permission for lenders to check credit." },
        { name: "Proof of Income & Assets", description: "W-2s, pay stubs, tax returns, bank statements." },
        { name: "Loan Estimate", description: "Early disclosure of interest rate, fees, closing costs." },
        { name: "Closing Disclosure (CD)", description: "Final statement of all loan terms and costs." },
        { name: "Promissory Note", description: "Legal IOU saying you'll repay the loan." },
        { name: "Deed of Trust / Mortgage", description: "Gives the bank rights to the property if you default." },
      ]
    },
    {
      title: "Property / Seller",
      description: "Documents related to the property and seller obligations",
      documents: [
        { name: "Purchase Agreement / Sales Contract", description: "The binding offer between buyer and seller." },
        { name: "Seller's Disclosure", description: "Seller reveals known property issues (repairs, hazards)." },
        { name: "Title Report", description: "Shows legal ownership, liens, encumbrances." },
        { name: "Deed", description: "Transfers ownership from seller to buyer at closing." },
        { name: "Bill of Sale", description: "For personal property included (appliances, fixtures, etc.)." },
      ]
    },
    {
      title: "Inspections & Legal",
      description: "Required inspections and legal protections",
      documents: [
        { name: "Home Inspection Report", description: "Reveals condition issues." },
        { name: "Appraisal Report", description: "Confirms value for the lender." },
        { name: "Insurance Policy", description: "Homeowner's insurance proof." },
        { name: "Title Insurance", description: "Protects against ownership disputes." },
      ]
    },
    {
      title: "Closing & Post-Closing",
      description: "Final documents and post-purchase requirements",
      documents: [
        { name: "Settlement Statement (HUD-1 in some cases)", description: "Itemized list of all closing costs." },
        { name: "Escrow Documents", description: "Instructions to escrow agent on handling funds." },
        { name: "Recording Documents", description: "Filed with the county to officially record ownership." },
      ]
    }
  ];

  return (
    <SidebarProvider>
      <ConsumerSidebar />
      <div className="flex-1 flex flex-col min-h-screen">
        <ConsumerHeader title="Key Documents" subtitle="Essential documents in the home-buying process" />
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">
                Key Documents in the Home-Buying Process
              </h1>
              <p className="text-muted-foreground text-lg">
                Navigate the complex paperwork of home buying with confidence. Understanding these documents will help you make informed decisions throughout your purchase journey.
              </p>
            </div>

            {/* Document Categories */}
            <div className="grid gap-6 mb-8">
              {documentCategories.map((category, index) => (
                <Card key={index} className="w-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-xl">
                      <FileText className="h-5 w-5 text-accent-green" />
                      {category.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {category.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.documents.map((doc, docIndex) => (
                        <div key={docIndex} className="border-l-2 border-accent-green/20 pl-4 py-2">
                          <h4 className="font-semibold text-foreground mb-1">{doc.name}</h4>
                          <p className="text-muted-foreground text-sm">{doc.description}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Janus AI Section */}
            <Card className="bg-gradient-to-r from-accent-green/5 to-accent-blue/5 border-accent-green/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Lightbulb className="h-5 w-5 text-accent-green" />
                  🚀 How Janus AI Can Simplify
                </CardTitle>
                <CardDescription className="text-base">
                  Right now, these documents live in different silos — your lender has some, your broker has others, the title company has theirs. That's why buyers feel like they're drowning.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-l-2 border-accent-blue/30 pl-4 py-2">
                    <h4 className="font-semibold text-foreground mb-1">1. Centralize Documents</h4>
                    <p className="text-muted-foreground text-sm">One dashboard where every doc auto-populates and lives in one place.</p>
                  </div>
                  <div className="border-l-2 border-accent-blue/30 pl-4 py-2">
                    <h4 className="font-semibold text-foreground mb-1">2. Auto-Generate Forms</h4>
                    <p className="text-muted-foreground text-sm">AI agents pull your info and pre-fill loan applications, disclosures, even inspection summaries.</p>
                  </div>
                  <div className="border-l-2 border-accent-blue/30 pl-4 py-2">
                    <h4 className="font-semibold text-foreground mb-1">3. AI Review & Explain</h4>
                    <p className="text-muted-foreground text-sm">Instead of reading 40 pages of legalese, Janus gives you a plain-English summary: "This form says you'll pay $X per month at Y% interest."</p>
                  </div>
                  <div className="border-l-2 border-accent-blue/30 pl-4 py-2">
                    <h4 className="font-semibold text-foreground mb-1">4. Checklist & Automation</h4>
                    <p className="text-muted-foreground text-sm">Dynamic checklist that tells you what's next ("upload pay stubs," "review appraisal"), and bots that automatically request them from banks or employers.</p>
                  </div>
                  <div className="border-l-2 border-accent-blue/30 pl-4 py-2">
                    <h4 className="font-semibold text-foreground mb-1">5. Compliance Guardrails</h4>
                    <p className="text-muted-foreground text-sm">AI makes sure nothing is missed or out of date.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Documents;
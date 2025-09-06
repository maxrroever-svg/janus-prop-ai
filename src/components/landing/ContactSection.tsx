import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="professional-section">
      <div className="professional-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-6xl text-foreground mb-6 glow-text">
            Get In Touch
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your real estate investment strategy? Let's talk.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="institutional-card p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Name
                  </label>
                  <Input 
                    className="cosmic-input" 
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email
                  </label>
                  <Input 
                    type="email"
                    className="cosmic-input" 
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <Textarea 
                    className="cosmic-input h-32" 
                    placeholder="Tell us about your investment goals..."
                  />
                </div>
                
                <Button className="w-full btn-professional">
                  Send Message
                </Button>
              </form>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center space-y-8"
          >
            <div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                Direct Contact
              </h3>
              <p className="text-muted-foreground mb-6">
                For immediate assistance or enterprise inquiries, reach out directly.
              </p>
              
              <a 
                href="mailto:hello@janusai.com"
                className="inline-flex items-center text-foreground hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5 mr-3" />
                hello@janusai.com
              </a>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Response Time</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>• General inquiries: Within 24 hours</p>
                <p>• Enterprise requests: Within 4 hours</p>
                <p>• Technical support: Within 2 hours</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
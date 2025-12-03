import React from 'react';
import { Bot, Workflow, BarChart3, Code2, Database, MessageSquare } from 'lucide-react';
import { ServiceDetail } from '../types';

export const servicesData: ServiceDetail[] = [
  {
    id: "custom-chatbots",
    title: "Custom AI Chatbots",
    shortDescription: "24/7 customer support agents that train on your data, handle objections, and book appointments.",
    fullDescription: "Our custom AI chatbots are not just text generators; they are fully integrated support agents capable of understanding context, managing complex queries, and executing actions within your business systems. Trained specifically on your knowledge base, they ensure brand consistency and 24/7 availability.",
    icon: <MessageSquare className="w-8 h-8" />,
    color: "from-blue-500 to-cyan-500",
    benefits: [
      "Reduce support tickets by up to 70%",
      "Instant response times (under 2 seconds)",
      "Seamless hand-off to human agents",
      "Multi-language support out of the box"
    ],
    useCases: [
      "Customer Support Triage",
      "Lead Qualification & Booking",
      "Internal Employee HR Helpdesk",
      "E-commerce Product Recommendations"
    ],
    technicalSpecs: [
      { label: "Model", value: "Gemini 2.5 Flash / GPT-4o" },
      { label: "Latency", value: "< 500ms" },
      { label: "Integration", value: "REST API, WebSocket" },
      { label: "Compliance", value: "GDPR, SOC2" }
    ],
    pricing: [
      {
        name: "Starter",
        price: "$2,500",
        period: "setup + $199/mo",
        description: "Perfect for small businesses needing basic FAQ and support handling.",
        features: [
          "Custom Knowledge Base Training",
          "Web Widget Integration",
          "Up to 1,000 conversations/mo",
          "Email Support"
        ]
      },
      {
        name: "Growth",
        price: "$5,000",
        period: "setup + $499/mo",
        description: "For scaling teams requiring CRM integration and lead booking.",
        features: [
          "CRM Integration (HubSpot/Salesforce)",
          "Appointment Booking",
          "Unlimited conversations",
          "Sentiment Analysis Dashboard",
          "Priority Support"
        ],
        highlight: true
      },
      {
        name: "Enterprise",
        price: "Custom",
        period: "pricing",
        description: "Full omni-channel deployment with custom security requirements.",
        features: [
          "Omni-channel (WhatsApp, Slack, SMS)",
          "On-premise Deployment Option",
          "Dedicated Success Manager",
          "Custom SLA",
          "SSO & Role-Based Access"
        ]
      }
    ]
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    shortDescription: "Connect your CRM, Email, and Slack. Automate repetitive tasks and save hundreds of hours.",
    fullDescription: "We build intelligent workflows that connect your disjointed software ecosystem. By automating data entry, status updates, and notification triggers, we free your team to focus on high-value creative and strategic work.",
    icon: <Workflow className="w-8 h-8" />,
    color: "from-purple-500 to-pink-500",
    benefits: [
      "Eliminate manual data entry errors",
      "Accelerate sales cycles",
      "Real-time team synchronization",
      "Scalable operational infrastructure"
    ],
    useCases: [
      "Automated Invoice Processing",
      "New Employee Onboarding",
      "Social Media Content Distribution",
      "CRM Data Enrichment"
    ],
    technicalSpecs: [
      { label: "Platform", value: "Custom Python / n8n" },
      { label: "Reliability", value: "99.9% Uptime" },
      { label: "Triggers", value: "Webhook, Schedule, Event" },
      { label: "Logging", value: "Full Audit Trail" }
    ],
    pricing: [
      {
        name: "Single Flow",
        price: "$1,500",
        period: "one-time",
        description: "Automate one complex business process from end-to-end.",
        features: [
          "Process Mapping & Analysis",
          "Implementation & Testing",
          "30 Days of Support",
          "Documentation"
        ]
      },
      {
        name: "Business",
        price: "$4,000",
        period: "/mo retainer",
        description: "Continuous improvement and management of your automation stack.",
        features: [
          "Up to 5 Active Workflows",
          "Weekly Maintenance Checks",
          "24h Error Resolution",
          "Monthly Strategy Call",
          "Server Hosting Included"
        ],
        highlight: true
      },
      {
        name: "Scale",
        price: "$8,500",
        period: "/mo retainer",
        description: "Complete automation department as a service.",
        features: [
          "Unlimited Workflows",
          "Custom API Development",
          "Real-time Monitoring Dashboard",
          "Dedicated Engineer",
          "Quarterly ROI Report"
        ]
      }
    ]
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics",
    shortDescription: "Use historical data to forecast trends, customer churn, and inventory needs with precision.",
    fullDescription: "Turn your raw data into a crystal ball. Our predictive models analyze historical patterns to forecast future outcomes, allowing you to make proactive decisions regarding inventory, staffing, and marketing spend.",
    icon: <BarChart3 className="w-8 h-8" />,
    color: "from-orange-500 to-red-500",
    benefits: [
      "Optimize inventory levels",
      "Reduce customer churn",
      "Forecast revenue with 95% accuracy",
      "Identify emerging market trends"
    ],
    useCases: [
      "Demand Forecasting",
      "Dynamic Pricing Models",
      "Risk Assessment",
      "Customer Lifetime Value Prediction"
    ],
    technicalSpecs: [
      { label: "Frameworks", value: "TensorFlow, PyTorch" },
      { label: "Data Source", value: "SQL, NoSQL, CSV" },
      { label: "Visualization", value: "Tableau / PowerBI" },
      { label: "Update Freq", value: "Real-time / Batch" }
    ],
    pricing: [
      {
        name: "Audit",
        price: "$3,500",
        period: "one-time",
        description: "Deep dive into your data infrastructure and potential ROI.",
        features: [
          "Data Quality Assessment",
          "Feasibility Report",
          "Model Strategy Roadmap",
          "Security Review"
        ]
      },
      {
        name: "Model Build",
        price: "$15,000",
        period: "starting",
        description: "Development and deployment of a custom predictive model.",
        features: [
          "Feature Engineering",
          "Model Training & Validation",
          "API Deployment",
          "Visual Dashboard Setup",
          "3 Months Monitoring"
        ],
        highlight: true
      },
      {
        name: "Maintenance",
        price: "$2,000",
        period: "/mo",
        description: "Ongoing retraining and optimization of deployed models.",
        features: [
          "Monthly Model Retraining",
          "Data Drift Monitoring",
          "Performance Reports",
          "API Hosting & Scaling"
        ]
      }
    ],
    faq: [
      {
        question: "How much historical data do I need for accurate predictions?",
        answer: "Typically, we recommend at least 12-24 months of historical data to capture seasonality and long-term trends effectively. However, for simpler trend analysis or shorter-cycle predictions, we can often generate meaningful insights with as little as 6 months of high-quality data."
      },
      {
        question: "What platforms can you integrate with?",
        answer: "Our data pipelines are platform-agnostic. We can pull data securely from SQL/NoSQL databases, CRMs like Salesforce and HubSpot, e-commerce platforms like Shopify, and any service with a REST API. We handle all the ETL (Extract, Transform, Load) engineering."
      },
      {
        question: "How accurate are the predictive models?",
        answer: "Accuracy depends on data quality and volatility, but our deployed models typically achieve 85-95% accuracy for demand forecasting after the initial 3-month tuning period. We provide transparent confidence intervals with every prediction so you know exactly how much to trust the numbers."
      },
      {
        question: "Is my data secure during the process?",
        answer: "Yes. Security is paramount. We process data using enterprise-grade encryption both in transit and at rest. We can also deploy models directly within your own private cloud infrastructure (AWS/GCP/Azure) so your sensitive data never leaves your controlled environment."
      }
    ]
  },
  {
    id: "ai-development",
    title: "AI Development",
    shortDescription: "Fine-tune LLMs for specific enterprise use-cases. Private, secure, and scalable solutions.",
    fullDescription: "When off-the-shelf models aren't enough, we engineer custom AI solutions. Whether it's fine-tuning an LLM on your proprietary legal documents or building a computer vision model for quality control, we deliver enterprise-grade architecture.",
    icon: <Code2 className="w-8 h-8" />,
    color: "from-green-500 to-emerald-500",
    benefits: [
      "Total data privacy & ownership",
      "Higher accuracy on niche tasks",
      "Lower inference costs at scale",
      "Custom API endpoints"
    ],
    useCases: [
      "Legal Contract Analysis",
      "Medical Imaging Diagnosis",
      "Code Generation Assistants",
      "Proprietary Search Engines"
    ],
    technicalSpecs: [
      { label: "Architecture", value: "Microservices / Serverless" },
      { label: "Language", value: "Python / TypeScript" },
      { label: "Deployment", value: "AWS / GCP / Azure" },
      { label: "Security", value: "End-to-End Encryption" }
    ],
    pricing: [
      {
        name: "MVP",
        price: "$12,000",
        period: "est.",
        description: "Rapid prototype to validate your AI concept.",
        features: [
          "Proof of Concept Build",
          "Basic UI/UX Interface",
          "Integration with 1 Data Source",
          "4-Week Timeline"
        ]
      },
      {
        name: "Production",
        price: "$45,000",
        period: "est.",
        description: "Full-scale enterprise application development.",
        features: [
          "Scalable Cloud Architecture",
          "Advanced Security & Auth",
          "Custom LLM Fine-tuning",
          "Comprehensive QA Testing",
          "Documentation & Training"
        ],
        highlight: true
      },
      {
        name: "Consulting",
        price: "$300",
        period: "/hour",
        description: "Expert guidance for your internal engineering team.",
        features: [
          "Architecture Review",
          "Code Audits",
          "Strategy Workshops",
          "Hiring Assistance"
        ]
      }
    ]
  },
  {
    id: "data-integration",
    title: "Data Integration",
    shortDescription: "Unified data warehouses that feed your AI agents with clean, structured, real-time information.",
    fullDescription: "AI is only as good as the data it feeds on. We architect unified data warehouses that aggregate information from marketing, sales, and product tools, ensuring your AI agents have a single source of truth.",
    icon: <Database className="w-8 h-8" />,
    color: "from-indigo-500 to-blue-500",
    benefits: [
      "Unified customer profiles",
      "Clean, structured training data",
      "Faster reporting cycles",
      "Eliminate data silos"
    ],
    useCases: [
      "Marketing Attribution",
      "Cross-Platform Reporting",
      "Legacy System Migration",
      "ETL Pipeline Management"
    ],
    technicalSpecs: [
      { label: "Warehouses", value: "Snowflake / BigQuery" },
      { label: "Pipelines", value: "Airflow / dbt" },
      { label: "Format", value: "Parquet / Avro" },
      { label: "Scale", value: "Petabyte Ready" }
    ],
    pricing: [
      {
        name: "Setup",
        price: "$5,000",
        period: "starting",
        description: "Initial pipeline setup and data warehouse configuration.",
        features: [
          "Connect 3 Main Data Sources",
          "Schema Design",
          "Initial Historical Load",
          "Basic Transformation Logic"
        ]
      },
      {
        name: "Unified",
        price: "$10,000",
        period: "starting",
        description: "Complex multi-source integration with advanced transformation.",
        features: [
          "Unlimited Data Sources",
          "Complex dbt Models",
          "Data Governance Setup",
          "Real-time Streaming Pipelines",
          "BI Tool Connection"
        ],
        highlight: true
      },
      {
        name: "Managed",
        price: "$3,000",
        period: "/mo",
        description: "Ongoing maintenance of your data infrastructure.",
        features: [
          "Daily Pipeline Monitoring",
          "Schema Updates",
          "Performance Optimization",
          "Data Quality Alerts"
        ]
      }
    ]
  },
  {
    id: "voice-agents",
    title: "Voice Agents",
    shortDescription: "Human-like voice assistants for inbound and outbound calls, perfect for qualification.",
    fullDescription: "Deploy voice AI that sounds human. Our voice agents can handle thousands of concurrent calls for appointment setting, lead qualification, or customer support, with near-zero latency and natural conversational flow.",
    icon: <Bot className="w-8 h-8" />,
    color: "from-rose-500 to-orange-500",
    benefits: [
      "Unlimited concurrency",
      "Fraction of the cost of call centers",
      "Consistent script adherence",
      "Instant CRM updates"
    ],
    useCases: [
      "Inbound Customer Service",
      "Outbound Lead Qualification",
      "Appointment Reminders",
      "Survey & Feedback Collection"
    ],
    technicalSpecs: [
      { label: "Synthesizer", value: "Gemini / ElevenLabs" },
      { label: "Telephony", value: "Twilio / Vapi" },
      { label: "Latency", value: "< 800ms" },
      { label: "Protocols", value: "SIP / WebRTC" }
    ],
    pricing: [
      {
        name: "Pilot",
        price: "$3,500",
        period: "setup",
        description: "Test the waters with a single outbound campaign.",
        features: [
          "Script Design & Logic",
          "Voice Cloning/Selection",
          "1,000 Call Credits",
          "Basic Reporting"
        ]
      },
      {
        name: "Pro",
        price: "$7,500",
        period: "setup + usage",
        description: "Full inbound/outbound IVR replacement.",
        features: [
          "Complex Multi-turn Logic",
          "CRM Real-time Sync",
          "Live Call Handoff",
          "Sentiment Analysis",
          "Dedicated Phone Number"
        ],
        highlight: true
      },
      {
        name: "Volume",
        price: "$0.12",
        period: "/min",
        description: "High volume usage pricing for enterprise call centers.",
        features: [
          "Volume Discounts >10k mins",
          "Custom Voice Creation",
          "Private Telephony Trunking",
          "SLA Guarantees",
          "24/7 Monitoring"
        ]
      }
    ]
  }
];
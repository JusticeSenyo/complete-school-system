// Updated tiers array - replace your existing tiers:
export const tiers = [
  {
    name: "basic",
    description: "Perfect for small schools getting started with digital management",
    icon: "🎯",
    features: [
      "Up to 100 students",
      "Attendance tracking", 
      "Report card generation", 
      "Academic bills & fees", 
      "Basic user roles (Owner, Admin, Head, Teachers, Accountant)"
    ],
    highlight: false,
    detailedFeatures: {
      'Student Management': [
        'Student profiles and enrollment',
        'Basic attendance tracking',
        'Simple grade book',
        'Parent contact information',
        'Academic history tracking'
      ],
      'Financial Management': [
        'Academic bills and fees',
        'Basic payment tracking',
        'Fee structure setup',
        'Payment receipts'
      ],
      'User Management': [
        'Owner admin access',
        'Head teacher dashboard',
        'Teacher grade input',
        'Accountant financial access',
        'Role-based permissions'
      ],
      'Reporting': [
        'Automated report cards',
        'Attendance reports',
        'Basic academic summaries',
        'Fee payment reports'
      ],
      'Support': [
        'Email support (48hr response)',
        'Getting started guide',
        'Basic training materials'
      ]
    }
  },
  {
    name: "standard", 
    description: "Comprehensive solution for growing schools with parent engagement",
    icon: "🚀",
    features: [
      "Everything in Basic",
      "Up to 500 students", 
      "Parent dashboard access", 
      "Student dashboard", 
      "Bulk SMS/WhatsApp/Email notifications",
      "Simple analytics and insights"
    ],
    highlight: true,
    detailedFeatures: {
      'Enhanced Communication': [
        'Parent portal with real-time updates',
        'Student self-service dashboard',
        'Bulk SMS messaging system',
        'WhatsApp integration',
        'Email campaign management',
        'Push notifications'
      ],
      'Advanced Student Management': [
        'Expanded student capacity (500+)',
        'Behavioral tracking',
        'Medical records management',
        'Academic progress monitoring',
        'Parent-teacher communication logs'
      ],
      'Analytics & Insights': [
        'Student performance analytics',
        'Attendance trend analysis',
        'Financial reporting dashboard',
        'Class performance metrics',
        'Parent engagement tracking'
      ],
      'Mobile Access': [
        'Mobile-responsive design',
        'Parent mobile app access',
        'Student mobile dashboard',
        'Teacher mobile grade entry'
      ],
      'Enhanced Support': [
        'Priority email support (24hr response)',
        'Phone support during business hours',
        'Advanced training sessions',
        'Setup assistance'
      ]
    }
  },
  {
    name: "premium",
    description: "Enterprise-grade platform for large schools with advanced features",
    icon: "👑", 
    features: [
      "Everything in Standard",
      "Unlimited students",
      "Online classes & virtual learning", 
      "Multi-campus management support",
      "White-label branding options",
      "Advanced analytics & AI insights",
      "Dedicated success manager"
    ],
    highlight: false,
    detailedFeatures: {
      'Online Learning Platform': [
        'Virtual classroom integration',
        'Online assignment submission',
        'Video conferencing tools',
        'Digital resource library',
        'Online exam capabilities'
      ],
      'Multi-Campus Features': [
        'Centralized multi-school management',
        'Cross-campus reporting',
        'Unified parent portal',
        'Resource sharing between campuses',
        'Consolidated billing'
      ],
      'Enterprise Customization': [
        'White-label branding',
        'Custom domain setup',
        'Personalized color schemes',
        'Custom feature development',
        'API access for integrations'
      ],
      'Advanced Analytics': [
        'AI-powered student predictions',
        'Advanced data visualization',
        'Custom report builder',
        'Predictive analytics',
        'Performance benchmarking'
      ],
      'Premium Support': [
        '24/7 phone and chat support',
        'Dedicated success manager',
        'On-site training available',
        'Priority feature requests',
        'Custom implementation support'
      ]
    }
  }
];
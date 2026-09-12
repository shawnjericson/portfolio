"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"

export default function ProjectDetail() {
  const params = useParams()
  const router = useRouter()
  const [language, setLanguage] = useState<"en" | "vi">("en")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("portfolio-language") as "en" | "vi" | null
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "vi")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Save language preference to localStorage when it changes
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "vi" : "en"
    setLanguage(newLanguage)
    localStorage.setItem("portfolio-language", newLanguage)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [params.slug])

  const projectsData = {
    en: [
      {
        slug: "huyen-hoc-van-an",
        name: "Huyền Học Vạn An - Feng Shui Platform",
        shortDesc: "Enterprise-grade feng shui platform with complex algorithmic logic and dynamic permission system",
        description:
          "A highly complex enterprise feng shui platform featuring 5 specialized tools, advanced algorithmic calculations, dynamic user permission management, and native mobile apps. Handles intricate lunar calendar conversions, multi-layered destiny analysis, and real-time tool visibility control based on user roles and subscriptions.",
        fullDescription:
          "This is one of the most technically challenging projects I've worked on, requiring deep expertise in complex algorithmic logic, data processing, and system architecture. The platform revolutionizes traditional feng shui consultation by digitizing ancient wisdom with modern technology.\n\nOn the backend, I built sophisticated algorithms for lunar calendar calculations that handle multiple calendar systems (solar, lunar, lunisolar) with timezone conversions, leap year calculations, and historical date accuracy. I also implemented complex destiny analysis engines that process birth data (date, time, location) through multiple calculation layers including Bát Tự (Four Pillars), Tử Vi (Purple Star), and Ngũ Hành (Five Elements) systems.\n\nOn the frontend, I developed a dynamic UI rendering system that shows/hides tools based on real-time user permissions, subscription status, and role-based access control. I implemented complex form validation with interdependent fields, conditional rendering based on calculation results, and real-time data synchronization between web and mobile platforms.\n\nFor data processing, I built robust data transformation pipelines that handle large datasets of historical calendar data, user birth information, and calculation results. I implemented caching strategies for frequently accessed calculations, optimized database queries with complex joins, and managed state synchronization across multiple tools.\n\nFor user management and permissions, I created a granular permission system allowing administrators to enable/disable individual tools per user or user group. I implemented subscription-based access control with tiered feature access, real-time permission updates, and audit logging for all permission changes.\n\nFor system architecture, I designed a modular architecture with separation of concerns - calculation engine, permission service, data layer, and presentation layer. I implemented API rate limiting, request validation, error handling, and comprehensive logging for debugging complex calculation issues. The platform includes native mobile applications for both iOS and Android with full feature parity, requiring careful state management and API design to handle complex data structures across platforms.",
        tech: [
          "Next.js",
          "Laravel",
          "React Native",
          "MySQL",
          "Complex Algorithms",
          "RBAC",
          "Data Processing",
          "State Management",
          "API Design",
          "Performance Optimization",
        ],
        challenge:
          "The biggest challenge was the extremely complex calculation logic. Lunar calendar calculations had to be accurate across multiple calendar systems, handling timezones and leap years wasn't straightforward. Destiny analysis required multiple calculation steps, with each step depending on the previous result.\n\nThe permission system had to be dynamic - when admin enables or disables a tool for a user, the UI must update immediately without delay. Managing state across 5 different tools was also difficult because they depend on each other.\n\nPerformance was a concern because calculations are heavy but the UI must remain smooth. Synchronizing data between web and mobile with complex data structures wasn't easy either. Had to handle many edge cases to avoid incorrect results or misleading information for users.",
        solution:
          "I built a separate calculation engine with multiple layers of validation and error handling. Created reusable calculation modules that remain independent from each other. Cached frequently used calculation results and optimized database queries with proper indexing.\n\nThe permission system was designed flexibly with permission inheritance and role hierarchies, with an admin interface to control each tool in detail. Permissions are cached to reduce database load.\n\nState management is centralized for calculation results, permissions, and tool configs. UI updates optimistically with rollback capability if errors occur. Created a sync layer between web and mobile with conflict resolution.\n\nPerformance was optimized through lazy loading, pagination, and background processing for heavy calculations. Used Redis to cache frequently accessed calculations. Comprehensive validation for all inputs and outputs. Audit logging for debugging and compliance. Full test suite covering edge cases and error scenarios.",
        outcome:
          "Successfully deployed with thousands of active users handling complex calculations in real-time. Reduced manual consultation time by 70% and increased user engagement by 85%. The system processes thousands of calculations daily with 99.9% accuracy. The modular architecture allows easy addition of new tools and features. Performance optimizations resulted in sub-second response times even for complex calculations.",
        link: "https://v2.huyenhocvanan.vn/tools/",
        images: [
          "/vanan/vananhome.png",
          "/vanan/vanantool1.png",
          "/vanan/vanantool2.png",
          "/vanan/vananshop.png",
          "/vanan/vanancart.png",
          "/vanan/vananmobile1.jpg",
          "/vanan/vananmobile2.jpg",
          "/vanan/vananmobile3.jpg",
          "/vanan/vananmobile4.jpg",
          "/vanan/vananadmin.png",
          "/vanan/vananadmin2.png",
        ],
        features: [
          "Mobile App (iOS & Android)",
          "Complex Lunar Calendar Algorithms",
          "Multi-layered Destiny Analysis",
          "Dynamic Tool Visibility Control",
          "Granular Permission Management",
          "Real-time Permission Updates",
          "Advanced Data Processing",
          "Calculation Result Caching",
          "Multi-tool State Management",
          "Cross-platform Data Sync",
          "Performance Optimization",
          "Comprehensive Error Handling",
        ],
        metrics: [
          { label: "Active Users", value: "5000+" },
          { label: "Time Saved", value: "70%" },
          { label: "Daily Calculations", value: "10000+" },
          { label: "Calculation Accuracy", value: "99.9%" },
          { label: "Response Time", value: "<1s" },
        ],
      },
      {
        slug: "global-heritage",
        name: "Global Heritage - Cultural Discovery Platform",
        shortDesc: "Enterprise multilingual platform with Cloudinary integration and hierarchical RBAC system",
        description:
          "A comprehensive multilingual platform for exploring world heritage sites with advanced image management via Cloudinary, hierarchical role-based access control for admin, and rich content management system. Features interactive maps, multi-language content synchronization, and seamless media handling.",
        fullDescription:
          "Global Heritage is an enterprise-grade platform designed to bring world cultural heritage to a global audience. The platform requires sophisticated technical implementation across multiple areas.\n\nFor internationalization, I built a robust multi-language system that handles content synchronization across languages, dynamic language switching, and SEO-friendly URLs for each language. The system stores translations efficiently in the database with proper indexing for fast retrieval.\n\nFor media management, I integrated Cloudinary for all image handling - uploads, transformations, optimizations, and CDN delivery. Images are automatically optimized for different screen sizes and formats (WebP, AVIF) to ensure fast loading times. The system handles bulk image uploads, image cropping and resizing on-the-fly, and maintains image metadata for proper attribution.\n\nThe admin system features a hierarchical RBAC (Role-Based Access Control) with clear permission levels. Different admin roles have different access levels - super admin, content manager, editor, and viewer. Each role can only access features and content appropriate to their level. The permission system is granular, allowing control over specific actions like create, read, update, delete for different content types.\n\nThe CMS interface allows content creators to manage content across all languages from a single interface. Content can be created in one language and translated to others, with translation status tracking. The system supports rich text editing, media embedding, and content versioning.\n\nInteractive maps are integrated to showcase heritage site locations with custom markers, info windows, and filtering capabilities. The platform handles large amounts of content efficiently with pagination, lazy loading, and optimized database queries.",
        tech: [
          "Laravel",
          "React",
          "MySQL",
          "Cloudinary",
          "RBAC",
          "i18n",
          "API Integration",
          "Image Optimization",
        ],
        challenge:
          "Building a truly multilingual platform where content needs to be synchronized across languages while maintaining data consistency was challenging. Each heritage site has descriptions, images, and metadata that must be available in all supported languages.\n\nIntegrating Cloudinary for image management required handling various image formats, automatic optimization, and CDN delivery. Had to ensure images load quickly across different devices and network conditions while maintaining quality.\n\nImplementing hierarchical RBAC with clear permission levels was complex. Different admin roles need different access levels, and permissions must be enforced at both frontend and backend levels. Had to design a flexible permission system that can scale as new roles are added.\n\nPerformance optimization was crucial because the platform handles large amounts of content and images. Database queries needed to be optimized for multi-language content, and image loading had to be efficient to avoid slow page loads.",
        solution:
          "For internationalization, I implemented a translation management system that stores content in a normalized database structure. Each content piece has a base record with language-specific translations linked. Used Laravel's localization features with custom middleware for language detection and switching. Implemented lazy loading for translations to reduce initial page load time.\n\nFor Cloudinary integration, I created a service layer that handles all image operations. Images are uploaded directly to Cloudinary with automatic optimization settings. Implemented responsive image delivery with automatic format selection (WebP/AVIF for modern browsers, fallback to JPEG/PNG). Created image transformation presets for different use cases (thumbnails, gallery, full-size). The system tracks image metadata and provides admin interface for managing uploaded images.\n\nFor RBAC, I designed a hierarchical permission system with role inheritance. Created permission groups for different content types and actions. Implemented middleware to check permissions at route level, and frontend components that show/hide features based on user permissions. Admin interface allows super admins to manage roles and permissions easily.\n\nFor performance, I optimized database queries with proper indexing on language and content type fields. Implemented caching for frequently accessed content and translations. Used Cloudinary's CDN for fast image delivery globally. Implemented pagination and lazy loading for content lists. Database queries use eager loading to avoid N+1 problems.",
        outcome:
          "Successfully launched with support for 3 languages (English, Vietnamese, and a third language). The Cloudinary integration reduced image loading time by 70% compared to traditional hosting. The hierarchical RBAC system provides clear access control with zero security incidents. Content management efficiency improved by 60% with the intuitive CMS interface. The platform handles thousands of heritage sites with rich media content efficiently.",
        link: "https://globalheritage.anhdlttech.io.vn/",
        images: [
          "/globalhe/gb1.png",
          "/globalhe/gb2.png",
          "/globalhe/gb3.png",
          "/globalhe/gbadmin1.png",
          "/globalhe/gbadmin2.png",
          "/globalhe/gbadmin3.png",
          "/globalhe/gbadmin4.png",
        ],
        features: [
          "Multi-language Support (i18n)",
          "Cloudinary Image Management",
          "Hierarchical RBAC System",
          "Interactive Maps Integration",
          "Content Management System",
          "Image Auto-optimization",
          "Translation Management",
          "Role-based Admin Access",
          "CDN Image Delivery",
          "Content Versioning",
          "Bulk Image Upload",
          "SEO-friendly URLs",
        ],
        metrics: [
          { label: "Languages Supported", value: "3" },
          { label: "Image Load Time", value: "-70%" },
          { label: "Content Efficiency", value: "+60%" },
          { label: "Heritage Sites", value: "1000+" },
        ],
      },
      {
        slug: "education-management-system",
        name: "Education Management System",
        shortDesc: "Enterprise education platform with payment webhooks, queue jobs, and automated invoicing",
        description:
          "A comprehensive education management system with payment webhook integration (Sepay), queue jobs for bulk data import (50k+ rows), automated invoice generation, smart receipt assignment logic, and RBAC. Handles student management, course administration, and financial operations with complex business rules.",
        fullDescription:
          "This is an enterprise-grade education management system designed for modern educational institutions with complex financial and administrative requirements. The platform handles student enrollment, course management, grade tracking, payment processing, and automated financial operations.\n\nFor payment processing, I integrated Sepay payment gateway with webhook support for real-time payment tracking. The webhook system securely receives payment notifications, validates payment status, and automatically updates student accounts. Payment webhooks are processed asynchronously to handle high volume transactions without blocking the main application.\n\nFor data import, I implemented queue jobs to handle large-scale data imports efficiently. The system can process imports of 50,000+ rows without timing out or causing server overload. Queue jobs process data in batches, validate each row, handle errors gracefully, and provide progress tracking. Failed imports can be retried, and the system maintains detailed logs for debugging.\n\nThe automated invoice generation system creates invoices automatically based on course enrollment, payment schedules, and student status. Invoices are generated with proper formatting, include all required details, and can be exported in multiple formats.\n\nThe receipt assignment logic is sophisticated - it automatically assigns receipts to the correct students and courses based on payment amounts, course fees, and outstanding balances. The system prevents over-payment by validating that receipt amounts don't exceed what's owed. It handles partial payments, multiple course enrollments, and complex payment scenarios.\n\nThe RBAC system provides granular permissions for different user roles (super admin, admin, teacher, student). Each role has specific access levels, and permissions are enforced at both API and UI levels. The system supports permission inheritance and role hierarchies.",
        tech: [
          "React.js",
          "Node.js",
          "PostgreSQL",
          "JWT",
          "RBAC",
          "Webhooks",
          "Queue Jobs",
          "Payment Integration",
          "Analytics",
        ],
        challenge:
          "Handling payment webhooks reliably was challenging - webhooks can arrive out of order, be duplicated, or fail. Had to implement idempotency checks and retry mechanisms.\n\nProcessing large data imports (50k+ rows) without timing out or crashing the server required careful design. Had to implement queue jobs with proper error handling, progress tracking, and the ability to resume failed imports.\n\nThe receipt assignment logic was complex because it needed to match payments to correct students and courses, handle partial payments, prevent over-payment, and maintain data integrity. Had to ensure receipts are always assigned correctly even with complex payment scenarios.\n\nAutomated invoice generation needed to handle various course types, payment schedules, discounts, and special cases. The system must generate accurate invoices that comply with accounting standards.\n\nRBAC implementation required careful permission design to ensure users only access what they're allowed to, while maintaining flexibility for future role additions.",
        solution:
          "For webhooks, I implemented a webhook handler with signature verification for security, idempotency checks using unique transaction IDs, and queue-based processing to handle webhooks asynchronously. Failed webhooks are retried with exponential backoff. Webhook events are logged for audit purposes.\n\nFor data import, I created a queue job system that processes imports in batches of configurable size. Each batch is processed independently, with validation and error handling. Progress is tracked and reported to the user. Failed rows are logged with error details, and the import can be resumed from the last successful batch. Used database transactions to ensure data consistency.\n\nFor receipt assignment, I built a matching algorithm that considers payment amount, course fees, outstanding balances, and payment history. The algorithm prevents over-payment by checking available balance before creating receipts. It handles edge cases like partial payments, multiple courses, and refunds. All receipt assignments are logged for audit.\n\nFor invoice generation, I created a template system with configurable rules for different course types and payment schedules. Invoices are generated based on enrollment data, payment terms, and student status. The system supports discounts, payment plans, and special cases. Generated invoices are stored and can be regenerated if needed.\n\nFor RBAC, I implemented a permission system with role-based access control. Permissions are defined at granular levels (read, write, delete for each resource type). Middleware checks permissions at API level, and frontend components conditionally render based on user permissions. Role management interface allows admins to configure permissions easily.",
        outcome:
          "Successfully deployed across multiple educational institutions. The webhook system processes thousands of payments reliably with 99.9% success rate. Queue jobs handle large data imports efficiently - 50k row imports complete in under 10 minutes. Automated invoice generation reduced manual work by 90%. Receipt assignment logic ensures 100% accuracy in financial records. RBAC provides secure access control with zero security incidents. Overall administrative efficiency improved by 80%.",
        link: "https://demoedu.anhdlttech.io.vn/",
        images: [
          "/educenter/edu1.png",
          "/educenter/edu2.png",
          "/educenter/edu3.png",
          "/educenter/edu4.png",
          "/educenter/edu5.png",
          "/educenter/edu6.png",
        ],
        features: [
          "Payment Webhook Integration (Sepay)",
          "Queue Jobs for Bulk Import",
          "Automated Invoice Generation",
          "Smart Receipt Assignment Logic",
          "Over-payment Prevention",
          "RBAC System",
          "Student Management",
          "Course Administration",
          "Large Data Import (50k+ rows)",
          "Payment Tracking",
          "Financial Reporting",
          "Learning Analytics",
        ],
        metrics: [
          { label: "Institutions", value: "10+" },
          { label: "Efficiency Gain", value: "80%" },
          { label: "Webhook Success Rate", value: "99.9%" },
          { label: "Import Capacity", value: "50k+ rows" },
          { label: "Active Users", value: "5000+" },
        ],
      },
      {
        slug: "lys-lan-chocolate",
        name: "LysLan Chocolate - Premium E-Commerce",
        shortDesc: "Premium chocolate e-commerce with bilingual support, inventory management, and order processing",
        description:
          "A premium e-commerce platform for luxury chocolate brand built with Next.js for SEO and performance, Laravel backend for inventory and order management. Features bilingual support (EN/VI), real-time inventory tracking, automated order processing, and elegant product showcase.",
        fullDescription:
          "LysLan Chocolate is a premium e-commerce platform for a luxury chocolate brand, requiring sophisticated technical implementation for both frontend and backend.\n\nFor the frontend, I built the platform with Next.js to leverage its SEO capabilities and performance optimizations. The site supports two languages (English and Vietnamese) with proper i18n implementation, SEO-friendly URLs for each language, and dynamic language switching. Next.js features like Server-Side Rendering (SSR) and Static Site Generation (SSG) ensure fast page loads and excellent search engine rankings. Image optimization with Next.js Image component ensures fast loading while maintaining high quality.\n\nThe backend is built with PHP Laravel, handling all business logic, inventory management, and order processing. The inventory management system tracks stock levels in real-time, updates automatically when orders are placed, and prevents overselling. The system handles low stock alerts, out-of-stock scenarios, and inventory synchronization across multiple channels.\n\nOrder management is comprehensive - the system processes orders automatically, updates inventory, sends confirmation emails, and tracks order status. Orders can be viewed, updated, and managed through an admin interface. The system handles order cancellation, refunds, and status updates with proper notifications.\n\nThe platform features an elegant product showcase with high-quality imagery, a custom gift builder that allows customers to create personalized chocolate boxes, and story-driven content about the brand's heritage. The checkout process is optimized for conversions with multiple payment options and a streamlined flow.\n\nPerformance is optimized through Next.js caching strategies, image optimization, code splitting, and efficient API calls. The Laravel backend uses query optimization, caching, and efficient database design to ensure fast response times.",
        tech: [
          "Next.js",
          "React",
          "Laravel",
          "PHP",
          "MySQL",
          "i18n",
          "SEO",
          "Inventory Management",
          "Order Management",
          "Tailwind CSS",
        ],
        challenge:
          "Building a bilingual e-commerce platform with proper SEO for both languages was challenging. Each language needs its own URLs, meta tags, and content while maintaining performance.\n\nImplementing real-time inventory management that prevents overselling while handling concurrent orders required careful design. The system must update inventory immediately when orders are placed and handle race conditions.\n\nOrder processing needed to be automated and reliable - orders must be processed correctly, inventory updated, and notifications sent without errors. The system must handle edge cases like partial orders, cancellations, and refunds.\n\nPerformance optimization was crucial for an e-commerce site - slow loading times directly impact conversion rates. Had to optimize images, implement caching, and ensure fast API responses.\n\nIntegrating Next.js frontend with Laravel backend required careful API design to ensure data consistency and proper error handling.",
        solution:
          "For bilingual support, I implemented Next.js i18n with proper routing for each language. Each page has separate routes for EN and VI versions with SEO-optimized URLs. Meta tags, Open Graph tags, and structured data are language-specific. Language switching preserves the current page context.\n\nFor inventory management, I built a real-time tracking system in Laravel that uses database transactions and locking mechanisms to prevent race conditions. Inventory is checked and updated atomically when orders are placed. The system uses database-level constraints to prevent negative inventory. Low stock alerts are sent automatically, and inventory can be manually adjusted through admin interface.\n\nFor order processing, I created an automated order workflow that processes orders step-by-step with proper error handling. Each order goes through validation, inventory check, payment processing, inventory update, and notification sending. Failed steps can be retried, and the system maintains order history for audit. Order status is tracked and updated in real-time.\n\nFor performance, I implemented Next.js Image optimization with automatic format selection (WebP/AVIF), lazy loading for below-the-fold content, and code splitting for optimal bundle sizes. API responses are cached where appropriate, and database queries are optimized with proper indexing. Static pages are pre-rendered for instant loading.\n\nFor API integration, I designed RESTful APIs with proper error handling, validation, and response formats. The Laravel backend uses API resources for consistent data formatting. Authentication is handled securely with tokens, and API rate limiting prevents abuse.",
        outcome:
          "Successfully launched with bilingual support (EN/VI) and excellent SEO performance. The platform achieved top search rankings for target keywords in both languages. Real-time inventory management prevents overselling with 100% accuracy. Automated order processing handles hundreds of orders daily without errors. Performance optimizations resulted in sub-2s page load times and 45% increase in conversion rate. The platform handles peak traffic during promotions efficiently.",
        link: "https://lys-lan-next.vercel.app/vi",
        images: [
          "/lyslan/lyslan.png",
          "/lyslan/lyslan2.png",
          "/lyslan/lyslan3.png",
          "/lyslan/lyslan4.png",
          "/lyslan/lyslan5.png",
        ],
        features: [
          "Bilingual Support (EN/VI)",
          "Next.js SEO Optimization",
          "Real-time Inventory Management",
          "Automated Order Processing",
          "Laravel Backend API",
          "Custom Gift Builder",
          "Product Showcase",
          "Order Tracking",
          "Payment Integration",
          "Stock Alerts",
          "Performance Optimization",
          "Content Management",
        ],
        metrics: [
          { label: "Conversion Rate", value: "+45%" },
          { label: "Page Load Time", value: "<2s" },
          { label: "Inventory Accuracy", value: "100%" },
          { label: "Products", value: "100+" },
          { label: "Orders/Day", value: "500+" },
        ],
      },
      {
        slug: "gamehub",
        name: "GameHub - E-Commerce Platform",
        shortDesc: "Laravel-based e-commerce platform for game products",
        description:
          "A Laravel-based e-commerce platform for game products with shopping cart, order management, product catalog, and admin dashboard.",
        fullDescription:
          "GameHub is a standard e-commerce platform built with PHP Laravel for selling game products. The platform includes all essential e-commerce features: product catalog management, shopping cart functionality, order processing, payment integration, and a comprehensive admin panel.\n\nThe platform allows customers to browse products, add items to cart, and complete purchases with secure payment processing. The admin panel provides tools for managing products, orders, customers, and inventory. The system handles order status tracking, payment confirmations, and order history.\n\nBuilt entirely with Laravel, the platform follows MVC architecture and uses MySQL for data storage. The codebase is organized with proper separation of concerns, making it maintainable and scalable.",
        tech: ["Laravel", "PHP", "MySQL", "Payment Integration", "Admin Panel", "E-Commerce"],
        challenge:
          "Building a reliable e-commerce platform requires proper order management, secure payment processing, and efficient product catalog management. The system must handle concurrent orders, prevent inventory issues, and provide a smooth checkout experience.",
        solution:
          "I built the platform using Laravel's built-in features for authentication, routing, and database management. Implemented proper order management with status tracking, integrated secure payment gateway, and created an admin panel for managing products and orders. Used Laravel's Eloquent ORM for efficient database operations and implemented proper validation for all user inputs.",
        outcome:
          "Successfully launched a fully functional e-commerce platform with complete order management system and secure payment integration. The platform handles product catalog, shopping cart, checkout process, and order tracking efficiently.",
        link: "https://anhdlttech.io.vn/",
        images: [
          "/gamehub/gamehub1.png",
          "/gamehub/gamehub2.png",
          "/gamehub/gamehub3.png",
          "/gamehub/gamehub4.png",
          "/gamehub/gamehubadmin.png",
        ],
        features: [
          "Product Catalog",
          "Shopping Cart",
          "Order Management",
          "Payment Integration",
          "Admin Dashboard",
          "User Authentication",
          "Order Tracking",
        ],
        metrics: [
          { label: "Products", value: "100+" },
          { label: "Orders Processed", value: "1000+" },
          { label: "Payment Success Rate", value: "99%" },
        ],
      },
      {
        slug: "stratix",
        name: "Stratix - Modern Task Management SaaS",
        shortDesc: "Comprehensive task management with smart prioritization",
        description:
          "A comprehensive task management platform with smart prioritization, team collaboration, analytics, and enterprise-grade security features.",
        fullDescription:
          "Stratix is a modern SaaS platform designed for teams that need powerful task management with intelligent features. The platform uses smart algorithms to prioritize tasks based on deadlines, dependencies, and team capacity. Real-time collaboration features allow teams to work together seamlessly, while comprehensive analytics provide insights into productivity and bottlenecks.",
        tech: ["React", "Node.js", "PostgreSQL", "Real-time", "Analytics"],
        challenge:
          "Building a scalable SaaS platform that handles real-time collaboration while providing powerful analytics and maintaining sub-second response times.",
        solution:
          "Implemented WebSocket connections for real-time updates, used Redis for caching and session management, created a custom analytics engine with aggregated data, and optimized database queries with proper indexing.",
        outcome:
          "Successfully deployed with 1000+ active users. Improved team productivity by 60% with smart task prioritization and real-time updates.",
        link: "https://stratix-sand.vercel.app/",
        images: [
          "/stratix/stratix1.png",
          "/stratix/stratix2.png",
          "/stratix/stratix3.png",
          "/stratix/stratix4.png",
          "/stratix/stratix5.png",
        ],
        features: [
          "Smart task prioritization",
          "Real-time collaboration",
          "Team analytics",
          "Enterprise security",
          "Custom workflows",
        ],
        metrics: [
          { label: "Active Users", value: "1000+" },
          { label: "Productivity Gain", value: "60%" },
          { label: "Response Time", value: "<1s" },
        ],
      },
      {
        slug: "personal-portfolio",
        name: "Personal Portfolio - Science & Art",
        shortDesc: "Elegant portfolio showcasing science and art intersection",
        description:
          "An elegant personal portfolio website showcasing the intersection of science and art. Features storytelling, project galleries, and thought leadership content.",
        fullDescription:
          "A unique personal portfolio that bridges the gap between science and art. The website features compelling storytelling about the individual's journey, project galleries showcasing work at the intersection of both fields, and thought leadership content that demonstrates expertise. Built with a focus on visual elegance and strong personal branding.",
        tech: ["Next.js", "React", "Tailwind CSS", "Content Management", "SEO"],
        challenge:
          "Designing a unique portfolio that effectively communicates complex scientific concepts while maintaining artistic elegance and strong personal branding.",
        solution:
          "Created a custom design system that balances technical and artistic elements, implemented smooth animations to guide user attention, optimized for SEO to increase visibility, and integrated a headless CMS for easy content updates.",
        outcome:
          "Created a memorable online presence that increased professional opportunities by 200%. Featured in multiple design showcases.",
        link: "https://nguyenthanhtri.anhdlttech.io.vn/",
        images: [
          "/nttportfolio/home.png",
          "/nttportfolio/home2.png",
          "/nttportfolio/home3.png",
        ],
        features: [
          "Compelling storytelling",
          "Project galleries",
          "Thought leadership",
          "SEO optimized",
          "Personal branding",
        ],
        metrics: [
          { label: "Opportunities", value: "+200%" },
          { label: "Design Features", value: "5+" },
          { label: "Monthly Visitors", value: "2000+" },
        ],
      },
      {
        slug: "bds",
        name: "BDS - Real Estate Platform",
        shortDesc: "Comprehensive real estate platform with property listings and admin dashboard",
        description:
          "A comprehensive real estate platform with property listings, admin dashboard, and native mobile apps for iOS & Android. Features property search, management tools, and commission tracking.",
        fullDescription:
          "BDS is a complete real estate ecosystem designed to streamline property management and sales. The platform includes a web application for property listings, a comprehensive admin dashboard for managing properties, agents, and transactions, and native mobile applications for both iOS and Android platforms. The mobile apps provide full functionality including property browsing, search with advanced filters, real-time notifications, and seamless integration with the web platform. The system handles complex property data, commission calculations, and provides real-time updates for all stakeholders.",
        tech: ["React", "Next.js", "React Native", "Mobile App", "Admin Dashboard", "Property Management"],
        challenge:
          "Building a complete real estate ecosystem with web platform, mobile app, and admin dashboard while handling complex property data and commission calculations.",
        solution:
          "Developed a unified architecture that shares data between web and mobile platforms, created a flexible admin dashboard with role-based permissions, implemented automated commission calculation system, and optimized property search with advanced filtering.",
        outcome:
          "Successfully launched with full property management capabilities. Streamlined property listing process and improved commission tracking efficiency by 65%.",
        link: "#",
        images: [
          "/bds/bdsapp1.jpg",
          "/bds/bdsapp2.jpg",
          "/bds/bdsapp3.jpg",
          "/bds/bdsapp4.jpg",
          "/bds/admin.png",
          "/bds/admin2.png",
          "/bds/admin3.png",
          "/bds/admin4.png",
        ],
        features: [
          "Mobile App (iOS & Android)",
          "Property listings & search",
          "Admin dashboard",
          "Commission tracking",
          "Agent management",
          "Real-time notifications",
        ],
        metrics: [
          { label: "Properties", value: "500+" },
          { label: "Efficiency Gain", value: "65%" },
          { label: "Active Users", value: "2000+" },
        ],
      },
      {
        slug: "swh",
        name: "SWH - English Learning Platform",
        shortDesc: "UI-focused English learning platform with SEO optimization and Laravel CMS",
        description:
          "An English learning platform with heavy focus on user interface and experience. Built with Next.js for SEO optimization, Laravel CMS for content management, and features 5 distinct landing pages for different courses and programs.",
        fullDescription:
          "SWH is an English learning platform that places heavy emphasis on visual design and user experience. The platform is designed to be visually engaging and intuitive, making the learning process more enjoyable and effective for students.\n\nThe frontend is built with Next.js to leverage its powerful SEO capabilities, ensuring the platform ranks well in search engines for English learning keywords. Server-Side Rendering (SSR) and Static Site Generation (SSG) are used to provide fast page loads and excellent search engine visibility. Each page is optimized for SEO with proper meta tags, structured data, and semantic HTML.\n\nThe platform features 5 distinct landing pages, each designed for different courses, programs, or marketing campaigns. Each landing page has its own unique design, content structure, and call-to-action, allowing for targeted marketing and conversion optimization. The landing pages are fully responsive and optimized for all devices.\n\nContent management is handled through a Laravel-based CMS that allows administrators to easily update course content, lesson materials, pricing, and promotional information without touching code. The CMS provides a user-friendly interface for managing all aspects of the platform's content.\n\nThe platform integrates with Sepay payment gateway through webhook integration for handling course payments and subscriptions. The webhook system processes payment notifications in real-time, automatically updating user access, enrollment status, and subscription information. Payment webhooks are secured with signature verification to ensure data integrity and prevent unauthorized access.\n\nBlog content synchronization is implemented through WordPress webhooks, allowing the platform to automatically sync blog posts from a WordPress site. When new blog posts are published or updated in WordPress, webhooks trigger automatic synchronization to the SWH platform, keeping content fresh and up-to-date without manual intervention. This integration enables content creators to manage blog content in WordPress while automatically appearing on the learning platform.\n\nThe platform's UI/UX design focuses on creating an engaging learning environment with clear navigation, intuitive course structures, progress tracking, and interactive elements. Visual design plays a crucial role in maintaining student engagement and motivation throughout their learning journey.",
        tech: ["Next.js", "React", "Laravel", "CMS", "SEO", "UI/UX Design", "Tailwind CSS"],
        challenge:
          "Creating a visually stunning English learning platform that ranks well in search engines while maintaining fast performance. The platform needed 5 distinct landing pages, each with unique designs and content, while keeping the codebase maintainable.\n\nImplementing a Laravel CMS that integrates seamlessly with the Next.js frontend required careful API design and data synchronization. Content updates needed to be reflected immediately on the frontend without requiring deployments.\n\nIntegrating Sepay payment webhooks required secure handling of payment notifications, proper signature verification, and reliable processing of payment events. The system needed to handle payment failures, refunds, and subscription updates accurately.\n\nWordPress blog synchronization through webhooks needed to handle content updates reliably, manage duplicate content, handle image synchronization, and ensure proper formatting when content is synced to the platform.\n\nBalancing heavy UI/UX focus with performance optimization was challenging - rich visual elements and animations needed to load quickly and not impact user experience.",
        solution:
          "I built the frontend with Next.js using SSR and SSG strategies for optimal SEO performance. Each landing page is a separate route with its own optimized metadata, structured data, and content structure. Image optimization with Next.js Image component ensures fast loading while maintaining visual quality.\n\nFor the CMS integration, I created a RESTful API in Laravel that provides content data to the Next.js frontend. The API includes caching strategies to ensure fast response times. Content updates in the CMS trigger cache invalidation, ensuring fresh content is always displayed.\n\nFor Sepay payment webhooks, I implemented a secure webhook handler in Laravel that verifies webhook signatures using Sepay's secret key. The handler processes payment events (success, failure, refund) and updates user subscriptions, course access, and payment records accordingly. Implemented idempotency checks to prevent duplicate processing and error handling for failed webhook processing with retry mechanisms.\n\nFor WordPress blog synchronization, I created a webhook endpoint that receives WordPress webhook notifications when posts are published or updated. The system parses WordPress post data, extracts content and metadata, handles image synchronization, and formats content appropriately for the platform. Implemented content deduplication to prevent duplicate posts and proper error handling for failed synchronizations.\n\nFor UI/UX, I implemented a design system with reusable components while allowing each landing page to have its own unique visual identity. Used Tailwind CSS for rapid styling and consistent design patterns. Implemented lazy loading for below-the-fold content and optimized animations for performance.\n\nThe 5 landing pages share common components (navigation, footer, forms) but have unique hero sections, content layouts, and visual styles. This approach maintains consistency while allowing for distinct branding per landing page.",
        outcome:
          "Successfully launched SWH with 5 distinct, visually engaging landing pages. The platform achieved excellent SEO rankings for target English learning keywords. Laravel CMS integration allows for easy content updates without code changes. The UI-focused design resulted in increased user engagement and course enrollment rates. Page load times remain under 2 seconds despite rich visual content.",
        link: "#",
        images: [
          "/swh/home1.png",
          "/swh/home2.png",
          "/swh/home3.png",
          "/swh/home4.png",
          "/swh/admin.png",
        ],
        features: [
          "5 Distinct Landing Pages",
          "Next.js SEO Optimization",
          "Laravel CMS Integration",
          "Sepay Payment Webhooks",
          "WordPress Blog Synchronization",
          "UI/UX Focused Design",
          "Responsive Design",
          "Content Management System",
          "Fast Page Load Times",
          "Search Engine Optimization",
        ],
        metrics: [
          { label: "Landing Pages", value: "5" },
          { label: "SEO Rankings", value: "Top 10" },
          { label: "Page Load Time", value: "<2s" },
          { label: "User Engagement", value: "+60%" },
        ],
      },
      {
        slug: "langoria",
        name: "Langoria - Language Learning Platform",
        shortDesc: "Multi-language learning platform with 4 languages and interactive features",
        description:
          "A comprehensive language learning platform supporting 4 languages (English, Chinese, Korean, Japanese). Built with Next.js, features multilingual support (EN, VI, CN with Korean and Japanese in progress), Rive animations, voice rooms, online chat, and friend connections.",
        fullDescription:
          "Langoria is a comprehensive language learning platform designed to help users learn 4 different languages: English, Chinese, Korean, and Japanese. The platform provides an immersive learning experience with interactive features and modern technology.\n\nThe platform is built with Next.js to leverage its performance optimizations and SEO capabilities. Multilingual support is implemented for the interface itself, currently supporting English, Vietnamese, and Chinese, with Korean and Japanese translations in progress. This allows users from different backgrounds to use the platform in their preferred language.\n\nOne of the standout features is the use of Rive animations throughout the platform. Rive provides smooth, interactive animations that enhance the learning experience and make the interface more engaging. These animations are used for transitions, loading states, interactive elements, and visual feedback, creating a modern and polished user experience.\n\nThe platform includes a voice room feature where users can practice speaking with other learners in real-time. Voice rooms support multiple participants, allowing for group conversations and language exchange sessions. This feature helps users improve their pronunciation and speaking confidence.\n\nOnline chat functionality enables users to communicate with other learners, practice written communication, and get help from peers or tutors. The chat system supports real-time messaging, file sharing, and emoji reactions to make conversations more engaging.\n\nThe friend connection feature allows users to find and connect with other language learners, creating a social learning environment. Users can search for friends based on language interests, skill levels, and learning goals, fostering a community of learners who can support each other's language journey.",
        tech: ["Next.js", "React", "Rive Animations", "i18n", "Real-time Chat", "WebRTC", "Tailwind CSS"],
        challenge:
          "Building a multilingual platform with 4 target languages (English, Chinese, Korean, Japanese) and interface support for multiple languages (EN, VI, CN, with KR and JP in progress) required careful i18n implementation. Each language needed proper routing, content management, and UI translations.\n\nImplementing Rive animations throughout the platform while maintaining performance was challenging. Animations needed to be smooth and engaging without impacting page load times or user experience.\n\nReal-time features like voice rooms and online chat required WebRTC integration and WebSocket connections for low-latency communication. Managing multiple concurrent voice rooms and chat sessions needed efficient resource management.\n\nThe friend connection system required user matching algorithms, privacy controls, and notification systems to create a safe and engaging social learning environment.",
        solution:
          "I implemented Next.js i18n with proper routing for each interface language. Created a translation system that supports dynamic language switching and maintains context across pages. Each target language (EN, CN, KR, JP) has its own content structure and learning paths.\n\nFor Rive animations, I integrated the Rive runtime library and created reusable animation components. Animations are lazy-loaded and optimized for performance. Used Rive's state machine features to create interactive animations that respond to user actions.\n\nFor voice rooms, I implemented WebRTC for peer-to-peer audio communication with a signaling server for connection management. Created a room management system that handles user joins, leaves, and moderation. Voice rooms support multiple participants with audio mixing and quality controls.\n\nFor online chat, I built a real-time messaging system using WebSockets for instant message delivery. Implemented message history, typing indicators, read receipts, and file sharing capabilities. The chat system supports both one-on-one conversations and group chats.\n\nFor friend connections, I created a user discovery system with search and filtering capabilities. Implemented friend request system, privacy settings, and activity feeds. Added notification system to alert users about friend requests, messages, and voice room invitations.",
        outcome:
          "Successfully launched Langoria with support for 4 target languages and multilingual interface. Rive animations create an engaging and modern learning experience. Voice rooms and online chat features foster active language practice and community building. Friend connections help users find learning partners and create a supportive learning environment. The platform has seen strong user engagement with active participation in voice rooms and chat features.",
        link: "#",
        images: [
          "/langoria/home.png",
          "/langoria/home2.png",
          "/langoria/home3.png",
          "/langoria/home4.png",
          "/langoria/home5.png",
        ],
        features: [
          "4 Target Languages (EN, CN, KR, JP)",
          "Multilingual Interface (EN, VI, CN, KR/JP in progress)",
          "Rive Animations",
          "Voice Rooms",
          "Online Chat",
          "Friend Connections",
          "Real-time Communication",
          "Interactive Learning",
        ],
        metrics: [
          { label: "Languages Supported", value: "4" },
          { label: "Active Voice Rooms", value: "100+" },
          { label: "Daily Chat Messages", value: "5000+" },
          { label: "User Connections", value: "2000+" },
        ],
      },
    ],
    vi: [
      {
        slug: "huyen-hoc-van-an",
        name: "Huyền Học Vạn An - Nền Tảng Phong Thủy",
        shortDesc: "Nền tảng phong thủy cấp doanh nghiệp với logic thuật toán phức tạp và hệ thống phân quyền động",
        description:
          "Nền tảng phong thủy cấp doanh nghiệp với logic thuật toán cực kỳ phức tạp, quản lý phân quyền động, và ứng dụng di động native. Bao gồm 5 công cụ chuyên biệt với điều khiển hiển thị công cụ theo thời gian thực, thuật toán lịch âm dương nâng cao, và engine phân tích vận mệnh đa lớp.",
        fullDescription:
          "Dự án này là một trong những dự án phức tạp nhất tôi từng làm. Nó yêu cầu xử lý logic tính toán rất phức tạp, từ backend đến frontend đều có những thách thức riêng.\n\nPhần backend phải tính toán lịch âm dương chính xác với nhiều hệ thống lịch khác nhau, xử lý múi giờ, năm nhuận, và cả ngày tháng lịch sử. Tôi cũng phải xây dựng engine phân tích vận mệnh xử lý dữ liệu sinh qua nhiều lớp tính toán như Bát Tự, Tử Vi, Ngũ Hành.\n\nPhần frontend thì phải render UI động dựa trên phân quyền thời gian thực - admin có thể bật tắt từng tool cho từng user, và UI phải cập nhật ngay lập tức. Form validation cũng phức tạp vì các trường phụ thuộc lẫn nhau, và phải render có điều kiện dựa trên kết quả tính toán.\n\nTôi phải xử lý đồng bộ dữ liệu giữa web và mobile, cache kết quả tính toán để tối ưu performance, và quản lý state phức tạp qua 5 tools khác nhau. Hệ thống phân quyền cho phép admin control chi tiết từng tool cho từng user hoặc group, có subscription-based access với nhiều tier khác nhau.\n\nKiến trúc được thiết kế modular với tách biệt rõ ràng giữa calculation engine, permission service, data layer và presentation layer. Có cả mobile app native cho iOS và Android với đầy đủ tính năng như web.",
        tech: [
          "Next.js",
          "Laravel",
          "React Native",
          "MySQL",
          "Thuật Toán Phức Tạp",
          "RBAC",
          "Xử Lý Dữ Liệu",
          "Quản Lý Trạng Thái",
          "Thiết Kế API",
          "Tối Ưu Hiệu Suất",
        ],
        challenge:
          "Thách thức lớn nhất là logic tính toán rất phức tạp. Tính lịch âm dương phải chính xác với nhiều hệ thống lịch khác nhau, xử lý múi giờ và năm nhuận không đơn giản. Phân tích vận mệnh phải qua nhiều bước tính toán, mỗi bước phụ thuộc vào kết quả bước trước.\n\nHệ thống phân quyền phải động - admin bật tắt tool cho user nào thì UI phải cập nhật ngay, không được delay. Quản lý state qua 5 tools khác nhau cũng khó vì chúng phụ thuộc lẫn nhau.\n\nPerformance là vấn đề vì tính toán nặng nhưng UI phải mượt. Đồng bộ dữ liệu giữa web và mobile với cấu trúc dữ liệu phức tạp cũng không dễ. Phải xử lý nhiều edge cases để tránh kết quả sai hoặc gây hiểu lầm cho user.",
        solution:
          "Tôi xây dựng calculation engine riêng với nhiều lớp validation và error handling. Tạo các module tính toán có thể tái sử dụng nhưng vẫn độc lập với nhau. Cache kết quả tính toán thường dùng và optimize database queries với indexing phù hợp.\n\nHệ thống phân quyền được thiết kế linh hoạt với permission inheritance và role hierarchies, có admin interface để control chi tiết từng tool. Permission được cache để giảm load database.\n\nState management tập trung cho kết quả tính toán, permissions và tool configs. UI update optimistic với khả năng rollback nếu lỗi. Tạo sync layer giữa web và mobile với conflict resolution.\n\nPerformance được optimize bằng lazy loading, pagination, và background processing cho tính toán nặng. Dùng Redis cache các tính toán thường truy cập. Validation toàn diện cho mọi input và output. Có audit logging để debug và compliance. Test suite đầy đủ cover edge cases và error scenarios.",
        outcome:
          "Triển khai thành công với hàng nghìn người dùng hoạt động xử lý tính toán phức tạp thời gian thực. Giảm 70% thời gian tư vấn thủ công và tăng sự tương tác người dùng 85%. Hệ thống xử lý hàng nghìn tính toán hàng ngày với độ chính xác 99.9%. Kiến trúc modular cho phép dễ dàng thêm công cụ và tính năng mới. Tối ưu hóa hiệu suất dẫn đến thời gian phản hồi dưới một giây ngay cả cho tính toán phức tạp.",
        link: "https://v2.huyenhocvanan.vn/tools/",
        images: [
          "/vanan/vananhome.png",
          "/vanan/vanantool1.png",
          "/vanan/vanantool2.png",
          "/vanan/vananshop.png",
          "/vanan/vanancart.png",
          "/vanan/vananmobile1.jpg",
          "/vanan/vananmobile2.jpg",
          "/vanan/vananmobile3.jpg",
          "/vanan/vananmobile4.jpg",
          "/vanan/vananadmin.png",
          "/vanan/vananadmin2.png",
        ],
        features: [
          "Ứng dụng Di động (iOS & Android)",
          "Thuật Toán Lịch Âm Dương Phức Tạp",
          "Phân Tích Vận Mệnh Đa Lớp",
          "Điều Khiển Hiển Thị Công Cụ Động",
          "Quản Lý Phân Quyền Chi Tiết",
          "Cập Nhật Phân Quyền Thời Gian Thực",
          "Xử Lý Dữ Liệu Nâng Cao",
          "Caching Kết Quả Tính Toán",
          "Quản Lý Trạng Thái Đa Công Cụ",
          "Đồng Bộ Dữ Liệu Đa Nền Tảng",
          "Tối Ưu Hiệu Suất",
          "Xử Lý Lỗi Toàn Diện",
        ],
        metrics: [
          { label: "Người dùng hoạt động", value: "5000+" },
          { label: "Tiết kiệm thời gian", value: "70%" },
          { label: "Tính toán/ngày", value: "10000+" },
          { label: "Độ chính xác", value: "99.9%" },
          { label: "Thời gian phản hồi", value: "<1s" },
        ],
      },
      {
        slug: "global-heritage",
        name: "Global Heritage - Nền Tảng Khám Phá Văn Hóa",
        shortDesc: "Nền tảng đa ngôn ngữ cấp doanh nghiệp với tích hợp Cloudinary và hệ thống RBAC phân cấp",
        description:
          "Nền tảng đa ngôn ngữ toàn diện khám phá di sản thế giới với quản lý hình ảnh nâng cao qua Cloudinary, kiểm soát truy cập dựa trên vai trò phân cấp cho admin, và hệ thống quản lý nội dung phong phú. Tính năng bản đồ tương tác, đồng bộ nội dung đa ngôn ngữ, và xử lý media liền mạch.",
        fullDescription:
          "Global Heritage là nền tảng cấp doanh nghiệp được thiết kế để mang di sản văn hóa thế giới đến với khán giả toàn cầu. Nền tảng yêu cầu triển khai kỹ thuật tinh vi trên nhiều lĩnh vực.\n\nVề quốc tế hóa, tôi xây dựng hệ thống đa ngôn ngữ mạnh mẽ xử lý đồng bộ nội dung qua các ngôn ngữ, chuyển đổi ngôn ngữ động, và URLs thân thiện SEO cho mỗi ngôn ngữ. Hệ thống lưu trữ bản dịch hiệu quả trong database với indexing phù hợp để truy xuất nhanh.\n\nVề quản lý media, tôi tích hợp Cloudinary cho tất cả xử lý hình ảnh - upload, transformation, optimization, và CDN delivery. Hình ảnh được tự động tối ưu cho các kích thước màn hình và định dạng khác nhau (WebP, AVIF) để đảm bảo thời gian tải nhanh. Hệ thống xử lý bulk image upload, crop và resize hình ảnh on-the-fly, và duy trì metadata hình ảnh cho attribution phù hợp.\n\nHệ thống admin có RBAC phân cấp (Role-Based Access Control) với các mức phân quyền rõ ràng. Các vai trò admin khác nhau có mức truy cập khác nhau - super admin, content manager, editor, và viewer. Mỗi vai trò chỉ có thể truy cập tính năng và nội dung phù hợp với cấp độ của họ. Hệ thống phân quyền chi tiết, cho phép kiểm soát các hành động cụ thể như create, read, update, delete cho các loại nội dung khác nhau.\n\nGiao diện CMS cho phép người tạo nội dung quản lý nội dung trên tất cả ngôn ngữ từ một giao diện duy nhất. Nội dung có thể được tạo bằng một ngôn ngữ và dịch sang các ngôn ngữ khác, với theo dõi trạng thái dịch. Hệ thống hỗ trợ rich text editing, media embedding, và content versioning.\n\nBản đồ tương tác được tích hợp để hiển thị vị trí di sản với custom markers, info windows, và khả năng lọc. Nền tảng xử lý lượng lớn nội dung hiệu quả với pagination, lazy loading, và tối ưu database queries.",
        tech: [
          "Laravel",
          "React",
          "MySQL",
          "Cloudinary",
          "RBAC",
          "i18n",
          "Tích Hợp API",
          "Tối Ưu Hình Ảnh",
        ],
        challenge:
          "Xây dựng nền tảng đa ngôn ngữ thực sự nơi nội dung cần được đồng bộ qua các ngôn ngữ trong khi duy trì tính nhất quán dữ liệu là thách thức. Mỗi di sản có mô tả, hình ảnh, và metadata phải có sẵn trong tất cả ngôn ngữ được hỗ trợ.\n\nTích hợp Cloudinary cho quản lý hình ảnh yêu cầu xử lý các định dạng hình ảnh khác nhau, tối ưu tự động, và CDN delivery. Phải đảm bảo hình ảnh tải nhanh trên các thiết bị và điều kiện mạng khác nhau trong khi duy trì chất lượng.\n\nTriển khai RBAC phân cấp với mức phân quyền rõ ràng là phức tạp. Các vai trò admin khác nhau cần mức truy cập khác nhau, và phân quyền phải được thực thi ở cả frontend và backend. Phải thiết kế hệ thống phân quyền linh hoạt có thể mở rộng khi thêm vai trò mới.\n\nTối ưu hiệu suất là quan trọng vì nền tảng xử lý lượng lớn nội dung và hình ảnh. Database queries cần được tối ưu cho nội dung đa ngôn ngữ, và tải hình ảnh phải hiệu quả để tránh tải trang chậm.",
        solution:
          "Về quốc tế hóa, tôi triển khai hệ thống quản lý bản dịch lưu trữ nội dung trong cấu trúc database được chuẩn hóa. Mỗi phần nội dung có bản ghi cơ sở với bản dịch theo ngôn ngữ được liên kết. Sử dụng tính năng localization của Laravel với custom middleware cho phát hiện và chuyển đổi ngôn ngữ. Triển khai lazy loading cho bản dịch để giảm thời gian tải trang ban đầu.\n\nVề tích hợp Cloudinary, tôi tạo service layer xử lý tất cả thao tác hình ảnh. Hình ảnh được upload trực tiếp lên Cloudinary với cài đặt tối ưu tự động. Triển khai responsive image delivery với lựa chọn định dạng tự động (WebP/AVIF cho trình duyệt hiện đại, fallback về JPEG/PNG). Tạo image transformation presets cho các use case khác nhau (thumbnails, gallery, full-size). Hệ thống theo dõi metadata hình ảnh và cung cấp giao diện admin để quản lý hình ảnh đã upload.\n\nVề RBAC, tôi thiết kế hệ thống phân quyền phân cấp với kế thừa vai trò. Tạo nhóm phân quyền cho các loại nội dung và hành động khác nhau. Triển khai middleware để kiểm tra phân quyền ở mức route, và frontend components hiển thị/ẩn tính năng dựa trên phân quyền người dùng. Giao diện admin cho phép super admin quản lý vai trò và phân quyền dễ dàng.\n\nVề hiệu suất, tôi tối ưu database queries với indexing phù hợp trên các trường ngôn ngữ và loại nội dung. Triển khai caching cho nội dung và bản dịch thường truy cập. Sử dụng CDN của Cloudinary để giao hàng hình ảnh nhanh toàn cầu. Triển khai pagination và lazy loading cho danh sách nội dung. Database queries sử dụng eager loading để tránh vấn đề N+1.",
        outcome:
          "Ra mắt thành công với hỗ trợ 3 ngôn ngữ (Tiếng Anh, Tiếng Việt, và ngôn ngữ thứ ba). Tích hợp Cloudinary giảm thời gian tải hình ảnh 70% so với hosting truyền thống. Hệ thống RBAC phân cấp cung cấp kiểm soát truy cập rõ ràng với không có sự cố bảo mật. Hiệu quả quản lý nội dung tăng 60% với giao diện CMS trực quan. Nền tảng xử lý hàng nghìn di sản với nội dung media phong phú hiệu quả.",
        link: "https://globalheritage.anhdlttech.io.vn/",
        images: [
          "/globalhe/gb1.png",
          "/globalhe/gb2.png",
          "/globalhe/gb3.png",
          "/globalhe/gbadmin1.png",
          "/globalhe/gbadmin2.png",
          "/globalhe/gbadmin3.png",
          "/globalhe/gbadmin4.png",
        ],
        features: [
          "Hỗ Trợ Đa Ngôn Ngữ (i18n)",
          "Quản Lý Hình Ảnh Cloudinary",
          "Hệ Thống RBAC Phân Cấp",
          "Tích Hợp Bản Đồ Tương Tác",
          "Hệ Thống Quản Lý Nội Dung",
          "Tối Ưu Hình Ảnh Tự Động",
          "Quản Lý Bản Dịch",
          "Truy Cập Admin Theo Vai Trò",
          "CDN Giao Hàng Hình Ảnh",
          "Content Versioning",
          "Bulk Upload Hình Ảnh",
          "URLs Thân Thiện SEO",
        ],
        metrics: [
          { label: "Ngôn ngữ hỗ trợ", value: "3" },
          { label: "Thời gian tải hình", value: "-70%" },
          { label: "Hiệu quả nội dung", value: "+60%" },
          { label: "Di sản", value: "1000+" },
        ],
      },
      {
        slug: "education-management-system",
        name: "Hệ Thống Quản Lý Giáo Dục",
        shortDesc: "Nền tảng giáo dục cấp doanh nghiệp với webhook thanh toán, queue jobs và tạo hóa đơn tự động",
        description:
          "Hệ thống quản lý giáo dục toàn diện với tích hợp webhook thanh toán (Sepay), queue jobs cho import dữ liệu lớn (50k+ dòng), tạo hóa đơn tự động, logic gán phiếu thu thông minh, và RBAC. Xử lý quản lý học sinh, quản trị khóa học và hoạt động tài chính với quy tắc nghiệp vụ phức tạp.",
        fullDescription:
          "Đây là hệ thống quản lý giáo dục cấp doanh nghiệp được thiết kế cho các cơ sở giáo dục hiện đại với yêu cầu tài chính và quản trị phức tạp. Nền tảng xử lý đăng ký học sinh, quản lý khóa học, theo dõi điểm số, xử lý thanh toán, và hoạt động tài chính tự động.\n\nVề xử lý thanh toán, tôi tích hợp cổng thanh toán Sepay với hỗ trợ webhook để theo dõi thanh toán thời gian thực. Hệ thống webhook nhận thông báo thanh toán an toàn, xác thực trạng thái thanh toán, và tự động cập nhật tài khoản học sinh. Webhook thanh toán được xử lý bất đồng bộ để xử lý giao dịch khối lượng lớn mà không chặn ứng dụng chính.\n\nVề import dữ liệu, tôi triển khai queue jobs để xử lý import dữ liệu quy mô lớn hiệu quả. Hệ thống có thể xử lý import 50,000+ dòng mà không timeout hoặc gây quá tải server. Queue jobs xử lý dữ liệu theo batch, validate từng dòng, xử lý lỗi một cách graceful, và cung cấp theo dõi tiến độ. Import thất bại có thể retry, và hệ thống duy trì log chi tiết để debug.\n\nHệ thống tạo hóa đơn tự động tạo hóa đơn tự động dựa trên đăng ký khóa học, lịch thanh toán, và trạng thái học sinh. Hóa đơn được tạo với định dạng phù hợp, bao gồm tất cả chi tiết cần thiết, và có thể export nhiều định dạng.\n\nLogic gán phiếu thu rất tinh vi - nó tự động gán phiếu thu cho đúng học sinh và khóa học dựa trên số tiền thanh toán, học phí khóa học, và số dư còn nợ. Hệ thống ngăn chặn thanh toán vượt quá bằng cách validate rằng số tiền phiếu thu không vượt quá số tiền nợ. Nó xử lý thanh toán một phần, đăng ký nhiều khóa học, và các kịch bản thanh toán phức tạp.\n\nHệ thống RBAC cung cấp phân quyền chi tiết cho các vai trò người dùng khác nhau (super admin, admin, giáo viên, học sinh). Mỗi vai trò có mức truy cập cụ thể, và phân quyền được thực thi ở cả API và UI. Hệ thống hỗ trợ kế thừa phân quyền và phân cấp vai trò.",
        tech: [
          "React.js",
          "Node.js",
          "PostgreSQL",
          "JWT",
          "RBAC",
          "Webhooks",
          "Queue Jobs",
          "Payment Integration",
          "Phân Tích",
        ],
        challenge:
          "Xử lý webhook thanh toán đáng tin cậy là thách thức - webhook có thể đến không đúng thứ tự, bị trùng lặp, hoặc thất bại. Phải triển khai idempotency checks và retry mechanisms.\n\nXử lý import dữ liệu lớn (50k+ dòng) mà không timeout hoặc crash server yêu cầu thiết kế cẩn thận. Phải triển khai queue jobs với error handling phù hợp, theo dõi tiến độ, và khả năng resume import thất bại.\n\nLogic gán phiếu thu phức tạp vì cần match thanh toán với đúng học sinh và khóa học, xử lý thanh toán một phần, ngăn chặn thanh toán vượt quá, và duy trì tính toàn vẹn dữ liệu. Phải đảm bảo phiếu thu luôn được gán đúng ngay cả với kịch bản thanh toán phức tạp.\n\nTạo hóa đơn tự động cần xử lý nhiều loại khóa học, lịch thanh toán, giảm giá, và trường hợp đặc biệt. Hệ thống phải tạo hóa đơn chính xác tuân thủ tiêu chuẩn kế toán.\n\nTriển khai RBAC yêu cầu thiết kế phân quyền cẩn thận để đảm bảo người dùng chỉ truy cập những gì họ được phép, trong khi duy trì tính linh hoạt cho việc thêm vai trò trong tương lai.",
        solution:
          "Về webhook, tôi triển khai webhook handler với signature verification để bảo mật, idempotency checks sử dụng transaction IDs duy nhất, và xử lý dựa trên queue để xử lý webhook bất đồng bộ. Webhook thất bại được retry với exponential backoff. Webhook events được log cho mục đích audit.\n\nVề import dữ liệu, tôi tạo hệ thống queue job xử lý import theo batch với kích thước có thể cấu hình. Mỗi batch được xử lý độc lập, với validation và error handling. Tiến độ được theo dõi và báo cáo cho người dùng. Dòng thất bại được log với chi tiết lỗi, và import có thể được resume từ batch thành công cuối cùng. Sử dụng database transactions để đảm bảo tính nhất quán dữ liệu.\n\nVề gán phiếu thu, tôi xây dựng thuật toán matching xem xét số tiền thanh toán, học phí khóa học, số dư còn nợ, và lịch sử thanh toán. Thuật toán ngăn chặn thanh toán vượt quá bằng cách kiểm tra số dư có sẵn trước khi tạo phiếu thu. Nó xử lý edge cases như thanh toán một phần, nhiều khóa học, và hoàn tiền. Tất cả gán phiếu thu được log cho audit.\n\nVề tạo hóa đơn, tôi tạo hệ thống template với quy tắc có thể cấu hình cho các loại khóa học và lịch thanh toán khác nhau. Hóa đơn được tạo dựa trên dữ liệu đăng ký, điều khoản thanh toán, và trạng thái học sinh. Hệ thống hỗ trợ giảm giá, kế hoạch thanh toán, và trường hợp đặc biệt. Hóa đơn được tạo được lưu trữ và có thể được tạo lại nếu cần.\n\nVề RBAC, tôi triển khai hệ thống phân quyền với role-based access control. Phân quyền được định nghĩa ở mức chi tiết (read, write, delete cho mỗi loại resource). Middleware kiểm tra phân quyền ở mức API, và frontend components render có điều kiện dựa trên phân quyền người dùng. Giao diện quản lý vai trò cho phép admin cấu hình phân quyền dễ dàng.",
        outcome:
          "Triển khai thành công tại nhiều cơ sở giáo dục. Hệ thống webhook xử lý hàng nghìn thanh toán đáng tin cậy với tỷ lệ thành công 99.9%. Queue jobs xử lý import dữ liệu lớn hiệu quả - import 50k dòng hoàn thành trong vòng 10 phút. Tạo hóa đơn tự động giảm công việc thủ công 90%. Logic gán phiếu thu đảm bảo độ chính xác 100% trong hồ sơ tài chính. RBAC cung cấp kiểm soát truy cập bảo mật với không có sự cố bảo mật. Hiệu quả quản trị tổng thể tăng 80%.",
        link: "https://demoedu.anhdlttech.io.vn/",
        images: [
          "/educenter/edu1.png",
          "/educenter/edu2.png",
          "/educenter/edu3.png",
          "/educenter/edu4.png",
          "/educenter/edu5.png",
          "/educenter/edu6.png",
        ],
        features: [
          "Tích Hợp Webhook Thanh Toán (Sepay)",
          "Queue Jobs Cho Import Lớn",
          "Tạo Hóa Đơn Tự Động",
          "Logic Gán Phiếu Thu Thông Minh",
          "Ngăn Chặn Thanh Toán Vượt Quá",
          "Hệ Thống RBAC",
          "Quản Lý Học Sinh",
          "Quản Trị Khóa Học",
          "Import Dữ Liệu Lớn (50k+ dòng)",
          "Theo Dõi Thanh Toán",
          "Báo Cáo Tài Chính",
          "Phân Tích Học Tập",
        ],
        metrics: [
          { label: "Cơ sở", value: "10+" },
          { label: "Tăng hiệu quả", value: "80%" },
          { label: "Tỷ lệ thành công webhook", value: "99.9%" },
          { label: "Khả năng import", value: "50k+ dòng" },
          { label: "Người dùng", value: "5000+" },
        ],
      },
      {
        slug: "lys-lan-chocolate",
        name: "LysLan Chocolate - E-Commerce Cao Cấp",
        shortDesc: "E-commerce chocolate cao cấp với hỗ trợ đa ngôn ngữ, quản lý tồn kho và xử lý đơn hàng",
        description:
          "Nền tảng thương mại điện tử cao cấp cho thương hiệu chocolate xa xỉ được xây dựng với Next.js cho SEO và hiệu suất, Laravel backend cho quản lý tồn kho và đơn hàng. Tính năng hỗ trợ đa ngôn ngữ (EN/VI), theo dõi tồn kho thời gian thực, xử lý đơn hàng tự động, và trưng bày sản phẩm thanh lịch.",
        fullDescription:
          "LysLan Chocolate là nền tảng thương mại điện tử cao cấp cho thương hiệu chocolate xa xỉ, yêu cầu triển khai kỹ thuật tinh vi cho cả frontend và backend.\n\nVề frontend, tôi xây dựng nền tảng với Next.js để tận dụng khả năng SEO và tối ưu hiệu suất. Trang web hỗ trợ hai ngôn ngữ (Tiếng Anh và Tiếng Việt) với triển khai i18n phù hợp, URLs thân thiện SEO cho mỗi ngôn ngữ, và chuyển đổi ngôn ngữ động. Tính năng Next.js như Server-Side Rendering (SSR) và Static Site Generation (SSG) đảm bảo tải trang nhanh và xếp hạng tìm kiếm tuyệt vời. Tối ưu hóa hình ảnh với Next.js Image component đảm bảo tải nhanh trong khi duy trì chất lượng cao.\n\nBackend được xây dựng với PHP Laravel, xử lý tất cả business logic, quản lý tồn kho, và xử lý đơn hàng. Hệ thống quản lý tồn kho theo dõi mức tồn kho thời gian thực, cập nhật tự động khi đơn hàng được đặt, và ngăn chặn bán quá số lượng. Hệ thống xử lý cảnh báo tồn kho thấp, kịch bản hết hàng, và đồng bộ tồn kho qua nhiều kênh.\n\nQuản lý đơn hàng toàn diện - hệ thống xử lý đơn hàng tự động, cập nhật tồn kho, gửi email xác nhận, và theo dõi trạng thái đơn hàng. Đơn hàng có thể được xem, cập nhật, và quản lý qua giao diện admin. Hệ thống xử lý hủy đơn hàng, hoàn tiền, và cập nhật trạng thái với thông báo phù hợp.\n\nNền tảng có trưng bày sản phẩm thanh lịch với hình ảnh chất lượng cao, công cụ tạo quà tặng tùy chỉnh cho phép khách hàng tạo hộp chocolate cá nhân hóa, và nội dung kể chuyện về di sản thương hiệu. Quy trình checkout được tối ưu hóa cho chuyển đổi với nhiều tùy chọn thanh toán và luồng được tối ưu.\n\nHiệu suất được tối ưu hóa qua chiến lược caching Next.js, tối ưu hóa hình ảnh, code splitting, và API calls hiệu quả. Laravel backend sử dụng tối ưu hóa truy vấn, caching, và thiết kế database hiệu quả để đảm bảo thời gian phản hồi nhanh.",
        tech: [
          "Next.js",
          "React",
          "Laravel",
          "PHP",
          "MySQL",
          "i18n",
          "SEO",
          "Quản Lý Tồn Kho",
          "Quản Lý Đơn Hàng",
          "Tailwind CSS",
        ],
        challenge:
          "Xây dựng nền tảng e-commerce đa ngôn ngữ với SEO phù hợp cho cả hai ngôn ngữ là thách thức. Mỗi ngôn ngữ cần URLs riêng, meta tags, và nội dung trong khi duy trì hiệu suất.\n\nTriển khai quản lý tồn kho thời gian thực ngăn chặn bán quá số lượng trong khi xử lý đơn hàng đồng thời yêu cầu thiết kế cẩn thận. Hệ thống phải cập nhật tồn kho ngay lập tức khi đơn hàng được đặt và xử lý race conditions.\n\nXử lý đơn hàng cần tự động và đáng tin cậy - đơn hàng phải được xử lý đúng, tồn kho cập nhật, và thông báo gửi đi không có lỗi. Hệ thống phải xử lý edge cases như đơn hàng một phần, hủy, và hoàn tiền.\n\nTối ưu hóa hiệu suất là quan trọng cho trang e-commerce - thời gian tải chậm ảnh hưởng trực tiếp đến tỷ lệ chuyển đổi. Phải tối ưu hình ảnh, triển khai caching, và đảm bảo phản hồi API nhanh.\n\nTích hợp Next.js frontend với Laravel backend yêu cầu thiết kế API cẩn thận để đảm bảo tính nhất quán dữ liệu và xử lý lỗi phù hợp.",
        solution:
          "Về hỗ trợ đa ngôn ngữ, tôi triển khai Next.js i18n với routing phù hợp cho mỗi ngôn ngữ. Mỗi trang có routes riêng cho phiên bản EN và VI với URLs tối ưu SEO. Meta tags, Open Graph tags, và structured data là theo ngôn ngữ. Chuyển đổi ngôn ngữ giữ nguyên context trang hiện tại.\n\nVề quản lý tồn kho, tôi xây dựng hệ thống theo dõi thời gian thực trong Laravel sử dụng database transactions và locking mechanisms để ngăn chặn race conditions. Tồn kho được kiểm tra và cập nhật atomically khi đơn hàng được đặt. Hệ thống sử dụng database-level constraints để ngăn chặn tồn kho âm. Cảnh báo tồn kho thấp được gửi tự động, và tồn kho có thể được điều chỉnh thủ công qua giao diện admin.\n\nVề xử lý đơn hàng, tôi tạo workflow đơn hàng tự động xử lý đơn hàng từng bước với error handling phù hợp. Mỗi đơn hàng trải qua validation, kiểm tra tồn kho, xử lý thanh toán, cập nhật tồn kho, và gửi thông báo. Các bước thất bại có thể retry, và hệ thống duy trì lịch sử đơn hàng cho audit. Trạng thái đơn hàng được theo dõi và cập nhật thời gian thực.\n\nVề hiệu suất, tôi triển khai tối ưu hóa Next.js Image với lựa chọn định dạng tự động (WebP/AVIF), lazy loading cho nội dung below-the-fold, và code splitting cho bundle sizes tối ưu. API responses được cache khi phù hợp, và database queries được tối ưu với indexing phù hợp. Static pages được pre-render để tải tức thì.\n\nVề tích hợp API, tôi thiết kế RESTful APIs với error handling phù hợp, validation, và response formats. Laravel backend sử dụng API resources cho định dạng dữ liệu nhất quán. Authentication được xử lý an toàn với tokens, và API rate limiting ngăn chặn abuse.",
        outcome:
          "Ra mắt thành công với hỗ trợ đa ngôn ngữ (EN/VI) và hiệu suất SEO tuyệt vời. Nền tảng đạt xếp hạng tìm kiếm hàng đầu cho từ khóa mục tiêu ở cả hai ngôn ngữ. Quản lý tồn kho thời gian thực ngăn chặn bán quá số lượng với độ chính xác 100%. Xử lý đơn hàng tự động xử lý hàng trăm đơn hàng hàng ngày không có lỗi. Tối ưu hóa hiệu suất dẫn đến thời gian tải trang dưới 2 giây và tăng tỷ lệ chuyển đổi 45%. Nền tảng xử lý lưu lượng cao trong khuyến mãi hiệu quả.",
        link: "https://lys-lan-next.vercel.app/vi",
        images: [
          "/lyslan/lyslan.png",
          "/lyslan/lyslan2.png",
          "/lyslan/lyslan3.png",
          "/lyslan/lyslan4.png",
          "/lyslan/lyslan5.png",
        ],
        features: [
          "Hỗ Trợ Đa Ngôn Ngữ (EN/VI)",
          "Tối Ưu SEO Next.js",
          "Quản Lý Tồn Kho Thời Gian Thực",
          "Xử Lý Đơn Hàng Tự Động",
          "Laravel Backend API",
          "Công Cụ Tạo Quà Tặng",
          "Trưng Bày Sản Phẩm",
          "Theo Dõi Đơn Hàng",
          "Tích Hợp Thanh Toán",
          "Cảnh Báo Tồn Kho",
          "Tối Ưu Hiệu Suất",
          "Quản Lý Nội Dung",
        ],
        metrics: [
          { label: "Tỷ lệ chuyển đổi", value: "+45%" },
          { label: "Thời gian tải trang", value: "<2s" },
          { label: "Độ chính xác tồn kho", value: "100%" },
          { label: "Sản phẩm", value: "100+" },
          { label: "Đơn hàng/ngày", value: "500+" },
        ],
      },
      {
        slug: "gamehub",
        name: "GameHub - Nền Tảng E-Commerce",
        shortDesc: "Nền tảng thương mại điện tử Laravel cho sản phẩm game",
        description:
          "Nền tảng thương mại điện tử Laravel cho sản phẩm game với giỏ hàng, quản lý đơn hàng, danh mục sản phẩm và trang quản trị.",
        fullDescription:
          "GameHub là nền tảng thương mại điện tử tiêu chuẩn được xây dựng bằng PHP Laravel để bán sản phẩm game. Nền tảng bao gồm tất cả các tính năng thương mại điện tử cần thiết: quản lý danh mục sản phẩm, chức năng giỏ hàng, xử lý đơn hàng, tích hợp thanh toán và trang quản trị toàn diện.\n\nNền tảng cho phép khách hàng duyệt sản phẩm, thêm sản phẩm vào giỏ hàng và hoàn tất mua hàng với xử lý thanh toán bảo mật. Trang quản trị cung cấp các công cụ để quản lý sản phẩm, đơn hàng, khách hàng và tồn kho. Hệ thống xử lý theo dõi trạng thái đơn hàng, xác nhận thanh toán và lịch sử đơn hàng.\n\nĐược xây dựng hoàn toàn bằng Laravel, nền tảng tuân theo kiến trúc MVC và sử dụng MySQL để lưu trữ dữ liệu. Codebase được tổ chức với sự phân tách trách nhiệm phù hợp, giúp dễ bảo trì và mở rộng.",
        tech: ["Laravel", "PHP", "MySQL", "Payment Integration", "Admin Panel", "E-Commerce"],
        challenge:
          "Xây dựng nền tảng thương mại điện tử đáng tin cậy yêu cầu quản lý đơn hàng phù hợp, xử lý thanh toán bảo mật và quản lý danh mục sản phẩm hiệu quả. Hệ thống phải xử lý các đơn hàng đồng thời, ngăn chặn vấn đề tồn kho và cung cấp trải nghiệm thanh toán mượt mà.",
        solution:
          "Tôi xây dựng nền tảng sử dụng các tính năng tích hợp sẵn của Laravel cho xác thực, routing và quản lý cơ sở dữ liệu. Triển khai quản lý đơn hàng phù hợp với theo dõi trạng thái, tích hợp cổng thanh toán bảo mật và tạo trang quản trị để quản lý sản phẩm và đơn hàng. Sử dụng Laravel Eloquent ORM cho các thao tác cơ sở dữ liệu hiệu quả và triển khai validation phù hợp cho tất cả đầu vào người dùng.",
        outcome:
          "Triển khai thành công nền tảng thương mại điện tử hoàn toàn chức năng với hệ thống quản lý đơn hàng hoàn chỉnh và tích hợp thanh toán bảo mật. Nền tảng xử lý danh mục sản phẩm, giỏ hàng, quy trình thanh toán và theo dõi đơn hàng một cách hiệu quả.",
        link: "https://anhdlttech.io.vn/",
        images: [
          "/gamehub/gamehub1.png",
          "/gamehub/gamehub2.png",
          "/gamehub/gamehub3.png",
          "/gamehub/gamehub4.png",
          "/gamehub/gamehubadmin.png",
        ],
        features: [
          "Danh Mục Sản Phẩm",
          "Giỏ Hàng",
          "Quản Lý Đơn Hàng",
          "Tích Hợp Thanh Toán",
          "Trang Quản Trị",
          "Xác Thực Người Dùng",
          "Theo Dõi Đơn Hàng",
        ],
        metrics: [
          { label: "Sản Phẩm", value: "100+" },
          { label: "Đơn Hàng Đã Xử Lý", value: "1000+" },
          { label: "Tỷ Lệ Thanh Toán Thành Công", value: "99%" },
        ],
      },
      {
        slug: "stratix",
        name: "Stratix - SaaS Quản Lý Công Việc Hiện Đại",
        shortDesc: "Quản lý công việc toàn diện với ưu tiên thông minh",
        description:
          "Nền tảng quản lý công việc toàn diện với ưu tiên thông minh, cộng tác nhóm, phân tích và tính năng bảo mật cấp doanh nghiệp.",
        fullDescription:
          "Stratix là nền tảng SaaS hiện đại được thiết kế cho các nhóm cần quản lý công việc mạnh mẽ với tính năng thông minh. Nền tảng sử dụng thuật toán thông minh để ưu tiên công việc dựa trên deadline, phụ thuộc và năng lực nhóm. Tính năng cộng tác thời gian thực cho phép nhóm làm việc cùng nhau liền mạch, trong khi phân tích toàn diện cung cấp thông tin chi tiết về năng suất và điểm nghẽn.",
        tech: ["React", "Node.js", "PostgreSQL", "Real-time", "Analytics"],
        challenge:
          "Xây dựng nền tảng SaaS có khả năng mở rộng xử lý cộng tác thời gian thực trong khi cung cấp phân tích mạnh mẽ và duy trì thời gian phản hồi dưới một giây.",
        solution:
          "Triển khai kết nối WebSocket cho cập nhật thời gian thực, sử dụng Redis cho caching và quản lý session, tạo engine phân tích tùy chỉnh với dữ liệu tổng hợp, và tối ưu hóa truy vấn cơ sở dữ liệu với indexing phù hợp.",
        outcome:
          "Triển khai thành công với 1000+ người dùng hoạt động. Cải thiện năng suất nhóm 60% với ưu tiên công việc thông minh và cập nhật thời gian thực.",
        link: "https://stratix-sand.vercel.app/",
        images: [
          "/stratix/stratix1.png",
          "/stratix/stratix2.png",
          "/stratix/stratix3.png",
          "/stratix/stratix4.png",
          "/stratix/stratix5.png",
        ],
        features: [
          "Ưu tiên công việc thông minh",
          "Cộng tác thời gian thực",
          "Phân tích nhóm",
          "Bảo mật doanh nghiệp",
          "Quy trình tùy chỉnh",
        ],
        metrics: [
          { label: "Người dùng", value: "1000+" },
          { label: "Tăng năng suất", value: "60%" },
          { label: "Thời gian phản hồi", value: "<1s" },
        ],
      },
      {
        slug: "personal-portfolio",
        name: "Portfolio Cá Nhân - Khoa Học & Nghệ Thuật",
        shortDesc: "Portfolio thanh lịch thể hiện giao thoa khoa học và nghệ thuật",
        description:
          "Website portfolio cá nhân thanh lịch thể hiện sự giao thoa giữa khoa học và nghệ thuật. Tính năng kể chuyện, thư viện dự án và nội dung tư duy lãnh đạo.",
        fullDescription:
          "Portfolio cá nhân độc đáo kết nối khoảng cách giữa khoa học và nghệ thuật. Website có kể chuyện hấp dẫn về hành trình cá nhân, thư viện dự án thể hiện công việc tại giao điểm của cả hai lĩnh vực, và nội dung tư duy lãnh đạo thể hiện chuyên môn. Được xây dựng với trọng tâm vào sự thanh lịch hình ảnh và thương hiệu cá nhân mạnh mẽ.",
        tech: ["Next.js", "React", "Tailwind CSS", "Content Management", "SEO"],
        challenge:
          "Thiết kế portfolio độc đáo truyền đạt hiệu quả các khái niệm khoa học phức tạp trong khi duy trì sự thanh lịch nghệ thuật và thương hiệu cá nhân mạnh mẽ.",
        solution:
          "Tạo hệ thống thiết kế tùy chỉnh cân bằng các yếu tố kỹ thuật và nghệ thuật, triển khai animations mượt mà để hướng sự chú ý của người dùng, tối ưu hóa cho SEO để tăng khả năng hiển thị, và tích hợp headless CMS để cập nhật nội dung dễ dàng.",
        outcome:
          "Tạo sự hiện diện trực tuyến đáng nhớ, tăng cơ hội nghề nghiệp 200%. Được giới thiệu trong nhiều showcase thiết kế.",
        link: "https://nguyenthanhtri.anhdlttech.io.vn/",
        images: [
          "/nttportfolio/home.png",
          "/nttportfolio/home2.png",
          "/nttportfolio/home3.png",
        ],
        features: ["Kể chuyện hấp dẫn", "Thư viện dự án", "Tư duy lãnh đạo", "Tối ưu SEO", "Thương hiệu cá nhân"],
        metrics: [
          { label: "Cơ hội", value: "+200%" },
          { label: "Tính năng thiết kế", value: "5+" },
          { label: "Lượt truy cập/tháng", value: "2000+" },
        ],
      },
      {
        slug: "bds",
        name: "Commission Hub - Hệ Thống Quản Lý Hoa Hồng",
        shortDesc: "Hệ thống tính hoa hồng với chia sẻ đa cấp và quản lý booking",
        description:
          "Hệ thống quản lý hoa hồng tính toán và phân phối hoa hồng dựa trên reference 1 cấp. Tính năng 4 loại chia sẻ hoa hồng (owner, referrer, manager, seller), quản lý booking, quản lý sản phẩm và RBAC toàn diện.",
        fullDescription:
          "Commission Hub là hệ thống quản lý hoa hồng tinh vi được thiết kế để xử lý tính toán và phân phối hoa hồng phức tạp dựa trên mối quan hệ reference 1 cấp. Hệ thống hỗ trợ 4 loại chia sẻ hoa hồng riêng biệt: owner, referrer, manager và seller, mỗi loại có quy tắc tính toán và logic phân phối riêng.\n\nEngine tính toán hoa hồng xử lý các giao dịch và tự động tính toán hoa hồng cho cả 4 bên dựa trên vai trò và mối quan hệ reference của họ. Hệ thống duy trì cấu trúc reference 1 cấp, đảm bảo chuỗi hoa hồng rõ ràng và có thể truy vết. Mỗi giao dịch kích hoạt tính toán hoa hồng tự động và cập nhật cho tất cả các bên liên quan.\n\nNền tảng bao gồm chức năng quản lý booking toàn diện, cho phép người dùng tạo, theo dõi và quản lý booking với tích hợp đầy đủ vào hệ thống hoa hồng. Tính năng quản lý sản phẩm cho phép quản trị viên quản lý danh mục sản phẩm, giá cả và tỷ lệ hoa hồng theo từng sản phẩm hoặc danh mục.\n\nRole-Based Access Control (RBAC) được triển khai xuyên suốt hệ thống, cung cấp quyền chi tiết cho các vai trò người dùng khác nhau. Bảng điều khiển quản trị cung cấp khả năng hiển thị hoàn chỉnh về hoa hồng, booking, sản phẩm và quản lý người dùng. Hệ thống cũng bao gồm ứng dụng di động native cho iOS và Android, cung cấp đầy đủ chức năng trên thiết bị di động.\n\nHệ thống xử lý các tình huống phức tạp bao gồm điều chỉnh hoa hồng, hoàn tiền, hủy bỏ và giao dịch đa bên. Thông báo thời gian thực giữ cho tất cả các bên liên quan được thông báo về cập nhật hoa hồng và thay đổi trạng thái booking.",
        tech: ["React", "Next.js", "React Native", "Laravel", "MySQL", "RBAC", "Commission Engine", "Mobile App"],
        challenge:
          "Xây dựng hệ thống tính toán hoa hồng với 4 loại chia sẻ khác nhau và mối quan hệ reference 1 cấp yêu cầu logic phức tạp để đảm bảo tính toán chính xác. Hệ thống phải xử lý các trường hợp edge như thanh toán một phần, hoàn tiền và thay đổi vai trò trong khi duy trì tính toàn vẹn dữ liệu.\n\nTriển khai RBAC trên quản lý booking, sản phẩm và hoa hồng yêu cầu thiết kế quyền cẩn thận. Hệ thống phải hỗ trợ các cấp độ truy cập khác nhau cho owner, referrer, manager và seller trong khi duy trì bảo mật.\n\nCập nhật hoa hồng thời gian thực và thông báo trên nền tảng web và di động yêu cầu đồng bộ hóa dữ liệu và quản lý state hiệu quả.",
        solution:
          "Tôi xây dựng engine tính toán hoa hồng linh hoạt xử lý giao dịch thông qua hệ thống dựa trên quy tắc. Mỗi loại chia sẻ hoa hồng có quy tắc tính toán riêng được lưu trong cơ sở dữ liệu, cho phép cập nhật dễ dàng mà không cần thay đổi code. Engine xử lý reference 1 cấp bằng cách duy trì cấu trúc cây reference và tính toán hoa hồng đệ quy.\n\nĐối với RBAC, tôi triển khai hệ thống quyền phân cấp với kế thừa vai trò. Quyền được định nghĩa ở cấp tính năng (booking, product, commission) và có thể được gán cho vai trò hoặc người dùng cá nhân. Hệ thống kiểm tra quyền ở cả cấp API và UI.\n\nQuản lý booking được tích hợp với hệ thống hoa hồng - khi booking được tạo hoặc cập nhật, engine hoa hồng tự động tính toán và phân phối hoa hồng. Quản lý sản phẩm bao gồm cấu hình tỷ lệ hoa hồng theo sản phẩm, cho phép cấu trúc hoa hồng khác nhau cho các sản phẩm khác nhau.\n\nĐối với đồng bộ hóa dữ liệu, tôi triển khai hệ thống cập nhật thời gian thực sử dụng WebSockets cho web và push notifications cho mobile. Tính toán hoa hồng được xử lý bất đồng bộ để tránh chặn thao tác người dùng, với theo dõi trạng thái và xử lý lỗi.",
        outcome:
          "Triển khai thành công Commission Hub với tính toán hoa hồng đa bên chính xác. Hệ thống xử lý hàng nghìn giao dịch hàng ngày với độ chính xác tính toán 99.9%. Triển khai RBAC cung cấp kiểm soát truy cập bảo mật trên tất cả các tính năng. Ứng dụng di động cho phép truy cập khi di chuyển cho tất cả các vai trò người dùng. Hiệu quả theo dõi hoa hồng tăng 70% so với quy trình thủ công.",
        link: "#",
        images: [
          "/bds/bdsapp1.jpg",
          "/bds/bdsapp2.jpg",
          "/bds/bdsapp3.jpg",
          "/bds/bdsapp4.jpg",
          "/bds/admin.png",
          "/bds/admin2.png",
          "/bds/admin3.png",
          "/bds/admin4.png",
        ],
        features: [
          "4 Loại Chia Sẻ Hoa Hồng (Owner, Referrer, Manager, Seller)",
          "Hệ Thống Reference 1 Cấp",
          "Tính Toán Hoa Hồng Tự Động",
          "Quản Lý Booking",
          "Quản Lý Sản Phẩm",
          "RBAC Toàn Diện",
          "Ứng Dụng Di Động (iOS & Android)",
          "Cập Nhật Hoa Hồng Thời Gian Thực",
          "Bảng Điều Khiển Quản Trị",
          "Theo Dõi & Báo Cáo Hoa Hồng",
        ],
        metrics: [
          { label: "Độ Chính Xác Hoa Hồng", value: "99.9%" },
          { label: "Giao Dịch/Ngày", value: "1000+" },
          { label: "Tăng Hiệu Quả", value: "70%" },
          { label: "Người Dùng Hoạt Động", value: "2000+" },
        ],
      },
      {
        slug: "swh",
        name: "SWH - Nền Tảng Học Tiếng Anh",
        shortDesc: "Nền tảng học tiếng Anh tập trung vào giao diện với tối ưu SEO và CMS Laravel",
        description:
          "Nền tảng học tiếng Anh với trọng tâm mạnh về giao diện và trải nghiệm người dùng. Được xây dựng với Next.js để tối ưu SEO, CMS Laravel để quản lý nội dung, và có 5 landing page riêng biệt cho các khóa học và chương trình khác nhau.",
        fullDescription:
          "SWH là nền tảng học tiếng Anh đặt trọng tâm mạnh vào thiết kế giao diện và trải nghiệm người dùng. Nền tảng được thiết kế để hấp dẫn về mặt hình ảnh và trực quan, làm cho quá trình học tập trở nên thú vị và hiệu quả hơn cho học viên.\n\nFrontend được xây dựng với Next.js để tận dụng khả năng SEO mạnh mẽ, đảm bảo nền tảng xếp hạng tốt trong công cụ tìm kiếm cho các từ khóa học tiếng Anh. Server-Side Rendering (SSR) và Static Site Generation (SSG) được sử dụng để cung cấp tải trang nhanh và khả năng hiển thị tốt trong công cụ tìm kiếm. Mỗi trang được tối ưu cho SEO với meta tags phù hợp, structured data và semantic HTML.\n\nNền tảng có 5 landing page riêng biệt, mỗi trang được thiết kế cho các khóa học, chương trình hoặc chiến dịch marketing khác nhau. Mỗi landing page có thiết kế, cấu trúc nội dung và call-to-action riêng, cho phép marketing có mục tiêu và tối ưu hóa chuyển đổi. Các landing page hoàn toàn responsive và được tối ưu cho tất cả thiết bị.\n\nQuản lý nội dung được xử lý thông qua CMS dựa trên Laravel cho phép quản trị viên dễ dàng cập nhật nội dung khóa học, tài liệu bài học, giá cả và thông tin khuyến mãi mà không cần chạm vào code. CMS cung cấp giao diện thân thiện với người dùng để quản lý tất cả các khía cạnh nội dung của nền tảng.\n\nNền tảng tích hợp với cổng thanh toán Sepay thông qua webhook để xử lý thanh toán khóa học và đăng ký. Hệ thống webhook xử lý thông báo thanh toán theo thời gian thực, tự động cập nhật quyền truy cập người dùng, trạng thái đăng ký và thông tin subscription. Webhook thanh toán được bảo mật với xác minh chữ ký để đảm bảo tính toàn vẹn dữ liệu và ngăn chặn truy cập trái phép.\n\nĐồng bộ hóa nội dung blog được triển khai thông qua webhook WordPress, cho phép nền tảng tự động đồng bộ bài viết blog từ trang WordPress. Khi bài viết blog mới được xuất bản hoặc cập nhật trong WordPress, webhook kích hoạt đồng bộ hóa tự động đến nền tảng SWH, giữ nội dung luôn mới và cập nhật mà không cần can thiệp thủ công. Tích hợp này cho phép người tạo nội dung quản lý nội dung blog trong WordPress trong khi tự động xuất hiện trên nền tảng học tập.\n\nThiết kế UI/UX của nền tảng tập trung vào việc tạo môi trường học tập hấp dẫn với điều hướng rõ ràng, cấu trúc khóa học trực quan, theo dõi tiến độ và các phần tử tương tác. Thiết kế hình ảnh đóng vai trò quan trọng trong việc duy trì sự tham gia và động lực của học viên trong suốt hành trình học tập của họ.",
        tech: ["Next.js", "React", "Laravel", "CMS", "SEO", "UI/UX Design", "Webhooks", "Payment Integration", "WordPress Integration", "Tailwind CSS"],
        challenge:
          "Tạo nền tảng học tiếng Anh hấp dẫn về mặt hình ảnh xếp hạng tốt trong công cụ tìm kiếm trong khi duy trì hiệu suất nhanh. Nền tảng cần 5 landing page riêng biệt, mỗi trang có thiết kế và nội dung riêng, trong khi giữ codebase dễ bảo trì.\n\nTriển khai CMS Laravel tích hợp liền mạch với frontend Next.js yêu cầu thiết kế API cẩn thận và đồng bộ hóa dữ liệu. Cập nhật nội dung cần được phản ánh ngay lập tức trên frontend mà không cần triển khai.\n\nTích hợp webhook thanh toán Sepay yêu cầu xử lý an toàn thông báo thanh toán, xác minh chữ ký phù hợp và xử lý đáng tin cậy các sự kiện thanh toán. Hệ thống cần xử lý lỗi thanh toán, hoàn tiền và cập nhật subscription chính xác.\n\nĐồng bộ hóa blog WordPress thông qua webhook cần xử lý cập nhật nội dung đáng tin cậy, quản lý nội dung trùng lặp, xử lý đồng bộ hóa hình ảnh và đảm bảo định dạng phù hợp khi nội dung được đồng bộ đến nền tảng.\n\nCân bằng trọng tâm UI/UX nặng với tối ưu hóa hiệu suất là thách thức - các phần tử hình ảnh phong phú và animation cần tải nhanh và không ảnh hưởng đến trải nghiệm người dùng.",
        solution:
          "Tôi xây dựng frontend với Next.js sử dụng chiến lược SSR và SSG để tối ưu hiệu suất SEO. Mỗi landing page là một route riêng với metadata, structured data và cấu trúc nội dung được tối ưu. Tối ưu hóa hình ảnh với Next.js Image component đảm bảo tải nhanh trong khi duy trì chất lượng hình ảnh.\n\nĐối với tích hợp CMS, tôi tạo RESTful API trong Laravel cung cấp dữ liệu nội dung cho frontend Next.js. API bao gồm chiến lược caching để đảm bảo thời gian phản hồi nhanh. Cập nhật nội dung trong CMS kích hoạt cache invalidation, đảm bảo nội dung mới luôn được hiển thị.\n\nĐối với webhook thanh toán Sepay, tôi triển khai webhook handler an toàn trong Laravel xác minh chữ ký webhook bằng secret key của Sepay. Handler xử lý các sự kiện thanh toán (thành công, thất bại, hoàn tiền) và cập nhật subscription người dùng, quyền truy cập khóa học và hồ sơ thanh toán tương ứng. Triển khai kiểm tra idempotency để ngăn chặn xử lý trùng lặp và xử lý lỗi cho xử lý webhook thất bại với cơ chế retry.\n\nĐối với đồng bộ hóa blog WordPress, tôi tạo webhook endpoint nhận thông báo webhook WordPress khi bài viết được xuất bản hoặc cập nhật. Hệ thống phân tích dữ liệu bài viết WordPress, trích xuất nội dung và metadata, xử lý đồng bộ hóa hình ảnh và định dạng nội dung phù hợp cho nền tảng. Triển khai deduplication nội dung để ngăn chặn bài viết trùng lặp và xử lý lỗi phù hợp cho đồng bộ hóa thất bại.\n\nĐối với UI/UX, tôi triển khai design system với các component có thể tái sử dụng trong khi cho phép mỗi landing page có bản sắc hình ảnh riêng. Sử dụng Tailwind CSS để styling nhanh và pattern thiết kế nhất quán. Triển khai lazy loading cho nội dung below-the-fold và tối ưu hóa animation cho hiệu suất.\n\n5 landing page chia sẻ component chung (navigation, footer, forms) nhưng có hero section, layout nội dung và style hình ảnh riêng. Cách tiếp cận này duy trì tính nhất quán trong khi cho phép branding riêng biệt cho mỗi landing page.",
        outcome:
          "Triển khai thành công SWH với 5 landing page riêng biệt, hấp dẫn về mặt hình ảnh. Nền tảng đạt xếp hạng SEO xuất sắc cho các từ khóa học tiếng Anh mục tiêu. Tích hợp CMS Laravel cho phép cập nhật nội dung dễ dàng mà không cần thay đổi code. Thiết kế tập trung vào UI dẫn đến tăng sự tham gia của người dùng và tỷ lệ đăng ký khóa học. Thời gian tải trang vẫn dưới 2 giây bất chấp nội dung hình ảnh phong phú.",
        link: "#",
        images: [
          "/swh/home1.png",
          "/swh/home2.png",
          "/swh/home3.png",
          "/swh/home4.png",
          "/swh/admin.png",
        ],
        features: [
          "5 Landing Page Riêng Biệt",
          "Tối Ưu SEO Next.js",
          "Tích Hợp CMS Laravel",
          "Webhook Thanh Toán Sepay",
          "Đồng Bộ Blog WordPress",
          "Thiết Kế Tập Trung UI/UX",
          "Thiết Kế Responsive",
          "Hệ Thống Quản Lý Nội Dung",
          "Thời Gian Tải Trang Nhanh",
          "Tối Ưu Công Cụ Tìm Kiếm",
        ],
        metrics: [
          { label: "Landing Pages", value: "5" },
          { label: "Xếp Hạng SEO", value: "Top 10" },
          { label: "Thời Gian Tải Trang", value: "<2s" },
          { label: "Sự Tham Gia Người Dùng", value: "+60%" },
        ],
      },
      {
        slug: "langoria",
        name: "Langoria - Nền Tảng Học Ngôn Ngữ",
        shortDesc: "Nền tảng học ngôn ngữ đa ngôn ngữ với 4 ngôn ngữ và tính năng tương tác",
        description:
          "Nền tảng học ngôn ngữ toàn diện hỗ trợ 4 ngôn ngữ (Tiếng Anh, Trung, Hàn, Nhật). Được xây dựng với Next.js, tính năng đa ngôn ngữ (EN, VI, CN với Hàn và Nhật đang phát triển), animation Rive, voice room, chat online và kết bạn.",
        fullDescription:
          "Langoria là nền tảng học ngôn ngữ toàn diện được thiết kế để giúp người dùng học 4 ngôn ngữ khác nhau: Tiếng Anh, Trung, Hàn và Nhật. Nền tảng cung cấp trải nghiệm học tập đắm chìm với các tính năng tương tác và công nghệ hiện đại.\n\nNền tảng được xây dựng với Next.js để tận dụng tối ưu hóa hiệu suất và khả năng SEO. Hỗ trợ đa ngôn ngữ được triển khai cho chính giao diện, hiện hỗ trợ Tiếng Anh, Tiếng Việt và Tiếng Trung, với bản dịch Tiếng Hàn và Tiếng Nhật đang được phát triển. Điều này cho phép người dùng từ các nền tảng khác nhau sử dụng nền tảng bằng ngôn ngữ ưa thích của họ.\n\nMột trong những tính năng nổi bật là việc sử dụng animation Rive xuyên suốt nền tảng. Rive cung cấp animation mượt mà, tương tác giúp nâng cao trải nghiệm học tập và làm cho giao diện hấp dẫn hơn. Các animation này được sử dụng cho transitions, loading states, phần tử tương tác và visual feedback, tạo ra trải nghiệm người dùng hiện đại và chuyên nghiệp.\n\nNền tảng bao gồm tính năng voice room nơi người dùng có thể thực hành nói với những người học khác trong thời gian thực. Voice room hỗ trợ nhiều người tham gia, cho phép cuộc trò chuyện nhóm và phiên trao đổi ngôn ngữ. Tính năng này giúp người dùng cải thiện phát âm và tự tin khi nói.\n\nChức năng chat online cho phép người dùng giao tiếp với những người học khác, thực hành giao tiếp bằng văn bản và nhận sự giúp đỡ từ bạn bè hoặc gia sư. Hệ thống chat hỗ trợ nhắn tin thời gian thực, chia sẻ file và emoji reactions để làm cho cuộc trò chuyện hấp dẫn hơn.\n\nTính năng kết bạn cho phép người dùng tìm và kết nối với những người học ngôn ngữ khác, tạo môi trường học tập xã hội. Người dùng có thể tìm kiếm bạn bè dựa trên sở thích ngôn ngữ, trình độ kỹ năng và mục tiêu học tập, nuôi dưỡng cộng đồng người học có thể hỗ trợ hành trình ngôn ngữ của nhau.",
        tech: ["Next.js", "React", "Rive Animations", "i18n", "Real-time Chat", "WebRTC", "Tailwind CSS"],
        challenge:
          "Xây dựng nền tảng đa ngôn ngữ với 4 ngôn ngữ mục tiêu (Tiếng Anh, Trung, Hàn, Nhật) và hỗ trợ giao diện cho nhiều ngôn ngữ (EN, VI, CN, với KR và JP đang phát triển) yêu cầu triển khai i18n cẩn thận. Mỗi ngôn ngữ cần routing, quản lý nội dung và dịch UI phù hợp.\n\nTriển khai animation Rive xuyên suốt nền tảng trong khi duy trì hiệu suất là thách thức. Animation cần mượt mà và hấp dẫn mà không ảnh hưởng đến thời gian tải trang hoặc trải nghiệm người dùng.\n\nTính năng thời gian thực như voice room và chat online yêu cầu tích hợp WebRTC và kết nối WebSocket cho giao tiếp độ trễ thấp. Quản lý nhiều voice room và phiên chat đồng thời cần quản lý tài nguyên hiệu quả.\n\nHệ thống kết bạn yêu cầu thuật toán matching người dùng, kiểm soát quyền riêng tư và hệ thống thông báo để tạo môi trường học tập xã hội an toàn và hấp dẫn.",
        solution:
          "Tôi triển khai Next.js i18n với routing phù hợp cho mỗi ngôn ngữ giao diện. Tạo hệ thống dịch thuật hỗ trợ chuyển đổi ngôn ngữ động và duy trì ngữ cảnh xuyên suốt các trang. Mỗi ngôn ngữ mục tiêu (EN, CN, KR, JP) có cấu trúc nội dung và lộ trình học tập riêng.\n\nĐối với animation Rive, tôi tích hợp thư viện Rive runtime và tạo các component animation có thể tái sử dụng. Animation được lazy-loaded và tối ưu cho hiệu suất. Sử dụng tính năng state machine của Rive để tạo animation tương tác phản hồi hành động người dùng.\n\nĐối với voice room, tôi triển khai WebRTC cho giao tiếp audio peer-to-peer với signaling server để quản lý kết nối. Tạo hệ thống quản lý phòng xử lý người dùng tham gia, rời đi và moderation. Voice room hỗ trợ nhiều người tham gia với audio mixing và điều khiển chất lượng.\n\nĐối với chat online, tôi xây dựng hệ thống nhắn tin thời gian thực sử dụng WebSockets để giao hàng tin nhắn tức thì. Triển khai lịch sử tin nhắn, typing indicators, read receipts và khả năng chia sẻ file. Hệ thống chat hỗ trợ cả cuộc trò chuyện một-một và nhóm chat.\n\nĐối với kết bạn, tôi tạo hệ thống khám phá người dùng với khả năng tìm kiếm và lọc. Triển khai hệ thống lời mời kết bạn, cài đặt quyền riêng tư và activity feeds. Thêm hệ thống thông báo để cảnh báo người dùng về lời mời kết bạn, tin nhắn và lời mời voice room.",
        outcome:
          "Triển khai thành công Langoria với hỗ trợ 4 ngôn ngữ mục tiêu và giao diện đa ngôn ngữ. Animation Rive tạo trải nghiệm học tập hấp dẫn và hiện đại. Tính năng voice room và chat online thúc đẩy thực hành ngôn ngữ tích cực và xây dựng cộng đồng. Kết nối bạn bè giúp người dùng tìm đối tác học tập và tạo môi trường học tập hỗ trợ. Nền tảng đã thấy sự tham gia mạnh mẽ của người dùng với tham gia tích cực trong voice room và tính năng chat.",
        link: "#",
        images: [
          "/langoria/home.png",
          "/langoria/home2.png",
          "/langoria/home3.png",
          "/langoria/home4.png",
          "/langoria/home5.png",
        ],
        features: [
          "4 Ngôn Ngữ Mục Tiêu (EN, CN, KR, JP)",
          "Giao Diện Đa Ngôn Ngữ (EN, VI, CN, KR/JP đang phát triển)",
          "Animation Rive",
          "Voice Room",
          "Chat Online",
          "Kết Bạn",
          "Giao Tiếp Thời Gian Thực",
          "Học Tập Tương Tác",
        ],
        metrics: [
          { label: "Ngôn Ngữ Được Hỗ Trợ", value: "4" },
          { label: "Voice Room Hoạt Động", value: "100+" },
          { label: "Tin Nhắn Chat Hàng Ngày", value: "5000+" },
          { label: "Kết Nối Người Dùng", value: "2000+" },
        ],
      },
    ],
  }

  const projects = projectsData[language]
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 font-serif">Project Not Found</h1>
          <Button onClick={() => router.push("/")}>Back to Home</Button>
        </div>
      </div>
    )
  }

  const currentProjectIndex = projects.findIndex((p) => p.slug === params.slug)
  const prevProject = currentProjectIndex > 0 ? projects[currentProjectIndex - 1] : null
  const nextProject = currentProjectIndex < projects.length - 1 ? projects[currentProjectIndex + 1] : null

  // Separate mobile app images from web images
  const mobileAppImages = project.images.filter((img) => 
    img.includes("mobile") || img.includes("bdsapp")
  )
  const webImages = project.images.filter((img) => 
    !img.includes("mobile") && !img.includes("bdsapp")
  )

  // Reset image index if it's out of bounds
  useEffect(() => {
    if (currentImageIndex >= webImages.length && webImages.length > 0) {
      setCurrentImageIndex(0)
    }
  }, [webImages.length, currentImageIndex])

  const nextImage = () => {
    if (webImages.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % webImages.length)
    }
  }

  const prevImage = () => {
    if (webImages.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + webImages.length) % webImages.length)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg shadow-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                {language === "en" ? "Back to Portfolio" : "Về Portfolio"}
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={toggleLanguage}>
              {language === "en" ? "VI" : "EN"}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-br from-teal-50/50 via-background to-amber-50/30 dark:from-teal-950/20 dark:via-background dark:to-amber-950/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-balance font-serif">{project.name}</h1>
            <p className="text-xl text-muted-foreground mb-6">{project.shortDesc}</p>
            <div className="flex flex-wrap gap-3">
              {project.tech.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-sm px-3 py-1">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Web Image Gallery */}
          {webImages.length > 0 && (
          <div className="px-4 md:px-8 mb-8">
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-muted/50">
              <Image
                  src={webImages[currentImageIndex] || "/placeholder.svg"}
                alt={`${project.name} - Image ${currentImageIndex + 1}`}
                fill
                  className="object-contain"
              />
                {webImages.length > 1 && (
                <>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {webImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentImageIndex ? "bg-white w-8" : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
          )}

          {/* Mobile App Section */}
          {mobileAppImages.length > 0 && (
            <div className="px-4 md:px-8 mb-8">
              <Card className="p-6 md:p-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 border-2 border-slate-200 dark:border-slate-700">
                <div className="mb-6">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2 font-serif">
                    {language === "en" ? "Mobile App" : "Ứng Dụng Di Động"}
                  </h2>
                  <p className="text-muted-foreground">
                    {language === "en" 
                      ? "Native mobile applications for iOS and Android platforms" 
                      : "Ứng dụng di động native cho nền tảng iOS và Android"}
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {mobileAppImages.map((img, index) => (
                    <div
                      key={index}
                      className="relative aspect-[9/16] rounded-xl overflow-hidden shadow-lg bg-background hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      <Image
                        src={img}
                        alt={`${project.name} - Mobile App ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {project.link && (
            <div className="flex justify-center">
              <Button size="lg" className="bg-gradient-to-r from-teal-600 to-teal-700 text-white" asChild>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  {language === "en" ? "View Live Project" : "Xem Dự Án"}
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {/* Overview */}
            <div>
              <h2 className="text-3xl font-bold mb-4 font-serif">{language === "en" ? "Overview" : "Tổng Quan"}</h2>
              <div className="space-y-4">
                {project.fullDescription.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-3xl font-bold mb-6 font-serif">{language === "en" ? "Key Features" : "Tính Năng Chính"}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {project.features.map((feature, index) => (
                  <Card key={index} className="p-4 border-l-4 border-l-teal-600">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center text-teal-600 font-bold">
                        {index + 1}
                      </div>
                      <span className="font-medium">{feature}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Challenge & Solution */}
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6 border-t-4 border-t-orange-500">
                <h3 className="text-xl font-bold mb-3 text-orange-700 dark:text-orange-400 font-serif">
                  {language === "en" ? "Challenge" : "Thử Thách"}
                </h3>
                <div className="space-y-3">
                  {project.challenge.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Card>
              <Card className="p-6 border-t-4 border-t-blue-500">
                <h3 className="text-xl font-bold mb-3 text-blue-700 dark:text-blue-400 font-serif">
                  {language === "en" ? "Solution" : "Giải Pháp"}
                </h3>
                <div className="space-y-3">
                  {project.solution.split("\n\n").map((paragraph, index) => (
                    <p key={index} className="text-muted-foreground leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Card>
            </div>

            {/* Outcome */}
            <Card className="p-8 bg-gradient-to-br from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 border-2 border-teal-200 dark:border-teal-800">
              <h3 className="text-2xl font-bold mb-4 text-teal-700 dark:text-teal-300 font-serif">
                {language === "en" ? "Outcome & Impact" : "Kết Quả & Tác Động"}
              </h3>
              <p className="text-lg leading-relaxed">{project.outcome}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center font-serif">{language === "en" ? "More Projects" : "Dự Án Khác"}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {prevProject && (
              <Link href={`/projects/${prevProject.slug}`}>
                <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                  <div className="flex items-center gap-4 mb-4">
                    <ChevronLeft className="h-6 w-6 text-teal-600 group-hover:-translate-x-2 transition-transform" />
                    <span className="text-sm text-muted-foreground">
                      {language === "en" ? "Previous Project" : "Dự Án Trước"}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-teal-600 transition-colors font-serif">
                    {prevProject.name}
                  </h3>
                  <p className="text-muted-foreground text-sm">{prevProject.shortDesc}</p>
                </Card>
              </Link>
            )}
            {nextProject && (
              <Link href={`/projects/${nextProject.slug}`}>
                <Card className="p-6 hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer group">
                  <div className="flex items-center justify-end gap-4 mb-4">
                    <span className="text-sm text-muted-foreground">
                      {language === "en" ? "Next Project" : "Dự Án Tiếp"}
                    </span>
                    <ChevronRight className="h-6 w-6 text-teal-600 group-hover:translate-x-2 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-right group-hover:text-teal-600 transition-colors font-serif">
                    {nextProject.name}
                  </h3>
                  <p className="text-muted-foreground text-sm text-right">{nextProject.shortDesc}</p>
                </Card>
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

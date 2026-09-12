"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  Menu,
  X,
  ExternalLink,
  ArrowRight,
  Code2,
  Sparkles,
  Download,
  Phone,
  ChevronDown,
} from "lucide-react"
import Image from "next/image"
import { GoldenParticles } from "@/components/animations/golden-particles"
import { GlitchEffect } from "@/components/animations/glitch-effect"
import { ScienceParticles } from "@/components/animations/science-particles"
import { MysticalParticles } from "@/components/animations/mystical-particles"
import { CulturalPatterns } from "@/components/animations/cultural-patterns"
import { FloatingBooks } from "@/components/animations/floating-books"
import { useRouter } from "next/navigation"

export default function Portfolio() {
  const router = useRouter()
  const [language, setLanguage] = useState<"en" | "vi">("en")
  const [isDark, setIsDark] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visibleProjects, setVisibleProjects] = useState<Set<number>>(new Set())
  const [projectsToShow, setProjectsToShow] = useState(4) // Show first 4 projects initially (2 rows in grid)

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("portfolio-language") as "en" | "vi" | null
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "vi")) {
      setLanguage(savedLanguage)
    }
  }, [])

  // Reset projectsToShow when language changes
  useEffect(() => {
    setProjectsToShow(4)
  }, [language])

  // Save language preference to localStorage when it changes
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "vi" : "en"
    setLanguage(newLanguage)
    localStorage.setItem("portfolio-language", newLanguage)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-project-index") || "0")
            setVisibleProjects((prev) => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.2 },
    )

    // Small delay to ensure DOM is updated
    setTimeout(() => {
      const projectCards = document.querySelectorAll("[data-project-index]")
      projectCards.forEach((card) => observer.observe(card))
    }, 100)

    return () => observer.disconnect()
  }, [projectsToShow, language]) // Re-run when projectsToShow or language changes


  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle("dark")
  }

  const content = {
    en: {
      nav: ["About", "Skills", "Projects", "Contact"],
      hero: {
        greeting: "Hi there, I'm",
        name: "Dang Le Tuan Anh",
        title: "Full-Stack Developer",
        subtitle: "Building modern web & mobile applications",
        description:
          "2+ year experience in end-to-end development with React/Next.js, React Native, Node.js/NestJS, PHP Laravel, PostgreSQL/MySQL",
        location: "Ho Chi Minh City, Vietnam",
        cta: "View My Work",
        ctaSecondary: "Download CV",
        ctaContact: "Get In Touch",
        stats: [
          { label: "Years Experience", value: "2+" },
          { label: "Projects Completed", value: "7+" },
          { label: "Technologies", value: "8+" },
        ],
      },
      about: {
        title: "About Me",
        subtitle: "Full-Stack Developer with unique operational expertise",
        content: [
          "I'm a Full-Stack Developer with 2+ year of experience building end-to-end web and mobile applications. I specialize in React/Next.js, React Native, Node.js/NestJS, PHP Laravel, and PostgreSQL/MySQL.",
          "My unique strength comes from my previous experience in pharmaceutical and food industries. This background gives me a deep understanding of operational workflows, business processes, and cross-department collaboration that most developers lack. I can write code that truly aligns with how businesses operate.",
          "I'm proficient in English (speaking, listening, writing, reading) and have worked at 3 companies using English for inter-department communication, including Traveloka and HomeCredit. Currently serving as Head of R&D, I bring strong logical thinking, complex problem-solving, and team collaboration skills to every project.",
        ],
        highlights: [
          {
            title: "Operational Flow Expert",
            desc: "Deep understanding of business processes and workflows from real-world cross-industry experience",
          },
          {
            title: "Strong English Skills",
            desc: "Worked at international companies (Traveloka, HomeCredit) with English communication",
          },
          { title: "Problem Solver", desc: "Systematic approach to complex challenges with strong logical thinking" },
          {
            title: "Full-Stack Expertise",
            desc: "End-to-end development from database to deployment (FlashPanel, Vercel, DNS/domain)",
          },
        ],
      },
      skills: {
        title: "Skills & Technologies",
        subtitle: "Tools I use to bring ideas to life",
        categories: [
          {
            name: "Frontend Development",
            items: ["React.js", "Next.js", "React Native", "TypeScript", "Tailwind CSS", "i18n (vi-en)"],
          },
          {
            name: "Backend Development",
            items: [
              "Node.js (NestJS/Express)",
              "PHP Laravel",
              "REST APIs",
              "OpenAPI/Swagger",
              "OAuth2",
              "PostgreSQL",
              "MySQL",
            ],
          },
          {
            name: "DevOps & Tools",
            items: ["FlashPanel", "Vercel", "DNS/Domain", "CI/CD", "Containerization", "Git", "Jest"],
          },
          {
            name: "Specialized Skills",
            items: ["CMS Development", "RBAC", "Query Optimization", "Caching", "JSON Serialization", "Complex Logic"],
          },
        ],
      },
      projects: {
        title: "Featured Projects",
        subtitle: "Real-world applications solving real problems",
        viewLive: "View Live",
        items: [
          {
            name: "Huyền Học Vạn An - Feng Shui Platform",
            description:
              "Enterprise-grade feng shui platform with highly complex algorithmic logic, dynamic permission management, and multi-layered calculations. Features 5 specialized tools with real-time tool visibility control, advanced lunar calendar algorithms, and sophisticated destiny analysis engines.",
            tech: ["Next.js", "Laravel", "React Native", "MySQL", "Complex Algorithms", "RBAC", "Data Processing"],
            challenge:
              "Building complex calculation engines for lunar calendars and destiny analysis, implementing dynamic permission system with real-time tool visibility control, managing complex state across multiple tools, and optimizing performance for heavy computational operations.",
            outcome:
              "Successfully deployed with 5000+ active users processing 10000+ calculations daily. Achieved 99.9% calculation accuracy with sub-second response times. Reduced manual consultation time by 70% and increased user engagement by 85%.",
            link: "https://v2.huyenhocvanan.vn/tools/",
            image: "/vanan/vananhome.png",
            slug: "huyen-hoc-van-an",
          },
          {
            name: "Global Heritage - Cultural Discovery Platform",
            description:
              "Enterprise multilingual platform with Cloudinary image management, hierarchical RBAC system, and comprehensive CMS. Features interactive maps, multi-language content synchronization, and optimized media handling.",
            tech: ["Laravel", "React", "MySQL", "Cloudinary", "RBAC", "i18n", "API Integration"],
            challenge:
              "Building a truly multilingual platform with content synchronization, integrating Cloudinary for efficient image management, and implementing hierarchical RBAC with clear permission levels while maintaining performance.",
            outcome:
              "Launched with 3 languages support. Cloudinary integration reduced image loading time by 70%. Hierarchical RBAC provides secure access control. Content management efficiency improved by 60%.",
            link: "https://globalheritage.anhdlttech.io.vn/",
            image: "/globalhe/gb1.png",
            slug: "global-heritage",
          },
          {
            name: "Education Management System",
            description:
              "Enterprise education platform with payment webhook integration (Sepay), queue jobs for bulk data import (50k+ rows), automated invoice generation, and smart receipt assignment logic. Features RBAC, financial operations, and complex business rules.",
            tech: ["React.js", "Node.js", "PostgreSQL", "JWT", "RBAC", "Webhooks", "Queue Jobs", "Payment Integration"],
            challenge:
              "Handling payment webhooks reliably, processing large data imports (50k+ rows) efficiently, implementing smart receipt assignment logic that prevents over-payment, and building automated invoice generation with complex business rules.",
            outcome:
              "Deployed across 10+ institutions. Webhook system processes payments with 99.9% success rate. Queue jobs handle 50k+ row imports efficiently. Automated invoicing reduced manual work by 90%. Overall efficiency improved by 80%.",
            link: "https://demoedu.anhdlttech.io.vn/",
            image: "/educenter/edu1.png",
            slug: "education-management-system",
          },
          {
            name: "Commission Hub - Commission Management System",
            description:
              "A commission management system that calculates and distributes commissions based on single-level references. Features 4 commission share types (owner, referrer, manager, seller), booking management, product management, and comprehensive RBAC.",
            tech: ["React", "Next.js", "React Native", "Laravel", "MySQL", "RBAC", "Commission Engine"],
            challenge:
              "Building a commission calculation system with four different share types and single-level reference relationships requires complex logic to ensure accurate calculations while handling edge cases.",
            outcome:
              "Successfully launched with accurate multi-party commission calculations. Processes thousands of transactions daily with 99.9% calculation accuracy. Commission tracking efficiency improved by 70%.",
            link: "#",
            image: "/bds/bdsapp1.jpg",
            slug: "bds",
          },
          {
            name: "SWH - English Learning Platform",
            description:
              "An English learning platform with heavy focus on user interface and experience. Built with Next.js for SEO optimization, Laravel CMS for content management, and features 5 distinct landing pages for different courses and programs.",
            tech: ["Next.js", "React", "Laravel", "CMS", "SEO", "UI/UX Design"],
            challenge:
              "Creating a visually stunning English learning platform that ranks well in search engines while maintaining fast performance. The platform needed 5 distinct landing pages, each with unique designs and content.",
            outcome:
              "Successfully launched with 5 distinct, visually engaging landing pages. The platform achieved excellent SEO rankings for target English learning keywords. Laravel CMS integration allows for easy content updates without code changes.",
            link: "#",
            image: "/swh/home1.png",
            slug: "swh",
          },
          {
            name: "LysLan Chocolate - Premium E-Commerce",
            description:
              "Premium e-commerce platform for luxury chocolate brand with Next.js (SEO & performance), Laravel backend (inventory & orders). Features bilingual support (EN/VI), real-time inventory tracking, automated order processing, and elegant product showcase.",
            tech: ["Next.js", "React", "Laravel", "PHP", "MySQL", "i18n", "SEO", "Inventory Management"],
            challenge:
              "Building bilingual e-commerce with proper SEO for both languages, implementing real-time inventory management that prevents overselling, and ensuring automated order processing handles edge cases reliably.",
            outcome:
              "Launched with bilingual support achieving top SEO rankings. Real-time inventory prevents overselling with 100% accuracy. Automated order processing handles 500+ orders daily. Sub-2s page load times and 45% conversion rate increase.",
            link: "https://lys-lan-next.vercel.app/vi",
            image: "/lyslan/lyslan.png",
            slug: "lys-lan-chocolate",
          },
          {
            name: "GameHub - E-Commerce Platform",
            description:
              "A Laravel-based e-commerce platform for game products with shopping cart, order management, and admin dashboard.",
            tech: ["Laravel", "PHP", "MySQL", "Payment Integration", "Admin Panel"],
            challenge:
              "Building a reliable e-commerce platform with secure payment processing, order management, and efficient product catalog management.",
            outcome:
              "Successfully launched e-commerce platform with complete order management system and secure payment integration.",
            link: "https://anhdlttech.io.vn/",
            image: "/gamehub/gamehub1.png",
            slug: "gamehub",
          },
          {
            name: "Stratix - Modern Task Management SaaS",
            description:
              "A comprehensive task management platform with smart prioritization, team collaboration, analytics, and enterprise-grade security features.",
            tech: ["React", "Node.js", "PostgreSQL", "Real-time", "Analytics"],
            challenge:
              "Building a scalable SaaS platform that handles real-time collaboration while providing powerful analytics and maintaining sub-second response times.",
            outcome:
              "Successfully deployed with 1000+ active users. Improved team productivity by 60% with smart task prioritization and real-time updates.",
            link: "https://stratix-sand.vercel.app/",
            image: "/stratix/stratix1.png",
            slug: "stratix",
          },
          {
            name: "Personal Portfolio - Science & Art",
            description:
              "An elegant personal portfolio website showcasing the intersection of science and art. Features storytelling, project galleries, and thought leadership content.",
            tech: ["Next.js", "React", "Tailwind CSS", "Content Management", "SEO"],
            challenge:
              "Designing a unique portfolio that effectively communicates complex scientific concepts while maintaining artistic elegance and strong personal branding.",
            outcome:
              "Created a memorable online presence that increased professional opportunities by 200%. Featured in multiple design showcases.",
            link: "https://nguyenthanhtri.anhdlttech.io.vn/",
            image: "/nttportfolio/home.png",
            slug: "personal-portfolio",
          },
          {
            name: "Langoria - Language Learning Platform",
            description:
              "A comprehensive language learning platform supporting 4 languages (English, Chinese, Korean, Japanese). Built with Next.js, features multilingual support (EN, VI, CN with Korean and Japanese in progress), Rive animations, voice rooms, online chat, and friend connections.",
            tech: ["Next.js", "React", "Rive Animations", "i18n", "Real-time Chat", "WebRTC"],
            challenge:
              "Building a multilingual platform with 4 target languages and interface support for multiple languages required careful i18n implementation. Real-time features like voice rooms and online chat required WebRTC integration and efficient resource management.",
            outcome:
              "Successfully launched with support for 4 target languages and multilingual interface. Rive animations create an engaging learning experience. Voice rooms and online chat features foster active language practice and community building.",
            link: "#",
            image: "/langoria/home.png",
            slug: "langoria",
          },
        ],
      },
      contact: {
        title: "Let's Work Together",
        subtitle: "Have a project in mind? Let's discuss how I can help bring your ideas to life.",
        description:
          "I'm always open to discussing new opportunities, interesting projects, or just chatting about technology!",
        email: "shawnjericson@gmail.com",
        phone: "038-3382-869",
        cta: "Send me an email",
        ctaCall: "Call me",
      },
    },
    vi: {
      nav: ["Giới thiệu", "Kỹ năng", "Dự án", "Liên hệ"],
      hero: {
        greeting: "Xin chào, tôi là",
        name: "Đặng Lê Tuấn Anh",
        title: "Lập Trình Viên Full-Stack",
        subtitle: "Xây dựng ứng dụng web & mobile hiện đại",
        description:
          "2+ năm kinh nghiệm phát triển end-to-end với React/Next.js, React Native, Node.js/NestJS, PHP Laravel, PostgreSQL/MySQL",
        location: "Thành Phố Hồ Chí Minh, Việt Nam",
        cta: "Xem Dự Án",
        ctaSecondary: "Tải CV",
        ctaContact: "Liên Hệ",
        stats: [
          { label: "Năm Kinh Nghiệm", value: "2+" },
          { label: "Dự Án Hoàn Thành", value: "7+" },
          { label: "Công Nghệ", value: "8+" },
        ],
      },
      about: {
        title: "Giới Thiệu",
        subtitle: "Lập trình viên Full-Stack với chuyên môn vận hành độc đáo",
        content: [
          "Tôi là Lập Trình Viên Full-Stack với 2+ năm kinh nghiệm xây dựng ứng dụng web và mobile end-to-end. Tôi chuyên về React/Next.js, React Native, Node.js/NestJS, PHP Laravel và PostgreSQL/MySQL.",
          "Điểm mạnh độc đáo của tôi đến từ kinh nghiệm trước đây trong ngành dược phẩm và thực phẩm. Background này cho tôi hiểu biết sâu sắc về quy trình vận hành, quy trình kinh doanh và cộng tác liên phòng ban mà hầu hết lập trình viên thiếu. Tôi có thể viết code thực sự phù hợp với cách doanh nghiệp vận hành.",
          "Tôi thành thạo tiếng Anh (nói, nghe, viết, đọc) và đã làm việc tại 3 công ty sử dụng tiếng Anh giao tiếp liên phòng ban, bao gồm Traveloka và HomeCredit. Hiện đang làm Head of R&D, tôi mang đến tư duy logic mạnh mẽ, giải quyết vấn đề phức tạp và kỹ năng cộng tác nhóm cho mọi dự án.",
        ],
        highlights: [
          {
            title: "Chuyên Gia Quy Trình Vận Hành",
            desc: "Hiểu sâu về quy trình kinh doanh từ kinh nghiệm thực tế đa ngành",
          },
          {
            title: "Tiếng Anh Tốt",
            desc: "Làm việc tại công ty quốc tế (Traveloka, HomeCredit) với giao tiếp tiếng Anh",
          },
          { title: "Giải Quyết Vấn Đề", desc: "Tiếp cận có hệ thống với thử thách phức tạp và tư duy logic mạnh" },
          {
            title: "Chuyên Môn Full-Stack",
            desc: "Phát triển end-to-end từ database đến deployment (FlashPanel, Vercel, DNS/domain)",
          },
        ],
      },
      skills: {
        title: "Kỹ Năng & Công Nghệ",
        subtitle: "Công cụ tôi sử dụng để biến ý tưởng thành hiện thực",
        categories: [
          {
            name: "Phát Triển Frontend",
            items: ["React.js", "Next.js", "React Native", "TypeScript", "Tailwind CSS", "i18n (vi-en)"],
          },
          {
            name: "Phát Triển Backend",
            items: [
              "Node.js (NestJS/Express)",
              "PHP Laravel",
              "REST APIs",
              "OpenAPI/Swagger",
              "OAuth2",
              "PostgreSQL",
              "MySQL",
            ],
          },
          {
            name: "DevOps & Công Cụ",
            items: ["FlashPanel", "Vercel", "DNS/Domain", "CI/CD", "Containerization", "Git", "Jest"],
          },
          {
            name: "Kỹ Năng Chuyên Biệt",
            items: ["CMS Development", "RBAC", "Tối Ưu Truy Vấn", "Caching", "JSON Serialization", "Logic Phức Tạp"],
          },
        ],
      },
      projects: {
        title: "Dự Án Nổi Bật",
        subtitle: "Ứng dụng thực tế giải quyết vấn đề thực tế",
        viewLive: "Xem Trực Tiếp",
        items: [
          {
            name: "Huyền Học Vạn An - Nền Tảng Phong Thủy",
            description:
              "Nền tảng phong thủy cấp doanh nghiệp với logic thuật toán cực kỳ phức tạp, quản lý phân quyền động, và tính toán đa lớp. Tính năng 5 công cụ chuyên biệt với điều khiển hiển thị công cụ thời gian thực, thuật toán lịch âm dương nâng cao, và engine phân tích vận mệnh tinh vi.",
            tech: ["Next.js", "Laravel", "React Native", "MySQL", "Thuật Toán Phức Tạp", "RBAC", "Xử Lý Dữ Liệu"],
            challenge:
              "Xây dựng calculation engine phức tạp cho lịch âm dương và phân tích vận mệnh, triển khai hệ thống phân quyền động với điều khiển hiển thị công cụ thời gian thực, quản lý trạng thái phức tạp qua nhiều công cụ, và tối ưu hiệu suất cho các thao tác tính toán nặng.",
            outcome:
              "Triển khai thành công với 5000+ người dùng hoạt động xử lý 10000+ tính toán hàng ngày. Đạt độ chính xác 99.9% với thời gian phản hồi dưới một giây. Giảm 70% thời gian tư vấn thủ công và tăng sự tương tác người dùng 85%.",
            link: "https://v2.huyenhocvanan.vn/tools/",
            image: "/vanan/vananhome.png",
            slug: "huyen-hoc-van-an",
          },
          {
            name: "Global Heritage - Nền Tảng Khám Phá Văn Hóa",
            description:
              "Nền tảng đa ngôn ngữ cấp doanh nghiệp với quản lý hình ảnh Cloudinary, hệ thống RBAC phân cấp, và CMS toàn diện. Tính năng bản đồ tương tác, đồng bộ nội dung đa ngôn ngữ, và xử lý media tối ưu.",
            tech: ["Laravel", "React", "MySQL", "Cloudinary", "RBAC", "i18n", "Tích Hợp API"],
            challenge:
              "Xây dựng nền tảng đa ngôn ngữ thực sự với đồng bộ nội dung, tích hợp Cloudinary cho quản lý hình ảnh hiệu quả, và triển khai RBAC phân cấp với mức phân quyền rõ ràng trong khi duy trì hiệu suất.",
            outcome:
              "Ra mắt với hỗ trợ 3 ngôn ngữ. Tích hợp Cloudinary giảm thời gian tải hình ảnh 70%. RBAC phân cấp cung cấp kiểm soát truy cập bảo mật. Hiệu quả quản lý nội dung tăng 60%.",
            link: "https://globalheritage.anhdlttech.io.vn/",
            image: "/globalhe/gb1.png",
            slug: "global-heritage",
          },
          {
            name: "Hệ Thống Quản Lý Giáo Dục",
            description:
              "Nền tảng giáo dục cấp doanh nghiệp với tích hợp webhook thanh toán (Sepay), queue jobs cho import dữ liệu lớn (50k+ dòng), tạo hóa đơn tự động, và logic gán phiếu thu thông minh. Tính năng RBAC, hoạt động tài chính, và quy tắc nghiệp vụ phức tạp.",
            tech: ["React.js", "Node.js", "PostgreSQL", "JWT", "RBAC", "Webhooks", "Queue Jobs", "Payment Integration"],
            challenge:
              "Xử lý webhook thanh toán đáng tin cậy, xử lý import dữ liệu lớn (50k+ dòng) hiệu quả, triển khai logic gán phiếu thu thông minh ngăn chặn thanh toán vượt quá, và xây dựng tạo hóa đơn tự động với quy tắc nghiệp vụ phức tạp.",
            outcome:
              "Triển khai tại 10+ cơ sở giáo dục. Hệ thống webhook xử lý thanh toán với tỷ lệ thành công 99.9%. Queue jobs xử lý import 50k+ dòng hiệu quả. Tạo hóa đơn tự động giảm công việc thủ công 90%. Hiệu quả tổng thể tăng 80%.",
            link: "https://demoedu.anhdlttech.io.vn/",
            image: "/educenter/edu1.png",
            slug: "education-management-system",
          },
          {
            name: "Commission Hub - Hệ Thống Quản Lý Hoa Hồng",
            description:
              "Hệ thống quản lý hoa hồng tính toán và phân phối hoa hồng dựa trên reference 1 cấp. Tính năng 4 loại chia sẻ hoa hồng (owner, referrer, manager, seller), quản lý booking, quản lý sản phẩm và RBAC toàn diện.",
            tech: ["React", "Next.js", "React Native", "Laravel", "MySQL", "RBAC", "Commission Engine"],
            challenge:
              "Xây dựng hệ thống tính toán hoa hồng với 4 loại chia sẻ khác nhau và mối quan hệ reference 1 cấp yêu cầu logic phức tạp để đảm bảo tính toán chính xác trong khi xử lý các trường hợp edge.",
            outcome:
              "Triển khai thành công với tính toán hoa hồng đa bên chính xác. Xử lý hàng nghìn giao dịch hàng ngày với độ chính xác tính toán 99.9%. Hiệu quả theo dõi hoa hồng tăng 70%.",
            link: "#",
            image: "/bds/bdsapp1.jpg",
            slug: "bds",
          },
          {
            name: "SWH - Nền Tảng Học Tiếng Anh",
            description:
              "Nền tảng học tiếng Anh với trọng tâm mạnh về giao diện và trải nghiệm người dùng. Được xây dựng với Next.js để tối ưu SEO, CMS Laravel để quản lý nội dung, và có 5 landing page riêng biệt cho các khóa học và chương trình khác nhau.",
            tech: ["Next.js", "React", "Laravel", "CMS", "SEO", "UI/UX Design"],
            challenge:
              "Tạo nền tảng học tiếng Anh hấp dẫn về mặt hình ảnh xếp hạng tốt trong công cụ tìm kiếm trong khi duy trì hiệu suất nhanh. Nền tảng cần 5 landing page riêng biệt, mỗi trang có thiết kế và nội dung riêng.",
            outcome:
              "Triển khai thành công với 5 landing page riêng biệt, hấp dẫn về mặt hình ảnh. Nền tảng đạt xếp hạng SEO xuất sắc cho các từ khóa học tiếng Anh mục tiêu. Tích hợp CMS Laravel cho phép cập nhật nội dung dễ dàng mà không cần thay đổi code.",
            link: "#",
            image: "/swh/home1.png",
            slug: "swh",
          },
          {
            name: "LysLan Chocolate - E-Commerce Cao Cấp",
            description:
              "Nền tảng e-commerce cao cấp cho thương hiệu chocolate xa xỉ với Next.js (SEO & hiệu suất), Laravel backend (tồn kho & đơn hàng). Tính năng hỗ trợ đa ngôn ngữ (EN/VI), theo dõi tồn kho thời gian thực, xử lý đơn hàng tự động, và trưng bày sản phẩm thanh lịch.",
            tech: ["Next.js", "React", "Laravel", "PHP", "MySQL", "i18n", "SEO", "Quản Lý Tồn Kho"],
            challenge:
              "Xây dựng e-commerce đa ngôn ngữ với SEO phù hợp cho cả hai ngôn ngữ, triển khai quản lý tồn kho thời gian thực ngăn chặn bán quá số lượng, và đảm bảo xử lý đơn hàng tự động xử lý edge cases đáng tin cậy.",
            outcome:
              "Ra mắt với hỗ trợ đa ngôn ngữ đạt xếp hạng SEO hàng đầu. Tồn kho thời gian thực ngăn chặn bán quá số lượng với độ chính xác 100%. Xử lý đơn hàng tự động xử lý 500+ đơn hàng hàng ngày. Thời gian tải trang dưới 2 giây và tăng tỷ lệ chuyển đổi 45%.",
            link: "https://lys-lan-next.vercel.app/vi",
            image: "/lyslan/lyslan.png",
            slug: "lys-lan-chocolate",
          },
          {
            name: "GameHub - Nền Tảng E-Commerce",
            description:
              "Nền tảng thương mại điện tử Laravel cho sản phẩm game với giỏ hàng, quản lý đơn hàng và trang quản trị.",
            tech: ["Laravel", "PHP", "MySQL", "Payment Integration", "Admin Panel"],
            challenge:
              "Xây dựng nền tảng thương mại điện tử ổn định với xử lý thanh toán bảo mật, quản lý đơn hàng và quản lý danh mục sản phẩm hiệu quả.",
            outcome:
              "Triển khai thành công nền tảng thương mại điện tử với hệ thống quản lý đơn hàng hoàn chỉnh và tích hợp thanh toán bảo mật.",
            link: "https://anhdlttech.io.vn/",
            image: "/gamehub/gamehub1.png",
            slug: "gamehub",
          },
          {
            name: "Stratix - SaaS Quản Lý Công Việc Hiện Đại",
            description:
              "Nền tảng quản lý công việc toàn diện với ưu tiên thông minh, cộng tác nhóm, phân tích và tính năng bảo mật cấp doanh nghiệp.",
            tech: ["React", "Node.js", "PostgreSQL", "Real-time", "Analytics"],
            challenge:
              "Xây dựng nền tảng SaaS có khả năng mở rộng xử lý cộng tác thời gian thực trong khi cung cấp phân tích mạnh mẽ và duy trì thời gian phản hồi dưới một giây.",
            outcome:
              "Triển khai thành công với 1000+ người dùng hoạt động. Cải thiện năng suất nhóm 60% với ưu tiên công việc thông minh và cập nhật thời gian thực.",
            link: "https://stratix-sand.vercel.app/",
            image: "/stratix/stratix1.png",
            slug: "stratix",
          },
          {
            name: "Portfolio Cá Nhân - Khoa Học & Nghệ Thuật",
            description:
              "Website portfolio cá nhân thanh lịch thể hiện sự giao thoa giữa khoa học và nghệ thuật. Tính năng kể chuyện, thư viện dự án và nội dung tư duy lãnh đạo.",
            tech: ["Next.js", "React", "Tailwind CSS", "Content Management", "SEO"],
            challenge:
              "Thiết kế portfolio độc đáo truyền đạt hiệu quả các khái niệm khoa học phức tạp trong khi duy trì sự thanh lịch nghệ thuật và thương hiệu cá nhân mạnh mẽ.",
            outcome:
              "Tạo sự hiện diện trực tuyến đáng nhớ, tăng cơ hội nghề nghiệp 200%. Được giới thiệu trong nhiều showcase thiết kế.",
            link: "https://nguyenthanhtri.anhdlttech.io.vn/",
            image: "/nttportfolio/home.png",
            slug: "personal-portfolio",
          },
          {
            name: "Langoria - Nền Tảng Học Ngôn Ngữ",
            description:
              "Nền tảng học ngôn ngữ toàn diện hỗ trợ 4 ngôn ngữ (Tiếng Anh, Trung, Hàn, Nhật). Được xây dựng với Next.js, tính năng đa ngôn ngữ (EN, VI, CN với Hàn và Nhật đang phát triển), animation Rive, voice room, chat online và kết bạn.",
            tech: ["Next.js", "React", "Rive Animations", "i18n", "Real-time Chat", "WebRTC"],
            challenge:
              "Xây dựng nền tảng đa ngôn ngữ với 4 ngôn ngữ mục tiêu và hỗ trợ giao diện cho nhiều ngôn ngữ yêu cầu triển khai i18n cẩn thận. Tính năng thời gian thực như voice room và chat online yêu cầu tích hợp WebRTC và quản lý tài nguyên hiệu quả.",
            outcome:
              "Triển khai thành công với hỗ trợ 4 ngôn ngữ mục tiêu và giao diện đa ngôn ngữ. Animation Rive tạo trải nghiệm học tập hấp dẫn. Tính năng voice room và chat online thúc đẩy thực hành ngôn ngữ tích cực và xây dựng cộng đồng.",
            link: "#",
            image: "/langoria/home.png",
            slug: "langoria",
          },
        ],
      },
      contact: {
        title: "Hãy Cùng Làm Việc",
        subtitle: "Có dự án trong đầu? Hãy thảo luận về cách tôi có thể giúp biến ý tưởng của bạn thành hiện thực.",
        description:
          "Tôi luôn sẵn sàng thảo luận về cơ hội mới, dự án thú vị, hoặc chỉ đơn giản là trò chuyện về công nghệ!",
        email: "shawnjericson@gmail.com",
        phone: "038-3382-869",
        cta: "Gửi email cho tôi",
        ctaCall: "Gọi cho tôi",
      },
    },
  }

  const t = content[language]

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className={`min-h-screen ${isDark ? "dark" : ""}`}>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-lg shadow-lg" : "bg-background/80 backdrop-blur-md"
        } border-b border-border`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-transparent">
                {language === "en" ? "DANG LE TUAN ANH" : "Đặng Lê Tuấn Anh"}
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {t.nav.map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(["about", "skills", "projects", "contact"][index])}
                  className="text-sm font-medium text-muted-foreground hover:text-teal-600 transition-colors relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleLanguage}
                className="text-muted-foreground hover:text-teal-600 font-medium"
              >
                {language === "en" ? "VI" : "EN"}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="text-muted-foreground hover:text-teal-600"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 animate-in slide-in-from-top">
              {t.nav.map((item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(["about", "skills", "projects", "contact"][index])}
                  className="text-left text-muted-foreground hover:text-teal-600 transition-colors font-medium"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/80 via-background to-amber-50/60 dark:from-teal-950/30 dark:via-background dark:to-amber-950/20"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-teal-500/10 to-amber-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-100 to-amber-100 dark:from-teal-900/40 dark:to-amber-900/40 border-2 border-teal-600/30 text-teal-700 dark:text-teal-300 text-sm font-semibold mb-8 shadow-lg shadow-teal-500/20 animate-pulse">
                <Sparkles className="h-5 w-5" />
                <span>{language === "en" ? "Available for opportunities" : "Sẵn sàng cho cơ hội mới"}</span>
              </div>
              <p className="text-muted-foreground mb-2 text-xl font-medium">{t.hero.greeting}</p>
              <h1 className="text-6xl md:text-8xl font-black mb-6 text-balance leading-[1.2] font-serif">
                <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/80 bg-clip-text text-transparent">
                  {t.hero.name}
                </span>
              </h1>
              <p className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-teal-600 via-teal-500 to-amber-600 bg-clip-text text-transparent animate-gradient font-serif">
                {t.hero.title}
              </p>
              <p className="text-2xl text-foreground/90 mb-4 text-pretty font-medium">{t.hero.subtitle}</p>
              <p className="text-lg text-muted-foreground mb-10 text-pretty leading-relaxed max-w-xl">
                {t.hero.description}
              </p>

              <div className="flex flex-wrap gap-4 mb-10">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-2xl shadow-teal-500/40 text-lg px-8 py-6 transition-transform"
                >
                  {t.hero.cta}
                  <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 hover:bg-teal-50 dark:hover:bg-teal-950/30 border-teal-600 text-teal-600 hover:text-teal-700 bg-transparent text-lg px-8 py-6 transition-transform"
                  asChild
                >
                  <a href="/cv-dang-le-tuan-anh.pdf" download>
                    <Download className="mr-2 h-6 w-6" />
                    {t.hero.ctaSecondary}
                  </a>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-10 border-t-2 border-border">
                {t.hero.stats.map((stat, index) => (
                  <div key={stat.label} className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500/10 to-amber-500/10 rounded-lg blur-xl group-hover:blur-2xl transition-all"></div>
                    <div className="relative">
                      <div className="text-4xl md:text-5xl font-black bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-transparent mb-2">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="relative w-full aspect-square max-w-lg mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-amber-500 rounded-[3rem] rotate-6 opacity-30 blur-2xl animate-pulse"></div>
                <div
                  className="absolute inset-0 bg-gradient-to-br from-teal-600 to-amber-600 rounded-[3rem] -rotate-6 opacity-20 blur-xl animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                ></div>
                <div className="relative bg-background border-8 border-teal-600/30 rounded-[3rem] overflow-hidden shadow-2xl transition-transform duration-500">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HspzK5ogD0yX3SQGkrRpUPO47mlWAW.png"
                    alt="Dang Le Tuan Anh"
                    width={600}
                    height={600}
                    className="w-full h-full object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-teal-600 to-amber-600 text-white text-base font-bold shadow-2xl transition-transform">
                      <Code2 className="h-5 w-5" />
                      <span>Full-Stack Developer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">{t.about.title}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t.about.subtitle}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {t.about.content.map((paragraph, index) => (
                <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="space-y-6">
              {t.about.highlights.map((highlight, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow border-l-4 border-l-teal-600">
                  <div className="flex gap-4">
                    <div>
                      <h3 className="font-semibold text-lg mb-2 font-serif">{highlight.title}</h3>
                      <p className="text-muted-foreground">{highlight.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">{t.skills.title}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t.skills.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {t.skills.categories.map((category, index) => (
              <Card
                key={category.name}
                className="p-8 hover:shadow-xl transition-all border-t-4 border-t-teal-600"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center text-white font-bold text-xl">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold font-serif">{category.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="text-sm px-3 py-1 hover:bg-teal-100 dark:hover:bg-teal-900/30 transition-colors"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="py-24 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif">{t.projects.title}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{t.projects.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {t.projects.items.slice(0, projectsToShow).map((project, mapIndex) => {
              const index = mapIndex // Use actual index from original array
              const projectStyles = [
                {
                  // Feng Shui
                  cardClass:
                    "bg-gradient-to-br from-red-50 via-yellow-50 to-orange-50 dark:from-red-950/20 dark:via-yellow-950/20 dark:to-orange-950/20 border-red-300 dark:border-red-800",
                  titleClass: "text-red-900 dark:text-red-100 font-bold",
                  accentColor: "from-red-600 to-orange-600",
                  badgeClass: "bg-red-600 hover:bg-red-700 text-white",
                  challengeColor: "border-orange-500 text-orange-700 dark:text-orange-400",
                  outcomeColor: "border-red-600 text-red-700 dark:text-red-400",
                  hoverGradient:
                    "group-hover:from-red-100 group-hover:via-yellow-100 group-hover:to-orange-100 dark:group-hover:from-red-900/30 dark:group-hover:via-yellow-900/30 dark:group-hover:to-orange-900/30",
                },
                {
                  // Global Heritage
                  cardClass:
                    "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800",
                  titleClass: "text-emerald-900 dark:text-emerald-100 font-semibold",
                  accentColor: "from-emerald-600 to-teal-600",
                  badgeClass: "bg-emerald-600 hover:bg-emerald-700 text-white",
                  challengeColor: "border-teal-500 text-teal-700 dark:text-teal-400",
                  outcomeColor: "border-emerald-600 text-emerald-700 dark:text-emerald-400",
                  hoverGradient:
                    "group-hover:from-emerald-100 group-hover:to-teal-100 dark:group-hover:from-emerald-900/30 dark:group-hover:to-teal-900/30",
                },
                {
                  // Education
                  cardClass:
                    "bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950/20 dark:to-blue-950/20 border-sky-200 dark:border-sky-800",
                  titleClass: "text-sky-900 dark:text-sky-100 font-semibold",
                  accentColor: "from-sky-600 to-blue-600",
                  badgeClass: "bg-sky-600 hover:bg-sky-700 text-white",
                  challengeColor: "border-blue-500 text-blue-700 dark:text-blue-400",
                  outcomeColor: "border-sky-600 text-sky-700 dark:text-sky-400",
                  hoverGradient:
                    "group-hover:from-sky-100 group-hover:to-blue-100 dark:group-hover:from-sky-900/30 dark:group-hover:to-blue-900/30",
                },
                {
                  // Commission Hub (BDS)
                  cardClass:
                    "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800",
                  titleClass: "text-green-900 dark:text-green-100 font-bold",
                  accentColor: "from-green-600 to-emerald-600",
                  badgeClass: "bg-green-600 hover:bg-green-700 text-white",
                  challengeColor: "border-emerald-500 text-emerald-700 dark:text-emerald-400",
                  outcomeColor: "border-green-600 text-green-700 dark:text-green-400",
                  hoverGradient:
                    "group-hover:from-green-100 group-hover:to-emerald-100 dark:group-hover:from-green-900/30 dark:group-hover:to-emerald-900/30",
                },
                {
                  // SWH
                  cardClass:
                    "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border-violet-200 dark:border-violet-800",
                  titleClass: "text-violet-900 dark:text-violet-100 font-semibold",
                  accentColor: "from-violet-600 to-purple-600",
                  badgeClass: "bg-violet-600 hover:bg-violet-700 text-white",
                  challengeColor: "border-purple-500 text-purple-700 dark:text-purple-400",
                  outcomeColor: "border-violet-600 text-violet-700 dark:text-violet-400",
                  hoverGradient:
                    "group-hover:from-violet-100 group-hover:to-purple-100 dark:group-hover:from-violet-900/30 dark:group-hover:to-purple-900/30",
                },
                {
                  // LysLan Chocolate
                  cardClass:
                    "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border-amber-200 dark:border-amber-800",
                  titleClass: "text-amber-900 dark:text-amber-100 font-serif",
                  accentColor: "from-amber-600 to-orange-600",
                  badgeClass: "bg-amber-600 hover:bg-amber-700 text-white",
                  challengeColor: "border-orange-500 text-orange-700 dark:text-orange-400",
                  outcomeColor: "border-amber-600 text-amber-700 dark:text-amber-400",
                  hoverGradient:
                    "group-hover:from-amber-100 group-hover:to-orange-100 dark:group-hover:from-amber-900/30 dark:group-hover:to-orange-900/30",
                },
                {
                  // GameHub
                  cardClass:
                    "bg-gradient-to-br from-purple-50 via-pink-50 to-cyan-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-cyan-950/20 border-purple-300 dark:border-purple-700",
                  titleClass:
                    "text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 font-black",
                  accentColor: "from-purple-600 via-pink-600 to-cyan-600",
                  badgeClass:
                    "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white",
                  challengeColor: "border-pink-500 text-pink-700 dark:text-pink-400",
                  outcomeColor: "border-cyan-500 text-cyan-700 dark:text-cyan-400",
                  hoverGradient:
                    "group-hover:from-purple-100 group-hover:via-pink-100 group-hover:to-cyan-100 dark:group-hover:from-purple-900/30 dark:group-hover:via-pink-900/30 dark:group-hover:to-cyan-900/30",
                },
                {
                  // Stratix
                  cardClass:
                    "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800",
                  titleClass: "text-blue-900 dark:text-blue-100 font-bold",
                  accentColor: "from-blue-600 to-indigo-600",
                  badgeClass: "bg-blue-600 hover:bg-blue-700 text-white",
                  challengeColor: "border-indigo-500 text-indigo-700 dark:text-indigo-400",
                  outcomeColor: "border-blue-600 text-blue-700 dark:text-blue-400",
                  hoverGradient:
                    "group-hover:from-blue-100 group-hover:to-indigo-100 dark:group-hover:from-blue-900/30 dark:group-hover:to-indigo-900/30",
                },
                {
                  // Personal Portfolio
                  cardClass:
                    "bg-gradient-to-br from-slate-50 to-zinc-50 dark:from-slate-950/20 dark:to-zinc-950/20 border-slate-300 dark:border-slate-700",
                  titleClass: "text-slate-900 dark:text-slate-100 font-light tracking-wide",
                  accentColor: "from-slate-700 to-zinc-700",
                  badgeClass: "bg-slate-700 hover:bg-slate-800 text-white",
                  challengeColor: "border-zinc-500 text-zinc-700 dark:text-zinc-400",
                  outcomeColor: "border-slate-600 text-slate-700 dark:text-slate-400",
                  hoverGradient:
                    "group-hover:from-slate-100 group-hover:to-zinc-100 dark:group-hover:from-slate-900/30 dark:group-hover:to-zinc-900/30",
                },
                {
                  // Langoria - Brand Platform
                  cardClass:
                    "bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 border-rose-200 dark:border-rose-800",
                  titleClass: "text-rose-900 dark:text-rose-100 font-medium",
                  accentColor: "from-rose-600 to-pink-600",
                  badgeClass: "bg-rose-600 hover:bg-rose-700 text-white",
                  challengeColor: "border-pink-500 text-pink-700 dark:text-pink-400",
                  outcomeColor: "border-rose-600 text-rose-700 dark:text-rose-400",
                  hoverGradient:
                    "group-hover:from-rose-100 group-hover:to-pink-100 dark:group-hover:from-rose-900/30 dark:group-hover:to-pink-900/30",
                },
              ]

              const animationComponents = [
                MysticalParticles, // Feng Shui
                CulturalPatterns, // Global Heritage
                FloatingBooks, // Education
                null, // Commission Hub (BDS)
                null, // SWH
                null, // LysLan - using CSS background instead
                GlitchEffect, // GameHub
                GoldenParticles, // Stratix
                ScienceParticles, // Personal Portfolio
                null, // Langoria
              ]

              const style = projectStyles[index] || projectStyles[0] // Fallback to first style if index out of range
              const AnimationComponent = animationComponents[index] || null
              const isVisible = visibleProjects.has(index) || index < 4 // Always show first 4 projects

              return (
                <Card
                  key={project.slug}
                  data-project-index={index}
                  onClick={() => router.push(`/projects/${project.slug}`)}
                  className={`overflow-hidden hover:shadow-2xl transition-all duration-700 group border-2 cursor-pointer ${style?.cardClass || ""} ${style?.hoverGradient || ""} ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col">
                    <div className="relative h-64 overflow-hidden">
                      <Image
                        src={project.image || "/placeholder.svg"}
                        alt={project.name}
                        fill
                        className="object-contain transition-all duration-700 ease-out"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${style?.accentColor || "from-teal-600 to-amber-600"} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                      ></div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`absolute top-4 right-4 bg-white/95 dark:bg-slate-900/95 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 shadow-lg transition-all hover:shadow-2xl bg-gradient-to-r ${style?.accentColor || "from-teal-600 to-amber-600"} text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-500`}
                        >
                          {t.projects.viewLive}
                          <ExternalLink className="h-4 w-4 group-hover:rotate-45 transition-transform duration-300" />
                        </a>
                      )}
                    </div>

                    <div className="p-6 relative overflow-hidden flex-1">
                      {AnimationComponent && <AnimationComponent />}

                      {index === 3 && (
                        <>
                          <div className="absolute top-10 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-amber-200/20 to-orange-300/20 blur-2xl"></div>
                          <div className="absolute bottom-10 left-10 w-40 h-40 rounded-full bg-gradient-to-br from-amber-300/15 to-orange-400/15 blur-3xl"></div>
                        </>
                      )}

                      <div
                        className="absolute top-0 left-0 w-1 h-0 bg-gradient-to-b from-transparent via-current to-transparent opacity-50 group-hover:h-full transition-all duration-1000 z-10"
                        style={{ color: style?.accentColor?.split(" ")[0]?.replace("from-", "") || "teal-600" }}
                      ></div>
                      <div className="relative z-10">
                        <h3
                          className={`text-xl md:text-2xl mb-3 transition-all duration-500 ${style?.titleClass || "text-foreground font-bold"} ${
                            index === 4 ? "animate-glitch-title" : ""
                          }`}
                        >
                          {project.name}
                        </h3>
                        <p className="text-slate-900 dark:text-slate-100 mb-4 leading-relaxed text-base transition-colors duration-300">
                          {project.description.length > 150 ? `${project.description.substring(0, 150)}...` : project.description}
                        </p>

                        <div className="mb-4">
                          <div className="flex flex-wrap gap-2">
                            {project.tech.slice(0, 4).map((tech, techIndex) => (
                              <Badge
                                key={tech}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {project.tech.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{project.tech.length - 4}
                              </Badge>
                            )}
                          </div>
                        </div>
                            </div>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Load More Button */}
          {projectsToShow < t.projects.items.length && (
            <div className="flex justify-center mt-8">
              <Button
                onClick={() => {
                  const newCount = Math.min(projectsToShow + 6, t.projects.items.length)
                  // Mark new projects as visible immediately
                  const newVisibleSet = new Set(visibleProjects)
                  for (let i = projectsToShow; i < newCount; i++) {
                    newVisibleSet.add(i)
                  }
                  setVisibleProjects(newVisibleSet)
                  setProjectsToShow(newCount)
                  // Scroll to newly loaded projects after a short delay
                  setTimeout(() => {
                    const projectsSection = document.getElementById('projects')
                    if (projectsSection) {
                      const newProjects = projectsSection.querySelectorAll('[data-project-index]')
                      if (newProjects.length > 0) {
                        const lastNewProject = newProjects[newProjects.length - 1] as HTMLElement
                        lastNewProject.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                      }
                    }
                  }, 100)
                }}
                variant="outline"
                size="lg"
                className="border-2 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white transition-all duration-300"
              >
                {language === "en" ? "Load More Projects" : "Tải Thêm Dự Án"}
                <ChevronDown className="ml-2 h-5 w-5" />
              </Button>
            </div>
          )}

          {/* Show count */}
          {t.projects.items.length > 0 && (
            <div className="text-center mt-6 text-sm text-muted-foreground">
              {language === "en" 
                ? `Showing ${Math.min(projectsToShow, t.projects.items.length)} of ${t.projects.items.length} projects`
                : `Hiển thị ${Math.min(projectsToShow, t.projects.items.length)} trong ${t.projects.items.length} dự án`
              }
            </div>
          )}
        </div>
      </section>

      <section id="contact" className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-background to-amber-50/30 dark:from-teal-950/20 dark:via-background dark:to-amber-950/10"></div>

        <div className="max-w-4xl mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif">{t.contact.title}</h2>
          <p className="text-xl text-muted-foreground mb-4 max-w-2xl mx-auto">{t.contact.subtitle}</p>
          <p className="text-lg text-muted-foreground mb-12">{t.contact.description}</p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white shadow-lg"
              asChild
            >
              <a href={`mailto:${t.contact.email}`}>
                <Mail className="mr-2 h-5 w-5" />
                {t.contact.cta}
              </a>
            </Button>
            <Button
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white shadow-lg"
              asChild
            >
              <a href={`tel:${t.contact.phone}`}>
                <Phone className="mr-2 h-5 w-5" />
                {t.contact.ctaCall}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-2 bg-transparent" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </a>
            </Button>
            <Button size="lg" variant="outline" className="border-2 bg-transparent" asChild>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </a>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted border border-border">
              <Mail className="h-5 w-5 text-teal-600" />
              <a href={`mailto:${t.contact.email}`} className="text-teal-600 hover:text-teal-700 font-medium">
                {t.contact.email}
              </a>
            </div>
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted border border-border">
              <Phone className="h-5 w-5 text-amber-600" />
              <a href={`tel:${t.contact.phone}`} className="text-amber-600 hover:text-amber-700 font-medium">
                {t.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <div className="font-bold text-lg bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-transparent">
                {language === "en" ? "DANG LE TUAN ANH" : "Đặng Lê Tuấn Anh"}
              </div>
              <div className="text-sm text-muted-foreground">Full-Stack Developer</div>
            </div>

            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                © 2025 Dang Le Tuan Anh. {language === "en" ? "All rights reserved." : "Bảo lưu mọi quyền."}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {language === "en" ? "Built with Next.js & Tailwind CSS" : "Xây dựng với Next.js & Tailwind CSS"}
              </p>
            </div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glitchTitle {
          0%, 100% {
            transform: translateX(0);
            text-shadow: none;
          }
          2% {
            transform: translateX(-3px);
            text-shadow: 3px 0 #ff00ff, -3px 0 #00ffff;
          }
          4% {
            transform: translateX(3px);
            text-shadow: -3px 0 #ff00ff, 3px 0 #00ffff;
          }
          6% {
            transform: translateX(0);
            text-shadow: none;
          }
          45% {
            transform: translateX(0);
            text-shadow: none;
          }
          47% {
            transform: translateX(-2px);
            text-shadow: 2px 0 #ff00ff, -2px 0 #00ffff;
          }
          49% {
            transform: translateX(2px);
            text-shadow: -2px 0 #ff00ff, 2px 0 #00ffff;
          }
          51% {
            transform: translateX(0);
            text-shadow: none;
          }
        }

        .animate-glitch-title {
          animation: glitchTitle 4s infinite;
        }

        /* Added gradient animation for title */
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}

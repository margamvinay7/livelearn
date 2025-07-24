# 🚧 Project in Active Development

**Note:** This project is currently under active development. The codebase is evolving rapidly, with new features being added and existing ones being improved. Some files may appear large or unoptimized because feature completeness is prioritized over refactoring at this stage. Refactoring and optimization will follow once core features are stable.

---

## Features

### ✅ Implemented Features
- **Modern Next.js UI** for a Learning Management System (LMS)
- **Course Management**: View, create, and manage courses and chapters
- **Student & Instructor Dashboards**: Role-based dashboards for learners, instructors, and admins
- **Video Upload & Streaming**: Integration with backend for video upload and streaming (via HLS)
- **User Authentication**: Sign up, sign in, and role-based access
- **Admin Panel**: Manage users, courses, instructors, students, and analytics
- **Scheduling**: View and manage schedules for classes and events
- **Certificate Issuance**: Issue and verify certificates for course completion
- **Responsive Design**: Works on desktop and mobile

---

## 🏗️ System Design

This LMS is designed for production-grade scalability and modern media delivery:

- **Frontend** uploads videos directly to S3 using pre-signed URLs for speed and security.
- **Main Server** handles all business logic, user management, and issues S3 upload URLs. It enqueues video processing jobs in Redis.
- **Worker(s)** process video jobs: download from S3, transcode to HLS (multiple qualities, adaptive bitrate), and upload processed segments/playlists back to S3.
- **Redis Queue** is used for video processing jobs. Each job contains video ID and S3 path.
- **Future Chat** will use Redis Pub/Sub for real-time messaging, enabling WhatsApp-like chat and notifications.
- **AI Features** (planned): AI chatbot, personalized recommendations, and more.

**Backend Repo:** [lmsServer (GitHub)](https://github.com/margamvinay7/lmsServer)

### System Architecture Diagram

```mermaid
flowchart TD
  subgraph Frontend
    FE[User Browser (lmsui)]
  end

  subgraph AWS
    S3[(Amazon S3)]
    CDN[(CDN/CloudFront)]
  end

  subgraph Backend
    API[Main Server (API)]
    Worker[Worker(s) (Transcoding)]
    RedisQ[(Redis Queue)]
    RedisPS[(Redis Pub/Sub)]
    DB[(PostgreSQL)]
  end

  FE -- "1. Get S3 Upload URL" --> API
  API -- "2. Return Pre-signed S3 URL" --> FE
  FE -- "3. Upload Video" --> S3
  FE -- "4. Notify Upload Complete" --> API
  API -- "5. Enqueue Video Job" --> RedisQ
  Worker -- "6. Fetch Job" --> RedisQ
  Worker -- "7. Download Raw Video" --> S3
  Worker -- "8. Transcode to HLS" --> Worker
  Worker -- "9. Upload HLS to S3" --> S3
  Worker -- "10. Update Status" --> DB
  FE -- "11. Stream HLS" --> CDN
  CDN -- "12. Fetch Segments" --> S3

  API -- "User/Content/Chat API" --> DB
  API -- "Chat/Notification Events" --> RedisPS
  FE -- "Real-time Chat (future)" --> API
  API -- "Pub/Sub" --> RedisPS
```

---

### Key Notes & Vision
- **Active Development:** Core LMS, video upload, and streaming are live. Chat, group chat, and real-time features are in progress.
- **Future:** WhatsApp-like chat using Redis Pub/Sub, one-to-one and group video calls, AI chatbot, and full horizontal scaling with Kubernetes.

---

## 🚀 Future Implementations

These features are planned for future releases to make LiveLearn a truly next-generation LMS:

- **Group Chat:** Real-time group chat for student communities (Redis Pub/Sub, WhatsApp-like experience)
- **One-to-One Video Call:** Video call functionality for mentorship and support (WebRTC, scalable SFU/MCU)
- **AI Chatbot:** AI-powered assistant for student queries, support, and personalized learning
- **AI Features:** Automated grading, personalized course recommendations, content generation
- **Advanced Analytics:** Deeper insights for students, instructors, and admins
- **Push Notifications:** Real-time updates for assignments, grades, and events
- **Cloud Storage Integration:** Store and stream videos from cloud providers (e.g., AWS S3, Cloudinary)
- **Kubernetes Support:** For scalable, production-grade deployments
- **Mobile App:** Native mobile experience for iOS and Android (long-term)

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

---

## Note
- This project is part of a full-stack LMS. See the [backend repo](https://github.com/margamvinay7/lmsServer) for API and backend features.
- **Active development:** Features are being added and improved continuously.
- **Future:** Group chat, one-to-one video call, AI chatbot, and advanced AI features are planned.

---

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

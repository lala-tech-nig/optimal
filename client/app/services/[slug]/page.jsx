'use client';
import { useParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { notFound } from 'next/navigation';

export const serviceDetails = {
  'iso-certification': {
    title: 'ISO Certification',
    subtitle: 'End-to-End Certification Support',
    content: [
      "Achieving ISO certification is a powerful statement of your organization's commitment to excellence, quality, and compliance. However, navigating the complex requirements without expert guidance can be daunting. We provide comprehensive, end-to-end support to help you achieve full compliance.",
      "Our team will conduct a thorough gap analysis, identifying exactly where your current operations stand compared to strict ISO requirements. From there, we build a tailored roadmap, drafting the necessary policies, optimizing workflows, and preparing your team for the final audit.",
      "We stand by your side from the very first consultation through to the final successful certification body assessment."
    ],
    image: '/trainingphoto1.jpg',
    details: [
      {
        heading: 'Available ISO Programs',
        items: [
          {
            name: 'ISO 9001 (Quality Management Systems)',
            meaning: 'An internationally recognized standard that outlines criteria for a quality management system.',
            importance: 'It helps organizations ensure they consistently meet customer and regulatory requirements, continuously improving their operational efficiency.',
            details: 'We guide you through the process of mapping out quality policies, optimizing customer feedback loops, and ensuring compliance with the globally respected ISO 9001 framework.'
          },
          {
            name: 'ISO 14001 (Environmental Management Systems)',
            meaning: 'A systematic framework to manage the immediate and long-term environmental impacts of an organization’s products, services, and processes.',
            importance: 'Critically reduces waste, lowers operational costs, and demonstrates corporate social responsibility to stakeholders and regulatory bodies.',
            details: 'Our team assesses your environmental footprint and helps set up practical objectives, waste management protocols, and compliant sustainability reporting systems.'
          },
          {
            name: 'ISO 45001 (Occupational Health & Safety)',
            meaning: 'A global standard for occupational health and safety (OHS), providing a practical solution to improve the safety and health of employees.',
            importance: 'Dramatically reduces workplace accidents and illnesses, creating a better, safer working environment and mitigating massive legal liabilities.',
            details: 'We assist in hazard identification, risk assessment, and the implementation of robust safety management systems that protect your workforce.'
          },
          {
            name: 'ISO 27001 (Information Security Management)',
            meaning: 'A specification for an information security management system (ISMS) governing data protection and risk management.',
            importance: 'Ensures the safety of sensitive assets such as financial information, intellectual property, employee details, and data entrusted by third parties.',
            details: 'We help you pinpoint data vulnerabilities and establish policies, cryptography standards, and access control mechanics to secure your digital infrastructure.'
          }
        ]
      }
    ]
  },
  'management-systems': {
    title: 'Management Systems',
    subtitle: 'Robust Frameworks for Operational Excellence',
    content: [
      "A well-designed Management System is the backbone of any leading organization. It ensures consistency, mitigates risks, and continuously drives business improvement across all operational tiers.",
      "We specialize in integrating management systems that fit naturally into your existing company culture. Whether it's Quality, Environmental, or Information Security Management, we develop customized procedures, standard operating manuals, and clear metrics for your team.",
      "Stop relying on ad-hoc processes. Let our experts build a structured, resilient management framework that scales seamlessly with your business growth."
    ],
    image: '/collagesecond1.jpg',
    details: [
      {
        heading: 'Key Management Systems We Implement',
        items: [
          {
            name: 'Quality Management Systems (QMS)',
            meaning: 'A structured blueprint that dictates exactly how quality checks are executed throughout the lifecycle of a product or service.',
            importance: 'Eradicates variability in output. It ensures that standard operating procedures are built directly into the workflow of your staff.',
            details: 'We write bespoke operational manuals, implement key performance indicators (KPIs), and establish internal audit processes.'
          },
          {
            name: 'Risk Control & Compliance Systems',
            meaning: 'A proactive matrix that identifies potential corporate risks and pairs them with definitive mitigation protocols.',
            importance: 'Moves an organization from reactive fire-fighting to proactive management. It safeguards the company from unexpected financial and legal hits.',
            details: 'From gap analyses to stakeholder mapping, we build systems that continuously monitor the regulatory horizon and automate compliance checklists.'
          },
          {
            name: 'Integrated Management Systems (IMS)',
            meaning: 'A unified single system that combines multiple standard frameworks (like 9001, 14001, and 45001) into one cohesive operation.',
            importance: 'Reduces duplicative administrative work, lowers external audit costs, and unifies management goals into a single strategic vision.',
            details: 'If you have existing standards, we harmonize documentation, optimize cross-departmental communication, and streamline your entire compliance workload.'
          }
        ]
      }
    ]
  },
  'professional-training': {
    title: 'Professional Training',
    subtitle: 'Upskill Your Workforce Vertically',
    content: [
      "The true differentiator of a world-class organization is the competence and capability of its people. Our Professional Training courses are designed to close critical skill gaps and elevate your workforce to international standards.",
      "We offer specialized courses focused on leadership, technical audits, process control, and performance evaluation. Our seasoned trainers use practical, real-world scenarios rather than just theoretical lectures.",
      "Invest in professional development today to foster an internal culture of continuous improvement, accountability, and cutting-edge expertise."
    ],
    image: '/trainingphoto2.jpg',
    details: [
      {
        heading: 'Available Professional Courses',
        items: [
          {
            name: 'Lead Auditor & Internal Auditor Training',
            meaning: 'Comprehensive equipping of individuals to lead and conduct first, second, and third-party management system audits.',
            importance: 'Empowers your internal staff to police their own organization effectively. Identifies massive non-conformities before external regulators do.',
            details: 'Modules include audit planning, checklist creation, precise interviewing techniques, and the execution of high-level audit reports.'
          },
          {
            name: 'Quality Assurance & Control Principles',
            meaning: 'A deep dive into advanced statistical process control techniques, lean methodology, and error-proofing strategies.',
            importance: 'Translates high-level quality goals into day-to-day execution. It converts raw laborers into process optimization experts.',
            details: 'Includes intensive practical workshops focused on root cause analysis, Ishikawa diagrams, and the Six Sigma philosophy.'
          },
          {
            name: 'Corporate Leadership in HSE',
            meaning: 'Training tailored for executives and middle-management to lead organizational health, safety, and environmental initiatives from the top down.',
            importance: 'Safety culture dictates that leadership must be visibly committed. This program turns passive managers into active, vocal safety champions.',
            details: 'Focuses on strategic decision-making, incident investigation ownership, and managing corporate legal obligations in safety.'
          }
        ]
      }
    ]
  },
  'fire-safety-training': {
    title: 'Fire Safety Training',
    subtitle: 'Proactive Fire Prevention and Response',
    content: [
      "Workplace safety is non-negotiable. Our Fire Safety Training ensures that your employees are fully equipped to identify fire hazards, prevent outbreaks, and respond effectively in the event of an emergency.",
      "Participants will learn the essential principles of fire behavior, the correct use of various fire extinguishers, evacuation procedures, and how to conduct routine hazard assessments.",
      "By implementing our comprehensive fire safety protocols, you not only protect lives and property but also ensure strict adherence to national and international occupational safety regulations."
    ],
    image: '/collage3.jpg',
    details: [
      {
        heading: 'Fire Safety Core Programs',
        items: [
          {
            name: 'Fire Marshal / Fire Warden Certification',
            meaning: 'Specialized training for designated personnel placed in charge of steering fire evacuation protocols during emergencies.',
            importance: 'Provides a clear chain of command during a crisis, ensuring panic-free, structured evacuations that save lives.',
            details: 'Teaches personnel how to sweep buildings, assist vulnerable individuals, liaise with emergency services, and enforce daily fire safety rules.'
          },
          {
            name: 'Basic Fire Prevention & Practical Extinguishing',
            meaning: 'A foundational, hands-on workshop tailored for the general workforce covering the combustion triangle and basic responses.',
            importance: 'Equips every single employee with the awareness needed to stop a spark from turning into an inferno. Crucial for early intervention.',
            details: 'Live demonstrations using varying categories of extinguishers (Water, Foam, CO2, Dry Powder) and hazard spotting walkthroughs in their actual workspace.'
          },
          {
            name: 'Emergency Evacuation & Drill Management',
            meaning: 'The design, implementation, and review of comprehensive facility-wide mock fire evacuation drills.',
            importance: 'Identifies bottlenecks. Ensures assembly points and alarm systems function perfectly under real-world psychological pressure.',
            details: 'We script the drill, monitor the evacuation metrics (speed vs safety), debrief the management team, and modify the master fire plan.'
          }
        ]
      }
    ]
  },
  'staff-training': {
    title: 'Staff Training',
    subtitle: 'Embedding a Quality and Safety Culture',
    content: [
      "A successful system is only as strong as the people running it. Our Staff Training workshops are designed to translate complex compliance requirements into everyday actionable habits for your team at all levels.",
      "We focus on creating deep organizational awareness. Whether rolling out a new operational policy or refreshing existing standards, our immersive workshops guarantee active engagement through interactive sessions.",
      "Empower your frontline staff to take ownership of quality control, safety protocols, and daily operational excellence."
    ],
    image: '/trainingphoto1.jpg',
    details: [
      {
        heading: 'Specialized Workforce Training Tracks',
        items: [
          {
            name: 'Cultural Change & Compliance Awareness',
            meaning: 'Induction and refresher workshops breaking down company values, policies, and the "why" behind the rules.',
            importance: 'Overcomes natural resistance to change. Staff who understand the reasoning behind rules adhere strictly to them.',
            details: 'Interactive seminars discussing real industry case studies, behavioral psychology in the workplace, and ethical obligations.'
          },
          {
            name: 'Standard Operating Procedures (SOP) Adoption',
            meaning: 'Role-specific onboarding that teaches staff exactly how to execute their daily tasks according to the approved manuals.',
            importance: 'Shortens the learning curve for new hires and drastically reduces error rates on the production or service floor.',
            details: 'Shadow sessions, simulation of the workflow, and testing on the technical parameters of the specific operational machinery/service.'
          },
          {
            name: 'Workplace Ergonomics & Wellbeing',
            meaning: 'Training on physical and mental sustainability while performing repetitive tasks or working long office hours.',
            importance: 'Reduces heavy hidden costs associated with staff sick-leave, repetitive strain injuries (RSI), and burn-out.',
            details: 'Covers proper lifting techniques, desk posture, screen-time management, and stress mitigation exercises.'
          }
        ]
      }
    ]
  },
  'accident-and-road-safety-training': {
    title: 'Accident and Road Safety Training',
    subtitle: 'Minimizing Risks in Fleet and Commute Operations',
    content: [
      "Road accidents represent a massive risk to employee wellbeing and operational continuity. Our Accident and Road Safety Training equips your drivers and logistics personnel with defensive driving and risk mitigation strategies.",
      "We cover critical areas such as vehicle inspection protocols, hazard perception, fatigue management, and emergency response procedures following an incident.",
      "Safeguard your most valuable assets—your people. Establish a robust culture of road safety that drastically reduces incident rates and liabilities."
    ],
    image: '/collage2.jpg',
    details: [
      {
        heading: 'Accident Prevention & Response Programs',
        items: [
          {
            name: 'Defensive Driving Certification',
            meaning: 'A psychological and practical methodology that trains drivers to expect the unexpected and constantly maintain safe escape routes.',
            importance: 'Directly slashes collision rates. It protects company assets (vehicles) and drastically lowers insurance premiums.',
            details: 'Includes advanced hazard perception techniques, visual scanning rules, wet-weather driving physics, and understanding blind spots of heavy vehicles.'
          },
          {
            name: 'Journey Management & Route Planning',
            meaning: 'Strategic preparation prior to driving, ensuring an authorized route, adequate rest stops, and monitored vehicle checks.',
            importance: 'Eliminates incidents caused by extreme fatigue or vehicular breakdown. Ensures management has real-time oversight of fleet location.',
            details: 'Training dispatchers and drivers to use logbooks, pre-trip vehicle checklists (T-CLOCS), and fatigue evaluation standards.'
          },
          {
            name: 'Post-Incident Response & Reporting',
            meaning: 'The immediate and secondary actions a driver must take if they are involved in a collision on corporate time.',
            importance: 'Secures the scene to prevent secondary accidents, protects the driver legally, and ensures proper medical care is administered correctly.',
            details: 'Covers securing the vehicle, using first aid kits, emergency contact escalation protocols, and interacting correctly with law enforcement.'
          }
        ]
      }
    ]
  }
};

export default function ServiceDetail() {
  const params = useParams();
  const slug = params?.slug;
  const service = slug ? serviceDetails[slug] : null;

  if (!service) {
    return notFound();
  }

  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--grey-light)' }}>
        {/* Detail Hero */}
        <section style={{
          position: 'relative', minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', padding: '10rem 1.5rem 4rem', background: 'var(--wine-deep)'
        }}>
          <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', animation: 'fadeUp 1s ease forwards' }}>
            <div className="gold-line" style={{ margin: '0 auto 1.5rem' }} />
            <h1 className="font-display" style={{ fontSize: 'clamp(2.1rem, 4vw, 3.5rem)', color: 'var(--white)', fontWeight: 700, marginBottom: '1rem' }}>
              {service.title}
            </h1>
            <p style={{ color: 'var(--gold-light)', fontSize: '1.2rem', maxWidth: 600, margin: '0 auto', fontWeight: 500, lineHeight: 1.6 }}>
              {service.subtitle}
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="section-pad">
          <div className="container">
            {/* Overview Section */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '5rem' }} className="service-detail-grid">
              <div style={{ animation: 'fadeInLeft 1s ease forwards' }}>
                <h2 className="font-display" style={{ fontSize: '2.2rem', color: 'var(--wine-deep)', fontWeight: 700, marginBottom: '1.5rem' }}>
                  Overview
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--grey-mid)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                  {service.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1.2rem', flexDirection: 'column', padding: '1.5rem', background: 'var(--white)', borderRadius: 16, border: '1px solid rgba(201,168,76,0.1)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <CheckCircle2 color="var(--gold)" size={20} />
                    <span style={{ color: 'var(--wine-deep)', fontWeight: 600, fontSize: '0.95rem' }}>Tailored to your specific organizational needs</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <CheckCircle2 color="var(--gold)" size={20} />
                    <span style={{ color: 'var(--wine-deep)', fontWeight: 600, fontSize: '0.95rem' }}>Delivered by industry-certified experts</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                    <CheckCircle2 color="var(--gold)" size={20} />
                    <span style={{ color: 'var(--wine-deep)', fontWeight: 600, fontSize: '0.95rem' }}>Designed for measurable impact and sustainability</span>
                  </div>
                </div>

                <div style={{ marginTop: '3rem' }}>
                  <Link href="/contact" className="btn-gold" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    Request This Service <ArrowRight size={18} />
                  </Link>
                </div>
              </div>

              <div style={{ position: 'relative', width: '100%', minHeight: 400, height: '100%', borderRadius: 24, overflow: 'hidden', animation: 'fadeInRight 1s ease forwards', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>

            {/* Detailed Programs/Sections rendering */}
            {service.details && service.details.map((section, idx) => (
              <div key={idx} style={{ marginTop: '5rem', animation: 'fadeUp 1s ease forwards', animationDelay: '0.3s' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                  <h3 className="font-display" style={{ fontSize: '2.2rem', color: 'var(--wine-deep)', fontWeight: 700, marginBottom: '1rem' }}>
                    {section.heading}
                  </h3>
                  <div className="gold-line" style={{ margin: '0 auto' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
                  {section.items.map((item, itemIdx) => (
                    <div key={itemIdx} style={{
                      background: 'var(--white)', padding: '2.5rem', borderRadius: 20,
                      border: '1px solid rgba(201,168,76,0.15)', boxShadow: '0 10px 30px rgba(0,0,0,0.03)',
                      display: 'flex', flexDirection: 'column', transition: 'all 0.3s'
                    }}
                      onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-5px)'; e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.06)'; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.03)'; }}
                    >
                      <h4 style={{ color: 'var(--gold-dark)', fontSize: '1.25rem', fontWeight: 800, marginBottom: '1.5rem', borderBottom: '1px solid rgba(201,168,76,0.1)', paddingBottom: '1rem' }}>
                        {item.name}
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', color: 'var(--grey-mid)', fontSize: '0.98rem', lineHeight: 1.7 }}>
                        <div>
                          <strong style={{ color: 'var(--wine-deep)', display: 'block', marginBottom: '0.3rem', fontSize: '1.05rem' }}>Meaning</strong>
                          <p style={{ margin: 0 }}>{item.meaning}</p>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--wine-deep)', display: 'block', marginBottom: '0.3rem', fontSize: '1.05rem' }}>Importance</strong>
                          <p style={{ margin: 0 }}>{item.importance}</p>
                        </div>
                        <div>
                          <strong style={{ color: 'var(--wine-deep)', display: 'block', marginBottom: '0.3rem', fontSize: '1.05rem' }}>Details</strong>
                          <p style={{ margin: 0 }}>{item.details}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

          </div>
        </section>

      </main>
      <Footer />
      <style>{`
        @media(max-width:900px){
          .service-detail-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </>
  );
}

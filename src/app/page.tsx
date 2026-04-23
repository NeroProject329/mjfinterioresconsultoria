"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

type Benefit = {
  title: string;
  description: string;
  icon: "shield" | "chart" | "users" | "bolt";
};

type ProcessStep = {
  number: string;
  title: string;
  description: string;
  icon: "search" | "bulb" | "rocket" | "target";
};

type Testimonial = {
  name: string;
  role: string;
  image: string;
  text: string;
};

const benefits: Benefit[] = [
  {
    icon: "shield",
    title: "Proteção e Credibilidade",
    description:
      "Nossa equipe de especialistas estará sempre disponível para guiá-lo e assegurar que você faça as escolhas mais acertadas.",
  },
  {
    icon: "chart",
    title: "Produtividade e Lucro",
    description:
      "Métodos otimizados e táticas validadas para impulsionar o desenvolvimento do seu empreendimento.",
  },
  {
    icon: "users",
    title: "Time Qualificado",
    description:
      "Especialistas com vasta experiência e capacitação em múltiplas vertentes da consultoria digital.",
  },
  {
    icon: "bolt",
    title: "Suporte Individualizado",
    description:
      "Propostas desenvolvidas sob medida para suprir as demandas particulares da sua empresa.",
  },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    icon: "search",
    title: "Avaliação e Mapeamento",
    description:
      "Executamos uma avaliação profunda da sua empresa, detectando aspectos de aprimoramento e possibilidades de expansão.",
  },
  {
    number: "02",
    icon: "bulb",
    title: "Tática e Organização",
    description:
      "Elaboramos um roteiro estratégico customizado com objetivos definidos e agenda de aplicação.",
  },
  {
    number: "03",
    icon: "rocket",
    title: "Aplicação e Ação",
    description:
      "Executamos todas as táticas programadas com monitoramento permanente e correções quando preciso.",
  },
  {
    number: "04",
    icon: "target",
    title: "Êxito e Refinamento",
    description:
      "Acompanhamos os êxitos, examinamos o rendimento e aplicamos aperfeiçoamentos constantes para potencializar o triunfo.",
  },
];

const testimonials: Testimonial[] = [
  {
    name: "Roberto Oliveira",
    role: "Cliente Verificado",
    image:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200",
    text: '"Fantástica organização, suporte ágil e extremamente competente. Indico fortemente!"',
  },
  {
    name: "Juliana Ferreira",
    role: "Cliente Verificado",
    image:
      "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg?auto=compress&cs=tinysrgb&w=200",
    text: '"A consultoria solucionou nossas questões em prazo mínimo. Suporte incomparável!"',
  },
  {
    name: "Pedro Almeida",
    role: "Cliente Verificado",
    image:
      "https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=200",
    text: '"Solucionaram nosso desafio de maneira excepcional. Organização íntegra e confiável!"',
  },
];

const DEFAULT_MESSAGE = "Olá, gostaria de verificar meus descontos!";
const API_BASE = "https://troca-numeros-api-production.up.railway.app";

function onlyDigits(value: string) {
  return String(value || "").replace(/\D/g, "");
}

function buildWhatsappUrl(phoneDigits: string, message: string) {
  const phone = onlyDigits(phoneDigits);
  const text = encodeURIComponent(message || DEFAULT_MESSAGE);
  return `https://wa.me/${phone}?text=${text}`;
}

const fadeUp = {
  hidden: { y: 40 },
  visible: (delay = 0) => ({
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: "easeOut" as const,
    },
  }),
};

const fadeLeft = {
  hidden: { x: -40 },
  visible: (delay = 0) => ({
    x: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: "easeOut" as const,
    },
  }),
};

const fadeRight = {
  hidden: { x: 40 },
  visible: (delay = 0) => ({
    x: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: "easeOut" as const,
    },
  }),
};

function Reveal({
  children,
  delay = 0,
  variant = "up",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  variant?: "up" | "left" | "right";
  className?: string;
}) {
  const variants =
    variant === "left" ? fadeLeft : variant === "right" ? fadeRight : fadeUp;

  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      custom={delay}
    >
      {children}
    </motion.div>
  );
}

function TiltCard({
  children,
  className = "",
  glareClassName = "",
  shadowColor = "rgba(0,0,0,0.16)",
}: {
  children: ReactNode;
  className?: string;
  glareClassName?: string;
  shadowColor?: string;
}) {
  const rotateXRaw = useMotionValue(0);
  const rotateYRaw = useMotionValue(0);

  const rotateX = useSpring(rotateXRaw, { stiffness: 180, damping: 18 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 180, damping: 18 });

  const glareX = useTransform(rotateY, [-12, 12], ["35%", "65%"]);
  const glareY = useTransform(rotateX, [-12, 12], ["35%", "65%"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;

    rotateYRaw.set((px - 0.5) * 16);
    rotateXRaw.set((0.5 - py) * 16);
  };

  const reset = () => {
    rotateXRaw.set(0);
    rotateYRaw.set(0);
  };

  return (
    <div
      className={`relative h-full [perspective:1400px] ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={reset}
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-[32px] blur-[22px]"
        style={{
          background: shadowColor,
        }}
        initial={{ y: 24, scale: 0.94, opacity: 0.55 }}
        whileHover={{ y: 34, scale: 0.9, opacity: 0.75 }}
        transition={{ duration: 0.22 }}
      />

      <motion.div
        aria-hidden="true"
        className="absolute inset-0 rounded-[32px] border border-black/5 bg-black/5"
        initial={{ y: 12, scale: 0.985, opacity: 0.22 }}
        whileHover={{ y: 18, scale: 0.97, opacity: 0.32 }}
        transition={{ duration: 0.22 }}
      />

      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.02, y: -8 }}
        transition={{ duration: 0.22 }}
        className="relative h-full will-change-transform [transform-style:preserve-3d]"
      >
        <motion.div
          style={{
            left: glareX,
            top: glareY,
            transform: "translate(-50%, -50%) translateZ(30px)",
          }}
          className={`pointer-events-none absolute z-10 h-32 w-32 rounded-full bg-white/20 blur-2xl ${glareClassName}`}
        />

        <div className="relative h-full [transform:translateZ(0px)]">{children}</div>
      </motion.div>
    </div>
  );
}

function SectionBadge({ children }: { children: ReactNode }) {
  return (
    <div className="mb-4 inline-flex rounded-full border border-[#C8195C]/15 bg-[#C8195C]/8 px-4 py-1.5 text-sm font-semibold text-[#C8195C]">
      {children}
    </div>
  );
}

function IconBrain() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
      <path d="M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0-2 2.8A3 3 0 0 0 5 12a3 3 0 0 0 1 5.8V18a3 3 0 0 0 5 2.2A3 3 0 0 0 16 18v-.2A3 3 0 0 0 17 12a3 3 0 0 0 1-2.2A3 3 0 0 0 16 7V6a3 3 0 0 0-3-3" />
      <path d="M9 8h.01M9 12h.01M15 10h.01M14 15h.01" />
    </svg>
  );
}

function IconArrowRight() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function IconWhatsapp() {
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current">
      <path d="M20.52 3.48A11.78 11.78 0 0 0 12.07 0C5.55 0 .24 5.31.24 11.83c0 2.08.54 4.11 1.57 5.91L0 24l6.43-1.69a11.8 11.8 0 0 0 5.64 1.44h.01c6.52 0 11.83-5.31 11.83-11.83 0-3.16-1.23-6.12-3.39-8.44ZM12.08 21.7h-.01a9.82 9.82 0 0 1-5-1.37l-.36-.21-3.82 1 1.02-3.72-.23-.38a9.82 9.82 0 0 1-1.52-5.19c0-5.43 4.42-9.85 9.86-9.85 2.63 0 5.1 1.02 6.95 2.89a9.79 9.79 0 0 1 2.9 6.97c0 5.43-4.42 9.86-9.86 9.86Zm5.41-7.38c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.93 1.17-.17.2-.34.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.74-1.64-2.04-.17-.3-.02-.46.13-.61.13-.13.3-.34.44-.51.15-.17.2-.3.3-.49.1-.2.05-.37-.02-.52-.08-.15-.66-1.6-.91-2.19-.24-.57-.48-.49-.66-.5h-.56c-.2 0-.52.08-.79.37-.27.3-1.04 1.01-1.04 2.46s1.06 2.85 1.21 3.05c.15.2 2.08 3.17 5.05 4.45.71.31 1.27.5 1.7.63.71.23 1.35.2 1.86.12.57-.08 1.77-.72 2.02-1.42.25-.69.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

function IconMail() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.08 4.18 2 2 0 0 1 4.06 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.63 2.62a2 2 0 0 1-.45 2.11L8 9.94a16 16 0 0 0 6.06 6.06l1.49-1.24a2 2 0 0 1 2.11-.45c.84.3 1.72.51 2.62.63A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function IconId() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7 9h4M7 13h3M14 10h3M14 14h3" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconStar() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="m12 2.5 2.94 5.96 6.58.96-4.76 4.64 1.12 6.56L12 17.52 6.12 20.62l1.12-6.56L2.48 9.42l6.58-.96L12 2.5Z" />
    </svg>
  );
}

function SectionIcon({ type }: { type: Benefit["icon"] | ProcessStep["icon"] }) {
  const base = "h-7 w-7 fill-none stroke-current stroke-2";

  switch (type) {
    case "shield":
      return (
        <svg viewBox="0 0 24 24" className={base}>
          <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" className={base}>
          <path d="M4 19h16" />
          <path d="M7 15l3-3 3 2 4-5" />
          <path d="M17 9h2v2" />
        </svg>
      );
    case "users":
      return (
        <svg viewBox="0 0 24 24" className={base}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9.5" cy="7" r="3" />
          <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16.5 4.13a3 3 0 0 1 0 5.74" />
        </svg>
      );
    case "bolt":
      return (
        <svg viewBox="0 0 24 24" className={base}>
          <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
        </svg>
      );
    case "search":
      return (
        <svg viewBox="0 0 24 24" className={base}>
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.3-4.3" />
        </svg>
      );
    case "bulb":
      return (
        <svg viewBox="0 0 24 24" className={base}>
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <path d="M12 2a7 7 0 0 0-4 12.74c.63.44 1 1.16 1 1.92V17h6v-.34c0-.76.37-1.48 1-1.92A7 7 0 0 0 12 2Z" />
        </svg>
      );
    case "rocket":
      return (
        <svg viewBox="0 0 24 24" className={base}>
          <path d="M4.5 19.5c1.5-4 5-6.5 9-8 1.5-.5 3.5-3.5 4-7 0 0-3 .5-7 4-1.5 4-4 7.5-8 9Z" />
          <path d="M15 9l0 0" />
          <path d="M5 14 2 22l8-3" />
        </svg>
      );
    case "target":
      return (
        <svg viewBox="0 0 24 24" className={base}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="12" cy="12" r="1.5" className="fill-current stroke-none" />
        </svg>
      );
    default:
      return null;
  }
}

function WhatsappButton({
  label,
  message,
  onClick,
  loading,
  className = "",
}: {
  label: string;
  message: string;
  onClick: (message: string) => void;
  loading: boolean;
  className?: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onClick(message)}
      disabled={loading}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`group inline-flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-semibold shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition duration-300 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto ${className}`}
    >
      <span>{loading ? "Carregando atendimento..." : label}</span>
      <span className="transition duration-300 group-hover:translate-x-1">
        <IconArrowRight />
      </span>
    </motion.button>
  );
}

export default function Page() {
  const [phone, setPhone] = useState("");
  const [loadingPhone, setLoadingPhone] = useState(true);
  const [waError, setWaError] = useState<string | null>(null);
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    const cookieChoice = localStorage.getItem("cookie-consent");
    if (!cookieChoice) {
      setShowCookieBanner(true);
    }

    const fetchPhone = async () => {
      try {
        setLoadingPhone(true);

        const hostname = window.location.hostname.replace(/^www\./, "");
        const domain =
          hostname === "localhost" || hostname === "127.0.0.1"
            ? process.env.NEXT_PUBLIC_SITE_DOMAIN || hostname
            : hostname;

        if (!domain) {
          throw new Error("Domínio inválido.");
        }

        const response = await fetch(
          `${API_BASE}/zap?domain=${encodeURIComponent(domain)}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        const resolvedPhone = onlyDigits(data?.phone || data?.numero || "");

        if (!resolvedPhone) {
          throw new Error("Número não retornado pela API.");
        }

        setPhone(resolvedPhone);
        setWaError(null);
      } catch {
        setPhone("");
        setWaError("WhatsApp indisponível no momento.");
      } finally {
        setLoadingPhone(false);
      }
    };

    fetchPhone();
  }, []);

  const handleWhatsappClick = (message: string) => {
    if (loadingPhone) {
      alert("Carregando atendimento... tente novamente.");
      return;
    }

    if (!phone) {
      alert(waError || "WhatsApp indisponível no momento.");
      return;
    }

    const url = buildWhatsappUrl(phone, message);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowCookieBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookie-consent", "rejected");
    setShowCookieBanner(false);
  };

  const stats = useMemo(
    () => [
      { value: "1.000.000+", label: "Clientes Atendidos" },
      { value: "12+", label: "Anos de Experiência" },
      { value: "98%", label: "Satisfação dos Clientes" },
    ],
    []
  );

  return (
    <main className="bg-white text-slate-900">
      <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: -18 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 font-bold text-[#C8195C]"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#C8195C]/10 text-[#C8195C] shadow-sm">
              <IconBrain />
            </div>
            <span className="text-sm sm:text-lg">Consultoria & Assessoria</span>
          </motion.div>
        </div>
      </header>

     <section
  id="inicio"
  className="relative overflow-hidden bg-gradient-to-br from-[#C8195C] via-[#B01652] to-[#840F3C] px-4 py-12 text-white sm:px-6 lg:px-8 lg:py-20"
>
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_28%)]" />
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.10),transparent_32%)]" />
  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.12),transparent_40%)]" />
  <div className="absolute left-[-80px] top-[15%] h-56 w-56 rounded-full border border-white/10 bg-white/5 blur-2xl" />
  <div className="absolute right-[-100px] top-[10%] h-72 w-72 rounded-full border border-white/10 bg-white/5 blur-3xl" />
  <div className="absolute bottom-[-120px] left-[10%] h-72 w-72 rounded-full border border-white/10 bg-white/5 blur-3xl" />

  {Array.from({ length: 10 }).map((_, i) => (
    <motion.span
      key={i}
      className="absolute rounded-full bg-white/15"
      style={{
        width: i % 2 === 0 ? 6 : 10,
        height: i % 2 === 0 ? 6 : 10,
        left: `${8 + i * 8}%`,
        top: `${12 + (i % 4) * 16}%`,
      }}
      animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
      transition={{
        duration: 3 + i * 0.25,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  ))}

  <div className="relative mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
    <motion.div
      variants={fadeLeft}
      initial="hidden"
      animate="visible"
      custom={0}
    >
      <motion.div
        className="mb-6 inline-flex rounded-full border border-[#fcbd02] bg-[#fcbd02] px-4 py-2 text-sm font-semibold text-white/95 backdrop-blur-md"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Mega Feirão 2026
      </motion.div>

      <motion.h1
        className="max-w-2xl text-4xl font-extrabold leading-tight sm:text-5xl lg:text-6xl"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        Participe do <span className="text-[#fcbd02]">Feirão 2026</span> e
        verifique ofertas especiais
      </motion.h1>

      <motion.p
        className="mt-6 max-w-xl text-lg leading-8 text-white/90 sm:text-xl"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        Descontos que podem chegar a{" "}
        <strong className="text-[#fcbd02]">97%</strong> para resolver sua
        situação agora.
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
      >
        <WhatsappButton
          label="Quero Consultar Agora"
          message="Olá, gostaria de verificar meus descontos!"
          onClick={handleWhatsappClick}
          loading={loadingPhone}
          className="bg-white text-[#C8195C] hover:shadow-[0_0_36px_rgba(255,255,255,0.15)]"
        />
      </motion.div>

      {/* MOBILE: imagem entra no lugar das estatísticas */}
      <motion.div
        className="mt-8 lg:hidden"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <motion.div
          className="relative mx-auto flex max-w-[420px] items-center justify-center"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 -z-30 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.08)_35%,transparent_70%)] blur-2xl" />
          <div className="absolute left-1/2 top-1/2 -z-20 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm" />
          <div className="absolute bottom-4 left-1/2 -z-10 h-12 w-[72%] -translate-x-1/2 rounded-full bg-black/25 blur-2xl" />

          <motion.div
            whileHover={{ scale: 1.03 }}
            className="relative z-20 rounded-[28px] border border-white/10 bg-white/8 px-3 pt-3 backdrop-blur-sm"
          >
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
            <div className="absolute left-8 top-6 h-16 w-16 rounded-full bg-white/10 blur-2xl" />
            <img
              src="/smilling2.png"
              alt="Pessoa sorrindo com desconto"
              className="relative z-10 w-full object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.32)]"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* DESKTOP: stats continuam aqui */}
      <motion.div
        className="mt-8 hidden grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        {stats.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 + index * 0.1 }}
            className="rounded-[24px] border border-white/20 bg-white/10 p-4 text-center backdrop-blur-md"
          >
            <div className="text-2xl font-extrabold text-[#fcbd02] sm:text-3xl">
              {item.value}
            </div>
            <div className="mt-1 text-xs font-medium text-white sm:text-sm">
              {item.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>

    <motion.div
      className="relative"
      variants={fadeRight}
      initial="hidden"
      animate="visible"
      custom={0.2}
    >
      {/* MOBILE: stats entram no lugar da imagem */}
      <motion.div
        className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-5 lg:hidden"
        initial={{ y: 30 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        {stats.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 + index * 0.1 }}
            className="rounded-[24px] border border-white/20 bg-white/10 p-4 text-center backdrop-blur-md"
          >
            <div className="text-2xl font-extrabold text-[#fcbd02] sm:text-3xl">
              {item.value}
            </div>
            <div className="mt-1 text-xs font-medium text-white sm:text-sm">
              {item.label}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* DESKTOP: imagem continua aqui */}
      <motion.div
        className="relative mx-auto hidden max-w-[560px] items-center justify-center lg:flex"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 -z-30 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0.08)_35%,transparent_70%)] blur-2xl" />
        <div className="absolute left-1/2 top-1/2 -z-20 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm" />
        <div className="absolute left-1/2 top-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
        <div className="absolute left-1/2 top-1/2 -z-10 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" />

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          className="absolute -left-4 top-12 hidden rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/90 shadow-lg backdrop-blur-md md:block"
        >
          <strong className="text-[#fcbd02]">98%</strong> satisfação
        </motion.div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-2 bottom-16 hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white/90 shadow-lg backdrop-blur-md md:block"
        >
          <strong className="text-[#fcbd02]">1.000.000+</strong> atendimentos
        </motion.div>

        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-4 top-1/2 hidden rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm font-medium text-white/90 shadow-lg backdrop-blur-md lg:block"
        >
          <strong className="text-[#fcbd02]">12+</strong> anos de experiência
        </motion.div>

        <div className="absolute bottom-4 left-1/2 -z-10 h-14 w-[72%] -translate-x-1/2 rounded-full bg-black/25 blur-2xl" />

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative z-20 rounded-[32px] border border-white/10 bg-white/8 px-4 pt-4 backdrop-blur-sm"
        >
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
          <div className="absolute left-8 top-6 h-16 w-16 rounded-full bg-white/10 blur-2xl" />
          <img
            src="/smilling2.png"
            alt="Pessoa sorrindo com desconto"
            className="relative z-10 w-full object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.32)]"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  </div>
</section>

      <section className="bg-gradient-to-b from-white to-[#FFF7FA] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal delay={0.1}>
            <div className="mb-12 text-center sm:mb-16">
              <SectionBadge>Benefícios</SectionBadge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Por Que Optar pelos Nossos Serviços?
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Conheça os benefícios de colaborar conosco
              </p>
            </div>
          </Reveal>

          <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
            {benefits.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.12} className="h-full">
                <TiltCard className="h-full" shadowColor="rgba(200,25,92,0.18)">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[#C8195C]/10 bg-white p-8 shadow-[0_10px_22px_rgba(15,23,42,0.05)]">
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#C8195C]/35 to-transparent" />
                    <div className="absolute left-6 top-6 h-20 w-20 rounded-full bg-[#C8195C]/6 blur-2xl" />

                    <motion.div
                      className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#C8195C]/10 text-[#C8195C]"
                      whileHover={{ rotate: 8, scale: 1.08 }}
                      transition={{ duration: 0.25 }}
                      style={{ transform: "translateZ(28px)" }}
                    >
                      <SectionIcon type={item.icon} />
                    </motion.div>

                    <h3
                      className="text-xl font-bold text-slate-900"
                      style={{ transform: "translateZ(22px)" }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="mt-3 flex-1 leading-7 text-slate-500"
                      style={{ transform: "translateZ(16px)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="servicos" className="bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal delay={0.1}>
            <div className="mb-12 text-center sm:mb-16">
              <SectionBadge>Metodologia</SectionBadge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Nossa Metodologia de Consultoria
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Uma abordagem organizada e validada para revolucionar sua empresa
              </p>
            </div>
          </Reveal>

          <div className="grid items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
            {processSteps.map((item, index) => (
              <Reveal key={item.number} delay={index * 0.12} className="h-full">
                <TiltCard
                  className="h-full"
                  glareClassName="bg-white/15"
                  shadowColor="rgba(122, 9, 54, 0.38)"
                >
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/15 bg-gradient-to-br from-[#C8195C] via-[#B01652] to-[#8D0F41] p-8 text-white shadow-[0_14px_30px_rgba(200,25,92,0.16)]">
                    <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.16),transparent_35%)]" />
                    <div className="absolute left-6 top-6 h-24 w-24 rounded-full bg-white/10 blur-2xl" />

                    <motion.div
                      className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-sm font-bold text-white backdrop-blur-md"
                      whileHover={{ scale: 1.08 }}
                      style={{ transform: "translateZ(30px)" }}
                    >
                      {item.number}
                    </motion.div>

                    <motion.div
                      className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/12 text-white backdrop-blur-md"
                      whileHover={{ rotate: 8, scale: 1.06 }}
                      style={{ transform: "translateZ(28px)" }}
                    >
                      <SectionIcon type={item.icon} />
                    </motion.div>

                    <h3
                      className="pr-12 text-xl font-bold"
                      style={{ transform: "translateZ(22px)" }}
                    >
                      {item.title}
                    </h3>

                    <p
                      className="mt-3 flex-1 leading-7 text-white/85"
                      style={{ transform: "translateZ(16px)" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#C8195C] via-[#B01652] to-[#8D0F41] px-6 py-10 text-center text-white shadow-[0_25px_60px_rgba(200,25,92,0.22)] sm:px-10">
              <h3 className="text-2xl font-bold sm:text-4xl">
                Preparado para Revolucionar Sua Empresa?
              </h3>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/90 sm:text-lg">
                Nossa metodologia comprovada já auxiliou milhares de organizações a
                conquistarem resultados extraordinários. Não desperdice mais tempo e
                inicie sua trajetória de êxito hoje mesmo!
              </p>
              <div className="mt-8">
                <WhatsappButton
                  label="Solicitar Consultoria"
                  message="Olá, gostaria de verificar meus descontos!"
                  onClick={handleWhatsappClick}
                  loading={loadingPhone}
                  className="bg-white text-[#C8195C] hover:shadow-[0_0_36px_rgba(255,255,255,0.15)]"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="sobre" className="bg-gradient-to-b from-[#FFF7FA] to-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal delay={0.1}>
            <div className="mb-12 text-center sm:mb-16">
              <SectionBadge>Depoimentos</SectionBadge>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                O que Nossos Parceiros Falam
              </h2>
              <p className="mt-4 text-lg text-slate-500">
                Histórico de êxito e contentamento dos parceiros
              </p>
            </div>
          </Reveal>

          <div className="grid items-stretch gap-6 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <Reveal key={item.name} delay={index * 0.15} className="h-full">
                <TiltCard className="h-full" shadowColor="rgba(200,25,92,0.16)">
                  <div className="relative flex h-full flex-col overflow-hidden rounded-[28px] border border-[#C8195C]/10 bg-white p-8 shadow-[0_10px_22px_rgba(15,23,42,0.05)]">
                    <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#C8195C]/35 to-transparent" />
                    <div className="absolute left-6 top-6 h-20 w-20 rounded-full bg-[#C8195C]/6 blur-2xl" />

                    <div
                      className="mb-6 flex gap-1 text-amber-400"
                      style={{ transform: "translateZ(24px)" }}
                    >
                      {Array.from({ length: 5 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ scale: 0.7 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.25, delay: 0.2 + i * 0.06 }}
                        >
                          <IconStar />
                        </motion.div>
                      ))}
                    </div>

                    <p
                      className="flex-1 text-lg italic leading-8 text-slate-500"
                      style={{ transform: "translateZ(16px)" }}
                    >
                      {item.text}
                    </p>

                    <div
                      className="mt-6 flex items-center gap-4 border-t border-slate-100 pt-6"
                      style={{ transform: "translateZ(20px)" }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-14 w-14 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900">{item.name}</h4>
                        <p className="text-sm text-slate-500">{item.role}</p>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <footer
        id="contato"
        className="bg-[#5A0C2B] px-4 pb-8 pt-16 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <Reveal delay={0.1}>
            <div className="mb-14 rounded-[32px] bg-gradient-to-br from-[#C8195C] via-[#B01652] to-[#8D0F41] px-6 py-10 text-center shadow-[0_25px_60px_rgba(200,25,92,0.22)] sm:px-10">
              <h3 className="text-2xl font-bold sm:text-4xl">
                Preparado para Revolucionar sua Organização?
              </h3>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-8 text-white/90 sm:text-lg">
                Faça contato agora mesmo e descubra como podemos auxiliá-lo a
                conquistar suas metas
              </p>
              <div className="mt-8">
                <WhatsappButton
                  label="Entrar em Contato"
                  message="Olá, gostaria de verificar meus descontos!"
                  onClick={handleWhatsappClick}
                  loading={loadingPhone}
                  className="bg-white text-[#C8195C] hover:shadow-[0_0_36px_rgba(255,255,255,0.15)]"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="grid gap-10 rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:grid-cols-3">
              <div>
                <h3 className="text-xl font-bold">Sobre Nós</h3>
                <p className="mt-4 leading-7 text-white/80">
                  Convertendo obstáculos em oportunidades de desenvolvimento para o
                  seu empreendimento.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-bold">Navegação</h4>
                <ul className="mt-4 space-y-2 text-white/80">
                  <li>
                    <a href="#inicio" className="transition hover:text-white">
                      Início
                    </a>
                  </li>
                  <li>
                    <a href="#servicos" className="transition hover:text-white">
                      Serviços
                    </a>
                  </li>
                  <li>
                    <a href="#sobre" className="transition hover:text-white">
                      Sobre
                    </a>
                  </li>
                  <li>
                    <a href="#contato" className="transition hover:text-white">
                      Contato
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-bold">Políticas</h4>
                <ul className="mt-4 space-y-2 text-white/80">
                  <li>
                    <a href="/politica-de-privacidade" className="transition hover:text-white">
                      Privacidade
                    </a>
                  </li>
                  <li>
                    <a href="/termos-de-uso" className="transition hover:text-white">
                      Termos de Uso
                    </a>
                  </li>
                  <li>
                    <a href="/politica-de-cookies" className="transition hover:text-white">
                      Cookies
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="flex flex-col items-center gap-6 pt-8">
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/80">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <IconMail />
                  <span>contato@mjfinterioresconsultoria.com</span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <IconPhone />
                  <span>(41) 99686-9828</span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                  <IconId />
                  <span>CNPJ: 48.289.741/0001-60</span>
                </div>

                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-center">
                  <IconMap />
                  <span>
                    Avenida Afonso Arinos de Melo Franco, 222, Barra da Tijuca-RJ,
                    CEP: 22631-455
                  </span>
                </div>
              </div>

              <p className="text-center text-sm text-white/60">
                © 2026 mjfinterioresconsultoria. Todos os direitos reservados.
              </p>
            </div>
          </Reveal>
        </div>
      </footer>

      <motion.button
        type="button"
        aria-label="Falar no WhatsApp"
        onClick={() =>
          handleWhatsappClick("Olá, gostaria de verificar meus descontos!")
        }
        animate={{ scale: [1, 1.07, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.12 }}
        className="fixed bottom-5 right-5 z-[9999] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
      >
        <IconWhatsapp />
      </motion.button>

      {showCookieBanner && (
        <motion.div
          initial={{ y: 80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="fixed inset-x-0 bottom-0 z-[999] border-t-4 border-[#C8195C] bg-white px-4 py-5 shadow-[0_-5px_30px_rgba(0,0,0,0.18)] sm:px-6"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
            <p className="text-sm leading-6 text-slate-700">
              Utilizamos cookies para melhorar sua experiência. Ao continuar
              navegando, você concorda com nossa{" "}
              <a
                href="/politica-de-privacidade"
                className="font-semibold text-[#C8195C] hover:underline"
              >
                Política de Privacidade
              </a>{" "}
              e{" "}
              <a
                href="/termos-de-uso"
                className="font-semibold text-[#C8195C] hover:underline"
              >
                Termos de Uso
              </a>
              .
            </p>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={rejectCookies}
                className="rounded-xl border border-slate-200 bg-slate-100 px-5 py-2.5 font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-200"
              >
                Rejeitar
              </button>
              <button
                type="button"
                onClick={acceptCookies}
                className="rounded-xl bg-[#C8195C] px-5 py-2.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#B01652]"
              >
                Aceitar
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </main>
  );
}
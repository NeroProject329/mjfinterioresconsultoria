import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termos de Uso | MJF Interiores Consultoria",
  description:
    "Termos de Uso da MJF Interiores Consultoria.",
};

type IconProps = {
  className?: string;
};

function IconScale({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-none stroke-current stroke-2 ${className}`}>
      <path d="M12 3v18" />
      <path d="M5 6h14" />
      <path d="M6 6l-3 7h6L6 6Z" />
      <path d="M18 6l-3 7h6l-3-7Z" />
      <path d="M8 21h8" />
    </svg>
  );
}

function IconFile({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-none stroke-current stroke-2 ${className}`}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h6" />
    </svg>
  );
}

function IconMail({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-none stroke-current stroke-2 ${className}`}>
      <path d="M4 6h16v12H4z" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function IconMap({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-none stroke-current stroke-2 ${className}`}>
      <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconCheck({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-none stroke-current stroke-2 ${className}`}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.3 2.3 4.7-5" />
    </svg>
  );
}

function IconAlert({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-none stroke-current stroke-2 ${className}`}>
      <path d="M12 9v4" />
      <path d="M12 17h.01" />
      <path d="M10.3 3.8 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.8a2 2 0 0 0-3.4 0Z" />
    </svg>
  );
}

function IconShield({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-none stroke-current stroke-2 ${className}`}>
      <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3Z" />
    </svg>
  );
}

function IconRefresh({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={`fill-none stroke-current stroke-2 ${className}`}>
      <path d="M21 12a9 9 0 0 1-15.5 6.2" />
      <path d="M3 12A9 9 0 0 1 18.5 5.8" />
      <path d="M18 2v4h4" />
      <path d="M6 22v-4H2" />
    </svg>
  );
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-4 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur-md">
      {children}
    </div>
  );
}

const companyInfo = [
  {
    icon: IconFile,
    label: "CNPJ",
    value: "48.289.741/0001-60",
  },
  {
    icon: IconMail,
    label: "E-mail",
    value: "contato@mjfinterioresconsultoria.com",
  },
  {
    icon: IconMap,
    label: "Endereço",
    value:
      "Avenida Afonso Arinos de Melo Franco, 222, Barra da Tijuca-RJ, CEP: 22631-455",
  },
];

const termsSections = [
  {
    icon: IconCheck,
    title: "1. Aceitação dos termos",
    content: [
      "Ao acessar este site, utilizar seus recursos ou entrar em contato com a MJF Interiores Consultoria, o usuário declara que leu, compreendeu e concorda com estes Termos de Uso.",
      "Caso não concorde com alguma condição, recomendamos que não utilize o site ou os canais disponibilizados por ele.",
    ],
  },
  {
    icon: IconScale,
    title: "2. Sobre o site e os serviços",
    content: [
      "Este site tem finalidade informativa e comercial, apresentando conteúdos, orientações, formas de contato e informações relacionadas aos serviços oferecidos pela empresa.",
      "As informações apresentadas podem ser atualizadas, modificadas ou removidas a qualquer momento, sem aviso prévio.",
    ],
  },
  {
    icon: IconAlert,
    title: "3. Condições, prazos e resultados",
    content: [
      "Condições, análises, propostas, descontos, prazos ou benefícios podem variar conforme o caso, perfil do usuário, disponibilidade, regras internas, parceiros ou instituições envolvidas.",
      "Nenhuma informação exibida no site deve ser interpretada como promessa absoluta de resultado, aprovação, desconto ou contratação.",
    ],
  },
  {
    icon: IconShield,
    title: "4. Responsabilidades do usuário",
    content: [
      "O usuário se compromete a fornecer informações verdadeiras, completas e atualizadas sempre que entrar em contato ou preencher dados por meio do site.",
      "É proibido utilizar o site para práticas ilícitas, envio de informações falsas, tentativa de fraude, cópia indevida, invasão, exploração de falhas ou qualquer ação que prejudique a empresa ou terceiros.",
    ],
  },
  {
    icon: IconFile,
    title: "5. Propriedade intelectual",
    content: [
      "Textos, imagens, layout, identidade visual, estrutura, elementos gráficos e demais conteúdos presentes neste site pertencem à empresa ou são utilizados mediante autorização/licença.",
      "É proibida a cópia, reprodução, distribuição, modificação ou uso comercial dos conteúdos sem autorização prévia.",
    ],
  },
  {
    icon: IconRefresh,
    title: "6. Alterações destes termos",
    content: [
      "A MJF Interiores Consultoria poderá atualizar estes Termos de Uso a qualquer momento para refletir alterações no site, nos serviços, na legislação ou nas práticas internas.",
      "A versão mais recente estará sempre disponível nesta página.",
    ],
  },
];

function LegalFooter() {
  return (
    <footer className="bg-[#5A0C2B] px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 rounded-[28px] border border-white/10 bg-white/5 p-8 backdrop-blur-sm md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold">MJF Interiores Consultoria</h3>
            <p className="mt-4 leading-7 text-white/80">
              Convertendo obstáculos em oportunidades de desenvolvimento para o seu empreendimento.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold">Navegação</h4>
            <ul className="mt-4 space-y-2 text-white/80">
              <li>
                <Link href="/" className="transition hover:text-white">
                  Início
                </Link>
              </li>
              <li>
                <Link href="/#servicos" className="transition hover:text-white">
                  Serviços
                </Link>
              </li>
              <li>
                <Link href="/#sobre" className="transition hover:text-white">
                  Sobre
                </Link>
              </li>
              <li>
                <Link href="/#contato" className="transition hover:text-white">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold">Políticas</h4>
            <ul className="mt-4 space-y-2 text-white/80">
              <li>
                <Link href="/politica-de-privacidade" className="transition hover:text-white">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/termos-de-uso" className="transition hover:text-white">
                  Termos de Uso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="pt-8 text-center text-sm text-white/60">
          © 2026 mjfinterioresconsultoria. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}

export default function TermosDeUsoPage() {
  return (
    <main className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#C8195C] via-[#B01652] to-[#5A0C2B] px-4 py-20 text-white sm:px-6 lg:px-8 lg:py-24">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-[#fcbd02]/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-md transition hover:bg-white/15 hover:text-white"
          >
            ← Voltar para o início
          </Link>

          <div className="max-w-3xl">
            <SectionBadge>Regras de utilização</SectionBadge>

            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Termos de Uso
            </h1>

            <p className="mt-6 text-lg leading-8 text-white/85 sm:text-xl">
              Estes Termos de Uso estabelecem as condições para acesso, navegação
              e utilização deste site, bem como o relacionamento inicial com a
              MJF Interiores Consultoria.
            </p>

            <p className="mt-5 text-sm text-white/65">
              Última atualização: 29 de abril de 2026.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-[#FFF7FA] to-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 rounded-[32px] border border-[#C8195C]/10 bg-white p-6 shadow-[0_18px_45px_rgba(200,25,92,0.10)] sm:p-8">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#C8195C]/10 text-[#C8195C]">
              <IconScale className="h-7 w-7" />
            </div>

            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Identificação da empresa
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {companyInfo.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-[24px] border border-[#C8195C]/10 bg-[#FFF7FA] p-5"
                >
                  <div className="flex items-center gap-2 font-bold text-[#C8195C]">
                    <Icon className="h-5 w-5" />
                    {label}
                  </div>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {termsSections.map(({ icon: Icon, title, content }) => (
              <article
                key={title}
                className="rounded-[32px] border border-[#C8195C]/10 bg-white p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] sm:p-8"
              >
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#C8195C]/10 text-[#C8195C]">
                    <Icon className="h-7 w-7" />
                  </div>

                  <div>
                    <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
                      {title}
                    </h2>

                    <div className="mt-3 space-y-3">
                      {content.map((text) => (
                        <p key={text} className="leading-8 text-slate-600">
                          {text}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[32px] bg-gradient-to-br from-[#C8195C] via-[#B01652] to-[#8D0F41] p-6 text-white shadow-[0_25px_60px_rgba(200,25,92,0.22)] sm:p-8">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Dúvidas sobre estes termos?
            </h2>

            <p className="mt-4 max-w-3xl leading-8 text-white/85">
              Para qualquer dúvida sobre estes Termos de Uso, fale com a empresa
              pelo canal oficial abaixo.
            </p>

            <a
              href="mailto:contato@mjfinterioresconsultoria.com"
              className="mt-6 inline-flex rounded-2xl bg-white px-6 py-4 font-bold text-[#C8195C] shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition hover:-translate-y-1"
            >
              contato@mjfinterioresconsultoria.com
            </a>
          </div>
        </div>
      </section>

      <LegalFooter />
    </main>
  );
}
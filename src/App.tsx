import { useState, useEffect } from 'react'
import logoAcecan from './assets/logo-acecan.jpeg'

const NAV_LINKS = [
  { label: 'INÍCIO', href: '#inicio' },
  { label: 'CONHEÇA', href: '#sobre' },
  { label: 'SERVIÇOS', href: '#servicos' },
  { label: 'ASSOCIADO', href: '#associado' },
  { label: 'CONTRIBUIR', href: '#contribuir' },
  { label: 'PARCEIROS', href: '#parceiros' },
  { label: 'CONTATO', href: '#contato' },
]

// ─── Modal de Associação ────────────────────────────────────────────────────

const TIPOS_INSCRICAO = [
  'Pessoa Jurídica (PJ)',
  'Pessoa Física (PF)',
  'MEI — Microempreendedor Individual',
  'Produtor Rural',
]

function AssociarModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    tipoInscricao: '',
    nome: '',
    cpfCnpj: '',
    ramo: '',
    whatsapp: '',
    obs: '',
  })

  const set = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = [
      `Olá! Gostaria de me associar à ACECAN.`,
      ``,
      `*Tipo de inscrição:* ${form.tipoInscricao}`,
      `*Nome / Razão Social:* ${form.nome}`,
      `*CPF / CNPJ:* ${form.cpfCnpj}`,
      `*Ramo de atividade:* ${form.ramo}`,
      `*WhatsApp:* ${form.whatsapp}`,
      form.obs ? `*Observações:* ${form.obs}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    const url = `https://wa.me/556692108320?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const inputCls =
    'w-full border border-black/15 rounded px-4 py-3 text-sm text-[#0a2614] placeholder-gray-400 focus:outline-none focus:border-[#1b5e35] focus:ring-1 focus:ring-[#1b5e35]/30 transition-all bg-white'

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8"
      onClick={handleBackdrop}
    >
      <div className="bg-[#f8f5f0] w-full max-w-xl max-h-[90vh] overflow-y-auto rounded shadow-2xl">
        {/* Header */}
        <div className="bg-[#1b5e35] px-8 py-7 flex items-start justify-between">
          <div>
            <div className="w-8 h-0.5 bg-[#f0b429] mb-4" />
            <h2
              className="font-display text-white leading-tight"
              style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: 'clamp(1.4rem, 3vw, 1.9rem)' }}
            >
              QUERO ME ASSOCIAR
            </h2>
            <p className="text-white/70 text-sm mt-2 leading-relaxed max-w-xs">
              Preencha seus dados abaixo e nossa equipe entrará em contato
              pelo WhatsApp para dar continuidade à sua solicitação.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors mt-1 flex-shrink-0 ml-4"
            aria-label="Fechar"
          >
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 py-8 flex flex-col gap-5">
          <div>
            <label className="block text-xs font-semibold text-[#0a2614] tracking-widest uppercase mb-2">
              Tipo de inscrição <span className="text-[#1b5e35]">*</span>
            </label>
            <select
              required
              className={inputCls}
              value={form.tipoInscricao}
              onChange={set('tipoInscricao')}
            >
              <option value="" disabled>Selecione o tipo</option>
              {TIPOS_INSCRICAO.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0a2614] tracking-widest uppercase mb-2">
              Nome completo ou Razão Social <span className="text-[#1b5e35]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Seu nome ou nome da empresa"
              className={inputCls}
              value={form.nome}
              onChange={set('nome')}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0a2614] tracking-widest uppercase mb-2">
              CPF ou CNPJ <span className="text-[#1b5e35]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="000.000.000-00 ou 00.000.000/0001-00"
              className={inputCls}
              value={form.cpfCnpj}
              onChange={set('cpfCnpj')}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0a2614] tracking-widest uppercase mb-2">
              Ramo de atividade <span className="text-[#1b5e35]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="Ex.: comércio de roupas, salão de beleza, produção rural..."
              className={inputCls}
              value={form.ramo}
              onChange={set('ramo')}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0a2614] tracking-widest uppercase mb-2">
              WhatsApp <span className="text-[#1b5e35]">*</span>
            </label>
            <input
              type="tel"
              required
              placeholder="(66) 99999-9999"
              className={inputCls}
              value={form.whatsapp}
              onChange={set('whatsapp')}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#0a2614] tracking-widest uppercase mb-2">
              Observações
            </label>
            <textarea
              rows={3}
              placeholder="Informações adicionais (opcional)"
              className={`${inputCls} resize-none`}
              value={form.obs}
              onChange={set('obs')}
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-sm tracking-widest uppercase rounded transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.123 1.528 5.856L0 24l6.335-1.512A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.894 0-3.664-.497-5.192-1.364l-.362-.215-3.762.897.937-3.656-.233-.374A9.937 9.937 0 0 1 2 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
            ENVIAR PELO WHATSAPP
          </button>

          <p className="text-center text-gray-400 text-xs leading-relaxed">
            Ao enviar, você será redirecionado para o WhatsApp da ACECAN
            com seus dados preenchidos automaticamente.
          </p>
        </form>
      </div>
    </div>
  )
}

// ─── Header ─────────────────────────────────────────────────────────────────

function Header({ onAssociar }: { onAssociar: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0f3b20]/97 backdrop-blur-md shadow-lg'
          : 'bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#inicio" className="flex items-center group">
          <div className="bg-white rounded px-2 py-1 shadow-md">
            <img
              src={logoAcecan}
              alt="ACECAN — Associação Comercial e Empresarial de Canarana"
              className="h-10 w-auto object-contain"
            />
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-white/80 hover:text-white text-xs tracking-widest font-medium transition-colors duration-200"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={onAssociar}
            className="ml-4 px-5 py-2.5 bg-[#f0b429] hover:bg-[#f5c518] text-[#0a2614] text-xs font-bold tracking-widest uppercase rounded transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
          >
            QUERO ME ASSOCIAR
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-[#0a2614] border-t border-white/10 px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-white/80 hover:text-white text-sm tracking-widest font-medium py-1 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <button
            onClick={() => { setMenuOpen(false); onAssociar() }}
            className="mt-2 px-5 py-3 bg-[#f0b429] text-[#0a2614] text-sm font-bold tracking-widest uppercase rounded text-center cursor-pointer"
          >
            QUERO ME ASSOCIAR
          </button>
        </div>
      )}
    </header>
  )
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function Hero({ onAssociar }: { onAssociar: () => void }) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col justify-end overflow-hidden"
    >
      <div className="absolute inset-0 bg-[#0a2614]">
        <img
          src="https://images.unsplash.com/photo-1675896655875-c2bab196d4dd?w=1800&h=1000&fit=crop&auto=format"
          alt="Vista aérea de Canarana, Mato Grosso"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-[#0f3b20]/30 to-[#0a2614]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a2614]/40 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-28 pt-32">
        <div className="max-w-3xl">
          <h1
            className="font-display text-white mb-6 leading-[1.05]"
            style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: 'clamp(3rem, 8vw, 6.5rem)' }}
          >
            UNIÃO QUE<br />
            <em style={{ fontStyle: 'italic', fontWeight: 300, color: '#f0b429' }}>
              Transforma
            </em>
          </h1>

          <p className="text-white/80 text-lg lg:text-xl leading-relaxed mb-10 max-w-xl font-light">
            A ACECAN fortalecendo o comércio, a indústria, o agronegócio
            e os serviços de Canarana.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#sobre"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-[#f8f5f0] text-[#0f3b20] font-bold text-sm tracking-widest uppercase rounded transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
            >
              CONHEÇA A ACECAN
            </a>
            <button
              onClick={onAssociar}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#f0b429] hover:bg-[#f5c518] text-[#0a2614] font-bold text-sm tracking-widest uppercase rounded transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer"
            >
              QUERO ME ASSOCIAR
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
        <span className="text-white/50 text-[10px] tracking-[0.25em] uppercase">Role</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-white/50">
          <path d="M10 4v12M4 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  )
}

// ─── Quick Access (3 itens) ──────────────────────────────────────────────────

function QuickAccess({ onAssociar }: { onAssociar: () => void }) {
  return (
    <section className="bg-[#f8f5f0] py-0">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3">
          {/* 1. Quero me associar */}
          <button
            onClick={onAssociar}
            className="group text-left flex flex-col gap-3 px-8 py-10 border-b sm:border-b-0 border-r border-black/10 transition-all duration-300 hover:bg-[#1b5e35] hover:text-white cursor-pointer"
          >
            <div className="text-[#1b5e35] group-hover:text-[#f0b429] transition-colors duration-300">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" y1="8" x2="19" y2="14" />
                <line x1="22" y1="11" x2="16" y2="11" />
              </svg>
            </div>
            <div>
              <div
                className="font-display font-700 text-sm tracking-widest text-[#0a2614] group-hover:text-white mb-1 transition-colors"
                style={{ fontFamily: 'Fraunces, serif', fontWeight: 700 }}
              >
                QUERO ME ASSOCIAR
              </div>
              <div className="text-[#1b5e35]/70 group-hover:text-white/70 text-xs leading-relaxed transition-colors">
                Faça parte da ACECAN
              </div>
            </div>
            <div className="text-[#1b5e35] group-hover:text-[#f0b429] text-lg transition-all duration-300 group-hover:translate-x-1">→</div>
          </button>

          {/* 2. Serviços para Associados */}
          <a
            href="#servicos"
            className="group flex flex-col gap-3 px-8 py-10 border-b sm:border-b-0 border-r border-black/10 transition-all duration-300 hover:bg-[#1b5e35] hover:text-white"
          >
            <div className="text-[#1b5e35] group-hover:text-[#f0b429] transition-colors duration-300">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" ry="1" />
                <path d="M9 12h6M9 16h4" />
              </svg>
            </div>
            <div>
              <div
                className="font-display font-700 text-sm tracking-widest text-[#0a2614] group-hover:text-white mb-1 transition-colors"
                style={{ fontFamily: 'Fraunces, serif', fontWeight: 700 }}
              >
                SERVIÇOS PARA ASSOCIADOS
              </div>
              <div className="text-[#1b5e35]/70 group-hover:text-white/70 text-xs leading-relaxed transition-colors">
                Consulte serviços e benefícios
              </div>
            </div>
            <div className="text-[#1b5e35] group-hover:text-[#f0b429] text-lg transition-all duration-300 group-hover:translate-x-1">→</div>
          </a>

          {/* 3. Fale Conosco */}
          <a
            href="#contato"
            className="group flex flex-col gap-3 px-8 py-10 transition-all duration-300 hover:bg-[#1b5e35] hover:text-white"
          >
            <div className="text-[#1b5e35] group-hover:text-[#f0b429] transition-colors duration-300">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.64 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16l.42.92z" />
              </svg>
            </div>
            <div>
              <div
                className="font-display font-700 text-sm tracking-widest text-[#0a2614] group-hover:text-white mb-1 transition-colors"
                style={{ fontFamily: 'Fraunces, serif', fontWeight: 700 }}
              >
                FALE CONOSCO
              </div>
              <div className="text-[#1b5e35]/70 group-hover:text-white/70 text-xs leading-relaxed transition-colors">
                Entre em contato com a equipe
              </div>
            </div>
            <div className="text-[#1b5e35] group-hover:text-[#f0b429] text-lg transition-all duration-300 group-hover:translate-x-1">→</div>
          </a>
        </div>
      </div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────────────────────

function About() {
  return (
    <section id="sobre" className="bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[620px]">
        <div className="relative overflow-hidden min-h-[400px] lg:min-h-0 bg-[#1b5e35]">
          <img
            src="https://images.unsplash.com/photo-1648441095877-90406e6ba04d?w=900&h=700&fit=crop&auto=format"
            alt="Vista de Canarana, Mato Grosso"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#1b5e35]/20" />
        </div>

        <div className="flex flex-col justify-center px-10 lg:px-16 py-20">
          <div className="w-12 h-1 bg-[#f0b429] mb-8" />
          <h2
            className="font-display font-800 text-[#0a2614] mb-6 leading-tight"
            style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            UMA ASSOCIAÇÃO QUE FORTALECE CANARANA
          </h2>
          <p className="text-[#1b5e35]/80 text-base leading-relaxed mb-4">
            A <strong>ACECAN</strong> — Associação Comercial e Empresarial de Canarana atua na
            representação e fortalecimento das empresas e empreendedores locais, promovendo
            integração, desenvolvimento e oportunidades.
          </p>
          <p className="text-gray-500 text-base leading-relaxed mb-10">
            Com mais de três décadas de história, somos a voz do setor produtivo de Canarana
            junto às esferas municipal, estadual e federal, defendendo os interesses de quem
            move a economia local.
          </p>
        </div>
      </div>
    </section>
  )
}

// ─── Numbers ─────────────────────────────────────────────────────────────────

function Numbers() {
  const stats = [
    { value: '35+', label: 'ANOS DE ATUAÇÃO', desc: 'Décadas de presença e liderança em Canarana' },
    { value: '3', label: 'SETORES INTEGRADOS', desc: 'Comércio, indústria e agronegócio unidos' },
    { value: '4', label: 'CATEGORIAS DE SÓCIOS', desc: 'Planos para cada tipo de associado' },
  ]

  return (
    <section className="bg-[#1b5e35] py-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#f0b429]/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/20">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col items-start px-8 py-10 md:py-6">
              <span
                className="font-display text-[#f0b429] leading-none mb-2"
                style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: 'clamp(4rem, 8vw, 6rem)' }}
              >
                {s.value}
              </span>
              <span
                className="text-white font-display font-600 tracking-widest text-sm mb-2"
                style={{ fontFamily: 'Fraunces, serif', fontWeight: 600 }}
              >
                {s.label}
              </span>
              <span className="text-white/60 text-sm leading-relaxed">{s.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Why Join ────────────────────────────────────────────────────────────────

function WhyJoin() {
  const benefits = [
    { num: '01', title: 'REPRESENTATIVIDADE', desc: 'Uma voz coletiva e forte para os interesses empresariais junto aos poderes públicos.' },
    { num: '02', title: 'PROTEÇÃO AO CRÉDITO', desc: 'Serviços especializados para apoiar e proteger suas relações comerciais.' },
    { num: '03', title: 'CAPACITAÇÃO', desc: 'Cursos, palestras e oportunidades contínuas de desenvolvimento profissional.' },
    { num: '04', title: 'NETWORKING', desc: 'Conexões estratégicas entre empresas, empreendedores e lideranças locais.' },
    { num: '05', title: 'FORTALECIMENTO LOCAL', desc: 'Contribuição direta para o desenvolvimento econômico de Canarana.' },
  ]

  return (
    <section id="associado" className="bg-[#f8f5f0] py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <div className="w-10 h-1 bg-[#f0b429] mb-7" />
            <h2
              className="font-display font-800 text-[#0a2614] leading-tight mb-6"
              style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}
            >
              POR QUE FAZER PARTE DA ACECAN?
            </h2>
            <p className="text-gray-500 text-base leading-relaxed mb-10">
              Associar-se à ACECAN é fortalecer o seu negócio e contribuir
              para uma Canarana mais próspera.
            </p>
          </div>

          <div id="beneficios" className="flex flex-col divide-y divide-black/10">
            {benefits.map((b) => (
              <div key={b.num} className="flex gap-8 py-8 group">
                <span
                  className="font-display text-[#1b5e35]/20 font-800 text-3xl leading-none mt-1 group-hover:text-[#f0b429] transition-colors duration-300"
                  style={{ fontFamily: 'Fraunces, serif', fontWeight: 800 }}
                >
                  {b.num}
                </span>
                <div>
                  <div
                    className="font-display font-700 text-[#0a2614] text-sm tracking-widest mb-2"
                    style={{ fontFamily: 'Fraunces, serif', fontWeight: 700 }}
                  >
                    {b.title}
                  </div>
                  <p className="text-gray-500 text-base leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Services ────────────────────────────────────────────────────────────────

const WA_BASE = 'https://wa.me/556692108320'

function Services({ onEventos }: { onEventos: () => void }) {
  const [pixCopiado, setPixCopiado] = useState(false)
  const PIX_KEY = 'financeiro@acecan.com.br'

  const copiarPix = () => {
    navigator.clipboard.writeText(PIX_KEY).then(() => {
      setPixCopiado(true)
      setTimeout(() => setPixCopiado(false), 2500)
    })
  }

  const cardCls = 'group flex flex-col gap-5 p-8 hover:bg-[#1b5e35] transition-all duration-300'
  const titleCls = 'font-display font-700 text-[#0a2614] group-hover:text-white text-sm tracking-widest mb-2 transition-colors'
  const descCls = 'text-gray-400 group-hover:text-white/70 text-sm leading-relaxed transition-colors'
  const iconCls = 'text-[#1b5e35] group-hover:text-[#f0b429] transition-colors duration-300'
  const btnCls = 'mt-auto inline-flex items-center gap-1.5 text-[#1b5e35] group-hover:text-[#f0b429] text-xs font-bold tracking-widest uppercase underline underline-offset-4 transition-colors'

  return (
    <section id="servicos" className="bg-white py-24 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <div className="w-10 h-1 bg-[#f0b429] mb-7" />
            <h2
              className="font-display font-800 text-[#0a2614] leading-tight"
              style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}
            >
              SERVIÇOS PARA ASSOCIADOS
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm text-sm leading-relaxed">
            Facilitamos o dia a dia do associado com serviços práticos e acessíveis.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-black/10 divide-x divide-y divide-black/10">

          {/* 1. 2ª Via de Boleto */}
          <div className={cardCls}>
            <div className={iconCls}>
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <rect x="2" y="5" width="20" height="14" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </div>
            <div>
              <div className={titleCls} style={{ fontFamily: 'Fraunces, serif', fontWeight: 700 }}>
                2ª VIA DE BOLETO
              </div>
              <p className={descCls}>
                Solicite sua segunda via de boleto de forma rápida pelo WhatsApp.
              </p>
            </div>
            <a
              href={`${WA_BASE}?text=${encodeURIComponent('Olá! Preciso solicitar a 2ª via do meu boleto ACECAN.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={btnCls}
            >
              SOLICITAR PELO WHATSAPP →
            </a>
          </div>

          {/* 2. Pix */}
          <div className={cardCls}>
            <div className={iconCls}>
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </div>
            <div className="flex-1 flex flex-col gap-3">
              <div className={titleCls} style={{ fontFamily: 'Fraunces, serif', fontWeight: 700 }}>
                PAGAMENTO VIA PIX
              </div>
              <p className={descCls}>
                Consulte a chave Pix oficial da ACECAN e realize seu pagamento.
              </p>
              {/* Pix key */}
              <div className="flex items-center gap-2 bg-black/5 group-hover:bg-white/10 rounded px-3 py-2">
                <span className="text-[#0a2614] group-hover:text-white/90 text-xs font-mono flex-1 transition-colors truncate">
                  {PIX_KEY}
                </span>
                <button
                  onClick={copiarPix}
                  title="Copiar chave Pix"
                  className="text-[#1b5e35] group-hover:text-[#f0b429] flex-shrink-0 transition-colors"
                >
                  {pixCopiado
                    ? <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    : <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                  }
                </button>
              </div>
            </div>
            <a
              href={`${WA_BASE}?text=${encodeURIComponent('Olá! Quero enviar o comprovante do meu pagamento via Pix para a ACECAN.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className={btnCls}
            >
              ENVIAR COMPROVANTE →
            </a>
          </div>

          {/* 3. Eventos e Cursos */}
          <div className={`${cardCls} cursor-pointer`} onClick={onEventos}>
            <div className={iconCls}>
              <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
              </svg>
            </div>
            <div>
              <div className={titleCls} style={{ fontFamily: 'Fraunces, serif', fontWeight: 700 }}>
                EVENTOS E CURSOS
              </div>
              <p className={descCls}>
                Capacitação e desenvolvimento para associados.
              </p>
            </div>
            <span className={btnCls}>
              VER PROGRAMAÇÃO →
            </span>
          </div>

        </div>
      </div>
    </section>
  )
}

// ─── CTA Join ────────────────────────────────────────────────────────────────

function CtaJoin({ onAssociar }: { onAssociar: () => void }) {
  return (
    <section id="contribuir" className="relative bg-[#0f3b20] py-32 px-6 lg:px-10 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full border border-[#f0b429]/15 -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full border border-[#f0b429]/10 translate-y-1/3 -translate-x-1/3" />
      <div className="absolute top-12 left-12 w-2 h-2 rounded-full bg-[#f0b429]/60" />
      <div className="absolute top-24 right-48 w-1 h-1 rounded-full bg-[#f0b429]/40" />
      <div className="absolute bottom-16 right-16 w-3 h-3 rounded-full bg-[#f0b429]/30" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="w-10 h-1 bg-[#f0b429] mx-auto mb-8" />
        <h2
          className="font-display font-800 text-white leading-tight mb-8"
          style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
        >
          FAÇA PARTE DO DESENVOLVIMENTO DE CANARANA
        </h2>
        <p className="text-white/70 text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
          Associe-se à ACECAN e faça parte de uma rede que trabalha pelo fortalecimento
          empresarial e pelo desenvolvimento local.
        </p>
        <button
          onClick={onAssociar}
          className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#f0b429] hover:bg-[#f5c518] text-[#0a2614] font-bold text-sm tracking-widest uppercase rounded transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
        >
          QUERO ME ASSOCIAR
        </button>
      </div>
    </section>
  )
}

// ─── Modal Eventos e Cursos ──────────────────────────────────────────────────

function EventosModal({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 lg:p-8"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-[#1b5e35] px-8 py-7 flex items-start justify-between">
          <div>
            <div className="w-8 h-0.5 bg-[#f0b429] mb-4" />
            <h2
              className="font-display text-white leading-tight"
              style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: '1.6rem' }}
            >
              EVENTOS E CURSOS
            </h2>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors mt-1 ml-4" aria-label="Fechar">
            <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="px-8 py-10 text-center">
          <div className="w-16 h-16 rounded-full bg-[#e8f5ec] flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" fill="none" stroke="#1b5e35" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <p className="text-gray-500 text-base leading-relaxed mb-8">
            Em breve, a ACECAN disponibilizará aqui informações sobre cursos,
            palestras, eventos e capacitações.
          </p>
          <a
            href="https://wa.me/556692108320?text=Olá! Gostaria de saber sobre os próximos eventos e cursos da ACECAN."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-7 py-3.5 bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-sm tracking-widest uppercase rounded transition-all duration-200 shadow-md hover:shadow-lg"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.123 1.528 5.856L0 24l6.335-1.512A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.894 0-3.664-.497-5.192-1.364l-.362-.215-3.762.897.937-3.656-.233-.374A9.937 9.937 0 0 1 2 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
            FALAR COM A ACECAN
          </a>
        </div>
      </div>
    </div>
  )
}

// ─── Partners ────────────────────────────────────────────────────────────────

function BdmLogo() {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="80" height="80" rx="16" fill="#0d1f3c" />
      <circle cx="40" cy="40" r="30" stroke="#f0b429" strokeWidth="2.5" />
      <circle cx="40" cy="40" r="24" stroke="#f0b429" strokeWidth="1" strokeDasharray="3 2" />
      <text x="40" y="37" textAnchor="middle" fill="#f0b429" fontSize="13" fontWeight="800" fontFamily="Inter, sans-serif" letterSpacing="1">BDM</text>
      <text x="40" y="51" textAnchor="middle" fill="#f0b429" fontSize="8" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="2">DIGITAL</text>
    </svg>
  )
}

function Partners() {
  return (
    <section id="parceiros" className="bg-[#f8f5f0] py-20 px-6 lg:px-10">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#f0b429]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="22" height="22" fill="none" stroke="#f0b429" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </div>
          <div>
            <h2
              className="font-display text-[#0a2614] leading-tight"
              style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Nossos Parceiros
            </h2>
            <p className="text-gray-500 text-sm mt-1">Vantagens exclusivas para associados ACECAN</p>
          </div>
        </div>

        <div className="w-full h-px bg-black/10 mb-8" />

        {/* BDM Digital card */}
        <div className="bg-white border-2 border-[#f0b429]/60 rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

            {/* Logo */}
            <div className="flex-shrink-0">
              <BdmLogo />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-[#f0b429]/15 border border-[#f0b429]/40 text-[#0a2614] text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#f0b429">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                PARCERIA ACECAN
              </div>

              <h3
                className="font-display text-[#0a2614] mb-2"
                style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: 'clamp(1.15rem, 2vw, 1.4rem)' }}
              >
                BDM Digital
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-2xl">
                Parceria de crédito e investimentos para o seu negócio. O BDM Digital oferece taxas muito
                mais atrativas que os bancos tradicionais, com tecnologia brasileira e segurança blockchain.
                Pague, receba e invista de forma simples, rápida e segura.
              </p>
            </div>

            {/* Button */}
            <div className="flex-shrink-0 w-full sm:w-auto">
              <a
                href="https://bdmdigital.com.br/home"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0d1f3c] hover:bg-[#162d56] text-white text-sm font-bold rounded-lg transition-all duration-200 hover:shadow-lg w-full sm:w-auto whitespace-nowrap"
              >
                Saiba mais →
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── Contact ─────────────────────────────────────────────────────────────────

function Contact() {
  return (
    <section id="contato" className="bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 min-h-[560px]">
        <div className="flex flex-col justify-center px-10 lg:px-16 py-20 order-2 lg:order-1">
          <div className="w-10 h-1 bg-[#f0b429] mb-8" />
          <h2
            className="font-display font-800 text-[#0a2614] leading-tight mb-10"
            style={{ fontFamily: 'Fraunces, serif', fontWeight: 800, fontSize: 'clamp(2rem, 3.5vw, 2.8rem)' }}
          >
            FALE COM A ACECAN
          </h2>

          <div className="flex flex-col gap-6 mb-10">
            {/* Endereço — placeholder */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#e8f5ec] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="16" height="16" fill="none" stroke="#1b5e35" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-[#0a2614] text-sm">Endereço</div>
                <div className="text-gray-500 text-sm mt-0.5">Rua Mondaí, Nº 18, Sala 01, Centro</div>
                <div className="text-gray-400 text-xs mt-1">Canarana — Mato Grosso</div>
                <div className="text-gray-400 text-xs mt-0.5">Segunda a sexta · 07h30 às 11h30 · 13h30 às 17h30</div>
              </div>
            </div>

            {/* Telefone */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#e8f5ec] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="16" height="16" fill="none" stroke="#1b5e35" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.64 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.55 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6 6l.87-.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.5 16l.42.92z" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-[#0a2614] text-sm">Telefone / WhatsApp</div>
                <a href="https://wa.me/5566992108320" target="_blank" rel="noopener noreferrer" className="text-[#1b5e35] text-sm hover:underline mt-0.5 block">
                  (66) 99210-8320
                </a>
                <div className="text-gray-400 text-xs mt-0.5">Atendimento direto ao associado</div>
              </div>
            </div>

            {/* E-mail */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#e8f5ec] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="16" height="16" fill="none" stroke="#1b5e35" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-[#0a2614] text-sm">E-mail</div>
                <a href="mailto:acecancn@gmail.com" className="text-[#1b5e35] text-sm hover:underline mt-0.5 block">
                  acecancn@gmail.com
                </a>
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[#e8f5ec] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg width="16" height="16" fill="none" stroke="#1b5e35" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-[#0a2614] text-sm">Instagram</div>
                <a href="https://instagram.com/acecan_canaranamt" target="_blank" rel="noopener noreferrer" className="text-[#1b5e35] text-sm hover:underline mt-0.5 block">
                  @acecan_canaranamt
                </a>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/5566992108320"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#1da851] text-white font-bold text-sm tracking-widest uppercase rounded transition-all duration-200 shadow-lg hover:shadow-xl w-full sm:w-auto"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.557 4.123 1.528 5.856L0 24l6.335-1.512A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.894 0-3.664-.497-5.192-1.364l-.362-.215-3.762.897.937-3.656-.233-.374A9.937 9.937 0 0 1 2 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
            FALAR PELO WHATSAPP
          </a>
        </div>

        <div className="relative overflow-hidden min-h-[380px] lg:min-h-0 bg-[#1b5e35] order-1 lg:order-2">
          <img
            src="https://images.unsplash.com/photo-1729269768918-641bcb7d8812?w=900&h=700&fit=crop&auto=format"
            alt="Paisagem natural de Mato Grosso"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#1b5e35]/30" />
        </div>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#0a2614] pt-16 pb-8 px-6 lg:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-12 border-b border-white/10">
          <div>
            <div className="mb-5">
              <div className="bg-white inline-block rounded px-3 py-1.5">
                <img
                  src={logoAcecan}
                  alt="ACECAN — Associação Comercial e Empresarial de Canarana"
                  className="h-9 w-auto object-contain"
                />
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Associação Comercial e Empresarial de Canarana — fortalecendo o
              desenvolvimento local há mais de 35 anos.
            </p>
          </div>

          <div>
            <div className="text-white/40 text-xs tracking-widest uppercase mb-5">Navegação</div>
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <a key={l.label} href={l.href} className="text-white/60 hover:text-white text-sm transition-colors">
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <div className="text-white/40 text-xs tracking-widest uppercase mb-5">Contato</div>
            <div className="flex flex-col gap-3">
              <a href="tel:+556692108320" className="text-white/60 hover:text-white text-sm transition-colors">
                (66) 99210-8320
              </a>
              <a href="mailto:acecancn@gmail.com" className="text-white/60 hover:text-white text-sm transition-colors">
                acecancn@gmail.com
              </a>
              <a href="https://instagram.com/acecan_canaranamt" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white text-sm transition-colors">
                @acecan_canaranamt
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            © ACECAN — Associação Comercial e Empresarial de Canarana
          </p>
          <div className="w-8 h-0.5 bg-[#f0b429]/40" />
        </div>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [showModal, setShowModal] = useState(false)
  const [showEventos, setShowEventos] = useState(false)

  return (
    <div className="min-h-screen">
      {showModal && <AssociarModal onClose={() => setShowModal(false)} />}
      {showEventos && <EventosModal onClose={() => setShowEventos(false)} />}
      <Header onAssociar={() => setShowModal(true)} />
      <Hero onAssociar={() => setShowModal(true)} />
      <QuickAccess onAssociar={() => setShowModal(true)} />
      <About />
      <Numbers />
      <WhyJoin />
      <Services onEventos={() => setShowEventos(true)} />
      <CtaJoin onAssociar={() => setShowModal(true)} />
      <Partners />
      <Contact />
      <Footer />
    </div>
  )
}

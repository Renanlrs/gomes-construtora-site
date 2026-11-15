import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react'
import { MessageCircle, Instagram, ShieldCheck, TrendingUp, Landmark, BadgeCheck, Smile, ArrowUpRight, Play } from 'lucide-react'
import Hero from './HeroVideo'
import { WHATS, INSTA, FONE } from './contato'

const m = (n) => import.meta.env.BASE_URL + 'media/' + n
// logo oficial do WhatsApp (balão + telefone), vetorial = nítido em qualquer tela
function WhatsLogo({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  )
}

const sobe = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }

export default function App() {
  return (
    <>
      <Menu />
      <Hero />
      <Donos />
      <ObraReal />
      <PorDentro />
      <FaixaSonho />
      <Servicos />
      <FaixaPlanta />
      <Regularizacao />
      <QuemAssina />
      <EmAndamento />
      <ProvaSocial />
      <Final />
      <a href={WHATS} target="_blank" rel="noreferrer" aria-label="WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-[1.1rem] bg-gradient-to-b from-[#5BE37A] to-[#1FB855] text-white shadow-xl shadow-black/40 ring-1 ring-white/30 transition hover:scale-105">
        <WhatsLogo className="h-8 w-8" />
      </a>
    </>
  )
}

const ETAPAS_REAIS = [
  ['estacas/f_12.jpg', 'Perfuração das estacas', 'Corte, aterro e muro de arrimo prontos'],
  ['baldrame.jpg', 'Baldrame em EPS', 'Riviera de Santa Cristina XIII'],
  ['estrutura/f_08.jpg', 'Laje e escoramento', 'Riviera de Santa Cristina XIII'],
  ['obra1.jpg', 'Fachada em obra', 'Casa neoclássica · fev/2025'],
  ['pronta.jpg', 'Entregue', 'Casa neoclássica · 2026'],
]

// os donos logo depois da abertura: fotos REAIS dos posts @construtora.gomes (out/2021, CVOXkV-Jfjp e CVLgh2NJaNB),
// ampliadas 4x (Real-ESRGAN); frases = legendas originais dos posts
const DONOS = [
  ['Eng. Vaury Gomes', 'Engenharia e execução de obras', 'dono_vaury.jpg', '42% 30%', 'O meu maior prazer é poder ver sonhos saindo do papel. Isso é mágico.', 'av_vaury.jpg'],
  ['Eng. Gabriella Gomes', 'Engenharia e projeto de arquitetura', 'dono_gabriella.jpg', '58% 30%', 'Poder ajudar pessoas a realizarem seus sonhos é algo que preenche o meu coração.', 'av_gabriella.jpg'],
]

// destaque: foto oficial dos dois com o logo (fundo branco → seção branca, a foto "funde" com a página).
// Fonte: print enviado pelo Marilton 15/11 (586x715), ampliado 4x Real-ESRGAN → donos_duo.jpg 1600px
function Donos() {
  return (
    <section id="donos" className="relative overflow-hidden bg-white px-6 pb-20 pt-14 text-grafite md:px-12 md:pb-28 md:pt-16">
      {/* destaque: só a foto dos dois + o botão */}
      <motion.div {...sobe} className="relative mx-auto flex max-w-3xl flex-col items-center">
        <div className="absolute inset-x-[12%] bottom-[14%] top-[18%] rounded-full bg-laranja/15 blur-3xl" />
        <img src={m('donos_duo3.jpg')} alt="Eng. Vaury Gomes e Eng. Gabriella Gomes, donos da Gomes Construtora"
          className="relative w-full max-w-[42rem] mix-blend-multiply" />
        <a href={WHATS} target="_blank" rel="noreferrer" className="relative -mt-2 inline-flex items-center gap-2.5 rounded-full bg-laranja px-8 py-4 font-body text-[15px] font-semibold text-white shadow-xl shadow-laranja/40 transition hover:scale-[1.03] hover:brightness-110 md:text-base">
          <WhatsLogo className="h-5 w-5" /> Falar com os engenheiros
        </a>
      </motion.div>
      {/* na obra: fotos de capacete no canteiro com a frase de cada um */}
      <div className="mx-auto mt-16 grid max-w-6xl gap-5 md:mt-20 md:grid-cols-2 md:gap-6">
        {DONOS.map(([n, d, foto, pos, frase], i) => (
          <motion.figure key={n} {...sobe} transition={{ ...sobe.transition, delay: i * 0.12 }}
            className="group relative aspect-[4/5] overflow-hidden rounded-3xl md:aspect-[5/6]">
            <img src={m(foto)} alt={n + ' na obra'} loading="lazy" style={{ objectPosition: pos }}
              className="h-full w-full object-cover transition duration-[1.2s] group-hover:scale-[1.04]" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              <blockquote className="font-script text-[1.7rem] leading-snug text-white drop-shadow md:text-[2rem]">“{frase}”</blockquote>
              <div className="mt-4 flex items-center gap-3">
                <img src={m('simbolo.png')} alt="" className="h-8 w-auto" />
                <div>
                  <div className="font-serif text-lg font-bold text-white md:text-xl">{n}</div>
                  <div className="font-body text-[12px] text-white/75">{d}</div>
                </div>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  )
}

function ObraReal() {
  return (
    <section className="bg-grafite px-6 py-24 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div {...sobe}>
          <div className="tag">Obra de verdade</div>
          <h2 className="mt-2 font-serif text-[9vw] font-extrabold uppercase leading-[0.95] md:text-[3.6vw]">
            O 3D vira <span className="text-laranja">obra</span>
          </h2>
          <p className="mt-3 max-w-xl font-body text-[14px] text-white/70">Fotos reais das nossas obras, da estaca à entrega.</p>
        </motion.div>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
          {ETAPAS_REAIS.map(([f, t, d], i) => (
            <motion.figure {...sobe} transition={{ ...sobe.transition, delay: i * 0.08 }} key={f} className={'group relative overflow-hidden rounded-2xl ' + (i === 4 ? 'col-span-2 md:col-span-1' : '')}>
              <img src={m(f)} alt={t} loading="lazy" className="aspect-[3/4] h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-3">
                <div className="mini text-laranja2">Etapa {String(i + 1).padStart(2, '0')}</div>
                <div className="font-serif text-[15px] font-bold leading-tight">{t}</div>
                <div className="font-body text-[11px] text-white/75">{d}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

// logo do final com brilho de estrela no símbolo laranja (chama atenção)
function LogoBrilho() {
  const sim = { left: 0, top: 0, width: (374 / 1613) * 100 + '%', height: '100%' }
  const estrelas = [['22%', '18%', '0s', 1], ['2%', '3%', '1.1s', 0.75], ['21%', '95%', '2.2s', 0.6], ['10%', '52%', '3.2s', 0.5]]
  return (
    <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-[78vw] max-w-[560px]">
      {/* halo pulsando atrás do símbolo */}
      <div className="halo pointer-events-none absolute" style={sim} />
      <img src={m('logo_branco.png')} alt="Gomes Engenharia · Projetos · Construções" className="relative w-full" />
      {/* reflexo de luz passando só pela parte laranja */}
      <div className="brilho-mask pointer-events-none absolute" style={{ ...sim, WebkitMaskImage: `url(${m('simbolo.png')})`, maskImage: `url(${m('simbolo.png')})` }}>
        <div className="brilho-faixa" />
      </div>
      {estrelas.map(([x, y, atraso, k]) => (
        <svg key={x + y} viewBox="0 0 100 100" className="estrela pointer-events-none absolute" style={{ left: x, top: y, width: 17 * k + '%', aspectRatio: '1 / 1', animationDelay: atraso }}>
          <path d="M50 0 C53 38 62 47 100 50 C62 53 53 62 50 100 C47 62 38 53 0 50 C38 47 47 38 50 0Z" fill="white" />
          <circle cx="50" cy="50" r="7" fill="#FFD2B0" />
        </svg>
      ))}
    </motion.div>
  )
}

function Menu() {
  const { scrollY } = useScroll()
  const [solido, setSolido] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setSolido(v > innerHeight * 9.3)) // depois da animação (1000vh)
  return (
    <header className={'fixed inset-x-0 top-0 z-40 flex items-center justify-between px-5 transition-all duration-300 md:px-12 ' + (solido ? 'bg-grafite/90 py-2.5 shadow-lg shadow-black/30 backdrop-blur' : 'py-4')}>
      <a href="#topo"><img src={m('logo_branco.png')} alt="Gomes Engenharia · Projetos · Construções" className={(solido ? "h-8 md:h-10" : "h-10 md:h-14") + " w-auto drop-shadow-[0_2px_10px_rgba(0,0,0,.6)] transition-all"} /></a>
      <nav className="hidden items-center gap-7 font-body text-[13px] font-medium text-white/90 md:flex">
        <a href="#obras" className="hover:text-laranja">A casa</a>
        <a href="#servicos" className="hover:text-laranja">Serviços</a>
        <a href="#regularizacao" className="hover:text-laranja">Regularização</a>
        <a href="#equipe" className="hover:text-laranja">Quem assina</a>
        <a href={WHATS} target="_blank" rel="noreferrer" className="rounded-full bg-laranja px-4 py-2 font-semibold text-white hover:brightness-110">Orçar obra</a>
      </nav>
      {/* celular: só o botão principal */}
      <a href={WHATS} target="_blank" rel="noreferrer" className="rounded-full bg-laranja px-4 py-2 font-body text-[13px] font-semibold text-white shadow-lg shadow-black/30 md:hidden">Orçar obra</a>
    </header>
  )
}

const AMBIENTES = [
  ['int_living.jpg', 'Living', 'pé-direito alto, molduras na parede e pendente'],
  ['int_corredor.jpg', 'Circulação', 'corredor com claraboia e luz natural'],
  ['int_suite.jpg', 'Suíte', 'painel amadeirado e armários planejados'],
  ['int_banheira.jpg', 'Banho', 'banheira com porta de correr para o jardim'],
  ['int_cuba.jpg', 'Lavatório', 'bancada clara com cuba de apoio'],
  ['int_cozinha.jpg', 'Cozinha', 'marcenaria planejada do piso ao teto'],
  ['int_ilha.jpg', 'Ilha', 'cooktop, forno embutido e coifa'],
  ['int_piscina.jpg', 'Piscina', 'raia com muro em pedra natural'],
]

function PorDentro() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-72%'])
  return (
    <section id="obras" ref={ref} className="relative h-[320vh] bg-creme text-grafite">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden pt-14">
        <div className="px-6 md:px-12">
          <div className="tag">Por dentro · obra entregue</div>
          <h2 className="mt-2 font-serif text-[9vw] font-extrabold uppercase leading-[0.95] md:text-[3.6vw]">
            Cada ambiente <span className="font-script text-[11vw] normal-case text-laranja md:text-[4.6vw]">pensado</span>
          </h2>
          <p className="mt-2 max-w-xl font-body text-[14px] text-grafite2">Fotos reais de uma casa construída pela Gomes. Não é render: é como ficou.</p>
        </div>
        <motion.div style={{ x }} className="mt-8 flex gap-4 pl-6 md:gap-6 md:pl-12">
          {AMBIENTES.map(([f, t, d], i) => (
            <figure key={f} className="group relative h-[52svh] w-[64vw] shrink-0 overflow-hidden rounded-2xl bg-grafite md:h-[58vh] md:w-[24vw]">
              <img src={m(f)} alt={t + ' — ' + d} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                <div className="mini text-laranja2">{String(i + 1).padStart(2, '0')}</div>
                <div className="font-serif text-lg font-bold">{t}</div>
                <div className="font-body text-[12px] text-white/85">{d}</div>
              </figcaption>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

const SERVICOS = [
  ['Projetos arquitetônicos', 'Do estudo ao executivo, desenhado para o seu terreno e o seu jeito de viver.'],
  ['Projetos complementares', 'Os projetos técnicos da obra, compatibilizados com a arquitetura.'],
  ['Aprovação na prefeitura', 'Aprovação de projeto residencial e comercial junto à prefeitura.'],
  ['Regularização', 'Regularização de imóvel residencial e comercial junto à prefeitura.'],
  ['Execução de obra', 'Da fundação ao acabamento, com engenheiro responsável e acompanhamento de perto.'],
]

function Servicos() {
  return (
    <section id="servicos" className="relative bg-grafite px-6 py-24 md:px-12 md:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-[.07] [background-image:linear-gradient(#F06722_1px,transparent_1px),linear-gradient(90deg,#F06722_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div {...sobe}>
          <div className="tag">Serviços</div>
          <h2 className="mt-2 font-serif text-[9vw] font-extrabold uppercase leading-[0.95] md:text-[3.6vw]">
            Tudo numa <span className="text-laranja">só equipe</span>
          </h2>
        </motion.div>
        <div className="mt-12 divide-y divide-white/10 border-y border-white/10">
          {SERVICOS.map(([t, d], i) => (
            <motion.a {...sobe} transition={{ ...sobe.transition, delay: i * 0.06 }} key={t} href={WHATS} target="_blank" rel="noreferrer"
              className="group grid grid-cols-[3rem_1fr_auto] items-center gap-4 py-6 md:grid-cols-[5rem_1fr_1.2fr_auto] md:py-8">
              <span className="font-serif text-sm font-bold text-laranja">{String(i + 1).padStart(2, '0')}</span>
              <span className="font-serif text-xl font-bold uppercase tracking-tight transition group-hover:text-laranja md:text-3xl">{t}</span>
              <span className="col-span-3 col-start-2 font-body text-[14px] text-white/70 md:col-span-1 md:col-start-auto">{d}</span>
              <ArrowUpRight className="row-start-1 col-start-3 h-5 w-5 text-white/50 transition group-hover:rotate-45 group-hover:text-laranja md:col-start-4" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

const PORQUE = [
  [TrendingUp, 'Valoriza o seu patrimônio'],
  [ShieldCheck, 'Garante segurança jurídica'],
  [Landmark, 'Libera financiamento bancário e venda do imóvel'],
  [BadgeCheck, 'Evita multas e problemas com a prefeitura'],
  [Smile, 'Traz tranquilidade e regularidade para o seu imóvel'],
]

function Regularizacao() {
  return (
    <section id="regularizacao" className="bg-laranja px-6 py-24 text-white md:px-12 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
        <motion.div {...sobe}>
          <div className="mini font-semibold text-white/85">Lei do Puxadinho · já está em vigor</div>
          <h2 className="mt-3 font-serif text-[10vw] font-black uppercase leading-[0.92] md:text-[4vw]">
            Ampliou sem aprovar? <span className="text-grafite">Dá pra regularizar.</span>
          </h2>
          <p className="mt-5 max-w-md font-body text-[15px] leading-relaxed text-white/95">
            A lei permite regularizar construções e ampliações existentes. A nossa equipe cuida do levantamento, do projeto e de todo o processo na prefeitura.
          </p>
          <a href={WHATS} target="_blank" rel="noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full bg-grafite px-6 py-3 font-body text-[14px] font-semibold text-white hover:bg-black">
            <WhatsLogo className="h-4 w-4" /> Regularizar meu imóvel
          </a>
        </motion.div>
        <ul className="space-y-3">
          {PORQUE.map(([Ic, t], i) => (
            <motion.li {...sobe} transition={{ ...sobe.transition, delay: i * 0.07 }} key={t} className="flex items-center gap-4 rounded-2xl bg-white/12 px-5 py-4 backdrop-blur [background:rgba(255,255,255,.12)]">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-laranja"><Ic className="h-5 w-5" /></span>
              <span className="font-body text-[15px] font-medium">{t}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// vídeo da Eng. Gabriella (enviado pelo cliente): igual ao WhatsApp — miniatura original + play; ao tocar, começa do início com som
function VideoCard({ src, capa, rotulo, aria }) {
  const v = useRef(null)
  const [tocando, setTocando] = useState(false)
  const play = () => { const el = v.current; if (!el) return; el.muted = false; el.currentTime = 0; el.play().then(() => setTocando(true)).catch(() => {}) }
  const sair = () => { const el = v.current; if (el && !el.paused) el.pause() }
  return (
    <motion.div onViewportLeave={sair} className="relative aspect-[9/16] w-full overflow-hidden rounded-3xl bg-grafite shadow-2xl">
      <video ref={v} src={m(src)} poster={m(capa)} playsInline preload="none" controls={tocando}
        onEnded={() => setTocando(false)} className="h-full w-full object-cover" />
      {!tocando && (
        <button onClick={play} aria-label={aria} className="group absolute inset-0 flex items-center justify-center bg-black/10">
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-black/45 backdrop-blur-sm ring-2 ring-white/80 transition group-hover:scale-110 group-hover:bg-laranja">
            <Play className="ml-1 h-9 w-9 fill-white text-white" />
          </span>
          <span className="absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-laranja px-5 py-2.5 font-body text-[13px] font-semibold text-white shadow-lg shadow-black/40">
            {rotulo}
          </span>
        </button>
      )}
    </motion.div>
  )
}

function VideoTour() {
  return <VideoCard src="tour_gabriella.mp4" capa="tour_capa.jpg" rotulo="Assistir · 1min32" aria="Assistir ao vídeo da Eng. Gabriella" />
}

// prova social: depoimento da cliente (post CTFvhJAJd0i) + bastidor da Eng. Gabriella na obra (CXKYjPkD1N8)
function ProvaSocial() {
  return (
    <section id="depoimentos" className="bg-creme px-6 py-24 text-grafite md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div {...sobe} className="mx-auto max-w-3xl text-center">
          <div className="tag">Quem construiu com a Gomes</div>
          <h2 className="mt-2 font-serif text-[9vw] font-extrabold uppercase leading-[0.95] md:text-[3.6vw]">
            Vai além de uma obra. <span className="block font-script text-[11vw] normal-case text-laranja md:text-[4.6vw]">É a construção de um sonho.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-body text-[15px] leading-relaxed text-grafite2">
            Quem mora numa casa Gomes conta melhor do que a gente. E quem está na obra todo dia também.
          </p>
        </motion.div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-12 sm:grid-cols-2">
          <motion.figure {...sobe} className="relative mx-auto w-full max-w-[20rem]">
            <div className="absolute -left-3 -top-3 h-full w-full rounded-3xl border-2 border-laranja" />
            <VideoCard src="depoimento_larissa.mp4" capa="depoimento_capa.jpg" rotulo="Depoimento · 41s" aria="Assistir ao depoimento da cliente Larissa" />
            <figcaption className="mt-5 text-center">
              <p className="font-script text-[1.7rem] leading-snug text-laranja">“Somos gratos por ter feito parte do seu sonho.”</p>
              <p className="mt-1 font-body text-[13px] text-grafite2">Larissa · cliente Gomes, casa nova</p>
            </figcaption>
          </motion.figure>
          <motion.figure {...sobe} transition={{ ...sobe.transition, delay: 0.12 }} className="relative mx-auto w-full max-w-[20rem]">
            <div className="absolute -right-3 -top-3 h-full w-full rounded-3xl border-2 border-grafite/80" />
            <VideoCard src="gabriella_obra.mp4" capa="gabriella_obra_capa.jpg" rotulo="Bastidores · 10s" aria="Assistir ao vídeo da Eng. Gabriella na obra" />
            <figcaption className="mt-5 text-center">
              <p className="font-script text-[1.7rem] leading-snug text-laranja">“Sei, sim. Eu toco a sua obra.”</p>
              <p className="mt-1 font-body text-[13px] text-grafite2">Eng. Gabriella Gomes · responsável na obra</p>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  )
}

// faixa larga: os dois engenheiros conferindo o projeto na mesa da obra (post CUH8bGWLBPA)
function FaixaSonho() {
  return (
    <section className="relative h-[78svh] min-h-[28rem] overflow-hidden">
      <img src={m('donos_mesa.jpg')} alt="Eng. Gabriella e Eng. Vaury conferindo o projeto na obra" loading="lazy" className="absolute inset-0 h-full w-full object-cover object-[60%_35%]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent md:bg-gradient-to-r md:from-black/80 md:via-black/40" />
      <motion.div {...sobe} className="relative mx-auto flex h-full max-w-6xl flex-col justify-end px-6 pb-14 md:justify-center md:px-12 md:pb-0">
        <div className="tag">Do projeto à chave</div>
        <h2 className="mt-2 max-w-xl font-serif text-[10vw] font-extrabold uppercase leading-[0.95] text-white md:text-[4vw]">
          Cada traço <span className="block font-script text-[12vw] normal-case text-laranja md:text-[5vw]">conferido de perto</span>
        </h2>
        <p className="mt-4 max-w-md font-body text-[15px] leading-relaxed text-white/85">
          Projeto aberto na mesa da obra, trena na mão e os dois engenheiros juntos. É assim que a planta vira casa, sem surpresa.
        </p>
      </motion.div>
    </section>
  )
}

// Eng. Gabriella com a planta (post CV3ooeYJj5v)
function FaixaPlanta() {
  return (
    <section className="bg-white px-6 py-20 text-grafite md:px-12 md:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <motion.div {...sobe} className="relative mx-auto w-full max-w-md">
          <div className="absolute -bottom-3 -right-3 h-full w-full rounded-3xl bg-laranja/90" />
          <img src={m('gabriella_planta.jpg')} alt="Eng. Gabriella Gomes analisando a planta" loading="lazy" className="relative aspect-[4/5] w-full rounded-3xl object-cover" />
        </motion.div>
        <motion.div {...sobe}>
          <div className="tag">Projeto de arquitetura</div>
          <blockquote className="mt-3 font-script text-[10vw] leading-[1.05] text-laranja md:text-[3.6vw]">
            “Antes do tijolo, vem o sonho no papel.”
          </blockquote>
          <p className="mt-5 max-w-md font-body text-[15px] leading-relaxed text-grafite2">
            A planta é desenhada para o seu terreno e para o jeito da sua família viver. E quem desenha é quem acompanha a obra.
          </p>
          <div className="mt-5 font-serif text-lg font-bold">Eng. Gabriella Gomes</div>
          <a href={WHATS} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-full bg-grafite px-6 py-3 font-body text-[14px] font-semibold text-white hover:bg-black">
            <WhatsLogo className="h-4 w-4" /> Quero o meu projeto
          </a>
        </motion.div>
      </div>
    </section>
  )
}

function QuemAssina() {
  return (
    <section id="equipe" className="bg-creme px-6 py-24 text-grafite md:px-12 md:py-32">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <motion.div {...sobe} className="relative mx-auto w-full max-w-[19rem] md:max-w-sm">
          <div className="absolute -left-3 -top-3 h-full w-full rounded-3xl border-2 border-laranja" />
          <VideoTour />
        </motion.div>
        <motion.div {...sobe}>
          <div className="tag">Quem assina</div>
          <h2 className="mt-2 font-serif text-[9vw] font-extrabold uppercase leading-[0.95] md:text-[3.6vw]">
            Engenheiro <span className="font-script text-[11vw] normal-case text-laranja md:text-[4.6vw]">na obra</span>
          </h2>
          <p className="mt-5 max-w-lg font-body text-[15px] leading-relaxed text-grafite2">
            Na Gomes, quem projeta é quem acompanha a obra. Você fala direto com os engenheiros, do primeiro traço à entrega das chaves. Dá o play: a Eng. Gabriella mostra uma casa entregue, ambiente por ambiente.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[['Eng. Vaury Gomes', 'Engenharia e execução de obras', 'av_vaury.jpg', '50% 50%'], ['Eng. Gabriella Gomes', 'Engenharia e projeto de arquitetura', 'av_gabriella.jpg', '50% 50%']].map(([n, d, foto, pos]) => (
              <div key={n} className="flex items-center gap-4 rounded-2xl border border-grafite/10 bg-white p-4 shadow-sm">
                <img src={m(foto)} alt={n} loading="lazy" style={{ objectPosition: pos }} className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-laranja" />
                <div>
                  <div className="font-serif text-lg font-bold leading-tight">{n}</div>
                  <div className="font-body text-[13px] text-grafite2">{d}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function EmAndamento() {
  return (
    <section className="bg-grafite px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div {...sobe} className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="tag">Em execução · Riviera de Santa Cristina XIII</div>
            <h2 className="mt-2 font-serif text-[9vw] font-extrabold uppercase leading-[0.95] md:text-[3.6vw]">
              A próxima <span className="text-laranja">já está subindo</span>
            </h2>
          </div>
          <p className="max-w-sm font-body text-[13px] text-white/70">Projeto de arquitetura de Ricardo Almeida Arquitetos, executado pela Gomes. A fundação em EPS e a estrutura que você viu lá em cima são desta obra.</p>
        </motion.div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[['render1.jpg', 'Fachada'], ['render_piscina.jpg', 'Área da piscina'], ['render_gourmet.jpg', 'Espaço gourmet']].map(([f, t], i) => (
            <motion.figure {...sobe} transition={{ ...sobe.transition, delay: i * 0.08 }} key={f} className={'relative overflow-hidden rounded-2xl ' + (i === 0 ? 'md:col-span-2 md:row-span-2' : '')}>
              <img src={m(f)} alt={t} loading="lazy" className="h-full w-full object-cover" />
              <figcaption className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 font-body text-[11px] font-semibold uppercase tracking-wider backdrop-blur">{t} · projeto</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function Final() {
  return (
    <section className="relative overflow-hidden">
      <img src={m('pronta.jpg')} alt="Casa neoclássica entregue pela Gomes" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-5xl flex-col items-center justify-center px-6 py-24 text-center">
        <LogoBrilho />
        <motion.p {...sobe} className="mt-10 font-serif text-[7vw] font-extrabold uppercase leading-tight md:text-[2.6vw]">
          Nossa missão é <span className="text-laranja">construir seu sonho!</span>
        </motion.p>
        <motion.div {...sobe} className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={WHATS} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-laranja px-7 py-4 font-body text-[15px] font-semibold text-white shadow-xl shadow-laranja/40 hover:brightness-110">
            <WhatsLogo className="h-5 w-5" /> {FONE}
          </a>
          <a href={INSTA} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/70 px-7 py-4 font-body text-[15px] font-semibold text-white hover:bg-white/10">
            <Instagram className="h-5 w-5" /> @construtora.gomes
          </a>
        </motion.div>
      </div>
      <footer className="relative border-t border-white/10 px-6 py-6 text-center font-body text-[12px] text-white/55">
        Gomes Engenharia · Projetos · Construções — Eng. Vaury Gomes · Eng. Gabriella Gomes
      </footer>
    </section>
  )
}

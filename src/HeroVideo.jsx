import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'motion/react'
import { WHATS } from './contato'

// A obra inteira em VÍDEO (apresentação: c1 Wan 2.2, c4 Kling 2.5 via Artlist TRIAL, c2/c3/c5 transição provisória), arrastada pela rolagem:
// drone desce no lote → contorno acende → holograma → baldrame → estrutura → acabamento → casa real.
const media = (n) => import.meta.env.BASE_URL + 'media/' + n
const QUADROS = Number(import.meta.env.VITE_QUADROS || 0) || 241
const QUADROS_M = 144 // versão celular (gerada pelo montar.sh)
const pTeste = parseFloat(new URLSearchParams(location.search).get('p')) // ?p=0.5 fixa a rolagem (prints)

// etapas: [centro, palavra, manuscrito, texto, anotação]
const ETAPAS = [
  [0.2, 'O seu', 'terreno', 'Tudo começa num lote. A gente estuda o terreno, o condomínio e a legislação.', 'Estudo do terreno'],
  [0.39, 'Do', 'projeto', 'Arquitetura em 3D, projetos complementares e aprovação na prefeitura.', 'Projeto · aprovação'],
  [0.6, 'à', 'obra', 'Fundação, pilares, alvenaria e lajes — com engenheiro na obra.', 'Fundação · estrutura'],
  [0.78, 'ao', 'acabamento', 'Pedra, ferro trabalhado, esquadrias, iluminação e jardim.', 'Acabamento'],
  [0.87, 'à', 'chave', 'A casa pronta, como foi entregue.', 'Casa neoclássica · entregue'],
]

export default function Hero() {
  const ref = useRef(null)
  const canvas = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const fixo = useMotionValue(isNaN(pTeste) ? 0 : pTeste)
  const p = isNaN(pTeste) ? scrollYProgress : fixo

  useEffect(() => {
    const cv = canvas.current
    const ctx = cv.getContext('2d')
    // celular em pé: quadros recortados no centro, 6 fps (≈10 MB em vez de 43 MB)
    const cel = matchMedia('(max-width: 767px) and (orientation: portrait)').matches
    const N = cel ? QUADROS_M : QUADROS
    const imgs = Array.from({ length: N }, (_, i) => {
      const im = new Image()
      im.decoding = 'async'
      im.src = media(`${cel ? 'seq_m' : 'seq'}/f_${String(i + 1).padStart(4, '0')}.jpg`)
      return im
    })
    const pronto = (im) => im && im.complete && im.naturalWidth
    const desenhar = (im) => {
      const dpr = Math.min(devicePixelRatio, 2)
      const W = cv.clientWidth * dpr, H = cv.clientHeight * dpr
      if (cv.width !== W) { cv.width = W; cv.height = H }
      const r = Math.max(W / im.naturalWidth, H / im.naturalHeight)
      const w = im.naturalWidth * r, h = im.naturalHeight * r
      ctx.drawImage(im, (W - w) / 2, (H - h) / 2, w, h)
    }
    let raf, atual = p.get() * (N - 1), ultimo = -1
    const loop = () => {
      atual += (p.get() * (N - 1) - atual) * (isNaN(pTeste) ? 0.14 : 1)
      let k = Math.round(atual)
      for (let d = 0; d < N; d++) {
        if (pronto(imgs[k - d])) { k -= d; break }
        if (pronto(imgs[k + d])) { k += d; break }
      }
      if (k !== ultimo && pronto(imgs[k])) { desenhar(imgs[k]); ultimo = k }
      raf = requestAnimationFrame(loop)
    }
    const onResize = () => { ultimo = -1 }
    addEventListener('resize', onResize)
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', onResize) }
  }, [p])

  const veuOp = useTransform(p, [0, 0.06, 0.92, 0.97], [1, 0, 0, 1])
  const heroOp = useTransform(p, [0, 0.06, 0.93, 0.975], [1, 0, 0, 1])
  const heroY = useTransform(p, [0, 0.045, 0.93, 0.975], [0, 16, 16, 0])
  const rolarOp = useTransform(p, [0, 0.03], [1, 0])
  const fimOp = useTransform(p, [0.93, 0.975], [0, 1])
  const iniOp = useTransform(p, [0.9, 0.93], [1, 0])
  const barra = useTransform(p, [0, 1], ['0%', '100%'])
  const sombraFim = useTransform(p, [0.9, 0.97], [0, 1])

  return (
    <section ref={ref} className="relative h-[1000vh]" id="topo">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-grafite">
        <img src={media('poster.jpg')} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* véu para o título ficar legível sobre as nuvens */}
        <motion.div style={{ opacity: veuOp }} className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/10 md:bg-gradient-to-r md:from-black/75 md:via-black/30 md:to-transparent" />
        <motion.div style={{ opacity: sombraFim }} className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

        {/* bloco principal: abre e volta no fim */}
        <motion.div style={{ opacity: heroOp, y: heroY }} className="absolute bottom-[12%] left-6 z-10 max-w-[36rem] md:bottom-[11%] md:left-12">
          <h1 className="sombra font-serif font-extrabold uppercase leading-[0.95] tracking-tight text-white">
            <span className="block whitespace-nowrap text-[11vw] font-black md:text-[4.4vw]">Do projeto</span>
            <span className="block whitespace-nowrap text-[11vw] md:text-[4.4vw]">à <span className="text-laranja">chave</span></span>
          </h1>
          <div className="ml-[30%] mb-3 mt-1 whitespace-nowrap font-script text-4xl leading-none text-laranja2 md:text-5xl">Gomes Construtora</div>
          {/* os dois textos ocupam a MESMA célula do grid: um some e o outro aparece, sem empurrar os botões */}
          <div className="grid">
          <motion.div style={{ opacity: iniOp }} className="[grid-area:1/1]">
            <p className="font-body text-[13px] leading-relaxed text-white/90">
              Engenharia, projetos e construção de casas de alto padrão. Da aprovação na prefeitura à entrega das chaves, com engenheiro responsável do começo ao fim.
            </p>
          </motion.div>
          <motion.div style={{ opacity: fimOp }} className="[grid-area:1/1]">
            <p className="font-body text-[13px] leading-relaxed text-white/90">
              Essa casa é real: foi projetada e construída pela Gomes. A próxima pode ser a sua.
            </p>
          </motion.div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={WHATS} target="_blank" rel="noreferrer" className="rounded-full bg-laranja px-5 py-2.5 font-body text-[13px] font-semibold text-white shadow-lg shadow-laranja/30 hover:brightness-110">Orçar minha obra</a>
            <a href="#obras" className="rounded-full border border-white/70 bg-black/30 px-5 py-2.5 font-body text-[13px] font-semibold text-white backdrop-blur hover:bg-black/50">Ver a casa por dentro</a>
          </div>
          {/* os donos já na 1ª tela */}
          <a href="#donos" className="mt-5 inline-flex items-center gap-3 rounded-full border border-white/20 bg-black/40 py-1.5 pl-1.5 pr-4 backdrop-blur hover:bg-black/55">
            <span className="flex -space-x-3">
              <img src={media('av_vaury.jpg')} alt="Eng. Vaury Gomes" className="h-11 w-11 rounded-full object-cover ring-2 ring-laranja" />
              <img src={media('av_gabriella.jpg')} alt="Eng. Gabriella Gomes" className="h-11 w-11 rounded-full object-cover ring-2 ring-laranja" />
            </span>
            <span className="text-left font-body leading-tight">
              <span className="block text-[13px] font-semibold text-white">Eng. Vaury e Eng. Gabriella Gomes</span>
              <span className="block text-[11px] text-white/75">Os donos acompanham a sua obra</span>
            </span>
          </a>
        </motion.div>

        {ETAPAS.map(([c, serif, script, texto, nota]) => (
          <Etapa key={script} p={p} c={c} serif={serif} script={script} texto={texto} nota={nota} />
        ))}

        <motion.div style={{ opacity: rolarOp }} className="mini absolute bottom-[5%] left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 text-white/85 md:bottom-[12%]">
          <span className="relative flex h-6 w-4 items-start justify-center rounded-full border border-white/80 pt-1">
            <span className="h-1.5 w-0.5 animate-bounce rounded-full bg-white" />
          </span>
          Role e veja a obra
        </motion.div>

        <div className="absolute inset-x-6 bottom-4 z-10 h-px bg-white/25 md:inset-x-12">
          <motion.div style={{ width: barra }} className="h-0.5 bg-laranja" />
        </div>
      </div>
    </section>
  )
}

function Etapa({ p, c, serif, script, texto, nota }) {
  const a = c - 0.055, b = c - 0.02, d = c + 0.045, e = c + 0.07
  const op = useTransform(p, [a, b, d, e], [0, 1, 1, 0])
  const escrita = useTransform(p, [a, c - 0.012], [0, 100])
  const clip = useMotionTemplate`inset(0 ${useTransform(escrita, (v) => 100 - v)}% 0 0)`
  const notaOp = useTransform(p, [b, c, d, e], [0, 1, 1, 0])
  return (
    <>
      <motion.div style={{ opacity: op }} className="pointer-events-none absolute bottom-[10%] left-6 z-10 max-w-md md:left-12">
        <div className="sombra flex items-baseline gap-3 text-white">
          <span className="font-serif text-[10vw] font-bold md:text-[3.4vw]">{serif}</span>
          <motion.span style={{ clipPath: clip }} className="-mr-8 pr-8 font-script text-[16vw] leading-none text-laranja2 md:text-[6vw]">
            {script}
          </motion.span>
        </div>
        <p className="mt-1 max-w-[22rem] font-body text-[13px] text-white/90">{texto}</p>
      </motion.div>
      <motion.div style={{ opacity: notaOp }} className="pointer-events-none absolute right-4 top-[16%] z-10 max-w-[11rem] rounded-xl border border-laranja/60 bg-grafite/60 px-3 py-2 text-right font-serif text-[10px] font-semibold uppercase leading-tight tracking-wide text-white backdrop-blur md:right-12 md:top-[40%] md:text-xs">
        {nota}
      </motion.div>
    </>
  )
}

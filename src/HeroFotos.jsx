import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'motion/react'
import Q from './quadros.json'
import { WHATS } from './contato'

// A obra inteira guiada pela rolagem, só com fotos e vídeos REAIS da Gomes:
// projeto (traço) → terreno/estacas → baldrame → estrutura → fachada em obra → traço vira a casa pronta.
const media = (n) => import.meta.env.BASE_URL + 'media/' + n
const pTeste = parseFloat(new URLSearchParams(location.search).get('p')) // ?p=0.5 fixa a rolagem (prints)

// cenas: [início, fim] na rolagem; fx/fy = ponto de interesse ao cortar (celular em pé)
const CENAS = [
  { id: 'projeto', a: 0.0, b: 0.15 },
  { id: 'estacas', a: 0.15, b: 0.31, seq: 'estacas', n: Q.estacas, traco: 'traco_estacas.png', fx: 0.5 },
  { id: 'baldrame', a: 0.31, b: 0.44, img: 'baldrame.jpg', traco: 'traco_baldrame.png', fx: 0.5, zoom: [1.12, 1.0] },
  { id: 'estrutura', a: 0.44, b: 0.6, seq: 'estrutura', n: Q.estrutura, traco: 'traco_estrutura.png', fx: 0.5 },
  { id: 'fachada', a: 0.6, b: 0.74, img: 'obra1.jpg', traco: 'traco_obra1.png', fx: 0.45, zoom: [1.0, 1.1] },
  { id: 'pronta', a: 0.74, b: 1.01, img: 'pronta.jpg', traco: 'traco_pronta.png', fx: 0.56, zoom: [1.12, 1.0] },
]
const TRANS = 0.035 // largura da varredura do "laser" entre cenas

// etapas: [centro, palavra, manuscrito, texto, anotação]
const ETAPAS = [
  [0.1, 'Do', 'projeto', 'Arquitetura, projetos complementares e aprovação na prefeitura — cada linha nasce aqui.', 'Projeto · aprovação'],
  [0.23, 'ao', 'terreno', 'Corte, aterro, muro de arrimo e perfuração das estacas.', 'Obra Gomes · fundação profunda'],
  [0.375, 'à', 'fundação', 'Baldrame em EPS: leve, rápido, isolante e sem desperdício.', 'Riviera de Santa Cristina XIII'],
  [0.52, 'à', 'estrutura', 'Alvenaria, formas, laje e escoramento — com engenheiro na obra.', 'Riviera de Santa Cristina XIII'],
  [0.67, 'à', 'fachada', 'Colunas, molduras e a porta em ferro trabalhado ganhando forma.', 'Casa neoclássica · em obra'],
  [0.81, 'ao', 'acabamento', 'O traço do projeto vira casa de verdade.', 'Casa neoclássica · entregue'],
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
    let ultimo = -1
    const carregar = (src) => { const im = new Image(); im.decoding = 'async'; im.onload = () => { ultimo = -1 }; im.src = media(src); return im }
    const ok = (im) => im && im.complete && im.naturalWidth
    // carrega a cena atual primeiro, as outras em seguida
    CENAS.forEach((c) => {
      if (c.img) c.I = carregar(c.img)
      if (c.img2) c.I2 = carregar(c.img2)
      if (c.traco) c.T = carregar(c.traco)
      if (c.seq) c.S = Array.from({ length: c.n }, (_, i) => carregar(`${c.seq}/f_${String(i + 1).padStart(2, '0')}.jpg`))
    })

    let W = 0, H = 0
    const medir = () => {
      const dpr = Math.min(devicePixelRatio, 2)
      W = Math.round(cv.clientWidth * dpr); H = Math.round(cv.clientHeight * dpr)
      if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H }
    }

    // retângulo de desenho (cover) para uma imagem, com zoom e ponto de interesse
    const caixa = (im, zoom = 1, fx = 0.5, fy = 0.5) => {
      const r = Math.max(W / im.naturalWidth, H / im.naturalHeight) * zoom
      const w = im.naturalWidth * r, h = im.naturalHeight * r
      const x = Math.min(0, Math.max(W - w, W / 2 - w * fx)), y = Math.min(0, Math.max(H - h, H / 2 - h * fy))
      return [x, y, w, h]
    }
    // fonte vertical em tela larga: fundo escurecido + quadro inteiro no centro
    const vertical = (im) => im.naturalHeight > im.naturalWidth * 1.15 && W > H

    const fundoProjeto = (t) => {
      ctx.fillStyle = '#14181d'; ctx.fillRect(0, 0, W, H)
      const passo = Math.max(28, W / 40)
      ctx.lineWidth = 1
      for (let x = 0; x < W; x += passo) { ctx.strokeStyle = (Math.round(x / passo) % 5 === 0) ? 'rgba(240,103,34,.14)' : 'rgba(255,255,255,.04)'; ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke() }
      for (let y = 0; y < H; y += passo) { ctx.strokeStyle = (Math.round(y / passo) % 5 === 0) ? 'rgba(240,103,34,.14)' : 'rgba(255,255,255,.04)'; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke() }
    }

    // desenha uma cena inteira no progresso local t (0..1)
    const quadroDe = (c, t) => {
      if (c.S) {
        const k = Math.min(c.n - 1, Math.max(0, Math.round(t * (c.n - 1))))
        for (let d = 0; d < c.n; d++) { if (ok(c.S[k - d])) return c.S[k - d]; if (ok(c.S[k + d])) return c.S[k + d] }
        return null
      }
      return c.I
    }
    const pintar = (c, t, comTraco = 0) => {
      if (c.id === 'projeto') {
        const pr = CENAS[CENAS.length - 1]
        fundoProjeto(t)
        if (ok(pr.T)) {
          // o traço da casa pronta se desenha da esquerda para a direita
          const [x, y, w, h] = caixa(pr.T, 1.04, pr.fx)
          const rev = Math.min(1, Math.max(0, (t - 0.05) / 0.75))
          ctx.save(); ctx.globalAlpha = 0.16; ctx.drawImage(pr.T, x, y, w, h); ctx.restore()
          ctx.save(); ctx.beginPath(); ctx.rect(x, y, w * rev, h); ctx.clip()
          ctx.globalAlpha = 0.95; ctx.drawImage(pr.T, x, y, w, h); ctx.restore()
          if (rev > 0 && rev < 1) brilho(x + w * rev)
        }
        return
      }
      if (c.id === 'pronta') { climax(c, t); return }
      const im = quadroDe(c, t)
      if (!ok(im)) { ctx.fillStyle = '#14181d'; ctx.fillRect(0, 0, W, H); return }
      const z = c.zoom ? c.zoom[0] + (c.zoom[1] - c.zoom[0]) * t : 1
      if (vertical(im)) {
        ctx.fillStyle = '#14181d'; ctx.fillRect(0, 0, W, H)
        const [bx, by, bw, bh] = caixa(im, 1.1)
        ctx.save(); ctx.globalAlpha = 0.35; ctx.drawImage(im, bx, by, bw, bh); ctx.restore()
        ctx.fillStyle = 'rgba(20,24,29,.55)'; ctx.fillRect(0, 0, W, H)
        const h = H, w = im.naturalWidth * (H / im.naturalHeight), x = W * 0.62 - w / 2
        ctx.drawImage(im, x, 0, w, h)
        ctx.strokeStyle = 'rgba(240,103,34,.6)'; ctx.lineWidth = 2; ctx.strokeRect(x, 0, w, h)
        return
      }
      const [x, y, w, h] = caixa(im, z, c.fx)
      ctx.drawImage(im, x, y, w, h)
      if (c.I2 && ok(c.I2) && t > 0.55) { // segunda foto da fachada em obra
        ctx.save(); ctx.globalAlpha = Math.min(1, (t - 0.55) / 0.25)
        const [x2, y2, w2, h2] = caixa(c.I2, z, c.fx); ctx.drawImage(c.I2, x2, y2, w2, h2); ctx.restore()
      }
      if (comTraco > 0 && c.T && ok(c.T)) { ctx.save(); ctx.globalAlpha = comTraco; ctx.drawImage(c.T, x, y, w, h); ctx.restore() }
    }
    // clímax: o traço do projeto sobre o escuro e a foto real "acende" por baixo dele
    const climax = (c, t) => {
      const foto = Math.min(1, Math.max(0, (t - 0.12) / 0.3))
      fundoProjeto(0)
      if (!ok(c.I)) return
      const z = c.zoom[0] + (c.zoom[1] - c.zoom[0]) * Math.min(1, t * 1.6)
      const [x, y, w, h] = caixa(c.I, z, c.fx)
      ctx.save(); ctx.globalAlpha = foto; ctx.drawImage(c.I, x, y, w, h); ctx.restore()
      if (ok(c.T)) { ctx.save(); ctx.globalAlpha = Math.max(0, 1 - foto * 1.1); ctx.drawImage(c.T, x, y, w, h); ctx.restore() }
    }
    const brilho = (sx) => {
      const g = ctx.createLinearGradient(sx - 60, 0, sx + 6, 0)
      g.addColorStop(0, 'rgba(240,103,34,0)'); g.addColorStop(1, 'rgba(255,150,80,.55)')
      ctx.fillStyle = g; ctx.fillRect(sx - 60, 0, 66, H)
      ctx.fillStyle = '#FFB27A'; ctx.fillRect(sx - 1.5, 0, 3, H)
    }

    let raf, atual = p.get()
    const loop = () => {
      atual += (p.get() - atual) * (isNaN(pTeste) ? 0.12 : 1)
      const v = Math.round(atual * 4000)
      if (v !== ultimo) {
        ultimo = v
        medir()
        const pp = Math.min(0.9999, Math.max(0, atual))
        const i = CENAS.findIndex((c) => pp >= c.a && pp < c.b)
        const c = CENAS[i], t = (pp - c.a) / (c.b - c.a)
        const tt = (pp - c.a) / TRANS
        if (i > 0 && tt < 1) {
          // varredura: cena anterior à direita, nova à esquerda, com o contorno da nova acendendo na borda
          const ant = CENAS[i - 1]
          pintar(ant, 1)
          const sx = W * (tt * tt * (3 - 2 * tt))
          ctx.save(); ctx.beginPath(); ctx.rect(0, 0, sx, H); ctx.clip(); pintar(c, t, 1 - tt); ctx.restore()
          brilho(sx)
        } else pintar(c, t)
      }
      raf = requestAnimationFrame(loop)
    }
    const onResize = () => { ultimo = -1 }
    addEventListener('resize', onResize)
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); removeEventListener('resize', onResize) }
  }, [p])

  const heroOp = useTransform(p, [0, 0.045, 0.93, 0.975], [1, 0, 0, 1])
  const heroY = useTransform(p, [0, 0.045, 0.93, 0.975], [0, 16, 16, 0])
  const rolarOp = useTransform(p, [0, 0.03], [1, 0])
  const fimOp = useTransform(p, [0.93, 0.975], [0, 1])
  const iniOp = useTransform(p, [0.9, 0.93], [1, 0])
  const barra = useTransform(p, [0, 1], ['0%', '100%'])
  const sombraFim = useTransform(p, [0.9, 0.97], [0, 1])

  return (
    <section ref={ref} className="relative h-[1000vh]" id="topo">
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-grafite">
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <motion.div style={{ opacity: sombraFim }} className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/25 to-transparent" />

        {/* bloco principal: abre e volta no fim */}
        <motion.div style={{ opacity: heroOp, y: heroY }} className="absolute bottom-[12%] left-6 z-10 max-w-[36rem] md:bottom-[11%] md:left-12">
          <h1 className="sombra font-serif font-extrabold uppercase leading-[0.95] tracking-tight text-white">
            <span className="vazado block whitespace-nowrap text-[11vw] font-black md:text-[4.4vw]">Do projeto</span>
            <span className="block whitespace-nowrap text-[11vw] md:text-[4.4vw]">à <span className="text-laranja">chave</span></span>
          </h1>
          <div className="ml-[30%] mb-3 mt-1 whitespace-nowrap font-script text-4xl leading-none text-laranja2 md:text-5xl">Gomes Construtora</div>
          <motion.div style={{ opacity: iniOp }}>
            <p className="font-body text-[13px] leading-relaxed text-white/90">
              Engenharia, projetos e construção de casas de alto padrão. Da aprovação na prefeitura à entrega das chaves, com engenheiro responsável do começo ao fim.
            </p>
          </motion.div>
          <motion.div style={{ opacity: fimOp }} className="-mt-[3.2em]">
            <p className="font-body text-[13px] leading-relaxed text-white/90">
              Essa casa é real, foi construída pela Gomes e cada etapa que você viu é foto da obra. A próxima pode ser a sua.
            </p>
          </motion.div>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={WHATS} target="_blank" rel="noreferrer" className="rounded-full bg-laranja px-5 py-2.5 font-body text-[13px] font-semibold text-white shadow-lg shadow-laranja/30 hover:brightness-110">Orçar minha obra</a>
            <a href="#obras" className="rounded-full border border-white/70 bg-black/30 px-5 py-2.5 font-body text-[13px] font-semibold text-white backdrop-blur hover:bg-black/50">Ver a casa por dentro</a>
          </div>
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

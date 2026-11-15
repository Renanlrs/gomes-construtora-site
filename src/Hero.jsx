import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate } from 'motion/react'
import { WHATS } from './contato'

import { criarCena } from './cena3d'

// A obra inteira em 3D guiada pela rolagem (coreografia do link @enlacaarquitetura):
// nuvens → bairro → pin no lote → contorno acende → holograma → baldrame/estrutura/alvenaria → acabamento → foto real da casa.
const media = (n) => import.meta.env.BASE_URL + 'media/' + n
const pTeste = parseFloat(new URLSearchParams(location.search).get('p')) // ?p=0.5 fixa a rolagem (prints)

// etapas: [centro, palavra, manuscrito, texto, anotação]
const ETAPAS = [
  [0.19, 'O seu', 'terreno', 'Tudo começa num lote. A gente estuda o terreno, o condomínio e a legislação.', 'Estudo do terreno'],
  [0.3, 'Do', 'projeto', 'Arquitetura, projetos complementares e aprovação na prefeitura.', 'Projeto · aprovação'],
  [0.4, 'ao', '3D', 'Você vê a casa inteira antes de colocar o primeiro bloco.', 'Projeto 3D'],
  [0.52, 'à', 'fundação', 'Baldrame em EPS e estrutura de concreto, com engenheiro na obra.', 'Fundação · estrutura'],
  [0.63, 'à', 'obra', 'Alvenaria, lajes e cornijas subindo, etapa por etapa.', 'Alvenaria · lajes'],
  [0.76, 'ao', 'acabamento', 'Pedra, ferro trabalhado, iluminação e jardim.', 'Acabamento'],
]

export default function Hero() {
  const ref = useRef(null)
  const canvas = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const fixo = useMotionValue(isNaN(pTeste) ? 0 : pTeste)
  const p = isNaN(pTeste) ? scrollYProgress : fixo

  useEffect(() => {
    const cv = canvas.current
    let cena
    try { cena = criarCena(cv) } catch (e) { console.warn('sem WebGL', e); return }
    let W = 0, H = 0, raf, atual = p.get(), ultimo = -1
    const loop = () => {
      const w = cv.clientWidth, h = cv.clientHeight
      if (w !== W || h !== H) { W = w; H = h; cena.tamanho(W, H); ultimo = -1 }
      atual += (p.get() - atual) * (isNaN(pTeste) ? 0.1 : 1)
      const v = Math.round(atual * 5000)
      if (v !== ultimo) { ultimo = v; cena.atualizar(Math.min(1, Math.max(0, atual))); cena.render() }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); cena.destruir() }
  }, [p])

  const fotoOp = useTransform(p, [0.83, 0.91], [0, 1])
  const veuOp = useTransform(p, [0, 0.07, 0.92, 0.97], [1, 0, 0, 1])
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
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
        {/* no fim, o 3D vira a foto real da casa entregue */}
        <motion.img style={{ opacity: fotoOp }} src={media('pronta.jpg')} alt="Casa neoclássica entregue pela Gomes" className="pointer-events-none absolute inset-0 h-full w-full object-cover [object-position:56%_50%]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        {/* véu para o título ficar legível sobre as nuvens */}
        <motion.div style={{ opacity: veuOp }} className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/10 md:bg-gradient-to-r md:from-black/75 md:via-black/30 md:to-transparent" />
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
              Essa casa é real: foi projetada e construída pela Gomes. A próxima pode ser a sua.
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

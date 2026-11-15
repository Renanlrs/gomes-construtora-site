// Cena 3D da obra guiada pela rolagem (coreografia do TikTok @enlacaarquitetura):
// nuvens → bairro → pin cai no lote → contorno acende → casa em holograma → baldrame/estrutura/alvenaria → acabamento → foto real.
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js'

const cl = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const fase = (p, a, b) => cl((p - a) / (b - a))
const suave = (t) => t * t * (3 - 2 * t)
const LARANJA = new THREE.Color('#F06722')
const noLote = (x, z, m = 2) => Math.abs(x) < 7.5 + m && z > -25 - m && z < 5 + m

// semente fixa: o bairro é sempre igual
let semente = 7
const rnd = () => ((semente = (semente * 16807) % 2147483647) / 2147483647)

export function criarCena(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75))
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.localClippingEnabled = true

  const scene = new THREE.Scene()
  const CEU = new THREE.Color('#cfe0ee'), NOITE = new THREE.Color('#0d1218'), TARDE = new THREE.Color('#bcd6ec')
  scene.background = CEU.clone()
  scene.fog = new THREE.Fog(CEU.clone(), 180, 700)

  const camera = new THREE.PerspectiveCamera(40, 1, 0.3, 2000)

  // luz
  const hemi = new THREE.HemisphereLight('#f4f8ff', '#9a8f7c', 1.1)
  scene.add(hemi)
  const sol = new THREE.DirectionalLight('#fff3df', 2.6)
  sol.position.set(-40, 60, 50)
  sol.castShadow = true
  sol.shadow.mapSize.set(2048, 2048)
  Object.assign(sol.shadow.camera, { left: -30, right: 30, top: 30, bottom: -30, near: 1, far: 200 })
  sol.shadow.bias = -0.0004
  scene.add(sol)

  // ---------- chão, ruas e bairro ----------
  const mat = (c, o = {}) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9, ...o })
  const caixa = (g, w, h, d, m, x, y, z, sombra = true) => {
    const ms = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m)
    ms.position.set(x, y + h / 2, z); ms.castShadow = sombra; ms.receiveShadow = true; g.add(ms); return ms
  }
  const plano = (g, w, d, m, x, y, z) => {
    const ms = new THREE.Mesh(new THREE.PlaneGeometry(w, d), m)
    ms.rotation.x = -Math.PI / 2; ms.position.set(x, y, z); ms.receiveShadow = true; g.add(ms); return ms
  }
  const bairro = new THREE.Group(); scene.add(bairro)
  plano(bairro, 2000, 2000, mat('#a9c48a'), 0, 0, 0)
  const asfalto = mat('#7d838a'), calcada = mat('#d8d4cb'), faixa = new THREE.MeshBasicMaterial({ color: '#f4f1e8' })
  // ruas na direção x (frentes dos lotes) e cruzamentos em z
  const RUAS_Z = [10, -62, 82], RUAS_X = [-92, 92]
  RUAS_Z.forEach((z) => { plano(bairro, 600, 8, asfalto, 0, 0.02, z); plano(bairro, 600, 2, calcada, 0, 0.03, z - 5); plano(bairro, 600, 2, calcada, 0, 0.03, z + 5); for (let x = -300; x < 300; x += 7) plano(bairro, 3, 0.18, faixa, x, 0.04, z) })
  RUAS_X.forEach((x) => { plano(bairro, 8, 600, asfalto, x, 0.025, 0) })
  const brancos = ['#f3f1ec', '#ece8e0', '#f6f4ef', '#e4e0d8']
  const tetos = ['#4a5058', '#5b6168', '#f0ede6', '#3e444b']
  const arvore = (g, x, z, s = 1) => {
    const t = new THREE.Mesh(new THREE.CylinderGeometry(0.15 * s, 0.2 * s, 1.6 * s, 6), mat('#6b5544'))
    t.position.set(x, 0.8 * s, z); t.castShadow = true; g.add(t)
    const c = new THREE.Mesh(new THREE.IcosahedronGeometry(1.4 * s, 0), mat(['#5f8f4a', '#4f7f3e', '#6c9b52'][Math.floor(rnd() * 3)], { flatShading: true }))
    c.position.set(x, 2.3 * s, z); c.castShadow = true; g.add(c)
  }
  const casaVizinha = (x, z, frente) => {
    const w = 9 + rnd() * 3, d = 11 + rnd() * 5, h = 3.4 + (rnd() < 0.35 ? 3.2 : 0)
    const cz = z + frente * (-(d / 2) - 3)
    caixa(bairro, w, h, d, mat(brancos[Math.floor(rnd() * 4)]), x, 0, cz)
    caixa(bairro, w + 0.6, 0.35, d + 0.6, mat(tetos[Math.floor(rnd() * 4)]), x, h, cz)
    const ax = x + (rnd() < 0.5 ? -1 : 1) * (w / 2 + 1.5)
    if (rnd() < 0.5 && !noLote(ax, cz, 4)) caixa(bairro, 3 + rnd() * 3, 2.8, 5, mat(brancos[0]), ax, 0, cz - frente * 2)
    if (rnd() < 0.45) plano(bairro, 3, 7, mat('#4fb3c9', { roughness: 0.2 }), x + (rnd() - 0.5) * 4, 0.06, cz - frente * (d / 2 + 4))
    const tx = x + (rnd() - 0.5) * 12
    if (rnd() < 0.7 && !noLote(tx, z, 3)) arvore(bairro, tx, z + frente * -1.2, 0.8 + rnd() * 0.5)
  }
  // lotes de 15 m ao longo das ruas (o nosso, x=0 ao sul da rua z=10, fica vazio)
  ;[[10, -1], [10, 1], [-62, 1], [-62, -1], [82, -1]].forEach(([rz, lado]) => {
    for (let x = -285; x <= 285; x += 15) {
      if (Math.abs(x - 92) < 9 || Math.abs(x + 92) < 9) continue
      if (rz === 10 && lado === -1 && x === 0) continue
      if (rnd() < 0.12) { if (rnd() < 0.5) arvore(bairro, x, rz + lado * (5 + 8 * rnd() + 6), 1); continue }
      casaVizinha(x, rz + lado * 6, -lado === 1 ? 1 : -1)
    }
  })
  for (let i = 0; i < 160; i++) { const x = (rnd() - 0.5) * 600, z = (rnd() - 0.5) * 600; if (!noLote(x, z, 4)) arvore(bairro, x, z, 0.7 + rnd() * 0.8) }

  // ---------- o lote (terra vermelha, como nas obras da Gomes) ----------
  const LOTE = { w: 15, d: 30, z: -10 } // frente em z=+5
  const terra = plano(scene, LOTE.w, LOTE.d, mat('#c4774a'), 0, 0.05, LOTE.z)
  const contornoPts = [[-7.5, 5], [7.5, 5], [7.5, -25], [-7.5, -25], [-7.5, 5]].map(([x, z]) => new THREE.Vector3(x, 0.15, z))
  const contornoMat = new THREE.LineBasicMaterial({ color: new THREE.Color(2.4, 0.95, 0.3), toneMapped: false, transparent: true, opacity: 0 })
  const contorno = new THREE.Line(new THREE.BufferGeometry().setFromPoints(contornoPts), contornoMat); scene.add(contorno)
  const brilhoLote = plano(scene, LOTE.w, LOTE.d, new THREE.MeshBasicMaterial({ color: LARANJA, transparent: true, opacity: 0, toneMapped: false, depthWrite: false }), 0, 0.08, LOTE.z)
  // paredes de luz do contorno
  const paredeMat = new THREE.MeshBasicMaterial({ color: LARANJA, transparent: true, opacity: 0, side: THREE.DoubleSide, depthWrite: false, toneMapped: false })
  const paredes = new THREE.Group(); scene.add(paredes)
  ;[[0, 5, 15, 0], [0, -25, 15, 0], [7.5, -10, 30, Math.PI / 2], [-7.5, -10, 30, Math.PI / 2]].forEach(([x, z, L, r]) => {
    const g = new THREE.PlaneGeometry(L, 2.2); g.translate(0, 1.1, 0)
    const m = new THREE.Mesh(g, paredeMat); m.position.set(x, 0, z); m.rotation.y = r; paredes.add(m)
  })

  // ---------- pin ----------
  const pin = new THREE.Group(); scene.add(pin)
  const pinMat = new THREE.MeshStandardMaterial({ color: LARANJA, roughness: 0.35, metalness: 0.1, emissive: LARANJA, emissiveIntensity: 0.25 })
  const cab = new THREE.Mesh(new THREE.SphereGeometry(2.2, 32, 24), pinMat); cab.position.y = 6.2; pin.add(cab)
  const ponta = new THREE.Mesh(new THREE.ConeGeometry(1.75, 4.6, 32), pinMat); ponta.rotation.x = Math.PI; ponta.position.y = 3.0; pin.add(ponta)
  const furo = new THREE.Mesh(new THREE.SphereGeometry(0.85, 20, 16), new THREE.MeshStandardMaterial({ color: '#ffffff' })); furo.position.set(0, 6.4, 1.6); furo.scale.z = 0.5; pin.add(furo)
  pin.traverse((o) => { o.castShadow = true })
  pin.position.set(0, 120, -10)
  const anel = new THREE.Mesh(new THREE.RingGeometry(0.9, 1.2, 48), new THREE.MeshBasicMaterial({ color: LARANJA, transparent: true, opacity: 0, toneMapped: false, depthWrite: false }))
  anel.rotation.x = -Math.PI / 2; anel.position.set(0, 0.2, -10); scene.add(anel)

  // ---------- a casa neoclássica (frente em z=0) ----------
  const casa = new THREE.Group(); scene.add(casa)
  const pecas = [] // {mesh, cru, fim}
  const Mf = {
    branco: '#f2eee6', pedra: '#d8ccb3', escuro: '#3a4149', porta: '#141a20', vidro: '#1d2a36', piso: '#e6e0d4', concreto: '#9c9a95',
  }
  const peca = (w, h, d, x, y, z, fim, cru = '#a9a49b', g = casa) => {
    const m = new THREE.MeshStandardMaterial({ color: cru, roughness: 0.85 })
    const ms = caixa(g, w, h, d, m, x, y, z)
    pecas.push({ ms, cru: new THREE.Color(cru), fim: new THREE.Color(fim) }); return ms
  }
  const C = '#b9b2a6' // alvenaria crua
  // volumes
  peca(5.6, 4.2, 15, -6.3, 0, -7.5, Mf.branco, C)            // ala esquerda
  peca(5.0, 4.8, 15, -1.0, 0, -7.6, Mf.branco, C)            // bloco central
  peca(8.6, 3.8, 12, 5.8, 0, -9.0, Mf.branco, C)             // garagem/ala direita (recuada)
  peca(6.2, 6.4, 5, 6.6, 0, -13.5, Mf.escuro, C)             // volume alto escuro ao fundo
  // cornijas em degraus (pavimento de lajes)
  const L = '#9c9a95'
  ;[[6.4, 0.28, 15.8, 4.2], [6.1, 0.22, 15.5, 4.48], [5.8, 0.18, 15.2, 4.7]].forEach(([w, h, d, y]) => peca(w, h, d, -6.3, y, -7.4, Mf.branco, L))
  ;[[6.8, 0.34, 4.2, 4.8], [6.4, 0.3, 3.9, 5.14], [6.0, 0.26, 3.6, 5.44], [5.6, 0.2, 3.3, 5.7]].forEach(([w, h, d, y]) => peca(w, h, d, -1.0, y, -0.4 + (4.2 - d) / -2 + 0.0, Mf.branco, L))
  ;[[9.8, 0.42, 6.4, 3.8], [9.5, 0.24, 6.1, 4.22], [9.2, 0.2, 5.8, 4.46]].forEach(([w, h, d, y]) => peca(w, h, d, 5.9, y, -0.9, Mf.branco, L))
  // pilares do pórtico e da garagem
  ;[-2.7, 0.7].forEach((x) => { peca(0.75, 4.8, 0.75, x, 0, 1.1, Mf.branco, '#9c9a95'); peca(1.0, 0.35, 1.0, x, 0, 1.1, Mf.pedra, '#9c9a95') })
  peca(0.55, 3.8, 0.55, 9.9, 0, 1.6, Mf.branco, '#9c9a95')
  // revestimento em pedra e janelas altas da ala esquerda
  peca(2.0, 3.6, 0.12, -7.9, 0.2, 0.08, Mf.pedra, C)
  ;[-5.7, -4.3].forEach((x) => peca(1.0, 3.3, 0.1, x, 0.35, 0.06, Mf.vidro, C))
  // porta principal (ferro escuro) e bandeira
  const porta = peca(1.8, 3.9, 0.12, -1.0, 0.35, 0.08, Mf.porta, C)
  // molduras da garagem (painéis)
  ;[2.6, 5.0, 7.4].forEach((x) => { peca(1.8, 2.6, 0.06, x, 0.6, -2.95, '#ece7dd', C) })
  peca(1.1, 2.4, 0.08, 9.0, 0.0, -2.94, Mf.porta, C)
  // degraus de entrada
  ;[[5.4, 0.18, 1.2, 0, 3.2], [5.0, 0.18, 1.1, 0.18, 2.3], [4.6, 0.18, 1.0, 0.36, 1.5]].forEach(([w, h, d, y, z]) => peca(w, h, d, -1.0, y, z, Mf.piso, '#9c9a95'))

  // ornamento dourado da porta e arandelas (aparecem no acabamento)
  const detalhes = new THREE.Group(); casa.add(detalhes)
  const ouro = new THREE.MeshStandardMaterial({ color: '#c9a24a', metalness: 0.8, roughness: 0.3, emissive: '#5a3d10', emissiveIntensity: 0.4 })
  ;[[0, 2.9, 0.5], [0, 1.9, 0.36], [0, 1.1, 0.3]].forEach(([dx, y, r]) => { const t = new THREE.Mesh(new THREE.TorusGeometry(r, 0.05, 8, 28), ouro); t.position.set(-1.0 + dx, y + 0.35, 0.17); detalhes.add(t) })
  const luzMat = new THREE.MeshStandardMaterial({ color: '#2a2a2a', emissive: '#ffb45c', emissiveIntensity: 0 })
  const arandelas = [[-3.45, 2.6, 0.2], [1.45, 2.6, 0.2], [3.8, 2.6, -2.85], [6.2, 2.6, -2.85], [8.4, 2.6, -2.85]].map(([x, y, z]) => { const a = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.38, 0.18), luzMat); a.position.set(x, y, z); detalhes.add(a); return a })
  // jardim e calçamento
  const jardim = new THREE.Group(); casa.add(jardim)
  plano(jardim, 5.6, 4.8, mat('#5f9a45'), -6.2, 0.1, 2.6)
  plano(jardim, 8.6, 7.2, mat('#d3cbbd'), 5.8, 0.09, 1.4)
  plano(jardim, 3.0, 4.8, mat('#d3cbbd'), -1.0, 0.09, 2.6)
  const cipreste = new THREE.Mesh(new THREE.ConeGeometry(0.45, 4.4, 10), mat('#3f6b34', { flatShading: true })); cipreste.position.set(-3.6, 2.3, 1.9); cipreste.castShadow = true; jardim.add(cipreste)
  for (let i = 0; i < 18; i++) { const b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.32 + rnd() * 0.18, 0), mat(i % 3 ? '#4f8a3c' : '#c84a4a', { flatShading: true })); b.position.set(-8.7 + i * 0.3, 0.35, 0.6 + rnd() * 0.4); jardim.add(b) }
  arvore(jardim, -8.4, 3.2, 1.3)

  // estrutura (pilares, vigas, lajes) e baldrame em EPS
  const estrutura = new THREE.Group(); casa.add(estrutura)
  const concreto = mat(Mf.concreto)
  const vol = [[-6.3, -7.5, 5.6, 15, 4.2], [-1.0, -7.6, 5.0, 15, 4.8], [5.8, -9.0, 8.6, 12, 3.8], [6.6, -13.5, 6.2, 5, 6.4]]
  const pilares = [], vigas = []
  vol.forEach(([cx, cz, w, d, h]) => {
    for (let ix = 0; ix <= 1; ix++) for (let iz = 0; iz <= Math.ceil(d / 4); iz++) {
      const x = cx - w / 2 + 0.15 + ix * (w - 0.3), z = cz - d / 2 + 0.15 + iz * ((d - 0.3) / Math.ceil(d / 4))
      pilares.push(caixa(estrutura, 0.25, h, 0.25, concreto, x, 0, z))
    }
    vigas.push(caixa(estrutura, w, 0.35, 0.2, concreto, cx, h - 0.35, cz + d / 2 - 0.1), caixa(estrutura, w, 0.35, 0.2, concreto, cx, h - 0.35, cz - d / 2 + 0.1),
      caixa(estrutura, 0.2, 0.35, d, concreto, cx - w / 2 + 0.1, h - 0.35, cz), caixa(estrutura, 0.2, 0.35, d, concreto, cx + w / 2 - 0.1, h - 0.35, cz))
  })
  const baldrame = new THREE.Group(); casa.add(baldrame)
  const eps = mat('#f4f4f0')
  vol.forEach(([cx, cz, w, d]) => { caixa(baldrame, w, 0.45, 0.25, eps, cx, 0, cz + d / 2); caixa(baldrame, w, 0.45, 0.25, eps, cx, 0, cz - d / 2); caixa(baldrame, 0.25, 0.45, d, eps, cx - w / 2, 0, cz); caixa(baldrame, 0.25, 0.45, d, eps, cx + w / 2, 0, cz) })

  // holograma: arestas de todas as peças da casa
  const holoMat = new THREE.LineBasicMaterial({ color: new THREE.Color(1.9, 0.75, 0.24), toneMapped: false, transparent: true, opacity: 0 })
  const corte = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)
  holoMat.clippingPlanes = [corte]
  const holo = new THREE.Group(); scene.add(holo)
  pecas.forEach(({ ms }) => {
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(ms.geometry), holoMat)
    e.position.copy(ms.position); holo.add(e)
  })
  const corteParede = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0)
  pecas.forEach(({ ms }) => { ms.material.clippingPlanes = [corteParede] })

  // nuvens
  const nuvTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 128; const g = c.getContext('2d')
    const r = g.createRadialGradient(64, 64, 4, 64, 64, 64); r.addColorStop(0, 'rgba(255,255,255,1)'); r.addColorStop(0.5, 'rgba(255,255,255,.75)'); r.addColorStop(1, 'rgba(255,255,255,0)')
    g.fillStyle = r; g.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c)
  })()
  const nuvens = new THREE.Group(); scene.add(nuvens)
  const nuvMat = new THREE.SpriteMaterial({ map: nuvTex, transparent: true, depthWrite: false, opacity: 0.8, fog: false })
  for (let i = 0; i < 70; i++) {
    const s = new THREE.Sprite(nuvMat); const k = 40 + rnd() * 70
    s.scale.set(k * 1.6, k, 1); s.position.set((rnd() - 0.5) * 420, 150 + rnd() * 70, (rnd() - 0.5) * 420 - 10); nuvens.add(s)
  }

  // pós-processamento (brilho do holograma e do contorno)
  const composer = new EffectComposer(renderer)
  composer.addPass(new RenderPass(scene, camera))
  const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.6, 0.55, 0.85)
  composer.addPass(bloom)
  composer.addPass(new OutputPass())

  // trajetória da câmera: [p, posição, alvo]
  const K = [
    [0.0, [0, 330, 90], [0, 0, -10]],
    [0.1, [0, 250, 80], [0, 0, -10]],
    [0.2, [10, 110, 85], [0, 0, -10]],
    [0.3, [48, 48, 62], [0, 0, -10]],
    [0.42, [30, 20, 38], [0, 3, -8]],
    [0.56, [26, 13, 30], [0, 2.5, -8]],
    [0.68, [18, 8, 24], [0, 2.4, -6]],
    [0.8, [-2.6, 1.75, 15.5], [-0.6, 2.75, 0]],
    [1.0, [-2.6, 1.75, 14.6], [-0.6, 2.75, 0]],
  ]
  const posCam = (p) => {
    let i = 0; while (i < K.length - 2 && p > K[i + 1][0]) i++
    const [a, pa, ta] = K[i], [b, pb, tb] = K[i + 1]
    const t = suave(cl((p - a) / (b - a)))
    const lp = (u, v) => new THREE.Vector3(u[0] + (v[0] - u[0]) * t, u[1] + (v[1] - u[1]) * t, u[2] + (v[2] - u[2]) * t)
    return [lp(pa, pb), lp(ta, tb)]
  }

  const tmp = new THREE.Color()
  function atualizar(p) {
    const [pos, alvo] = posCam(p); camera.position.copy(pos); camera.lookAt(alvo)

    // nuvens somem quando a câmera atravessa
    nuvMat.opacity = 0.8 * (1 - fase(p, 0.1, 0.19))
    nuvens.visible = nuvMat.opacity > 0.01

    // pin cai (com quique) e some quando o projeto começa
    const queda = fase(p, 0.13, 0.21)
    const quique = queda < 1 ? (1 - queda) * (1 - queda) : 0
    pin.position.y = 120 * quique + Math.abs(Math.sin(queda * Math.PI * 3)) * 3 * (1 - queda)
    pin.rotation.y = p * 14
    const pinSai = fase(p, 0.3, 0.36)
    pin.scale.setScalar(Math.max(0.001, 1 - pinSai))
    pin.visible = pinSai < 1
    const onda = fase(p, 0.2, 0.3)
    anel.scale.setScalar(1 + onda * 14); anel.material.opacity = onda > 0 && onda < 1 ? 0.9 * (1 - onda) : 0

    // contorno do lote acende
    const acende = fase(p, 0.22, 0.29), apaga = fase(p, 0.66, 0.74)
    contornoMat.opacity = acende * (1 - apaga)
    brilhoLote.material.opacity = (0.18 + 0.1 * Math.sin(p * 220)) * acende * (1 - fase(p, 0.44, 0.5))
    paredeMat.opacity = 0.22 * acende * (1 - fase(p, 0.36, 0.44))

    // clima: dia → noite tecnológica (holograma) → dia
    const noite = fase(p, 0.26, 0.34) * (1 - fase(p, 0.62, 0.74))
    tmp.copy(CEU).lerp(NOITE, noite).lerp(TARDE, fase(p, 0.74, 0.8) * 0.4)
    scene.background.copy(tmp); scene.fog.color.copy(tmp)
    scene.fog.near = 180 - noite * 120; scene.fog.far = 700 - noite * 400
    hemi.intensity = 1.1 - noite * 0.85; sol.intensity = 2.6 - noite * 2.3
    renderer.toneMappingExposure = 1.05 - noite * 0.2
    bloom.strength = 0.2 + noite * 0.55
    bloom.threshold = 0.9 - noite * 0.15
    bloom.radius = 0.35

    // holograma sobe e depois se apaga dentro da obra
    const sobe = fase(p, 0.33, 0.44)
    corte.constant = sobe * 7.5
    holoMat.opacity = fase(p, 0.33, 0.35) * (1 - fase(p, 0.45, 0.55) * 0.7) * (1 - fase(p, 0.64, 0.72))
    holo.visible = holoMat.opacity > 0.01

    // baldrame em EPS → estrutura → alvenaria → acabamento
    const bal = fase(p, 0.45, 0.5)
    baldrame.visible = bal > 0; baldrame.scale.y = Math.max(0.001, bal)
    terra.material.color.set('#c4774a')
    const est = fase(p, 0.49, 0.58)
    estrutura.visible = est > 0
    pilares.forEach((m) => { m.scale.y = Math.max(0.001, est); m.position.y = (m.geometry.parameters.height * m.scale.y) / 2 })
    vigas.forEach((m) => { m.visible = est > 0.95 })
    const alv = fase(p, 0.56, 0.68)
    corteParede.constant = alv * 7.5
    casa.visible = bal > 0
    const acab = suave(fase(p, 0.68, 0.79))
    pecas.forEach(({ ms, cru, fim }) => { ms.material.color.copy(cru).lerp(fim, acab); ms.visible = alv > 0 })
    estrutura.visible = est > 0 && acab < 0.99
    baldrame.visible = bal > 0 && acab < 0.6
    detalhes.visible = acab > 0.2
    detalhes.scale.setScalar(Math.max(0.001, acab))
    luzMat.emissiveIntensity = acab * 2.2
    jardim.visible = acab > 0.05
    jardim.scale.set(1, Math.max(0.001, acab), 1)
    terra.visible = acab < 0.98
  }

  function tamanho(W, H) {
    renderer.setSize(W, H, false); composer.setSize(W, H)
    camera.aspect = W / H
    camera.fov = W < H ? 58 : 40 // celular em pé: abre mais o quadro
    camera.updateProjectionMatrix()
  }
  function render() { composer.render() }
  function destruir() { renderer.dispose(); composer.dispose?.() }
  return { atualizar, tamanho, render, destruir }
}

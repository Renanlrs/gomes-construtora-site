# GOMES CONSTRUTORA — site "Do projeto à chave" (cliente do Marilton)

Rodar: `npx vite --port 8560 --host 127.0.0.1` → http://127.0.0.1:8560 · prints: `?p=0.5` fixa a rolagem.

## O que é
**14/11 (2ª versão, pedido do Marilton):** hero agora é 3D (three.js, `src/cena3d.js`) com a coreografia do link @enlacaarquitetura: nuvens → bairro → pin cai no lote (terra vermelha) → contorno acende → casa neoclássica em holograma laranja (EdgesGeometry + bloom) → baldrame EPS/pilares/vigas → alvenaria crua → acabamento → vira a foto real (`pronta.jpg`). Escolha dele: 3D sem custo (Higgsfield 0,46 cr; ~90 cr p/ versão IA). Versão antiga de fotos em `src/HeroFotos.jsx`; as fotos reais viraram a seção "Obra de verdade". Prints WebGL: `AGENT_BROWSER_ARGS=--use-angle=swiftshader,...`. Final: fundo = `pronta.jpg` (NÃO usar pronta2/foto do zap: tem material de obra na fachada) + logo com reflexo e estrelas cintilando no símbolo laranja (`LogoBrilho`).

Versão 1 (fotos):
Mesma estrutura do site da obra ACQUA BELO (~/copias/webforge): hero sticky 1000vh com canvas guiado pela rolagem.
Refs: TikTok @enlacaarquitetura 7602274381817056519 (pin/lote/holograma/obra) e @interiores.mariavictoria 7642552676382739730 (contorno acende/obra/interior).
TUDO é foto/vídeo REAL da Gomes (Instagram @construtora.gomes + fotos enviadas pelo cliente): projeto = traço laranja (Canny) da casa neoclássica pronta →
estacas (reel DBHrENGS7-U) → baldrame EPS (DR2Ai44Dol1, Riviera de Santa Cristina XIII) → estrutura (reel DUbac6MAaCB) → fachada em obra (DFq1smMS8ZZ) →
traço vira a casa pronta (Dd-GPMTmqTO). Transição = "laser" laranja que varre com o contorno da cena nova acendendo.
Vídeo da Eng. Gabriella (tour com som, enviado pelo cliente = reel DajCcD-yNWe) em "Quem assina": media/tour_gabriella.mp4 720p, capa = 1º quadro do vídeo do WhatsApp (media/tour_capa.jpg) com play no meio; toque toca do início com som.
Seções: por dentro (tour real DajCcD-yNWe), serviços (post "Conheça nossos serviços"), Lei do Puxadinho (post 05/11/2026), quem assina, em execução (renders Riviera, proj. Ricardo Almeida Arquitetos), final com logo+slogan+CTA.

## Dados
WhatsApp (19) 99913-3719 (banner do cliente e contato "Pai.vcf"). Instagram @construtora.gomes. Eng. Vaury Gomes · Eng. Gabriella Gomes.
Gerar mídias: `python -I ../gen.py` + `../traco2.py` (contornos) + `../logo2.py` (logos) + `../icones.py`.

## Pendente
- **15/11 APRESENTAÇÃO (não publicar):** hero = c1 Wan 2.2 (848x480, meio borrado) + c4 Kling 2.5 (Artlist TRIAL, só p/ teste/preview) + c2/c3/c5 PROVISÓRIOS = fade entre imagens-chave (`gen/ponte/`). 241 quadros 1440px q6 (39 MB). ETAPAS .2/.39/.6/.78/.87. Prints `../prints/v3`. HF ZeroGPU anônimo esgotado ~24h; Artlist 0 vídeo grátis. Versão final = crédito Higgsfield (refazer os 5). fila.sh PARADA.
- **14/11 noite — NO AR LOCAL a versão em VÍDEO (HeroVideo.jsx, 211 quadros):** `../gen/montar_hoje.sh` = drone K1 (zoom) → lote K2 → holograma K3 → timelapse Wan 2.2 grátis (`teste_lote_pronta.mp4`) → casa real. Quando a `fila.sh` terminar os 5 trechos, o `montar.sh` substitui a sequência (aí reajustar os centros de ETAPAS). LoreMotion (MiniMax H3 grátis c/ quadro inicial+final, uso comercial OK) só funciona manualmente no Chrome do usuário — Cloudflare barra automação; kit em Desktop/GOMES-VIDEOS.
- **14/11 VÍDEO IA GRÁTIS em andamento** (3D reprovado: "ficou muito ruim"). Imagens-chave grátis via FLUX.1 Kontext (HF Space) em `../gen/K*_n.jpg`; trechos via Wan 2.2 primeiro/último quadro (HF `multimodalart/wan-2-2-first-last-frame`) com `../gen/fila.sh` (espera a cota ZeroGPU renovar, log em `../gen/fila.log`) → `montar.sh` gera `public/media/seq`. Último passo manual: em `src/App.jsx` trocar `import Hero from './Hero'` por `'./HeroVideo'`, build e prints.
- Vídeos de IA da obra (Higgsfield estava com 0,46 crédito em 14/11/2026) — se houver crédito: keyframes da mesma câmera da casa neoclássica (terreno→fundação→estrutura→reboco→pronta) + minimax/seedance primeiro/último quadro, entram no lugar das cenas.
- NADA publicado. Publicar só com OK.

"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ReleaseNote {
  version: string
  title: string
  date: string
  isLatest: boolean
  highlights: string[]
  details: string[]
}

const releases: ReleaseNote[] = [
  {
    version: "v1.1.6",
    title: "Correção de Autenticação Xtream & Conexão Blindada",
    date: "17 de Setembro de 2026",
    isLatest: true,
    highlights: [
      "Correção definitiva no login: compatibilidade total com respostas de servidores Xtream / XUI.one",
      "Detecção inteligente de endpoints de API evitando rejeição por páginas HTML",
      "Blindagem da conexão com validação antecipada de credenciais e status de conta",
      "Estabilidade máxima na navegação sem travamentos ao conectar listas pesadas",
    ],
    details: [
      "Ajuste no motor de autenticação para descartar payloads HTML espúrios e priorizar a API JSON Xtream",
      "Redução no tempo de resposta e novos fallbacks de conexão nas validações de conta",
      "Garantia de persistência da sessão e token ativo sem desconexões involuntárias ao reiniciar",
    ],
  },
  {
    version: "v1.1.5",
    title: "Modo Offline Seguro com Criptografia & Acesso Sem Internet",
    date: "17 de Setembro de 2026",
    isLatest: false,
    highlights: [
      "Modo Offline protegido com criptografia nativa AES-CTR para mídias baixadas",
      "Entrada direta no app sem internet: assista seus downloads a qualquer momento",
      "Barra dinâmica de armazenamento informando espaço livre e espaço ocupado pelo app",
      "Download Manager integrado com controle de progresso e cancelamento",
    ],
    details: [
      "Criptografia forte durante a gravação direta em disco garantindo segurança total dos arquivos locais",
      "Roteamento inteligente de inicialização: direciona diretamente aos downloads se não houver rede",
      "Monitoramento contínuo de capacidade de disco e gerenciamento otimizado de armazenamento",
    ],
  },
  {
    version: "v1.1.4",
    title: "DNS Fallback Ultrarrápido, Vortex Sync em Nuvem & Nova Identidade",
    date: "17 de Setembro de 2026",
    isLatest: false,
    highlights: [
      "DNS Fallback automático (Cloudflare + Google DoH) contra bloqueios e instabilidades de provedores",
      "Vortex Sync: sincronização instantânea de múltiplos perfis e preferências em nuvem",
      "Identidade visual unificada com novas telas de boas-vindas e logo cinematográfica",
      "Correção e melhorias no verificador interno de atualizações do app",
    ],
    details: [
      "Mecanismo DNS-over-HTTPS (DoH) acionado automaticamente em falhas de resolução de rota",
      "Sincronização em nuvem resiliente com Supabase para dados de perfil e preferências",
      "Refinamentos na responsividade dos elementos do player e navegação fluida",
    ],
  },
  {
    version: "v1.1.3",
    title: "Otimização Avançada de Performance & Sistema de Notificações",
    date: "16 de Setembro de 2026",
    isLatest: false,
    highlights: [
      "Otimização profunda de fluidez: rolagem contínua e troca instantânea de seções",
      "Animação da barra de navegação reconstruída sem engasgos ou relayouts",
      "Sistema completo de notificações de lançamentos funcional com envio de teste",
      "Gerenciamento inteligente de memória com cache agressivo de imagens",
    ],
    details: [
      "Otimização no motor de animações da barra de abas eliminando recálculos pesados durante a rolagem",
      "Congelamento de processos e animações em abas inativas para economizar CPU e bateria",
      "Sistema de notificações com suporte a disparos de teste e solicitação de permissões nativas",
      "Refinamento das configurações com remoção de integrações legadas e limpeza visual em Atualizações",
      "Aumento do cache de memória para carregamento imediato de capas de filmes e séries",
    ],
  },
  {
    version: "v1.1.2",
    title: "Interface do Player Otimizada & Melhorias Gerais",
    date: "16 de Setembro de 2026",
    isLatest: false,
    highlights: [
      "Player mais limpo com foco total no conteúdo e controles essenciais",
      "Remoção de botões desnecessários na barra superior durante a reprodução",
      "Sincronização persistente de perfis e preferências",
    ],
    details: [
      "Layout do player simplificado para uma visualização mais imersiva e sem poluição visual",
      "Ajustes no fluxo de navegação e carregamento de listas",
      "Performance aprimorada no player nativo de vídeo",
    ],
  },
  {
    version: "v1.1.1",
    title: "Atualizações de Sistema & Persistência Completa de Perfis",
    date: "16 de Setembro de 2026",
    isLatest: false,
    highlights: [
      "Sistema de sincronização de perfis e preferências persistente em armazenamento local",
      "Novo sistema otimizado de verificação e download de atualizações",
      "Galeria completa com 41 avatares temáticos para personalização de perfis",
    ],
    details: [
      "Correção definitiva na restauração de configurações de layout e perfis entre sessões",
      "Novo fluxo de verificação de atualizações com tratamento seguro de conexão",
      "Melhorias de desempenho no carregamento de capas e miniaturas",
      "Ajustes de responsividade em telas de celulares e tablets",
    ],
  },
  {
    version: "v1.1.0",
    title: "Interface Cinematográfica & Player de Alta Performance",
    date: "10 de Setembro de 2026",
    isLatest: false,
    highlights: [
      "Nova interface com tema dark carbon e detalhes em roxo neon",
      "Aceleração por hardware aprimorada para reprodução de vídeos em 4K e 60fps",
      "Histórico de 'Continuar Assistindo' com retomada instantânea",
    ],
    details: [
      "Redução no tempo de buffer inicial de streams de canais ao vivo",
      "Suporte a seleção rápida de faixas de áudio e legendas embutidas",
      "Correção de pequenos bugs visuais no carrossel de séries",
    ],
  },
  {
    version: "v1.0.9",
    title: "Múltiplos Perfis & Otimizações Gerais",
    date: "01 de Setembro de 2026",
    isLatest: false,
    highlights: [
      "Suporte inicial a múltiplos perfis independentes no mesmo aparelho",
      "Busca instantânea por título, categoria e gênero",
    ],
    details: [
      "Otimização de memória RAM para dispositivos com recursos limitados",
      "Correção de estabilidade no encerramento de reproduções longas",
    ],
  },
]

export const Updates = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0)

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index)
  }

  return (
    <section id="atualizacoes" className="relative bg-carbon-950 py-20 text-white sm:py-28">
      {/* Luz ambiente roxa */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[800px] rounded-full bg-purple-600/10 blur-[150px]" />

      <div className="container relative z-10 max-w-4xl">
        <div className="text-center mx-auto max-w-2xl">
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300 uppercase tracking-widest">
            Histórico de Atualizações
          </span>
          <h2 className="mt-4 text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Evolução Constante do{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              Vortex Cine
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            Acompanhe as novidades, melhorias de estabilidade e novos recursos adicionados em cada lançamento do aplicativo.
          </p>
        </div>

        {/* Lista de Atualizações Expansíveis */}
        <div className="mt-14 space-y-4">
          {releases.map((rel, idx) => {
            const isOpen = expandedIndex === idx

            return (
              <div
                key={rel.version}
                className={`rounded-2xl border transition duration-300 backdrop-blur-xl ${
                  isOpen
                    ? "border-purple-500/50 bg-carbon-900/90 shadow-[0_10px_30px_rgba(147,51,234,0.15)]"
                    : "border-white/10 bg-carbon-900/60 hover:border-white/20"
                }`}
              >
                {/* Header do Card */}
                <button
                  onClick={() => toggleExpand(idx)}
                  className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-6 text-left gap-4"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-black text-purple-400 font-mono">
                      {rel.version}
                    </span>
                    {rel.isLatest && (
                      <span className="rounded-full bg-purple-500/20 border border-purple-500/40 px-2.5 py-0.5 text-[10px] font-extrabold text-purple-300 uppercase tracking-wider">
                        Mais Recente
                      </span>
                    )}
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-white/50">{rel.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-center">
                    <span className="text-xs font-semibold text-purple-300/80">
                      {isOpen ? "Ocultar detalhes" : "Ver o que mudou"}
                    </span>
                    <div className="size-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
                      <svg
                        className={`size-4 transform transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </button>

                {/* Conteúdo Expansível */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-white/10 px-6 pb-6 pt-4"
                    >
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-purple-300 font-bold mb-2">
                            Principais Destaques
                          </h4>
                          <ul className="space-y-1.5 text-sm text-white/80">
                            {rel.highlights.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-purple-400 mt-0.5">✦</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="text-xs uppercase tracking-widest text-white/50 font-bold mb-2">
                            Melhorias & Correções
                          </h4>
                          <ul className="space-y-1.5 text-sm text-white/60">
                            {rel.details.map((item, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-white/40 mt-0.5">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="pt-2 flex items-center justify-between">
                          <span className="text-xs text-white/40">
                            Compilação oficial assinada
                          </span>
                          <a
                            href="#download"
                            className="inline-flex items-center gap-2 rounded-xl bg-purple-600/30 border border-purple-500/40 px-4 py-2 text-xs font-bold text-white hover:bg-purple-600 transition"
                          >
                            <span>Baixar esta versão</span>
                            <svg className="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

"use client"
import Feature from "./Feature"
import {
  faFilm,
  faTv,
  faBolt,
  faTowerBroadcast,
  faUsers,
  faGem,
  faRotateRight,
  faMagnifyingGlass,
  faCloudArrowDown,
} from "@fortawesome/free-solid-svg-icons"

const features = [
  {
    title: "Filmes em Alta Resolução",
    description:
      "Navegue por lançamentos e clássicos organizados por gêneros, com capas em alta definição, sinopses detalhadas e trailers integrados.",
    icon: faFilm,
    tag: "Cinema",
  },
  {
    title: "Séries & Temporadas",
    description:
      "Acompanhe suas séries favoritas com organização inteligente por temporadas e episódios, lembrando onde você parou.",
    icon: faTv,
    tag: "Completo",
  },
  {
    title: "Animes & Animações",
    description:
      "Área dedicada com seleção dos melhores animes do momento, com áudios dublados e legendados em alta qualidade.",
    icon: faBolt,
    tag: "Otaku",
  },
  {
    title: "Canais de TV Ao Vivo",
    description:
      "Acesse a programação de canais ao vivo de forma rápida e estável, com player nativo otimizado para transmissões sem travamento.",
    icon: faTowerBroadcast,
    tag: "Ao Vivo",
  },
  {
    title: "Múltiplos Perfis com Avatares",
    description:
      "Crie perfis independentes para cada membro da família e personalize com 41 avatares exclusivos no estilo do app.",
    icon: faUsers,
    tag: "Multi-User",
  },
  {
    title: "Interface Cinematográfica",
    description:
      "Design moderno em tema carbon escuro com detalhes em roxo e efeitos glassmorphism, inspirado nas melhores plataformas do mundo.",
    icon: faGem,
    tag: "Design",
  },
  {
    title: "Continuar Assistindo Sincronizado",
    description:
      "Nunca perca o ponto em que parou. Seu histórico e progresso são sincronizados e salvos com segurança de forma persistente.",
    icon: faRotateRight,
    tag: "Sync",
  },
  {
    title: "Busca Rápida e Inteligente",
    description:
      "Encontre instantaneamente qualquer filme, série, anime ou canal digitando o nome no campo de busca universal.",
    icon: faMagnifyingGlass,
    tag: "Instantâneo",
  },
  {
    title: "Atualizações Direto no App",
    description:
      "Receba avisos de novas versões e baixe as melhorias e novos recursos diretamente no aplicativo com um único toque.",
    icon: faCloudArrowDown,
    tag: "Sempre Atual",
  },
]

export const Features = () => {
  return (
    <section id="recursos" className="relative bg-carbon-950 py-20 text-white sm:py-28">
      {/* Luz ambiente roxa */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full bg-purple-900/10 blur-[150px]" />

      <div className="container relative z-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1 text-xs font-semibold text-purple-300 uppercase tracking-widest">
            Recursos Oficiais
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Tudo o que você precisa para uma{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
              imersão total
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-white/70">
            O Vortex Cine foi desenvolvido do zero para oferecer velocidade,
            beleza visual e facilidade de uso em qualquer tela.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Feature
              key={feature.title}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              tag={feature.tag}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

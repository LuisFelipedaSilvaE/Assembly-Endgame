
# 👾 Assembly: Endgame - O Que É?
Um jogo de adivinhação de palavras (tipo Forca) construído com React e Tailwind CSS.

Seu objetivo é descobrir a palavra secreta antes de esgotar o número máximo de erros. Cada erro é representado pela perda de uma linguagem de programação.

# 🚀 Como Funciona (Tech)
O projeto demonstra o uso de conceitos fundamentais do React:

1. useState: Gerencia o estado do jogo (letras adivinhadas, palavra atual).

2. clsx & Tailwind: Permite a criação de um teclado dinâmico onde as cores dos botões mudam instantaneamente (verde para acerto, vermelho para erro) com base no estado do jogo.

3. Acessibilidade (A11y): Usa aria-live para fornecer feedback de status em tempo real para usuários de leitores de tela.

# ✨ Destaques
O projeto foca em imutabilidade na gestão de estado e na renderização condicional para exibir a "barra de vida" (linguagens) e as mensagens de "Vitória" ou "Derrota" ao final do jogo.

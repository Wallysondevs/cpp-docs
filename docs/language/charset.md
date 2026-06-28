# Conjuntos de caracteres e codificações

Esta página descreve vários conjuntos de caracteres especificados pelo padrão C++.

### Conjunto de caracteres de tradução

O _conjunto de caracteres de tradução_ consiste nos seguintes elementos:

*   cada caractere abstrato ao qual é atribuído um ponto de código no codespace [Unicode](<https://www.unicode.org/versions/latest/>), e
*   um caractere distinto para cada valor escalar Unicode não atribuído a um caractere abstrato.

O conjunto de caracteres de tradução é um superconjunto do conjunto de caracteres básico e do conjunto de caracteres literal básico (veja abaixo). | (desde C++23)

### Conjunto de caracteres básico

O _conjunto de caracteres básico_ consiste nos seguintes 96(até C++26)99(desde C++26) caracteres:

Unidade de código | Caractere | Glifo
---|---|---
U+0009 | Tabulação de caractere |
U+000B | Tabulação de linha |
U+000C | Alimentação de formulário (FF) |
U+0020 | Espaço |
U+000A | Alimentação de linha (LF) | new-line
U+0021 | Ponto de exclamação | `!`
U+0022 | Aspas | `"`
U+0023 | Cerquilha | `#`
U+0025 | Sinal de porcentagem | `%`
U+0026 | E comercial | `&`
U+0027 | Apóstrofo | `'`
U+0028 | Parêntese esquerdo | `(`
U+0029 | Parêntese direito | `)`
U+002A | Asterisco | `*`
U+002B | Sinal de mais | `+`
U+002C | Vírgula | `,`
U+002D | Hífen-menos | `-`
U+002E | Ponto final | `.`
U+002F | Barra | `/`
U+0030 .. U+0039 | Dígito zero .. nove | `0 1 2 3 4 5 6 7 8 9`
U+003A | Dois pontos | `:`
U+003B | Ponto e vírgula | `;`
U+003C | Sinal de menor que | `<`
U+003D | Sinal de igual | `=`
U+003E | Sinal de maior que | `>`
U+003F | Ponto de interrogação | `?`
U+0041 .. U+005A | Letra latina maiúscula A .. Z | `A B C D E F G H I J K L M` `N O P Q R S T U V W X Y Z`
U+005B | Colchete esquerdo | `[`
U+005C | Barra invertida | `\`
U+005D | Colchete direito | `]`
U+005E | Acento circunflexo | `^`
U+005F | Sublinhado | `_`
U+0061 .. U+007A | Letra latina minúscula a .. z | `a b c d e f g h i j k l m` `n o p q r s t u v w x y z`
U+007B | Chave esquerda | `{`
U+007C | Barra vertical | `|`
U+007D | Chave direita | `}`
U+007E | Til | `~`
Os seguintes caracteres são adicionados ao conjunto de caracteres básico desde C++26: | Unidade de código | Caractere | Glifo
U+0024 | Sinal de dólar | `$`
U+0040 | Arroba | `@`
U+0060 | Acento grave | `
(desde C++26)

### Conjunto de caracteres literal básico

O _conjunto de caracteres literal básico_ consiste em todos os caracteres do conjunto de caracteres básico, mais os seguintes caracteres de controle:

Unidade de código | Caractere
---|---
U+0000 | Nulo
U+0007 | Sino
U+0008 | Retrocesso
U+000D | Retorno de carro (CR)

### Conjunto de caracteres de execução

O conjunto de caracteres de execução e o conjunto de caracteres largos de execução são superconjuntos do conjunto de caracteres literal básico. As codificações dos conjuntos de caracteres de execução e os conjuntos de elementos adicionais (se houver) são específicos da localidade. Cada elemento do conjunto de caracteres largos de execução deve ser representável como uma unidade de código wchar_t distinta.

### Unidade de código e codificação literal

Uma _unidade de código_ é um valor inteiro de tipo caractere. Caracteres em um [literal de caractere](<#/doc/language/character_literal>) que não seja um literal de caractere multi-caractere ou não codificável, ou em um [literal de string](<#/doc/language/string_literal>), são codificados como uma sequência de uma ou mais unidades de código, conforme determinado pelo prefixo de codificação; isso é denominado a respectiva _codificação literal_.

Uma codificação literal ou uma codificação específica da localidade de um dos conjuntos de caracteres de execução codifica cada elemento do conjunto de caracteres literal básico como uma única unidade de código com valor não negativo, distinta da unidade de código para qualquer outro elemento semelhante. Um caractere que não está no conjunto de caracteres literal básico pode ser codificado com mais de uma unidade de código; o valor de tal unidade de código pode ser o mesmo que o de uma unidade de código para um elemento do conjunto de caracteres literal básico. As codificações dos conjuntos de caracteres de execução podem não ter relação com qualquer codificação literal.

A codificação literal ordinária é a codificação aplicada a um literal de caractere ou string ordinário. A codificação literal larga é a codificação aplicada a um literal de caractere ou string largo.

O caractere NULO U+0000 é codificado com o valor 0. Nenhum outro elemento do conjunto de caracteres de tradução é codificado com uma unidade de código de valor 0. O valor da unidade de código de cada caractere de dígito decimal após o dígito 0 (U+0030) deve ser um maior que o valor do anterior. As codificações literais ordinárias e largas são, de outra forma, definidas pela implementação.

Para um literal UTF-8, UTF-16 ou UTF-32, o valor escalar UCS correspondente a cada caractere do conjunto de caracteres de tradução é codificado conforme especificado na ISO/IEC 10646 para a respectiva forma de codificação UCS.

### Notas

Os nomes padrão de alguns conjuntos de caracteres foram alterados no C++23 via [P2314R4](<https://wg21.link/P2314R4>).

Novo(s) nome(s) | Antigo(s) nome(s)
---|---
conjunto de caracteres básico | conjunto de caracteres fonte básico
conjunto de caracteres literal básico | conjunto de caracteres de execução básico
| conjunto de caracteres largos de execução básico

O mapeamento de caracteres do arquivo fonte (que não seja um arquivo fonte UTF-8)(desde C++23) para o conjunto de caracteres básico(até C++23)conjunto de caracteres de tradução(desde C++23) durante a [fase de tradução 1](<#/doc/language/translation_phases>) é definido pela implementação, portanto, uma implementação é obrigada a documentar como os caracteres fonte básicos são representados nos arquivos fonte.

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[CWG 788](<https://cplusplus.github.io/CWG/issues/788.html>) | C++98 | os valores dos membros dos conjuntos de caracteres de execução eram definidos pela implementação, mas não eram específicos da localidade | eles são específicos da localidade
[CWG 1796](<https://cplusplus.github.io/CWG/issues/1796.html>) | C++98 | a representação do caractere nulo (largo) no conjunto de caracteres (largos) de execução básico tinha todos os bits zero | apenas o valor zero era exigido

### Veja também

[Tabela ASCII](<#/doc/language/ascii>)
---
[Documentação C](<#/>) para Conjuntos de caracteres e codificações
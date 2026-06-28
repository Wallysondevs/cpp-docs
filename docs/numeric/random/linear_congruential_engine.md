# std::linear_congruential_engine

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template<
class UIntType,
UIntType a,
UIntType c,
UIntType m
> class linear_congruential_engine;
```

`linear_congruential_engine` é um engine de números aleatórios baseado no [Gerador Linear Congruencial](<https://en.wikipedia.org/wiki/Linear_congruential_generator> "enwiki:Linear congruential generator") (LCG).

### Parâmetros de template

- **UIntType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um dos tipos unsigned short, unsigned int, unsigned long, ou unsigned long long.
- **a** — o termo multiplicador
- **c** — o termo de incremento
- **m** — o termo de módulo

Quando m não é zero, se a >= m ou c >= m for verdadeiro, o programa é malformado.

### Propriedades do Gerador

O [tamanho](<#/doc/numeric/random>) dos estados de `linear_congruential_engine` é 1, cada um deles consiste em um único inteiro.

O módulo real \\(\scriptsize m_0\\)m0 é definido da seguinte forma:

*   Se m não é zero, \\(\scriptsize m_0\\)m0 é m.
*   Se m é zero, \\(\scriptsize m_0\\)m0 é o valor de [std::numeric_limits](<#/doc/types/numeric_limits>)<result_type>::max() mais 1 (o que significa que \\(\scriptsize m_0\\)m0 não precisa ser representável como `result_type`).

O [algoritmo de transição](<#/doc/numeric/random>) de `linear_congruential_engine` é \\(\scriptsize TA(x_i) = (a \cdot x_i + c)\mod m_0\\)TA(xi) = (a·xi+c) mod m0.

O [algoritmo de geração](<#/doc/numeric/random>) de `linear_congruential_engine` é \\(\scriptsize GA(x_i) = (a \cdot x_i + c)\mod m_0\\)GA(xi) = (a·xi+c) mod m0.

O número pseudoaleatório gerado com o estado atual é também o estado sucessor.

### Especializações predefinidas

As seguintes especializações definem o engine de números aleatórios com dois conjuntos de parâmetros comumente usados:

Definido no cabeçalho `[<random>](<#/doc/header/random>)`
---
Tipo | Definição
---|---
`minstd_rand0` (C++11) | std::linear_congruential_engine<[std::uint_fast32_t](<#/doc/types/integer>),
` `16807, 0, 2147483647>
Descoberto em 1969 por Lewis, Goodman e Miller, adotado como "Padrão Mínimo" em 1988 por Park e Miller
`minstd_rand` (C++11) | std::linear_congruential_engine<[std::uint_fast32_t](<#/doc/types/integer>),
` `48271, 0, 2147483647>
Novo "Padrão Mínimo", recomendado por Park, Miller e Stockmeyer em 1993

### Tipos aninhados

Tipo | Definição
---|---
`result_type` | `UIntType`

### Membros de dados

constexpr UIntType multiplier[static] | a
(constante membro estática pública)
constexpr UIntType increment[static] | c
(constante membro estática pública)
constexpr UIntType modulus[static] | m
(constante membro estática pública)
constexpr UIntType default_seed[static] | 1u
(constante membro estática pública)

### Funções membro

##### Construção e Semeadura

---
[ (construtor)](<#/doc/numeric/random/linear_congruential_engine/linear_congruential_engine>) | constrói o engine
(função membro pública)
[ seed](<#/doc/numeric/random/linear_congruential_engine/seed>) | define o estado atual do engine
(função membro pública)

##### Geração

[ operator()](<#/>) | avança o estado do engine e retorna o valor gerado
(função membro pública)
[ discard](<#/doc/numeric/random/linear_congruential_engine/discard>) | avança o estado do engine por uma quantidade especificada
(função membro pública)

##### Características

[ min](<#/doc/numeric/random/linear_congruential_engine/min>)[static] | obtém o menor valor possível no range de saída
(função membro estática pública)
[ max](<#/doc/numeric/random/linear_congruential_engine/max>)[static] | obtém o maior valor possível no range de saída
(função membro estática pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/linear_congruential_engine/operator_cmp>)(desde C++11)(desde C++11)(removido em C++20) | compara os estados internos de dois engines de números pseudoaleatórios
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/linear_congruential_engine/operator_ltltgtgt>)(desde C++11) | realiza entrada e saída de stream em engine de números pseudoaleatórios
(template de função)

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo
# std::subtract_with_carry_engine

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template<
class UIntType,
std::size_t w, std::size_t s, std::size_t r
> class subtract_with_carry_engine;
```

É um motor de números aleatórios que usa o algoritmo [subtract with carry](<https://en.wikipedia.org/wiki/subtract_with_carry> "enwiki:subtract with carry").

### Parâmetros de template

- **UIntType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um de unsigned short, unsigned int, unsigned long, ou unsigned long long.
- **w** — o tamanho da palavra, em bits, da sequência de estado
- **s** — o lag curto
- **r** — o lag longo

Se w não estiver em `[`1`, `[std::numeric_limits](<#/doc/types/numeric_limits>)&lt;UIntType&gt;::digits`]`, ou s não estiver em `[`1`, `r`)`, o programa é malformado.

### Propriedades do Gerador

O [tamanho](<#/doc/numeric/random>) dos estados de `subtract_with_carry_engine` é \\(\scriptsize O(r)\\)O(r), cada um deles consiste em duas partes:

*   Uma sequência X de r valores inteiros, onde cada valor está em `[`​0​`, `2`w`
    `)`.
*   Um inteiro c (conhecido como _carry_ ), cujo valor é 0 ou 1.

Dado que \\(\scriptsize X_j\\)Xj representa o \\(\scriptsize j\mod r\\)j mod r-ésimo valor (começando de 0) de X, o [algoritmo de transição](<#/doc/numeric/random>) de `subtract_with_carry_engine` (\\(\scriptsize TA(x_i)\\)TA(xi)) é definido como segue:

1.  Seja Y igual a \\(\scriptsize X_{i-s}-X_{i-r}-c\\)Xi-s-Xi-r-c.
2.  Seja y igual a \\(\scriptsize Y\mod 2^w\\)Y mod 2w , e defina \\(\scriptsize X_i\\)Xi como y.
3.  Se Y for negativo, defina c como 1, caso contrário, defina c como 0.

O [algoritmo de geração](<#/doc/numeric/random>) de `subtract_with_carry_engine` é \\(\scriptsize GA(x_i) = y\\)GA(xi) = y, onde y é o valor produzido na etapa 2 do algoritmo de transição.

### Especializações predefinidas

As seguintes especializações definem o motor de números aleatórios com dois conjuntos de parâmetros comumente usados:

Definido no cabeçalho `[<random>](<#/doc/header/random>)`
---
Tipo | Definição
---|---
`ranlux24_base` (C++11) | std::subtract_with_carry_engine<[std::uint_fast32_t](<#/doc/types/integer>), 24, 10, 24>
`ranlux48_base` (C++11) | std::subtract_with_carry_engine<[std::uint_fast64_t](<#/doc/types/integer>), 48, 5, 12>

### Tipos aninhados

Tipo | Definição
---|---
`result_type` | `UIntType`

### Membros de dados

constexpr [std::size_t](<#/doc/types/size_t>) word_size[static] | w
(constante membro estática pública)
constexpr [std::size_t](<#/doc/types/size_t>) short_lag[static] | s
(constante membro estática pública)
constexpr [std::size_t](<#/doc/types/size_t>) long_lag[static] | r
(constante membro estática pública)
constexpr [std::uint_least32_t](<#/doc/types/integer>) default_seed[static] | 19780503u
(constante membro estática pública)

### Funções membro

##### Construção e Sementeamento

---
[ (construtor)](<#/doc/numeric/random/subtract_with_carry_engine/subtract_with_carry_engine>) | constrói o motor
(função membro pública)
[ seed](<#/doc/numeric/random/subtract_with_carry_engine/seed>) | define o estado atual do motor
(função membro pública)

##### Geração

[ operator()](<#/>) | avança o estado do motor e retorna o valor gerado
(função membro pública)
[ discard](<#/doc/numeric/random/subtract_with_carry_engine/discard>) | avança o estado do motor por uma quantidade especificada
(função membro pública)

##### Características

[ min](<#/doc/numeric/random/subtract_with_carry_engine/min>)[static] | obtém o menor valor possível no range de saída
(função membro estática pública)
[ max](<#/doc/numeric/random/subtract_with_carry_engine/max>)[static] | obtém o maior valor possível no range de saída
(função membro estática pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/subtract_with_carry_engine/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara os estados internos de dois motores de números pseudoaleatórios
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/subtract_with_carry_engine/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream em um motor de números pseudoaleatórios
(template de função)

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento publicado | Comportamento correto
[LWG 3809](<https://cplusplus.github.io/LWG/issue3809>) | C++11 | `default_seed` pode não ser
representável com `result_type` | alterou seu tipo para
[std::uint_least32_t](<#/doc/types/integer>)
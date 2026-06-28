# std::philox_engine

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template<
class UIntType, std::size_t w, std::size_t n, std::size_t r,
UIntType... consts
>
class philox_engine;
```

`std::philox_engine` é um engine de números aleatórios baseado em contador.

### Parâmetros de template

- **UIntType** — O tipo de resultado gerado pelo gerador. O efeito é indefinido se este não for um de unsigned short, unsigned int, unsigned long, ou unsigned long long.
- **w** — o tamanho da palavra em bits
- **n** — a contagem de palavras
- **r** — a contagem de rodadas
- **consts** — a sequência de multiplicadores e constantes de rodada usadas para gerar números aleatórios

Se qualquer um dos seguintes valores não for verdadeiro, o programa é malformado:

*   `sizeof...(consts) == n`
*   `n == 2 || n == 4 || n == 8 || n == 16`
*   `0 < r`
*   `0 < w && w <= [std::numeric_limits](<#/doc/types/numeric_limits>)<UIntType>::digits`

### Propriedades do Gerador

Na descrição a seguir, seja \\(\scriptsize Q_i \\)Qi o i-ésimo elemento da sequência Q, onde o subscrito começa do zero.

O [tamanho](<#/doc/numeric/random>) dos estados de `philox_engine` é \\(\scriptsize O(n)\\)O(n), cada um deles consiste em quatro partes:

*   Uma sequência X de n valores inteiros, onde cada valor está em `[`​0​`, `2`w`
    `)`.

*   Esta sequência representa um grande valor de contador inteiro sem sinal \\(\scriptsize Z=\sum_{j=0}^{n-1} X \cdot 2^{wj} \\)Z=∑n-1
    j=0X⋅2wj
    de \\(\scriptsize n \cdot w \\)n⋅w bits.

*   Uma sequência K de n / 2 chaves do tipo `UIntType`.
*   Um buffer Y de n valores produzidos do tipo `UIntType`.
*   Um índice j no buffer Y.

O [algoritmo de transição](<#/doc/numeric/random>) de `philox_engine` (\\(\scriptsize TA(X_i) \\)TA(Xi)) é definido como segue:

*   Se j não for n - 1, incrementa j em 1.[1](<#/doc/numeric/random/philox_engine>)
*   Se j for n - 1, executa as seguintes operações:[2](<#/doc/numeric/random/philox_engine>)
    1.  Gera uma nova sequência de n valores aleatórios (veja abaixo) e os armazena em Y.
    2.  Incrementa o contador Z em 1.
    3.  Reinicia j para ​0​.

O [algoritmo de geração](<#/doc/numeric/random>) de `philox_engine` é \\(\scriptsize GA(X_i)=Y_j \\)GA(Xi)=Yj.

1.  [↑](<#/doc/numeric/random/philox_engine>) Neste caso, a próxima chamada do algoritmo de geração retorna o próximo valor gerado no buffer.
2.  [↑](<#/doc/numeric/random/philox_engine>) Neste caso, o buffer é atualizado, e a próxima chamada do algoritmo de geração retorna o primeiro valor no novo buffer.

#### Gerando valores aleatórios

Valores aleatórios são gerados a partir dos seguintes parâmetros:

*   o número de rodadas r
*   a sequência de contador atual X
*   a sequência de chaves K
*   a sequência de multiplicadores M
*   a sequência de constantes de rodada C

As sequências M e C são formadas a partir dos valores do pacote de parâmetros de template consts, que representa as constantes \\(\scriptsize M_k \\)Mk e \\(\scriptsize C_k \\)Ck como `[`\\(\scriptsize M_0 \\)M0`,` `\\(\scriptsize C_0 \\)C0`,` `\\(\scriptsize M_1 \\)M1`,` `\\(\scriptsize C_1 \\)C1`,... , ...,` `\\(\scriptsize M_{n/2-1} \\)Mn/2-1`,` `\\(\scriptsize C_{n/2-1} \\)Cn/2-1`]`.

Números aleatórios são gerados pelo seguinte processo:

1.  Inicializa a sequência de saída S com os elementos de X.
2.  Atualiza os elementos de S por r rodadas.
3.  Substitui os valores no buffer Y pelos valores em S.

#### Atualizando a sequência de saída

Para cada rodada de atualização, uma sequência intermediária V é inicializada com os elementos de S em uma ordem especificada:

n | ﻿ ﻿ ﻿\\(\scriptsize V_0 \\)V0 ﻿ ﻿ ﻿ | ﻿ ﻿ ﻿\\(\scriptsize V_1 \\)V1 ﻿ ﻿ ﻿ | ﻿ ﻿ ﻿\\(\scriptsize V_2 \\)V2 ﻿ ﻿ ﻿ | ﻿ ﻿ ﻿\\(\scriptsize V_3 \\)V3 ﻿ ﻿ ﻿ | ﻿ ﻿ ﻿\\(\scriptsize V_4 \\)V4 ﻿ ﻿ ﻿ | ﻿ ﻿ ﻿\\(\scriptsize V_5 \\)V5 ﻿ ﻿ ﻿ | ﻿ ﻿ ﻿\\(\scriptsize V_6 \\)V6 ﻿ ﻿ ﻿ | ﻿ ﻿ ﻿\\(\scriptsize V_7 \\)V7 ﻿ ﻿ ﻿ | ﻿ ﻿ ﻿\\(\scriptsize V_8 \\)V8 ﻿ ﻿ ﻿ | ﻿ ﻿ ﻿\\(\scriptsize V_9 \\)V9 ﻿ ﻿ ﻿ | \\(\scriptsize V_{10} \\)V10 | \\(\scriptsize V_{11} \\)V11 | \\(\scriptsize V_{12} \\)V12 | \\(\scriptsize V_{13} \\)V13 | \\(\scriptsize V_{14} \\)V14 | \\(\scriptsize V_{15} \\)V15
2 | \\(\scriptsize S_0 \\)S0 | \\(\scriptsize S_1 \\)S1 | N/A
4 | \\(\scriptsize S_0 \\)S0 | \\(\scriptsize S_3 \\)S3 | \\(\scriptsize S_2 \\)S2 | \\(\scriptsize S_1 \\)S1 | N/A
8 | \\(\scriptsize S_2 \\)S2 | \\(\scriptsize S_1 \\)S1 | \\(\scriptsize S_4 \\)S4 | \\(\scriptsize S_7 \\)S7 | \\(\scriptsize S_6 \\)S6 | \\(\scriptsize S_5 \\)S5 | \\(\scriptsize S_0 \\)S0 | \\(\scriptsize S_3 \\)S3 | N/A
16 | \\(\scriptsize S_0 \\)S0 | \\(\scriptsize S_9 \\)S9 | \\(\scriptsize S_2 \\)S2 | \\(\scriptsize S_{13} \\)S13 | \\(\scriptsize S_6 \\)S6 | \\(\scriptsize S_{11} \\)S11 | \\(\scriptsize S_4 \\)S4 | \\(\scriptsize S_{15} \\)S15 | \\(\scriptsize S_{10} \\)S10 | \\(\scriptsize S_7 \\)S7 | \\(\scriptsize S_{12} \\)S12 | \\(\scriptsize S_3 \\)S3 | \\(\scriptsize S_{14} \\)S14 | \\(\scriptsize S_5 \\)S5 | \\(\scriptsize S_8 \\)S8 | \\(\scriptsize S_1 \\)S1

Dadas as seguintes notações de operação:

*   \\(\scriptsize \mathsf{xor} \\)xor, [XOR bit a bit](<#/doc/language/operator_arithmetic>) embutido.
*   \\(\scriptsize \mathsf{mullo} \\)mullo, calcula a metade inferior da multiplicação modular e é definido como \\(\scriptsize \mathsf{mullo}(a,b,w)=(a \cdot b) \mod 2^w \\)mullo(a,b,w)=(a⋅b) mod 2w
    .
*   \\(\scriptsize \mathsf{mulhi} \\)mulhi, calcula a metade superior da multiplicação e é definido como \\(\scriptsize \mathsf{mulhi}(a,b,w)=\left\lfloor (a \cdot b)/2^w \right\rfloor \\)mulhi(a,b,w)=⌊(a⋅b)/2w
    ⌋.

Seja q o número da rodada atual (começando do zero), para cada inteiro k em `[`​0​`, `n / 2`)`, os elementos da sequência de saída S são atualizados como segue:

*   \\(\scriptsize X_{2 \cdot k}=\mathsf{mullo}(V_{2 \cdot k+1},M_k,w) \\)X2⋅k=mullo(V2⋅k+1,Mk,w)
*   \\(\scriptsize X_{2 \cdot k+1}=\mathsf{mulhi}(V_{2 \cdot k+1},M_k,w)\ \mathsf{xor}\ ((K_k+q \cdot C_k) \mod 2^w)\ \mathsf{xor}\ V_{2 \cdot k} \\)X2⋅k+1=mulhi(V2⋅k+1,Mk,w) xor ((Kk+q⋅Ck) mod 2w
    ) xor V2⋅k

### Especializações predefinidas

As seguintes especializações definem o engine de números aleatórios com dois conjuntos de parâmetros comumente usados:

Definido no cabeçalho `[<random>](<#/doc/header/random>)`
---
Tipo | Definição
---|---
`philox4x32` (C++26) | `std::philox_engine<[std::uint_fast32_t](<#/doc/types/integer>), 32, 4, 10,`
` `0xD2511F53, 0x9E3779B9,`
` `0xCD9E8D57, 0xBB67AE85>`
`philox4x64` (C++26) | `std::philox_engine<[std::uint_fast64_t](<#/doc/types/integer>), 64, 4, 10,`
` `0xD2E7470EE14C6C93, 0x9E3779B97F4A7C15,`
` `0xCA5A826395121157, 0xBB67AE8584CAA73B>`

### Tipos aninhados

Tipo | Definição
---|---
`result_type` | `UIntType`

### Membros de dados

constexpr [std::size_t](<#/doc/types/size_t>) word_size[static] | w
(constante membro estática pública)
constexpr [std::size_t](<#/doc/types/size_t>) word_count[static] | n
(constante membro estática pública)
constexpr [std::size_t](<#/doc/types/size_t>) round_count[static] | r
(constante membro estática pública)
constexpr [std::array](<#/doc/container/array>)<result_type, word_count / 2> multipliers[static] | a [sequência de multiplicadores](<#/doc/numeric/random/philox_engine>) M
(constante membro estática pública)
constexpr [std::array](<#/doc/container/array>)<result_type, word_count / 2> round_consts[static] | a [sequência de constantes de rodada](<#/doc/numeric/random/philox_engine>) C
(constante membro estática pública)
constexpr [std::uint_least32_t](<#/doc/types/integer>) default_seed[static] | 20111115u
(constante membro estática pública)

### Funções membro

##### Construção e Sementeamento

---
[ (construtor)](<#/doc/numeric/random/philox_engine/philox_engine>) | constrói o engine
(função membro pública)
[ seed](<#/doc/numeric/random/philox_engine/seed>) | define o estado atual do engine
(função membro pública)
[ set_counter](<#/doc/numeric/random/philox_engine/set_counter>) | define o contador atual do engine
(função membro pública)

##### Geração

[ operator()](<#/>) | avança o estado do engine e retorna o valor gerado
(função membro pública)
[ discard](<#/doc/numeric/random/philox_engine/discard>) | avança o estado do engine por uma quantidade especificada
(função membro pública)

##### Características

[ min](<#/doc/numeric/random/philox_engine/min>)[static] | obtém o menor valor possível no range de saída
(função membro estática pública)
[ max](<#/doc/numeric/random/philox_engine/max>)[static] | obtém o maior valor possível no range de saída
(função membro estática pública)

### Funções não-membro

[ operator==](<#/doc/numeric/random/philox_engine/operator_cmp>)(C++26) | compara os estados internos de dois engines de números pseudoaleatórios
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/philox_engine/operator_ltltgtgt>)(C++26) | realiza entrada e saída de stream em um engine de números pseudoaleatórios
(template de função)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_philox_engine`](<#/doc/feature_test>) | [`202406L`](<#/>) | (C++26) | `std::philox_engine`

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo
# std::discard_block_engine

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template<
class Engine,
std::size_t P, std::size_t R
> class discard_block_engine;
```

`discard_block_engine` é um adaptador de motor de números pseudoaleatórios que descarta uma certa quantidade de dados produzidos pelo motor base. De cada bloco de tamanho P gerado pelo motor base, o adaptador mantém apenas R números, descartando o restante.

### Parâmetros de template

- **Engine** — o tipo do motor encapsulado.
- **P** — o tamanho de um bloco. Esperado que \\(\small{P>0}\\)P > 0.
- **R** — o número de números usados por bloco. Esperado que \\(\small{0<R\le P}\\)0 < R ≤ P.
Requisitos de tipo
-`Engine` deve satisfazer os requisitos de [RandomNumberEngine](<#/doc/named_req/RandomNumberEngine>).

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (C++11) | `Engine::result_type`

### Funções de membro

[ (constructor)](<#/doc/numeric/random/discard_block_engine/discard_block_engine>)(C++11) | constrói o adaptador de motor
(função membro pública)
[ seed](<#/doc/numeric/random/discard_block_engine/seed>)(C++11) | define o estado do motor subjacente
(função membro pública)
[ base](<#/doc/numeric/random/discard_block_engine/base>)(C++11) | retorna o motor subjacente
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | avança o estado do motor subjacente e retorna o valor gerado
(função membro pública)
[ discard](<#/doc/numeric/random/discard_block_engine/discard>)(C++11) | avança o estado do adaptador por uma quantidade especificada
(função membro pública)

##### Características

[ min](<#/doc/numeric/random/discard_block_engine/min>)[static] (C++11) | obtém o menor valor possível no intervalo de saída do motor subjacente.
(função membro estática pública)
[ max](<#/doc/numeric/random/discard_block_engine/max>)[static] (C++11) | obtém o maior valor possível no intervalo de saída do motor subjacente.
(função membro estática pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/discard_block_engine/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara os estados internos dos adaptadores e motores subjacentes
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/discard_block_engine/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream no adaptador de motor de números pseudoaleatórios
(função)

### Constantes de membro

constexpr size_t block_size[static] (C++11) | o tamanho do bloco, P
(constante de membro estática pública)
constexpr size_t used_block[static] (C++11) | o número de números usados por bloco, R
(constante de membro estática pública)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo
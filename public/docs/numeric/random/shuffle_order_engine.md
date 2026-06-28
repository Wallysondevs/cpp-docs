# std::shuffle_order_engine

Definido no cabeçalho `[<random>](<#/doc/header/random>)` | | (desde C++11)

```c
template<
class Engine,
std::size_t K
> class shuffle_order_engine;
```

`shuffle_order_engine` é um adaptador de motor de números aleatórios que embaralha os números aleatórios gerados pelo motor base. Ele mantém uma tabela de tamanho K e entrega um número selecionado aleatoriamente dessa tabela quando solicitado, substituindo-o por um número gerado pelo motor base.

O seguinte typedef define o motor de números aleatórios com um conjunto de parâmetros comumente usado:

Definido no cabeçalho `[<random>](<#/doc/header/random>)`
---
Tipo | Definição
---|---
`knuth_b` (desde C++11) | std::shuffle_order_engine<[std::minstd_rand0](<#/doc/numeric/random/linear_congruential_engine>), 256>

### Parâmetros de template

- **Engine** — o tipo do motor encapsulado
- **K** — o tamanho da tabela interna. Deve ser maior que 0.
Requisitos de tipo
-`Engine` deve atender aos requisitos de [RandomNumberEngine](<#/doc/named_req/RandomNumberEngine>).

### Tipos de membro

Tipo de membro | Definição
---|---
`result_type` (desde C++11) | `Engine::result_type`

### Funções de membro

[ (construtor)](<#/doc/numeric/random/shuffle_order_engine/shuffle_order_engine>)(desde C++11) | constrói o adaptador do motor
(função de membro pública)
[ seed](<#/doc/numeric/random/shuffle_order_engine/seed>)(desde C++11) | define o estado do motor subjacente
(função de membro pública)
[ base](<#/doc/numeric/random/shuffle_order_engine/base>)(desde C++11) | retorna o motor subjacente
(função de membro pública)

##### Geração

[ operator()](<#/>)(desde C++11) | avança o estado do motor subjacente e retorna o valor gerado
(função de membro pública)
[ discard](<#/doc/numeric/random/shuffle_order_engine/discard>)(desde C++11) | avança o estado do adaptador por uma quantidade especificada
(função de membro pública)

##### Características

[ min](<#/doc/numeric/random/shuffle_order_engine/min>)[static] (desde C++11) | obtém o menor valor possível no intervalo de saída do motor subjacente.
(função de membro estática pública)
[ max](<#/doc/numeric/random/shuffle_order_engine/max>)[static] (desde C++11) | obtém o maior valor possível no intervalo de saída do motor subjacente.
(função de membro estática pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/shuffle_order_engine/operator_cmp>)(desde C++11)(desde C++11)(removido em C++20) | compara os estados internos dos adaptadores e motores subjacentes
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/shuffle_order_engine/operator_ltltgtgt>)(desde C++11) | realiza entrada e saída de stream no adaptador de motor de números pseudoaleatórios
(função)

### Objetos de membro

constexpr size_t table_size[static] (desde C++11) | o tamanho da tabela interna, `K`
(constante de membro estática pública)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo
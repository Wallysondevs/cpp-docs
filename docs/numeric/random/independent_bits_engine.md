# std::independent_bits_engine

Definido no cabeçalho `[<random>](<#/doc/header/random>)`

```c
template<
class Engine,
std::size_t W,
class UIntType
> class independent_bits_engine;
```

[`independent_bits_engine`](<#/doc/numeric/random/independent_bits_engine>) é um adaptador de engine de números aleatórios que produz números aleatórios com um número de bits diferente do engine encapsulado.

### Parâmetros de template

- **Engine** — o tipo do engine encapsulado
- **W** — o número de bits que os números gerados devem ter
- **UIntType** — o tipo dos números aleatórios gerados. O efeito é indefinido a menos que o parâmetro seja cv-unqualified e seja um de unsigned short, unsigned int, unsigned long, ou unsigned long long.
Requisitos de tipo
-`Engine` deve satisfazer os requisitos de [RandomNumberEngine](<#/doc/named_req/RandomNumberEngine>).
-`W` deve ser maior que zero, e não maior que [std::numeric_limits](<#/doc/types/numeric_limits>)&lt;UIntType&gt;::digits.

### Tipos de membros

Tipo de membro | Definição
---|---
`result_type` (C++11) | `UIntType`

### Funções membro

[ (constructor)](<#/doc/numeric/random/independent_bits_engine/independent_bits_engine>)(C++11) | constrói o adaptador de engine
(função membro pública)
[ seed](<#/doc/numeric/random/independent_bits_engine/seed>)(C++11) | define o estado do engine subjacente
(função membro pública)
[ base](<#/doc/numeric/random/independent_bits_engine/base>)(C++11) | retorna o engine subjacente
(função membro pública)

##### Geração

[ operator()](<#/>)(C++11) | avança o estado do engine subjacente e retorna o valor gerado
(função membro pública)
[ discard](<#/doc/numeric/random/independent_bits_engine/discard>)(C++11) | avança o estado do adaptador por uma quantidade especificada
(função membro pública)

##### Características

[ min](<#/doc/numeric/random/independent_bits_engine/min>)[static] (C++11) | obtém o menor valor possível no range de saída (sempre zero).
(função membro estática pública)
[ max](<#/doc/numeric/random/independent_bits_engine/max>)[static] (C++11) | obtém o maior valor possível no range de saída (sempre 2w - 1).
(função membro estática pública)

### Funções não-membro

[ operator==operator!=](<#/doc/numeric/random/independent_bits_engine/operator_cmp>)(C++11)(C++11)(removido em C++20) | compara os estados internos dos adaptadores e engines subjacentes
(função)
[ operator<&lt;operator&gt;>](<#/doc/numeric/random/independent_bits_engine/operator_ltltgtgt>)(C++11) | realiza entrada e saída de stream no adaptador de engine de números pseudoaleatórios
(função)

### Exemplo

| Esta seção está incompleta
Razão: sem exemplo
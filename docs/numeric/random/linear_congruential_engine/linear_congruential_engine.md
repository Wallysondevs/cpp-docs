# std::linear_congruential_engine&lt;UIntType,a,c,m&gt;::linear_congruential_engine

```cpp
linear_congruential_engine() : linear_congruential_engine(default_seed) {}  // (1) (desde C++11)
explicit linear_congruential_engine( result_type value );  // (2) (desde C++11)
template< class SeedSeq >
explicit linear_congruential_engine( SeedSeq& seq );  // (3) (desde C++11)
linear_congruential_engine( const linear_congruential_engine& other );  // (4) (desde C++11)
(declarado implicitamente)
```

Constrói o motor de números pseudoaleatórios.

1) O construtor padrão.

  * Se o motor construído por padrão for do tipo `std::minstd_rand0`, a 10000ª invocação consecutiva dele produz o valor 1043618065.
  * Se o motor construído por padrão for do tipo `std::minstd_rand`, a 10000ª invocação consecutiva dele produz o valor 399268537.

2) Constrói o motor com um valor de semente `value`. O [estado](<#/doc/numeric/random/linear_congruential_engine>) inicial do motor é determinado da seguinte forma:

  * Se c % m == 0 e value % m == 0 forem ambos verdadeiros, o estado é 1.
  * Caso contrário, o estado é value % m.

3) Constrói o motor com uma sequência de semente `seq`. Dado [std::size_t](<#/doc/types/size_t>)([std::log2](<#/doc/numeric/math/log2>)(m) / 32) + 1 como k, o [estado](<#/doc/numeric/random/linear_congruential_engine>) inicial do motor é determinado da seguinte forma:

  1. Cria um objeto array inventado `a` de comprimento k + 3.
  2. Calls seq.generate(a + 0, a + k + 3).
  3. Let S be \\(\scriptsize (\sum^{k-1}_{j=0} a_{j+3} \cdot 2^{32j}) \mod m \\)(∑k-1  
j=0 aj+3·232j  
) mod m.
  4. Se ambos c % m == 0 e S == 0 forem verdadeiros, define o estado do motor como 1. Caso contrário, define o estado do motor como S.

Esta sobrecarga participa da resolução de sobrecarga apenas se `SeedSeq` atender aos requisitos de [SeedSequence](<#/doc/named_req/SeedSequence>).

4) O construtor de cópia. Após a construção, *this == other é verdadeiro.

### Parâmetros

- **value** — valor de semente a ser usado na inicialização do estado interno
- **seq** — sequência de semente a ser usada na inicialização do estado interno

### Complexidade

1,2) Constante.

3) Mesma complexidade da chamada a `seq.generate`.

4) Constante.

### Exceções

3) Se `SeedSeq` não for [std::seed_seq](<#/doc/numeric/random/seed_seq>), lança as exceções lançadas pela chamada a `seq.generate`.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2181](<https://cplusplus.github.io/LWG/issue2181>) | C++11 | sobrecarga ([3](<#/doc/numeric/random/linear_congruential_engine/linear_congruential_engine>)) não lançaria exceção mesmo se a chamada a `seq.generate` lançasse | propaga a exceção
[P0935R0](<https://wg21.link/P0935R0>) | C++11 | o construtor padrão era explícito | tornou-se implícito

### Veja também

[ seed](<#/doc/numeric/random/linear_congruential_engine/seed>) | define o estado atual do motor
(função membro pública)
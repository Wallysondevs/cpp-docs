# std::subtract_with_carry_engine&lt;UIntType,w,s,r&gt;::subtract_with_carry_engine

```cpp
subtract_with_carry_engine() : subtract_with_carry_engine(0u) {}  // (1) (desde C++11)
explicit subtract_with_carry_engine( result_type value );  // (2) (desde C++11)
template< class SeedSeq >
explicit subtract_with_carry_engine( SeedSeq& seq );  // (3) (desde C++11)
subtract_with_carry_engine( const subtract_with_carry_engine& other );  // (4) (desde C++11)
(declarado implicitamente)
```

Constrói o motor de números pseudoaleatórios.

1) O construtor padrão.

  * Se o motor construído por padrão for do tipo `std::ranlux24_base`, a 10000ª invocação consecutiva dele produz o valor 7937952.
  * Se o motor construído por padrão for do tipo `std::ranlux48_base`, a 10000ª invocação consecutiva dele produz o valor 61839128582725.

2) Constrói o motor com um valor de semente value. A sequência X do [estado](<#/doc/numeric/random/subtract_with_carry_engine>) inicial do motor é determinada da seguinte forma:

  1. Constrói um objeto [std::linear_congruential_engine](<#/doc/numeric/random/linear_congruential_engine>)<[std::uint_least32_t](<#/doc/types/integer>), 40014u, 0u, 2147483563u> e com o argumento value == 0u ? default_seed : static_cast<[std::uint_least32_t](<#/doc/types/integer>)>(value % 2147483563u).
  2. Seja n igual a [std::size_t](<#/doc/types/size_t>)(w / 32) + 1.
  3. Define os valores de \\(\scriptsize X_{-r} \\)X-r, ..., \\(\scriptsize X_{-1} \\)X-1, nessa ordem. Cada valor \\(\scriptsize X_i \\)Xi é definido conforme especificado abaixo:

    

  1. Chama e sucessivamente por n vezes, os valores de retorno são denotados como \\(\scriptsize z_0 \\)z0 ... \\(\scriptsize z_{n-1} \\)zn-1.
  2. Define \\(\scriptsize X_i \\)Xi como \\(\scriptsize (\sum^{n-1}_{j=0} z_j \cdot 2^{32j}) \mod m \\)(∑n-1  
j=0 zj·232j  
) mod m.

Se \\(\scriptsize X_{-1} \\)X-1 for ​0​, define o valor de carry c do estado inicial do motor como 1. Caso contrário, define c como ​0​.

3) Constrói o motor com uma sequência de sementes seq. Dado [std::size_t](<#/doc/types/size_t>)(w / 32) + 1 como k, a sequência X do [estado](<#/doc/numeric/random/subtract_with_carry_engine>) inicial do motor é determinada da seguinte forma:

  1. Cria um objeto array inventado a de comprimento r * k.
  2. Chama seq.generate(a + 0, a + r * k).
  3. Para cada inteiro i em `[`-r`, `-1`]`, define \\(\scriptsize X_{i} \\)Xi como \\(\scriptsize (\sum^{k-1}_{j=0} a_{k(i+r)+j} \cdot 2^{32j}) \mod m \\)(∑k-1  
j=0 ak(i+r)+j·232j  
) mod m.

Se \\(\scriptsize X_{-1} \\)X-1 for ​0​, define o valor de carry c do estado inicial do motor como 1. Caso contrário, define c como ​0​.

Esta sobrecarga participa da resolução de sobrecarga somente se `SeedSeq` atender aos requisitos de [SeedSequence](<#/doc/named_req/SeedSequence>).

4) O construtor de cópia. Após a construção, *this == other é verdadeiro.

### Parâmetros

- **value** — valor da semente a ser usado na inicialização do estado interno
- **seq** — sequência de sementes a ser usada na inicialização do estado interno

### Complexidade

1,2) ([std::size_t](<#/doc/types/size_t>)(w / 32) + 1) * r invocações de e.

3) O mesmo que a complexidade da chamada `seq.generate`.

4) \\(\scriptsize O(r) \\)O(r).

### Exceções

3) Se `SeedSeq` não for [std::seed_seq](<#/doc/numeric/random/seed_seq>), lança as exceções lançadas pela chamada `seq.generate`.

### Exemplo

| Esta seção está incompleta
Razão: demonstrações para as sobrecargas (2-4) são necessárias

Execute este código
```cpp
    #include <cassert>
    #include <random>
    
    int main()
    {
        std::ranlux24_base gen24; // overload (1)
        std::ranlux48_base gen48; // overload (1)
        gen24.discard(10000 - 1);
        gen48.discard(10000 - 1);
        assert(gen24() == 7'937'952);
        assert(gen48() == 61'839'128'582'725);
    }
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2181](<https://cplusplus.github.io/LWG/issue2181>) | C++11 | a sobrecarga ([3](<#/doc/numeric/random/subtract_with_carry_engine/subtract_with_carry_engine>)) não lançaria exceção mesmo se a chamada `seq.generate` lançasse | propaga a exceção
[LWG 3809](<https://cplusplus.github.io/LWG/issue3809>) | C++11 | e não poderia ser construído se `result_type` fosse [std::uint16_t](<#/doc/types/integer>) | pode ser construído neste caso
[LWG 4014](<https://cplusplus.github.io/LWG/issue4014>) | C++11 | a resolução do [problema LWG 3809](<https://cplusplus.github.io/LWG/issue3809>) fez com que a semente inicial do [std::linear_congruential_engine](<#/doc/numeric/random/linear_congruential_engine>) intermediário tivesse um tipo diferente do `result_type` do motor | trunca e converte value
[P0935R0](<https://wg21.link/P0935R0>) | C++11 | o construtor padrão era explícito | tornado implícito

### Veja também

[ seed](<#/doc/numeric/random/subtract_with_carry_engine/seed>) | define o estado atual do motor
(função membro pública)
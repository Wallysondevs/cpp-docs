# std::philox_engine&lt;UIntType,w,n,r,consts&gt;::philox_engine

```cpp
philox_engine() : philox_engine(default_seed) {}  // (1) (desde C++26)
explicit philox_engine( result_type value );  // (2) (desde C++26)
template< class SeedSeq >
explicit philox_engine( SeedSeq& seq );  // (3) (desde C++26)
philox_engine( const philox_engine& other );  // (4) (desde C++26)
(declarado implicitamente)
```

Constrói o motor de números pseudoaleatórios.

1) O construtor padrão.

  * Se o motor construído por padrão for do tipo `std::philox4x32`, a 10000ª invocação consecutiva dele produz o valor 1955073260.
  * Se o motor construído por padrão for do tipo `std::philox4x64`, a 10000ª invocação consecutiva dele produz o valor 3409172418970261260.

2) Constrói o motor com um valor de semente `value`. O [estado](<#/doc/numeric/random/philox_engine>) inicial do motor é determinado da seguinte forma:[1](<#/doc/numeric/random/philox_engine/philox_engine>)

  * Todos os elementos da sequência X são definidos como zero.
  * O primeiro elemento da sequência K é definido como \\(\scriptsize value \mod 2^w \\)value mod 2w , os elementos restantes são definidos como zero.
  * O valor de j é definido como n - 1.

3) Constrói o motor com uma sequência de sementes `seq`. O [estado](<#/doc/numeric/random/philox_engine>) inicial do motor é determinado da seguinte forma:[1](<#/doc/numeric/random/philox_engine/philox_engine>)

  * Todos os elementos da sequência X são definidos como zero.
  * Dado (w - 1) / 32 + 1 como p, os elementos da sequência K são definidos pelos seguintes passos:

  1. Cria um objeto array inventado `a` de comprimento n / 2 * p.
  2. Chama `seq.generate(a + 0, a + n / 2 * p)`.
  3. Para cada inteiro k em `[`​0​`, `n / 2`)`, define \\(\scriptsize K_k \\)Kk como \\(\scriptsize (\sum^{p-1}_{i=0} a_{k \cdot p+i} \cdot 2^{32i}) \mod 2^w \\)(∑p-1  
i=0 ak·p+i·232i  
) mod 2w  
.

  * O valor de j é definido como n - 1.

Esta sobrecarga participa da resolução de sobrecarga apenas se `SeedSeq` atender aos requisitos de [SeedSequence](<#/doc/named_req/SeedSequence>).

4) O construtor de cópia. Após a construção, `*this == other` é verdadeiro.

  

  1. ↑ [1.0](<#/doc/numeric/random/philox_engine/philox_engine>) [1.1](<#/doc/numeric/random/philox_engine/philox_engine>) O buffer Y intencionalmente não está sendo definido. Como j está sendo definido como n - 1, a próxima transição de estado sempre gera novos valores aleatórios e os armazena em Y.

### Parâmetros

- **value** — valor de semente a ser usado na inicialização do estado interno
- **seq** — sequência de sementes a ser usada na inicialização do estado interno

### Complexidade

1,2) Constante.

3) Igual à complexidade da chamada `seq.generate`.

4) Constante.

### Exceções

3) Se `SeedSeq` não for [std::seed_seq](<#/doc/numeric/random/seed_seq>), lança as exceções lançadas pela chamada `seq.generate`.

### Veja também

[ seed](<#/doc/numeric/random/philox_engine/seed>) | define o estado atual do motor
(função membro pública)
[ set_counter](<#/doc/numeric/random/philox_engine/set_counter>) | define o contador atual do motor
(função membro pública)
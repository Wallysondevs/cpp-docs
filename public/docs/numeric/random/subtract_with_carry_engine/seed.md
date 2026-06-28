# std::subtract_with_carry_engine&lt;UIntType,w,s,r&gt;::seed

```cpp
void seed( result_type value = 0u );  // (1) (desde C++11)
template< class SeedSeq >
void seed( SeedSeq& seq );  // (2) (desde C++11)
```

Define o [estado](<#/doc/numeric/random/subtract_with_carry_engine>) do motor de números aleatórios.

1) Logo após o estado ser definido, *this == [std::subtract_with_carry_engine](<#/doc/numeric/random/subtract_with_carry_engine>)(value) é verdadeiro.

2) Logo após o estado ser definido, *this == [std::subtract_with_carry_engine](<#/doc/numeric/random/subtract_with_carry_engine>)(seq) é verdadeiro.

### Parâmetros

- **value** — valor de semente a ser usado para definir o estado
- **seq** — sequência de sementes a ser usada para definir o estado

### Exceções

2) Se `SeedSeq` não for [std::seed_seq](<#/doc/numeric/random/seed_seq>), lança as exceções lançadas pela chamada `seq.generate`.

### Complexidade

1) O mesmo que [std::subtract_with_carry_engine](<#/doc/numeric/random/subtract_with_carry_engine>)(value).

2) O mesmo que [std::subtract_with_carry_engine](<#/doc/numeric/random/subtract_with_carry_engine>)(seq).

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2181](<https://cplusplus.github.io/LWG/issue2181>) | C++11 | a sobrecarga ([2](<#/doc/numeric/random/subtract_with_carry_engine/seed>)) não lançaria mesmo que a chamada `seq.generate` lançasse | propaga a exceção
[LWG 3809](<https://cplusplus.github.io/LWG/issue3809>) | C++11 | o argumento padrão de value era default_seed | alterado para 0u

### Ver também

[ (construtor)](<#/doc/numeric/random/subtract_with_carry_engine/subtract_with_carry_engine>) | constrói o motor
(função membro pública)
# std::philox_engine&lt;UIntType,w,n,r,consts&gt;::seed

```cpp
void seed( result_type value = default_seed );  // (1) (desde C++26)
template< class SeedSeq >
void seed( SeedSeq& seq );  // (2) (desde C++26)
```

Define o [estado](<#/doc/numeric/random/philox_engine>) do motor de números aleatórios.

1) Logo após o estado ser definido, `*this == [std::philox_engine](<#/doc/numeric/random/philox_engine>)(value)` é verdadeiro.

2) Logo após o estado ser definido, `*this == [std::philox_engine](<#/doc/numeric/random/philox_engine>)(seq)` é verdadeiro.

### Parâmetros

- **value** — valor de semente a ser usado para definir o estado
- **seq** — sequência de sementes a ser usada para definir o estado

### Exceções

2) Se `SeedSeq` não for [std::seed_seq](<#/doc/numeric/random/seed_seq>), lança as exceções lançadas pela chamada a `seq.generate`.

### Complexidade

1) O mesmo que [std::philox_engine](<#/doc/numeric/random/philox_engine>)(value).

2) O mesmo que [std::philox_engine](<#/doc/numeric/random/philox_engine>)(seq).

### Veja também

[ (construtor)](<#/doc/numeric/random/philox_engine/philox_engine>) | constrói o motor
(função membro pública)
[ set_counter](<#/doc/numeric/random/philox_engine/set_counter>) | define o contador atual do motor
(função membro pública)
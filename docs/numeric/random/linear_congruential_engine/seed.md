# std::linear_congruential_engine&lt;UIntType,a,c,m&gt;::seed

```cpp
void seed( result_type value = default_seed );  // (1) (desde C++11)
template< class SeedSeq >
void seed( SeedSeq& seq );  // (2) (desde C++11)
```

  
Define o [estado](<#/doc/numeric/random/linear_congruential_engine>) do motor de números aleatórios. 

1) Logo após o estado ser definido, `*this == [std::linear_congruential_engine](<#/doc/numeric/random/linear_congruential_engine>)(value)` é verdadeiro.

2) Logo após o estado ser definido, `*this == [std::linear_congruential_engine](<#/doc/numeric/random/linear_congruential_engine>)(seq)` é verdadeiro.

### Parâmetros

value  |  \-  |  valor de seed a ser usado para definir o estado   
---|---|---
seq  |  \-  |  sequência de seed a ser usada para definir o estado   
  
### Exceções

2) Se `SeedSeq` não for [std::seed_seq](<#/doc/numeric/random/seed_seq>), lança as exceções lançadas pela chamada `seq.generate`.

### Complexidade

1) O mesmo que [std::linear_congruential_engine](<#/doc/numeric/random/linear_congruential_engine>)(value).

2) O mesmo que [std::linear_congruential_engine](<#/doc/numeric/random/linear_congruential_engine>)(seq).

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2181](<https://cplusplus.github.io/LWG/issue2181>) | C++11  | sobrecarga ([2](<#/doc/numeric/random/linear_congruential_engine/seed>)) não lançaria mesmo se a chamada `seq.generate` lançasse  | propaga a exceção   
  
### Veja também

[ (construtor)](<#/doc/numeric/random/linear_congruential_engine/linear_congruential_engine>) |  constrói o motor   
(função membro pública)  
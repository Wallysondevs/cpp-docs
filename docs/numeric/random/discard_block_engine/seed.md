# std::discard_block_engine&lt;Engine,P,R&gt;::seed

```cpp
void seed();  // (1) (desde C++11)
void seed( result_type value );  // (2) (desde C++11)
template< class SeedSeq >
void seed( SeedSeq& seq );  // (3) (desde C++11)
```

  
Reinicializa o estado interno do motor subjacente usando um novo valor de semente.

1) Semeia o motor subjacente com o valor de semente padrão. Efetivamente chama e.seed(), onde e é o motor subjacente.

2) Semeia o motor subjacente com o valor de semente `value`. Efetivamente chama e.seed(value), onde e é o motor subjacente.

3) Semeia o motor subjacente com a sequência de sementes `seq`. Efetivamente chama e.seed(seq), onde e é o motor subjacente.

Esta sobrecarga participa da resolução de sobrecarga apenas se `SeedSeq` satisfizer os requisitos de [SeedSequence](<#/doc/named_req/SeedSequence>).

### Parâmetros

value  |  \-  |  valor de semente a ser usado na inicialização do estado interno do motor subjacente   
---|---|---
seq  |  \-  |  sequência de sementes a ser usada na inicialização do estado interno do motor subjacente   
  
### Exceções

3) Se `SeedSeq` não for [std::seed_seq](<#/doc/numeric/random/seed_seq>), lança as exceções lançadas pela chamada `seq.generate`.

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2181](<https://cplusplus.github.io/LWG/issue2181>) | C++11  | a sobrecarga ([3](<#/doc/numeric/random/discard_block_engine/seed>)) não lançaria exceção mesmo se a chamada `seq.generate` lançasse  | propaga a exceção 
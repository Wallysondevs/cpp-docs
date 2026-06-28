# std::shuffle_order_engine&lt;Engine,K&gt;::seed

```cpp
void seed();  // (1) (desde C++11)
void seed( result_type value );  // (2) (desde C++11)
template< class SeedSeq >
void seed( SeedSeq& seq );  // (3) (desde C++11)
```

  
Reinicializa o estado interno do engine subjacente usando um novo valor de seed.

1) Define o seed do engine subjacente com o valor de seed padrão. Efetivamente chama e.seed(), onde e é o engine subjacente.

2) Define o seed do engine subjacente com o valor de seed `value`. Efetivamente chama e.seed(value), onde e é o engine subjacente.

3) Define o seed do engine subjacente com a seed sequence `seq`. Efetivamente chama e.seed(seq), onde e é o engine subjacente.

Esta sobrecarga participa da resolução de sobrecarga apenas se `SeedSeq` satisfizer os requisitos de [SeedSequence](<#/doc/named_req/SeedSequence>).

### Parâmetros

value  |  \-  |  valor de seed a ser usado na inicialização do estado interno do engine subjacente   
---|---|---
seq  |  \-  |  seed sequence a ser usada na inicialização do estado interno do engine subjacente   
  
### Exceções

3) Se `SeedSeq` não for [std::seed_seq](<#/doc/numeric/random/seed_seq>), lança as exceções lançadas pela chamada `seq.generate`.

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2181](<https://cplusplus.github.io/LWG/issue2181>) | C++11  | a sobrecarga ([3](<#/doc/numeric/random/shuffle_order_engine/seed>)) não lançaria exceção mesmo se a chamada `seq.generate` lançasse  | propaga a exceção 
# std::shuffle_order_engine&lt;Engine,K&gt;::shuffle_order_engine

```cpp
shuffle_order_engine();  // (1) (desde C++11)
explicit shuffle_order_engine( result_type s );  // (2) (desde C++11)
template< class SeedSeq >
explicit shuffle_order_engine( SeedSeq& seq );  // (3) (desde C++11)
explicit shuffle_order_engine( const Engine& e );  // (4) (desde C++11)
explicit shuffle_order_engine( Engine&& e );  // (5) (desde C++11)
```

Constrói um novo adaptador de engine pseudoaleatório.

1) Construtor padrão. A engine subjacente também é construída por padrão.

2) Constrói a engine subjacente com s.

3) Constrói a engine subjacente com a seed sequence seq.

Esta sobrecarga participa da resolução de sobrecarga somente se `Sseq` satisfizer os requisitos de [SeedSequence](<#/doc/named_req/SeedSequence>).

4) Constrói a engine subjacente com uma cópia de e.

5) Constrói por move a engine subjacente com e. e mantém um estado não especificado, mas válido, depois.

### Parâmetros

- **s** — valor inteiro para construir a engine subjacente
- **seq** — seed sequence para construir a engine subjacente
- **e** — engine de números pseudoaleatórios para inicializar

### Exceções

3) Se `SeedSeq` não for [std::seed_seq](<#/doc/numeric/random/seed_seq>), lança as exceções lançadas pela chamada a `seq.generate`.

### Exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2181](<https://cplusplus.github.io/LWG/issue2181>) | C++11 | a sobrecarga ([3](<#/doc/numeric/random/shuffle_order_engine/shuffle_order_engine>)) não lançaria mesmo se a chamada a `seq.generate` lançasse | propaga a exceção
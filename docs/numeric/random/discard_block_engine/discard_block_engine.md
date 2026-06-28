# std::discard_block_engine&lt;Engine,P,R&gt;::discard_block_engine

```cpp
discard_block_engine();  // (1) (desde C++11)
explicit discard_block_engine( result_type s );  // (2) (desde C++11)
template< class SeedSeq >
explicit discard_block_engine( SeedSeq& seq );  // (3) (desde C++11)
explicit discard_block_engine( const Engine& e );  // (4) (desde C++11)
explicit discard_block_engine( Engine&& e );  // (5) (desde C++11)
```

Constrói um novo adaptador de engine pseudoaleatório.

1) Construtor padrão. O engine subjacente também é construído por padrão.

2) Constrói o engine subjacente com s.

3) Constrói o engine subjacente com a sequência de sementes `seq`.

Esta sobrecarga participa da resolução de sobrecarga apenas se `Sseq` satisfizer os requisitos de [SeedSequence](<#/doc/named_req/SeedSequence>).

4) Constrói o engine subjacente com uma cópia de e.

5) Constrói por movimento (move-constructs) o engine subjacente com e. `e` mantém um estado não especificado, mas válido, depois disso.

### Parâmetros

- **s** — valor inteiro para construir o engine subjacente
- **seq** — sequência de sementes para construir o engine subjacente
- **e** — engine de números pseudoaleatórios para inicializar

### Exceções

3) Se `SeedSeq` não for [std::seed_seq](<#/doc/numeric/random/seed_seq>), lança as exceções lançadas pela chamada `seq.generate`.

### Exemplo

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento conforme publicado | Comportamento correto
---|---|---|---
[LWG 2181](<https://cplusplus.github.io/LWG/issue2181>) | C++11 | a sobrecarga ([3](<#/doc/numeric/random/discard_block_engine/discard_block_engine>)) não lançaria uma exceção mesmo se a chamada `seq.generate` lançasse uma | propaga a exceção
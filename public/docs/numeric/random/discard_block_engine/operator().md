# std::discard_block_engine&lt;Engine,P,R&gt;::operator()

```cpp
result_type operator()();  // (desde C++11)
```

  
Gera um valor aleatório. O estado do engine subjacente é avançado uma ou mais vezes. 

### Parâmetros

(nenhum) 

### Valor de retorno

Um número pseudoaleatório em [min(), max()]. 

### Exceções

Não lança exceções. 

### Veja também

[ discard](<#/doc/numeric/random/discard_block_engine/discard>)(C++11) | avança o estado do adaptador por uma quantidade especificada   
(função membro pública)  
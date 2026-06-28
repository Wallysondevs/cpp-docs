# std::linear_congruential_engine&lt;UIntType,a,c,m&gt;::operator()

```cpp
result_type operator()();  // (desde C++11)
```

  
Avança o estado do motor, e gera um valor pseudoaleatório a partir do novo estado. 

### Valor de retorno

Um número pseudoaleatório em `[`min()`, `max()`]`. 

### Complexidade

Constante amortizado. 

### Veja também

[ discard](<#/doc/numeric/random/linear_congruential_engine/discard>) |  avança o estado do motor por uma quantidade especificada   
(função membro pública)  
# std::philox_engine&lt;UIntType,w,n,r,consts&gt;::operator()

```cpp
result_type operator()();  // (desde C++26)
```

  
Avança o estado do motor e gera um valor pseudoaleatório a partir do novo estado. 

### Valor de retorno

Um número pseudoaleatório no intervalo `[`min()`, `max()`]`. 

### Complexidade

Constante amortizada. 

### Veja também

[ discard](<#/doc/numeric/random/philox_engine/discard>) |  avança o estado do motor por uma quantidade especificada   
(função membro pública)  
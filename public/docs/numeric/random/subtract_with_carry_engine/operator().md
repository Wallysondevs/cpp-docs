# std::subtract_with_carry_engine&lt;UIntType,w,s,r&gt;::operator()

```cpp
result_type operator()();  // (desde C++11)
```

  
Avança o estado do motor e gera um valor pseudoaleatório a partir do novo estado.

### Valor de retorno

Um número pseudoaleatório em `[`min()`, `max()`]`.

### Complexidade

Constante amortizada.

### Ver também

[ discard](<#/doc/numeric/random/subtract_with_carry_engine/discard>) | avança o estado do motor por uma quantidade especificada   
(função membro pública)  
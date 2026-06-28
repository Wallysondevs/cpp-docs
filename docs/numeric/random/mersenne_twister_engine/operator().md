# std::mersenne_twister_engine&lt;UIntType,w,n,m,r,a,u,d,s,b,t,c,l,f&gt;::operator()

```cpp
result_type operator()();  // (desde C++11)
```

  
Avança o estado do motor e gera um valor pseudoaleatório a partir do novo estado. 

### Valor de retorno

Um número pseudoaleatório em `[`min()`, `max()`]`. 

### Complexidade

Constante amortizada. 

### Veja também

[ discard](<#/doc/numeric/random/mersenne_twister_engine/discard>) | avança o estado do motor por uma quantidade especificada   
(função membro pública)  
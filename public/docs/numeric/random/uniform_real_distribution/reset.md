# std::uniform_real_distribution&lt;RealType&gt;::reset

```cpp
void reset();  // (desde C++11)
```

  
Reinicia o estado interno do objeto de distribuição. Após uma chamada a esta função, a próxima chamada a `operator()` no objeto de distribuição não dependerá de chamadas anteriores a `operator()`.

### Parâmetros

(nenhum) 

### Valor de retorno

(nenhum) 

### Complexidade

Constante. 
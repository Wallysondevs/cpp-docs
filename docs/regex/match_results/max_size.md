# std::match_results&lt;BidirIt,Alloc&gt;::max_size

```cpp
size_type max_size() const noexcept;  // (desde C++11)
```

  
Retorna o número máximo de subcorrespondências que o tipo `match_results` é capaz de armazenar devido a limitações de implementação do sistema ou da biblioteca, isto é, [std::distance](<#/doc/iterator/distance>)(begin(), end()) para o maior número de subcorrespondências.

### Parâmetros

(nenhum)

### Valor de retorno

Número máximo de subcorrespondências.

### Complexidade

Constante.
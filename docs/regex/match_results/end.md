# std::match_results&lt;BidirIt,Alloc&gt;::end, std::match_results&lt;BidirIt,Alloc&gt;::cend

```cpp
iterator end() noexcept;  // (desde C++11)
const_iterator end() const noexcept;  // (desde C++11)
const_iterator cend() const noexcept;  // (desde C++11)
```

  
Retorna um iterator para o fim da lista de sub-correspondências. 

### Parâmetros

(nenhum) 

### Valor de retorno

Iterator para o elemento após a última sub-correspondência. 

### Complexidade

Constante. 

### Veja também

[ begincbegin](<#/doc/regex/match_results/begin>) |  retorna um iterator para o início da lista de sub-correspondências   
(função membro pública)  
# std::match_results&lt;BidirIt,Alloc&gt;::begin, std::match_results&lt;BidirIt,Alloc&gt;::cbegin

```cpp
iterator begin() noexcept;  // (desde C++11)
const_iterator begin() const noexcept;  // (desde C++11)
const_iterator cbegin() const noexcept;  // (desde C++11)
```

  
Retorna um iterator para o início da lista de sub-correspondências. Se a correspondência foi bem-sucedida, o iterator apontará para a expressão correspondida inteira. 

### Parâmetros

(nenhum) 

### Valor de retorno

Iterator para a primeira sub-correspondência. 

### Complexidade

Constante. 

### Veja também

[ endcend](<#/doc/regex/match_results/end>) |  retorna um iterator para o fim da lista de sub-correspondências   
(função membro pública)  
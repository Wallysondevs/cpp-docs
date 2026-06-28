# std::flat_multiset&lt;Key,Compare,KeyContainer&gt;::swap

```cpp
void swap( flat_multiset& other ) noexcept;  // (desde C++23)
```

Troca o conteúdo do adaptador de container com o de `other`. Efetivamente chama
```cpp
    ranges::swap(compare, other.compare);
    ranges::swap(c, other.c);
```

### Parâmetros

other  |  \-  |  adaptador de container para trocar o conteúdo com   
  
### Valor de retorno

(nenhum) 

### Exceções

(nenhum) 

### Complexidade

Mesma do container subjacente (tipicamente constante). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ std::swap(std::flat_multiset)](<#/doc/container/flat_multiset/swap2>)(C++23) |  especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(modelo de função)  
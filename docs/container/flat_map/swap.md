# std::flat_map&lt;Key,T,Compare,KeyContainer,MappedContainer&gt;::swap

```cpp
void swap( flat_map& other ) noexcept;  // (desde C++23)
```

Troca o conteúdo do adaptador de container com o de `other`. Efetivamente chama 
```cpp
    ranges::swap(compare, other.compare);
    ranges::swap(c.keys, other.c.keys);
    ranges::swap(c.values, other.c.values);
```

### Parâmetros

other  |  \-  |  adaptador de container para trocar o conteúdo com   
  
### Valor de retorno

(nenhum) 

### Exceções

(nenhuma) 

### Complexidade

Mesma que a do container subjacente (tipicamente constante). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ std::swap(std::flat_map)](<#/doc/container/flat_map/swap2>)(C++23) |  especializa o algoritmo [std::swap](<#/doc/utility/swap>)   
(function template)  
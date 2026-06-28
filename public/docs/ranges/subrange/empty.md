# std::ranges::subrange&lt;I,S,K&gt;::empty

```cpp
constexpr bool empty() const;  // (desde C++20)
```

  
Verifica se o [`subrange`](<#/doc/ranges/subrange>) está vazio. 

### Valor de retorno

`_[begin_](<#/doc/ranges/subrange>)_` `==` ` _[end_](<#/doc/ranges/subrange>)_`. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ size](<#/doc/ranges/subrange/size>) |  obtém o tamanho do `subrange`   
(função membro pública)  
[ empty](<#/doc/iterator/empty>)(C++17) |  verifica se o container está vazio   
(modelo de função)  
[ ranges::empty](<#/doc/ranges/empty>)(C++20) |  verifica se um range está vazio  
(objeto de ponto de customização)
# std::ranges::elements_view&lt;V,N&gt;::size

```cpp
constexpr auto size() requires ranges::sized_range<V>;  // (desde C++20)
constexpr auto size() const requires ranges::sized_range<const V>;  // (desde C++20)
```

  
Retorna o número de elementos, ou seja, [ranges::size](<#/doc/ranges/size>)(base_), onde [`_base__`](<#/doc/ranges/elements_view>) é a view subjacente. 

### Parâmetros

(nenhum) 

### Valor de retorno

O número de elementos. 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
  
### Veja também

[ ranges::size](<#/doc/ranges/size>)(C++20) |  retorna um inteiro igual ao tamanho de um range  
(objeto de ponto de customização)  
[ ranges::ssize](<#/doc/ranges/ssize>)(C++20) |  retorna um inteiro assinado igual ao tamanho de um range  
(objeto de ponto de customização)
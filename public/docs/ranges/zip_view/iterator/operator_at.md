# std::ranges::zip_view&lt;Views...&gt;::iterator&lt;Const&gt;::operator[]

```cpp
constexpr auto operator const
requires /*all-random-access*/<Const, Views...>;  // (desde C++23)
```

  
Obtém uma [std::tuple](<#/doc/utility/tuple>) que consiste em elementos subjacentes apontados em um dado deslocamento relativo à localização atual.

Equivalente a: 
```
    return /*tuple-transform*/([&]<class I>(I& i) -> decltype(auto) {
               return i[iter_difference_t<I>(n)];
           }, current_);
```

### Parâmetros

n  |  \-  |  posição relativa à localização atual   
  
### Valor de retorno

O elemento tipo-tuple obtido.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
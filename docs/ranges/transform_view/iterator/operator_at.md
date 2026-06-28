# std::ranges::transform_view&lt;V,F&gt;::iterator&lt;Const&gt;::operator[]

```cpp
constexpr decltype(auto) operator const
requires ranges::random_access_range<Base>;  // (desde C++20)
```

  
Retorna o elemento na localização relativa especificada, após a transformação.

Efetivamente retorna [std::invoke](<#/doc/utility/functional/invoke>)(*parent_->fun_, current_[n]), onde *parent_->fun_ é a função de transformação armazenada no `transform_view` pai, e `current_` é o iterator subjacente para `V`.

### Parâmetros

n  |  \-  |  posição relativa à localização atual.   
  
### Valor de retorno

o elemento transformado

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
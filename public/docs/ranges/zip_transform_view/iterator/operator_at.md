# std::ranges::zip_transform_view&lt;F,Views...&gt;::iterator&lt;Const&gt;::operator[]

```cpp
constexpr decltype(auto) operator const
requires ranges::random_access_range<Base>;  // (desde C++23)
```

  
Retorna o elemento na localização relativa especificada, após a transformação.

Equivalente a 
```
    return
        std::apply
        (
            [&]<class... Is>(const Is&... iters) -> decltype(auto)
            {
                return std::invoke(*parent_->fun_, iters[std::iter_difference_t<Is>(n)]...);
            },
            inner_.current_
        );
```

onde *parent_->fun_ é a função de transformação do tipo F armazenada no ranges::zip_transform_view pai, e `_current__` é a tupla subjacente de iterators para Views.... 

### Parâmetros

n  |  \-  |  posição relativa à localização atual.   
  
### Valor de retorno

O elemento que é o resultado da transformação (mapeamento). 

### Notas

O comportamento é indefinido se o ponteiro `_parent__` para o ranges::zip_transform_view pai for nulo (por exemplo, se *this for construído por padrão). 

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
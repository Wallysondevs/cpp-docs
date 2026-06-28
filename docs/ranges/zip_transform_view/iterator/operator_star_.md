# std::ranges::zip_transform_view&lt;F,Views...&gt;::iterator&lt;Const&gt;::operator*

```cpp
constexpr decltype(auto) operator*() const
noexcept(/* see description */);  // (desde C++23)
```

  
Retorna o elemento transformado obtido pela aplicação do objeto invocável do tipo F aos elementos subjacentes apontados.

Equivalente a
```cpp
    return
        std::apply
        (
            & -> decltype(auto)
            {
                return std::invoke(*parent_->fun_, *iters...);
            },
            inner_.current_
        );
```

onde *parent_->fun_ é a função de transformação armazenada na ranges::zip_transform_view pai, e `_current__` é a tupla subjacente de iteradores para Views....

### Parâmetros

(nenhum)

### Valor de retorno

O elemento que é o resultado da transformação (mapeamento).

### Exceções

[`noexcept`](<#/doc/language/noexcept_spec>) especificação:

noexcept([std::invoke](<#/doc/utility/functional/invoke>)(*parent_->fun_, *std::get&lt;INTS&gt;(inner_.current_)...))

     onde `_INTS_` é o pacote de inteiros `0, 1, ..., (sizeof...(Views)-1)`.

### Notas

`operator->` não é fornecido.

O comportamento é indefinido se o ponteiro `_parent__` para a ranges::zip_transform_view pai for nulo (por exemplo, se *this for construído por padrão).

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
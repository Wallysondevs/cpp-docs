# std::mdspan&lt;T,Extents,LayoutPolicy,AccessorPolicy&gt;::data_handle

```cpp
constexpr const data_handle_type& data_handle() const noexcept;  // (desde C++23)
```

Retorna o manipulador de dados subjacente de [`data_handle_type`](<#/doc/container/mdspan>). Equivalente a `return` [`_ptr__`](<#/doc/container/mdspan>) ;.

### Parâmetros

(nenhum)

### Valor de retorno

Uma referência `const` para o manipulador de dados subjacente.

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Ver também

| Esta seção está incompleta
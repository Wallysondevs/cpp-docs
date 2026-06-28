# std::ranges::transform_view&lt;V,F&gt;::iterator&lt;Const&gt;::operator*

```cpp
constexpr decltype(auto) operator*() const;  // (desde C++20)
```

  
Retorna o elemento transformado.

Efetivamente retorna [std::invoke](<#/doc/utility/functional/invoke>)(*parent_->fun_, *current_), onde `*parent_->fun_` é a função de transformação armazenada na `transform_view` pai, e `current_` é o iterator subjacente para `V`.

### Parâmetros

(nenhum)

### Valor de retorno

O elemento transformado.

### Observações

`operator->` não é fornecido.

O comportamento é indefinido se o ponteiro para a `transform_view` pai for nulo (por exemplo, se `*this` for construído por padrão).

Se `*current_` for um prvalue, seu tempo de vida termina antes que esta função retorne. Se a função de transformação retornar uma referência ou ponteiro para ele, o resultado ficaria pendente.

### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
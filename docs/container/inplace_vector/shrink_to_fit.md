# std::inplace_vector&lt;T,N&gt;::shrink_to_fit

```cpp
static constexpr void shrink_to_fit() noexcept;  // (desde C++26)
```

Não faz nada.

Nominalmente, esta função é uma solicitação não vinculativa para diminuir a capacidade de modo que o armazenamento interno contenha apenas size() elementos. No entanto, tal solicitação é sempre ignorada pelo container de capacidade fixa [std::inplace_vector](<#/doc/container/inplace_vector>)<T, N>.

### Parâmetros

(nenhum)

### Valor de retorno

(nenhum)

### Complexidade

Constante.

### Observações

Esta função existe para compatibilidade com interfaces semelhantes a vector.

### Veja também

[ size](<#/doc/container/inplace_vector/size>) | retorna o número de elementos
(função membro pública)
[ resize](<#/doc/container/inplace_vector/resize>) | altera o número de elementos armazenados
(função membro pública)
[ capacity](<#/doc/container/inplace_vector/capacity>)[static] | retorna o número de elementos que podem ser mantidos no armazenamento atualmente alocado
(função membro estática pública)
[ shrink_to_fit](<#/doc/container/vector/shrink_to_fit>)(DR*) | reduz o uso de memória liberando memória não utilizada
(função membro pública de `std::vector<T,Allocator>`)
[ shrink_to_fit](<#/doc/container/deque/shrink_to_fit>)(DR*) | reduz o uso de memória liberando memória não utilizada
(função membro pública de `std::deque<T,Allocator>`)
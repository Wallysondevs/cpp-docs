# std::ranges::chunk_view&lt;V&gt;::inner-iterator::operator++

```cpp
constexpr /*inner-iterator*/& operator++();
```
| (1) | (desde C++23) |
|---|---|
```cpp
constexpr void operator++( int );
```
| (2) | (desde C++23) |

  
Incrementa o [iterator](<#/doc/ranges/chunk_view/inner_iterator>).

Seja [`_parent__`](<#/doc/ranges/chunk_view/inner_iterator>) o ponteiro subjacente para o `chunk_view` envolvente.

1) Equivalente a:
```cpp
    ++*parent_->current_;
    if (*parent_->current_ == ranges::end(parent_->base_))
        parent_->remainder_ = 0;
    else
        --parent_->remainder_;
    return *this;
```

Antes da invocação deste operador, a expressão `*this == std::default_sentinel` deve ser falsa.

2) Equivalente a `++*this`.

### Parâmetros

(nenhum)

### Valor de retorno

1) `*this`

2) (nenhum)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo
  
### Ver também

[ operator-](<#/doc/ranges/chunk_view/inner_iterator/operator->)(C++23) | calcula o número de chunks restantes
(função)
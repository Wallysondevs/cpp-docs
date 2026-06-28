# std::ranges::chunk_view&lt;V&gt;::outer-iterator::operator++

```cpp
constexpr /*outer-iterator*/& operator++();  // (1) (desde C++23)
constexpr void operator++( int );  // (2) (desde C++23)
```

Incrementa o [iterator](<#/doc/ranges/chunk_view/outer_iterator>).

Seja [`_parent__`](<#/doc/ranges/chunk_view/outer_iterator>) o ponteiro subjacente para o `chunk_view` envolvente.

1) Equivalente a:
```cpp
    ranges::advance(*parent_->current_, parent_->remainder_, ranges::end(parent_->base_));
    parent_->remainder_ = parent_->n_;
    return *this;
```

Antes da invocação deste operador, a expressão *this == [std::default_sentinel](<#/doc/iterator/default_sentinel>) deve ser falsa.

2) Equivalente a ++*this.

### Parâmetros

(nenhum)

### Valor de retorno

1) *this

2) (nenhum)

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo

### Veja também

[ operator-](<#/doc/ranges/chunk_view/outer_iterator/operator->)(desde C++23) | calcula o número de chunks restantes
(função)
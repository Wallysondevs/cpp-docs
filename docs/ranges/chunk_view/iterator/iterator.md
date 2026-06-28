# std::ranges::chunk_view&lt;V&gt;::iterator&lt;Const&gt;::iterator

```cpp
/*iterator*/() = default;  // (1) (desde C++23)
constexpr /*iterator*/( /*iterator*/<!Const> i )
requires
Const and
std::convertible_to<ranges::iterator_t<V>, ranges::iterator_t<Base>> and
std::convertible_to<ranges::sentinel_t<V>, ranges::sentinel_t<Base>>;  // (2) (desde C++23)
private:
constexpr /*iterator*/( Parent* parent,
ranges::iterator_t<Base> current,
ranges::range_difference_t<Base> missing = 0 );  // (3) (apenas para exposição*)
```

  
Constrói um iterator.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) os [membros de dados](<#/doc/ranges/chunk_view/iterator>) subjacentes:

  * `_current__` com [ranges::iterator_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;(),
  * `_end__` com [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;(),
  * `_n__` com ​0​,
  * `_missing__` com ​0​.

2) Conversão de /*iterator*/&lt;false&gt; para /*iterator*/&lt;true&gt;. Inicializa os [membros de dados](<#/doc/ranges/chunk_view/iterator>) subjacentes:

  * `_current__` com std::move(i.current_),
  * `_end__` com std::move(i.end_),
  * `_n__` com i.n_,
  * `_missing__` com i.missing_.

3) Um construtor privado que é usado por ranges::chunk_view::begin e ranges::chunk_view::end. Este construtor não é acessível aos usuários. Inicializa os [membros de dados](<#/doc/ranges/chunk_view/iterator>) subjacentes:

  * `_current__` com current,
  * `_end__` com [ranges::end](<#/doc/ranges/end>)(parent->base_),
  * `_n__` com parent->n_,
  * `_missing__` com missing.

### Parâmetros

i  |  \-  |  um /*iterator*/&lt;false&gt;  
---|---|---
parent  |  \-  |  um ponteiro para o `chunk_view` proprietário  
current  |  \-  |  um iterator para o início do chunk atual  
missing  |  \-  |  uma diferença entre o tamanho esperado ([`_n__`](<#/doc/ranges/chunk_view/iterator>)) e o tamanho real do chunk atual  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
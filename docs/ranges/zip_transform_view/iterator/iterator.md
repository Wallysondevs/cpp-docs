# std::ranges::zip_transform_view&lt;F,Views...&gt;::iterator&lt;Const&gt;::iterator

```cpp
/*iterator*/iterator() = default;  // (1) (desde C++23)
constexpr /*iterator*/( /*iterator*/<!Const> i )
requires Const &&
std::convertible_to</*ziperator*/<false>, /*ziperator*/<Const>>;  // (2) (desde C++23)
constexpr /*iterator*/( Parent& parent, /*ziperator*/<Const> inner );  // (3) (apenas para exposição*)
```

  
Constrói um iterator.

1) Construtor padrão. [Inicializa por padrão](<#/doc/language/default_initialization>) os iterators subjacentes, e [inicializa por valor](<#/doc/language/value_initialization>) o ponteiro para o `ranges::zip_transform_view` pai com `nullptr`.

2) Conversão de `/*iterator*/<false>` para `/*iterator*/<true>`. Constrói por movimento o ponteiro subjacente para o pai [`_parent__`](<#/doc/ranges/zip_transform_view/iterator>) com `i.parent_` e [`_inner__`](<#/doc/ranges/zip_transform_view/iterator>) com `std::move(i.inner_)`.

3) Inicializa o ponteiro para o pai `_parent__` com [std::addressof](<#/doc/memory/addressof>)(parent), e o iterator `_inner__` subjacente com `std::move(inner)`. Este construtor não é acessível aos usuários.

### Parâmetros

i  |  \-  |  um `/*iterator*/<false>`  
---|---|---
parent  |  \-  |  um `ranges::zip_transform_view` (possivelmente qualificado com `const`)  
inner  |  \-  |  um iterator do tipo [`_ziperator_`<Const>`](<#/doc/ranges/zip_transform_view>)  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
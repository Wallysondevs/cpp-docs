# std::ranges::enumerate_view&lt;V&gt;::sentinel

```cpp
template< bool Const >
class /*sentinel*/;  // (desde C++23)
(apenas para exposição*)
```

O tipo de retorno de [`enumerate_view::end`](<#/doc/ranges/enumerate_view/end>) quando a view subjacente não é uma [`common_range`](<#/doc/ranges/common_range>).

O tipo /*sentinel*/&lt;true&gt; é retornado pela sobrecarga qualificada como const. O tipo /*sentinel*/&lt;false&gt; é retornado pela sobrecarga não qualificada como const.

### Member types

Member type | Definição
---|---
`_Base_` (private) | const V se `Const` for true, caso contrário V.
(tipo membro apenas para exposição*)

### Data members

Member object | Definição
---|---
`_end__` (private) | Um sentinel do tipo [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;
(objeto membro apenas para exposição*)

### Member functions

[ (constructor)](<#/doc/ranges/enumerate_view/sentinel/sentinel>) | constrói um sentinel
(função membro pública)
[ base](<#/doc/ranges/enumerate_view/sentinel/base>) | retorna um sentinel indicando o fim de um range
(função membro pública)

### Non-member functions

[ operator==](<#/doc/ranges/enumerate_view/sentinel/operator_cmp>)(C++23) | compara um sentinel com um iterator retornado de [`enumerate_view::begin`](<#/doc/ranges/enumerate_view/begin>)
(função)
[ operator-](<#/doc/ranges/enumerate_view/sentinel/operator->)(C++23) | calcula a distância entre um sentinel e um iterator retornado de [`enumerate_view::begin`](<#/doc/ranges/enumerate_view/begin>)
(função)

### Example

| Esta seção está incompleta
Razão: nenhum exemplo

### References

* Padrão C++23 (ISO/IEC 14882:2024):

* 26.7.23.4 Class template `enumerate_view::sentinel` [range.enumerate.sentinel]

### See also

---
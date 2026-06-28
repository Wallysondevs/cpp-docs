# std::ranges::adjacent_view&lt;V,N&gt;::sentinel&lt;Const&gt;::sentinel

```cpp
/*sentinel*/() = default;  // (1) (desde C++23)
constexpr /*sentinel*/( /*sentinel*/<!Const> i )
requires Const &&
std::convertible_to<ranges::sentinel_t<V>, ranges::sentinel_t<Base>>;  // (2) (desde C++23)
```

  
Constrói um sentinel.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) o sentinel subjacente (denotado como [`_end__`](<#/doc/ranges/adjacent_view/sentinel>)) com [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;().

2) Conversão de /*sentinel*/&lt;false&gt; para /*sentinel*/&lt;true&gt;. Constrói por movimento o sentinel subjacente [`_end__`](<#/doc/ranges/adjacent_view/sentinel>) com o membro correspondente de i.

Este tipo também possui um construtor privado que é usado por adjacent_view::end. Este construtor não é acessível aos usuários.

### Parâmetros

i  |  \-  |  um /*sentinel*/&lt;false&gt;  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
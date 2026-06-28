# std::ranges::enumerate_view&lt;V&gt;::sentinel&lt;Const&gt;::sentinel

```cpp
/*sentinel*/() = default;  // (1) (desde C++23)
constexpr /*sentinel*/( /*sentinel*/<!Const> i )
requires Const &&
std::convertible_to<ranges::sentinel_t<V>, ranges::sentinel_t<Base>>;  // (2) (desde C++23)
private:
constexpr explicit /*sentinel*/( ranges::sentinel_t<Base> end );  // (3) (apenas para exposição*)
```

  
Constrói um [sentinel](<#/doc/ranges/enumerate_view/sentinel>). 

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) o sentinel subjacente com [ranges::sentinel_t](<#/doc/ranges/iterator_t>)&lt;Base&gt;().

2) Conversão de /*sentinel*/&lt;false&gt; para /*sentinel*/&lt;true&gt;. Constrói por move o sentinel subjacente [`_end__`](<#/doc/ranges/enumerate_view/sentinel>) com std::move(other.end_).

3) Um construtor privado que é usado por enumerate_view::end. Constrói por move o [`_end__`](<#/doc/ranges/enumerate_view/sentinel>) com std::move(end). Este construtor não é acessível aos usuários.

### Parâmetros

i  |  \-  |  um /*sentinel*/&lt;false&gt;  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
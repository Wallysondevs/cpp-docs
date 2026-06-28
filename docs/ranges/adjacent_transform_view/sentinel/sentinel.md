# std::ranges::adjacent_transform_view&lt;V,F,N&gt;::sentinel&lt;Const&gt;::sentinel

```cpp
/*sentinel*/() = default;  // (1) (desde C++23)
constexpr /*sentinel*/( /*sentinel*/<!Const> i )
requires Const &&
std::convertible_to</*inner-sentinel*/<false>, /*inner-sentinel*/<Const>>;  // (2) (desde C++23)
private:
constexpr explicit /*sentinel*/( /*inner-sentinel*/<Const> inner );  // (3) (apenas para exposição*)
```

  
Constrói um sentinel.

1) Construtor padrão. [Inicializa por padrão](<#/doc/language/default_initialization>) o sentinel subjacente [`_inner__`](<#/doc/ranges/adjacent_transform_view/sentinel>).

2) Conversão de /*sentinel*/&lt;false&gt; para /*sentinel*/&lt;true&gt;. Constrói por movimento o sentinel subjacente [`_inner__`](<#/doc/ranges/adjacent_transform_view/sentinel>) com [`std::move`](<#/doc/utility/move>)(i.inner_).

3) Este sentinel também possui um construtor privado que é usado por ranges::adjacent_transform_view::end. Este construtor não é acessível aos usuários. Inicializa o sentinel subjacente [`_inner__`](<#/doc/ranges/adjacent_transform_view/sentinel>) com inner.

### Parâmetros

i  |  \-  |  um /*sentinel*/&lt;false&gt;  
---|---|---
inner  |  \-  |  um sentinel do tipo adjacent_transform_view::[`_inner_sentinel_`](<#/doc/ranges/adjacent_transform_view>)  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
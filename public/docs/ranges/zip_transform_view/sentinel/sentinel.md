# std::ranges::zip_transform_view&lt;F,Views...&gt;::sentinel&lt;Const&gt;::sentinel

```cpp
/*sentinel*/() = default;  // (1) (desde C++23)
constexpr /*sentinel*/( /*sentinel*/<!Const> i )
requires Const &&
std::convertible_to</*zentinel*/<false>, /*zentinel*/<Const>>;  // (2) (desde C++23)
constexpr explicit /*sentinel*/( /*zentinel*/<Const> inner );  // (3) (apenas para exposição*)
```

  
Constrói um sentinel.

1) Construtor padrão. [Inicializa por padrão](<#/doc/language/default_initialization>) o objeto sentinel subjacente [`_inner__`](<#/doc/ranges/zip_transform_view/sentinel>).

2) Conversão de /*sentinel*/&lt;false&gt; para /*sentinel*/&lt;true&gt;. Constrói por movimento (move constructs) o objeto subjacente `_inner__` com std::move(i.inner_).

3) [Inicializa por valor](<#/doc/language/value_initialization>) o objeto subjacente `_inner__` com inner. Este construtor não é acessível aos usuários.

### Parâmetros

i  |  \-  |  um /*sentinel*/&lt;false&gt;  
---|---|---
inner  |  \-  |  um objeto subjacente do tipo [`_zentinel_`](<#/doc/ranges/zip_transform_view>) &lt;Const&gt;  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
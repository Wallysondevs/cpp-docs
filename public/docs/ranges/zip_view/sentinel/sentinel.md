# std::ranges::zip_view&lt;Views...&gt;::sentinel&lt;Const&gt;::sentinel

```cpp
/*sentinel*/() = default;  // (1) (desde C++23)
constexpr /*sentinel*/( /*sentinel*/<!Const> i )
requires Const &&
(std::convertible_to<
ranges::sentinel_t<Views>,
ranges::sentinel_t</*maybe-const*/<Const, Views>>> && ...);  // (2) (desde C++23)
```

  
Constrói um sentinel. 

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) a tupla subjacente de sentinels `_end__`.

2) Conversão de /*sentinel*/&lt;false&gt; para /*sentinel*/&lt;true&gt;. Constrói por movimento a tupla subjacente de sentinels `_end__` com std::move(i.end_).

### Parâmetros

i  |  \-  |  um /*sentinel*/&lt;false&gt;  
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
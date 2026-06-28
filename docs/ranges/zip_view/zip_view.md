# std::ranges::zip_view&lt;Views...&gt;::zip_view

```cpp
zip_view() = default;  // (1) (desde C++23)
constexpr zip_view( Views... views );  // (2) (desde C++23)
```

  
1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) todos os objetos [`view`](<#/doc/ranges/view>) adaptados.

O construtor padrão é deletado se [std::is_default_constructible_v](<#/doc/types/is_default_constructible>) for `false` para pelo menos um tipo em `Views...`.

2) Constrói por movimento cada objeto [`view`](<#/doc/ranges/view>) adaptado em [`_views__`](<#/doc/ranges/zip_view>) a partir do `view` correspondente em `views...`.

### Parâmetros

views  |  \-  |  objetos `view` para adaptar   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
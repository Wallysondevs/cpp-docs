# std::ranges::zip_transform_view&lt;F,Views...&gt;::zip_transform_view

```cpp
zip_transform_view() = default;  // (1) (desde C++23)
constexpr zip_transform_view( F fun, Views... views );  // (2) (desde C++23)
```

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) o objeto invocável armazenado e todos os objetos [`view`](<#/doc/ranges/view>) adaptados.

O construtor padrão é deletado se

* `F` não satisfaz [`default_initializable`](<#/doc/concepts/default_initializable>), ou
* [std::is_default_constructible_v](<#/doc/types/is_default_constructible>) for falso para pelo menos um tipo em `Views...`.

2) Constrói por movimento o objeto invocável armazenado a partir de `fun` e cada objeto [`view`](<#/doc/ranges/view>) adaptado a partir do `view` correspondente em `views...`.

### Parâmetros

- **f** — objeto invocável usado para a geração de elementos de `zip_transform_view`
- **views** — objetos `view` a serem adaptados

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo
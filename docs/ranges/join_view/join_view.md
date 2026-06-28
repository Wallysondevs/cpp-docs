# std::ranges::join_view&lt;V&gt;::join_view

```cpp
join_view() requires std::default_initializable<V> = default;  // (1) (desde C++20)
constexpr explicit join_view( V base );  // (2) (desde C++20)
```

Constrói um `join_view`.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) a view subjacente. Após a construção, [`base()`](<#/doc/ranges/join_view/base>) retorna uma cópia de V().

2) Inicializa a view subjacente com std::move(base).

### Parâmetros

- **base** — uma view de ranges a ser achatada

### Exemplo

| Esta seção está incompleta
Razão: nenhum exemplo
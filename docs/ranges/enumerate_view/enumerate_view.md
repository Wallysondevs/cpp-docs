# std::ranges::enumerate_view&lt;V&gt;::enumerate_view

```cpp
enumerate_view() requires std::default_initializable<V> = default;  // (1) (desde C++23)
constexpr explicit enumerate_view( V base );  // (2) (desde C++23)
```

  
Constrói um `enumerate_view`.

1) Construtor padrão. [Inicializa por valor](<#/doc/language/value_initialization>) a view subjacente [`_base__`](<#/doc/ranges/enumerate_view>). Após a construção, [`base()`](<#/doc/ranges/enumerate_view/base>) retorna uma cópia de V().

2) Inicializa a view subjacente [`_base__`](<#/doc/ranges/enumerate_view>) com std::move(base).

### Parâmetros

base  |  \-  |  a view subjacente   
  
### Exemplo

| Esta seção está incompleta  
Razão: nenhum exemplo   
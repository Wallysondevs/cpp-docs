# std::ranges::chunk_view&lt;V&gt;::base

```cpp
constexpr V base() const& requires std::copy_constructible<V>;  // (1) (desde C++23)
constexpr V base() &&;  // (2) (desde C++23)
```

Retorna uma cópia da view subjacente.

Seja [`_base__`](<#/doc/ranges/chunk_view>) a view subjacente.

1) Constrói por cópia o resultado a partir da view subjacente. Equivalente a `return base_;`

2) Constrói por movimento o resultado a partir da view subjacente. Equivalente a `return std::move(base_);`

### Parâmetros

(nenhum)

### Valor de retorno

Uma cópia da view subjacente.

### Exemplo

Um link para testar o exemplo online: [Compiler Explorer](<https://godbolt.org/z/K6KT6M6K3>).

Execute este código
```cpp
    #include <print>
    #include <ranges>
    
    int main()
    {
        static constexpr auto v = {1, 2, 3, 4};
        constexpr auto w{std::ranges::chunk_view(v, 2)};
        std::println("{}", w.base());
    }
```

Saída:
```
    [1, 2, 3, 4]
```
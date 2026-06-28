# std::chrono::day::day

```cpp
day() = default;  // (1) (desde C++20)
constexpr explicit day( unsigned d ) noexcept;  // (2) (desde C++20)
```

Constrói um objeto `day`.

1) O construtor padrão deixa o valor do dia não inicializado.

2) Se d <= 255, constrói um objeto `day` contendo o valor do dia d. Caso contrário, o valor contido é não especificado.
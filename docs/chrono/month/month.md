# std::chrono::month::month

```cpp
month() = default;  // (1) (desde C++20)
constexpr explicit month( unsigned m ) noexcept;  // (2) (desde C++20)
```

Constrói um objeto `month`.

1) O construtor padrão deixa o valor do mês não inicializado.

2) Se m <= 255, constrói um objeto `month` contendo o valor do mês m. Caso contrário, o valor contido é não especificado.
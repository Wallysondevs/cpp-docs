# std::counting_semaphore&lt;LeastMaxValue&gt;::max

```cpp
constexpr std::ptrdiff_t max() noexcept;  // (desde C++20)
```

Retorna o valor máximo possível do contador interno, que é maior ou igual a `LeastMaxValue`.

### Valor de retorno

O valor máximo possível do contador interno, como um [std::ptrdiff_t](<#/doc/types/ptrdiff_t>).

### Notas

Para a especialização `binary_semaphore`, `LeastMaxValue` é igual a 1.

Como o seu nome indica, o `LeastMaxValue` é o valor máximo _mínimo_, não o valor máximo _real_. Assim, `max()` pode produzir um número maior que `LeastMaxValue`.
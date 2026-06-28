# std::counting_semaphore&lt;LeastMaxValue&gt;::counting_semaphore

```cpp
constexpr explicit counting_semaphore( std::ptrdiff_t desired );  // (1) (desde C++20)
counting_semaphore( const counting_semaphore& ) = delete;  // (2) (desde C++20)
```

1) Constrói um objeto do tipo `std::counting_semaphore` com o contador interno inicializado para desired.

2) O construtor de cópia é deletado.

### Pré-condições

1) Ambos desired >= 0 e desired <= max() são verdadeiros.

### Parâmetros

- **desired** — o valor para inicializar o contador de `counting_semaphore`

### Exceções

Não lança exceções.
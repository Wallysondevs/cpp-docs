# std::nested_exception::nested_exception

```cpp
nested_exception() noexcept;  // (1) (desde C++11)
(constexpr desde C++26)
nested_exception( const nested_exception& other ) noexcept = default;  // (2) (desde C++11)
(constexpr desde C++26)
```

Constrói um novo objeto `nested_exception`.

1) Construtor padrão. Armazena um objeto de exceção obtido pela chamada de [std::current_exception](<#/doc/error/current_exception>)() dentro do novo objeto `nested_exception`.

2) Construtor de cópia. Inicializa o objeto com a exceção armazenada em `other`.

### Parâmetros

- **other** — exceção aninhada para inicializar o conteúdo com
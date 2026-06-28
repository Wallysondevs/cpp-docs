# std::bad_exception::bad_exception

```cpp
  // (1)
bad_exception() throw();  // (até C++11)
bad_exception() noexcept;  // (desde C++11)
(constexpr desde C++26)
  // (2)
bad_exception( const bad_exception& other ) throw();  // (até C++11)
bad_exception( const bad_exception& other ) noexcept;  // (desde C++11)
(constexpr desde C++26)
```

  
Constrói um novo objeto `bad_exception`.

1) Construtor padrão. [`what()`](<#/doc/error/bad_exception/what>) retorna uma string definida pela implementação.

2) Construtor de cópia. Inicializa o objeto com o conteúdo de `other`. Se `*this` e `other` ambos tiverem o tipo dinâmico `std::bad_exception`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0 (desde C++11).

### Parâmetros

other  |  \-  |  Objeto `bad_exception` para inicializar   
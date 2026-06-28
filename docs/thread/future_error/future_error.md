# std::future_error::future_error

```cpp
future_error( const future_error& other ) noexcept;  // (1) (desde C++11)
explicit future_error( std::future_errc ec );  // (2) (desde C++17)
```

  
1) Construtor de cópia. Inicializa o conteúdo do novo objeto `future_error` com o de `other`. Se `*this` e `other` ambos tiverem o tipo dinâmico `std::future_error`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0.

2) Constrói um novo objeto `future_error` contendo o código de erro [std::make_error_code](<#/doc/error/errc/make_error_code>)(ec).

### Parâmetros

other  |  \-  |  outro objeto `future_error` para copiar   
---|---|---
ec  |  \-  |  código de erro   
  
### Notas

Não há uma maneira compatível com o padrão para o usuário construir um `future_error` que não seja copiando de outro `future_error` antes do C++17. C++11 e C++14 descrevem um construtor público apenas para exposição que recebe um [std::error_code](<#/doc/error/error_code>), e algumas implementações fornecem tal construtor. 
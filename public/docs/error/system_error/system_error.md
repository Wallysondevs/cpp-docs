# std::system_error::system_error

```cpp
system_error( std::error_code ec );  // (1) (desde C++11)
system_error( std::error_code ec, const std::string& what_arg );  // (2) (desde C++11)
system_error( std::error_code ec, const char* what_arg );  // (2) (desde C++11)
system_error( int ev, const std::error_category& ecat );  // (3) (desde C++11)
system_error( int ev, const std::error_category& ecat,
const std::string& what_arg );  // (4) (desde C++11)
system_error( int ev, const std::error_category& ecat,
const char* what_arg );  // (4) (desde C++11)
system_error( const system_error& other ) noexcept;  // (5) (desde C++11)
```

Constrói um novo objeto de erro de sistema.

1) Constrói com o código de erro ec.

2) Constrói com o código de erro ec e a string de explicação what_arg. A string retornada por [what()](<#/doc/error/system_error/what>) é garantida a conter what_arg como uma substring.

3) Constrói com o código de erro subjacente ev e a categoria de erro associada ecat.

4) Constrói com o código de erro subjacente ev, a categoria de erro associada ecat e a string explicativa what_arg. A string retornada por [what()](<#/doc/error/system_error/what>) é garantida a conter what_arg como uma substring (assumindo que ela não contenha um caractere nulo embutido).

5) Construtor de cópia. Inicializa o conteúdo com o de other. Se *this e other ambos tiverem o tipo dinâmico `std::system_error`, então [std::strcmp](<#/doc/string/byte/strcmp>)(what(), other.what()) == 0.

### Parâmetros

- **ec** — código de erro
- **ev** — código de erro subjacente na enumeração associada a ecat
- **ecat** — a categoria do erro
- **what_arg** — string explicativa
- **other** — outro `system_error` para copiar

### Exemplo

Demonstra como criar uma exceção `system_error` a partir de um valor [errno](<#/doc/error/errno>).

Execute este código
```cpp
    #include <iostream>
    #include <system_error>
     
    int main()
    {
        try
        {
            throw std::system_error(EDOM, std::generic_category(), "FIX ME");
        }
        catch (const std::system_error& ex)
        {
            std::cout << "code:    [" << ex.code() << "]\n"
                         "message: [" << ex.code().message() << "]\n"
                         "what:    [" << ex.what() << "]\n";
        }
    }
```

Saída possível:
```
    code:    [generic:33]
    message: [Numerical argument out of domain]
    what:    [FIX ME: Numerical argument out of domain]
```
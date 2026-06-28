# std::bad_exception

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
class bad_exception;
```

`std::bad_exception` é o tipo da exceção lançada pelo runtime C++ nas seguintes situações:

*   Se [std::exception_ptr](<#/doc/error/exception_ptr>) armazena uma cópia da exceção capturada e se o construtor de cópia do objeto de exceção capturado por [std::current_exception](<#/doc/error/current_exception>) lança uma exceção, a exceção capturada é uma instância de `std::bad_exception`.

| (desde C++11)

*   Se uma [especificação de exceção dinâmica](<#/doc/language/except_spec>) é violada e [std::unexpected](<#/doc/error/unexpected>) lança ou relança uma exceção que ainda viola a especificação de exceção, mas a especificação de exceção permite `std::bad_exception`, `std::bad_exception` é lançada.

| (até C++17)

Diagrama de herança

```cpp
Todas as funções membro de `std::bad_exception` são constexpr.  // (desde C++26)
```

### Funções membro

[ (construtor)](<#/doc/error/bad_exception/bad_exception>) | constrói o objeto `bad_exception`
(função membro pública)
[ operator=](<#/>) | copia o objeto
(função membro pública)
[ what](<#/doc/error/bad_exception/what>)[virtual] | retorna a string explicativa
(função membro pública virtual)

## Herdado de [std::exception](<#/doc/error/exception>)

### Funções membro

[ (destrutor)](<#/doc/error/exception/~exception>)[virtual] | destrói o objeto de exceção
(função membro pública virtual de `std::exception`)
[ what](<#/doc/error/exception/what>)[virtual] | retorna uma string explicativa
(função membro pública virtual de `std::exception`)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_constexpr_exceptions`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para tipos de exceção

### Exemplo

Compila apenas em modos C++14 ou anteriores (pode emitir avisos).

Execute este código
```cpp
    #include <exception>
    #include <iostream>
    #include <stdexcept>
    
    void my_unexp()
    {
        throw;
    }
    
    void test()
        throw(std::bad_exception) // Dynamic exception specifications
                                  // are deprecated in C++11
    {
        throw std::runtime_error("test");
    }
    
    int main()
    {
        std::set_unexpected(my_unexp); // Deprecated in C++11, removed in C++17
    
        try
        {
            test();
        }
        catch (const std::bad_exception& e)
        {
            std::cerr << "Caught " << e.what() << '\n';
        }
    }
```

Saída possível:
```
    Caught std::bad_exception
```
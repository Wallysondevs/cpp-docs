# std::exception_ptr

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
using exception_ptr = /*unspecified*/
```

`std::exception_ptr` é um tipo ponteiro anulável que gerencia um objeto de exceção que foi lançada e capturada com [std::current_exception](<#/doc/error/current_exception>). Uma instância de `std::exception_ptr` pode ser passada para outra função, possivelmente em outra thread, onde a exceção pode ser relançada e tratada com uma cláusula `catch`.

Um `std::exception_ptr` construído por padrão é um ponteiro nulo; ele não aponta para um objeto de exceção.

Duas instâncias de `std::exception_ptr` são comparadas como iguais somente se ambas forem nulas ou se ambas apontarem para o mesmo objeto de exceção.

`std::exception_ptr` não é implicitamente conversível para nenhum tipo aritmético, de enumeração ou ponteiro. É contextualmente conversível para `bool`, e será avaliado como `false` se for nulo, `true` caso contrário.

O objeto de exceção referenciado por um `std::exception_ptr` permanece válido enquanto houver pelo menos um `std::exception_ptr` que o esteja referenciando: `std::exception_ptr` é um smart pointer de propriedade compartilhada (nota: isso é um acréscimo às [regras usuais de tempo de vida de objetos de exceção](<#/doc/language/throw>)).

`std::exception_ptr` atende aos requisitos de [NullablePointer](<#/doc/named_req/NullablePointer>).

### Exemplo

Execute este código
```cpp
    #include <exception>
    #include <iostream>
    #include <stdexcept>
    #include <string>
    
    void handle_eptr(std::exception_ptr eptr) // passing by value is OK
    {
        try
        {
            if (eptr)
                std::rethrow_exception(eptr);
        }
        catch(const std::exception& e)
        {
            std::cout << "Caught exception: '" << e.what() << "'\n";
        }
    }
    
    int main()
    {
        std::exception_ptr eptr;
    
        try
        {
            [[maybe_unused]]
            char ch = std::string().at(1); // this generates a std::out_of_range
        }
        catch(...)
        {
            eptr = std::current_exception(); // capture
        }
    
        handle_eptr(eptr);
    
    } // destructor for std::out_of_range called here, when the eptr is destructed
```

Saída possível:
```
    Caught exception: 'basic_string::at: __n (which is 1) >= this->size() (which is 0)'
```

### Veja também

[ make_exception_ptr](<#/doc/error/make_exception_ptr>)(C++11) | cria um **std::exception_ptr** a partir de um objeto de exceção
(modelo de função)
[ current_exception](<#/doc/error/current_exception>)(C++11) | captura a exceção atual em um **std::exception_ptr**
(função)
[ rethrow_exception](<#/doc/error/rethrow_exception>)(C++11) | lança a exceção de um **std::exception_ptr**
(função)
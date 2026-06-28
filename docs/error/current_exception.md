# std::current_exception

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
std::exception_ptr current_exception() noexcept;
(constexpr desde C++26)
```

Se chamada durante o tratamento de exceções (tipicamente, em uma cláusula `catch`), captura o objeto de exceção atual e cria um [std::exception_ptr](<#/doc/error/exception_ptr>) que mantém uma cópia ou uma referência a esse objeto de exceção (dependendo da implementação). O objeto referenciado permanece válido pelo menos enquanto houver um objeto `exception_ptr` que se refira a ele.

Se a implementação desta função exigir uma chamada a `new` e a chamada falhar, o ponteiro retornado manterá uma referência a uma instância de [std::bad_alloc](<#/doc/memory/new/bad_alloc>).

Se a implementação desta função exigir a cópia do objeto de exceção capturado e seu construtor de cópia lançar uma exceção, o ponteiro retornado manterá uma referência à exceção lançada. Se o construtor de cópia do objeto de exceção lançado também lançar, o ponteiro retornado pode manter uma referência a uma instância de [std::bad_exception](<#/doc/error/bad_exception>) para quebrar o loop infinito.

Se a função for chamada quando nenhuma exceção estiver sendo tratada, um [std::exception_ptr](<#/doc/error/exception_ptr>) vazio é retornado.

Esta função pode ser chamada em um [std::terminate_handler](<#/doc/error/terminate_handler>) para recuperar a exceção que provocou a invocação de [std::terminate](<#/doc/error/terminate>).

### Valor de retorno

Uma instância de [std::exception_ptr](<#/doc/error/exception_ptr>) mantendo uma referência ao objeto de exceção, ou uma cópia do objeto de exceção, ou a uma instância de [std::bad_alloc](<#/doc/memory/new/bad_alloc>) ou a uma instância de [std::bad_exception](<#/doc/error/bad_exception>).

### Notas

Nas implementações que seguem a [Itanium C++ ABI](<https://itanium-cxx-abi.github.io/cxx-abi/abi.html>) (GCC, Clang, etc), as exceções são alocadas no heap quando lançadas (exceto para [std::bad_alloc](<#/doc/memory/new/bad_alloc>) em alguns casos), e esta função simplesmente cria o smart pointer referenciando o objeto previamente alocado. No MSVC, as exceções são alocadas na stack quando lançadas, e esta função realiza a alocação no heap e copia o objeto de exceção.

No Windows em ambientes CLR gerenciados [1](<https://learn.microsoft.com/en-us/cpp/dotnet/exceptions-in-cpp-cli>), a implementação armazenará um [std::bad_exception](<#/doc/error/bad_exception>) quando a exceção atual for uma exceção gerenciada ([2](<https://github.com/microsoft/STL/blob/65aab97a8e75e7ba409002e518ed799006dfb285/stl/src/excptptr.cpp#L367>)). Note que `catch(...)` também captura exceções gerenciadas:
```cpp
    #include <exception>

    int main()
    {
        try
        {
            throw gcnew System::Exception("Managed exception");
        }
        catch (...)
        {
            std::exception_ptr ex = std::current_exception();
            try
            {
                std::rethrow_exception(ex);
            }
            catch (std::bad_exception const &)
            {
                // This will be printed.
                std::cout << "Bad exception" << std::endl;
            }
        }
    }
```

Macro de teste de funcionalidade | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_constexpr_exceptions`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para tipos de exceção

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

### Ver também

[ exception_ptr](<#/doc/error/exception_ptr>)(C++11) | tipo de ponteiro compartilhado para lidar com objetos de exceção
(typedef)
[ rethrow_exception](<#/doc/error/rethrow_exception>)(C++11) | lança a exceção de um [std::exception_ptr](<#/doc/error/exception_ptr>)
(function)
[ make_exception_ptr](<#/doc/error/make_exception_ptr>)(C++11) | cria um [std::exception_ptr](<#/doc/error/exception_ptr>) a partir de um objeto de exceção
(function template)
[ uncaught_exceptionuncaught_exceptions](<#/doc/error/exception/uncaught_exception>)(removido em C++20*)(C++17) | verifica se o tratamento de exceções está atualmente em andamento
(function)
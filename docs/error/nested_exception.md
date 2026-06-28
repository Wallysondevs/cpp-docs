# std::nested_exception

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
class nested_exception;
```

`std::nested_exception` é uma classe mixin polimórfica que pode capturar e armazenar a exceção atual, tornando possível aninhar exceções de tipos arbitrários umas dentro das outras.

```cpp
Todas as funções membro de `std::nested_exception` são constexpr.  // (desde C++26)
```

### Funções membro

[ (construtor)](<#/doc/error/nested_exception/nested_exception>) | constrói uma nested_exception
(função membro pública)
[ (destrutor)](<#/doc/error/nested_exception/~nested_exception>)[virtual] | destrói uma nested exception
(função membro pública virtual)
[ operator=](<#/>) | substitui o conteúdo de uma nested_exception
(função membro pública)
[ rethrow_nested](<#/doc/error/nested_exception/rethrow_nested>) | lança a exceção armazenada
(função membro pública)
[ nested_ptr](<#/doc/error/nested_exception/nested_ptr>) | obtém um ponteiro para a exceção armazenada
(função membro pública)

### Funções não-membro

[ throw_with_nested](<#/doc/error/throw_with_nested>)(C++11) | lança seu argumento com **std::nested_exception** misturada
(modelo de função)
[ rethrow_if_nested](<#/doc/error/rethrow_if_nested>)(C++11) | lança a exceção de uma **std::nested_exception**
(modelo de função)

### Notas

Macro de teste de recurso | Valor | Padrão | Recurso
---|---|---|---
[`__cpp_lib_constexpr_exceptions`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para tipos de exceção

### Exemplo

Demonstra a construção e recursão através de um objeto de exceção aninhada.

Execute este código
```
    #include <exception>
    #include <fstream>
    #include <iostream>
    #include <stdexcept>
    #include <string>
     
    // prints the explanatory string of an exception. If the exception is nested,
    // recurses to print the explanatory string of the exception it holds
    void print_exception(const std::exception& e, int level =  0)
    {
        std::cerr << std::string(level, ' ') << "exception: " << e.what() << '\n';
        try
        {
            std::rethrow_if_nested(e);
        }
        catch (const std::exception& nestedException)
        {
            print_exception(nestedException, level + 1);
        }
        catch (...) {}
    }
     
    // sample function that catches an exception and wraps it in a nested exception
    void open_file(const std::string& s)
    {
        try
        {
            std::ifstream file(s);
            file.exceptions(std::ios_base::failbit);
        }
        catch (...)
        {
            std::throw_with_nested(std::runtime_error("Couldn't open " + s));
        }
    }
     
    // sample function that catches an exception and wraps it in a nested exception
    void run()
    {
        try
        {
            open_file("nonexistent.file");
        }
        catch (...)
        {
            std::throw_with_nested(std::runtime_error("run() failed"));
        }
    }
     
    // runs the sample function above and prints the caught exception
    int main()
    {
        try
        {
            run();
        }
        catch (const std::exception& e)
        {
            print_exception(e);
        }
    }
```

Saída possível:
```
    exception: run() failed
     exception: Couldn't open nonexistent.file
      exception: basic_ios::clear
```

### Veja também

[ exception_ptr](<#/doc/error/exception_ptr>)(C++11) | tipo de ponteiro compartilhado para lidar com objetos de exceção
(typedef)
[ throw_with_nested](<#/doc/error/throw_with_nested>)(C++11) | lança seu argumento com **std::nested_exception** misturada
(modelo de função)
[ rethrow_if_nested](<#/doc/error/rethrow_if_nested>)(C++11) | lança a exceção de uma **std::nested_exception**
(modelo de função)
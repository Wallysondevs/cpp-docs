# std::throw_with_nested

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
template< class T >
[[noreturn]] void throw_with_nested( T&& t );
(constexpr desde C++26)
```

Se [std::decay](<#/doc/types/decay>)&lt;T&gt;::type for um tipo de classe não-final e não-união que não é [std::nested_exception](<#/doc/error/nested_exception>) nem derivado de [std::nested_exception](<#/doc/error/nested_exception>), lança uma exceção de um tipo não especificado que é publicamente derivado tanto de [std::nested_exception](<#/doc/error/nested_exception>) quanto de [std::decay](<#/doc/types/decay>)&lt;T&gt;::type, e construído a partir de [std::forward](<#/doc/utility/forward>)&lt;T&gt;(t). O construtor padrão da classe base `nested_exception` chama [std::current_exception](<#/doc/error/current_exception>), capturando o objeto de exceção atualmente tratado, se houver, em um [std::exception_ptr](<#/doc/error/exception_ptr>).

Caso contrário, lança [std::forward](<#/doc/utility/forward>)&lt;T&gt;(t).

Requer que [std::decay](<#/doc/types/decay>)&lt;T&gt;::type seja [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Parâmetros

- **t** — o objeto de exceção a ser lançado

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_constexpr_exceptions`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para tipos de exceção

### Exemplo

Demonstra a construção e recursão através de um objeto de exceção aninhado.

Execute este código
```cpp
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

[ nested_exception](<#/doc/error/nested_exception>)(C++11) | um tipo mixin para capturar e armazenar exceções atuais
(classe)
[ rethrow_if_nested](<#/doc/error/rethrow_if_nested>)(C++11) | lança a exceção de um [std::nested_exception](<#/doc/error/nested_exception>)
(modelo de função)
* [Valor]: O ano/mês em que o recurso foi adotado. O hiperlink sob cada valor abre uma página de suporte do compilador com a entrada para o recurso dado.
* [Std]: Padrão no qual o recurso é introduzido; DR significa relatório de defeito contra essa revisão
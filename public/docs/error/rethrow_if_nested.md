# std::rethrow_if_nested

Definido no cabeçalho `[<exception>](<#/doc/header/exception>)`

```c
template< class E >
void rethrow_if_nested( const E& e );
(constexpr desde C++26)
```

Se `E` não for um tipo de classe polimórfica, ou se [std::nested_exception](<#/doc/error/nested_exception>) for uma classe base inacessível ou ambígua de `E`, não há efeito.

Caso contrário, executa
```
    if (auto p = dynamic_cast<const std::nested_exception*>(std::addressof(e)))
        p->rethrow_nested();
```

### Parâmetros

- **e** — o objeto de exceção a ser relançado

### Notas

Ao contrário de muitas funções relacionadas, esta função _não_ se destina a ser chamada com um [std::exception_ptr](<#/doc/error/exception_ptr>), mas sim com uma referência de exceção real.

Macro de teste de funcionalidade | Valor | Padrão | Funcionalidade
---|---|---|---
[`__cpp_lib_constexpr_exceptions`](<#/doc/feature_test>) | [`202411L`](<#/>) | (C++26) | constexpr para tipos de exceção

### Possível implementação
```
    namespace details
    {
        template<class E>
        struct can_dynamic_cast
            : std::integral_constant<bool,
                  std::is_polymorphic<E>::value &&
                  (!std::is_base_of<std::nested_exception, E>::value ||
                    std::is_convertible<E*, std::nested_exception*>::value)
              > {};
    
        template<class T>
        void rethrow_if_nested_impl(const T& e, std::true_type)
        {
            if (auto nep = dynamic_cast<const std::nested_exception*>(std::addressof(e)))
                nep->rethrow_nested();
        }
    
        template<class T>
        void rethrow_if_nested_impl(const T&, std::false_type) {}
    }
    
    template<class T>
    void rethrow_if_nested(const T& t)
    {
        details::rethrow_if_nested_impl(t, details::can_dynamic_cast<T>());
    }
```

---

### Exemplo

Demonstra a construção e a recursão através de um objeto de exceção aninhado.

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

[ nested_exception](<#/doc/error/nested_exception>)(C++11) | um tipo mixin para capturar e armazenar exceções atuais
(classe)
[ throw_with_nested](<#/doc/error/throw_with_nested>)(C++11) | lança seu argumento com [std::nested_exception](<#/doc/error/nested_exception>) misturado
(modelo de função)
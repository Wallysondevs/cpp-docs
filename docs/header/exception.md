# Cabeçalho da biblioteca padrão &lt;exception&gt;

Este cabeçalho faz parte da biblioteca de [tratamento de erros](<#/doc/error>).

### Tipos

[ exception](<#/doc/error/exception>) | classe base para exceções lançadas pelos componentes da biblioteca padrão
(classe)
[ nested_exception](<#/doc/error/nested_exception>)(C++11) | um tipo mixin para capturar e armazenar exceções atuais
(classe)
[ bad_exception](<#/doc/error/bad_exception>) | exceção lançada quando [std::current_exception](<#/doc/error/current_exception>) falha ao copiar o objeto de exceção
(classe)
[ unexpected_handler](<#/doc/error/exception/unexpected_handler>)(obsoleto desde C++11)(removido desde C++17) | o tipo da função chamada por [std::unexpected](<#/doc/error/unexpected>)
(typedef)
[ terminate_handler](<#/doc/error/terminate_handler>) | o tipo da função chamada por [std::terminate](<#/doc/error/terminate>)
(typedef)
[ exception_ptr](<#/doc/error/exception_ptr>)(C++11) | tipo de ponteiro compartilhado para tratamento de objetos de exceção
(typedef)

### Funções

[ unexpected](<#/doc/error/unexpected>)(obsoleto desde C++11)(removido desde C++17) | função chamada quando a especificação de exceção dinâmica é violada
(função)
[ uncaught_exceptionuncaught_exceptions](<#/doc/error/exception/uncaught_exception>)(removido desde C++20*)(C++17) | verifica se o tratamento de exceções está atualmente em andamento
(função)
[ make_exception_ptr](<#/doc/error/make_exception_ptr>)(C++11) | cria um [std::exception_ptr](<#/doc/error/exception_ptr>) a partir de um objeto de exceção
(modelo de função)
[ current_exception](<#/doc/error/current_exception>)(C++11) | captura a exceção atual em um [std::exception_ptr](<#/doc/error/exception_ptr>)
(função)
[ rethrow_exception](<#/doc/error/rethrow_exception>)(C++11) | relança a exceção de um [std::exception_ptr](<#/doc/error/exception_ptr>)
(função)
[ throw_with_nested](<#/doc/error/throw_with_nested>)(C++11) | lança seu argumento com [std::nested_exception](<#/doc/error/nested_exception>) misturado
(modelo de função)
[ rethrow_if_nested](<#/doc/error/rethrow_if_nested>)(C++11) | relança a exceção de um [std::nested_exception](<#/doc/error/nested_exception>)
(modelo de função)
[ terminate](<#/doc/error/terminate>) | função chamada quando o tratamento de exceções falha
(função)
[ get_terminate](<#/doc/error/get_terminate>)(C++11) | obtém o terminate_handler atual
(função)
[ set_terminate](<#/doc/error/set_terminate>) | altera a função a ser chamada por [std::terminate](<#/doc/error/terminate>)
(função)
[ get_unexpected](<#/doc/error/exception/get_unexpected>)(obsoleto desde C++11)(removido desde C++17) | obtém o `unexpected_handler` atual
(função)
[ set_unexpected](<#/doc/error/exception/set_unexpected>)(obsoleto desde C++11)(removido desde C++17) | altera a função a ser chamada por [std::unexpected](<#/doc/error/unexpected>)
(função)

### Sinopse
```cpp
    namespace std {
      class exception;
      class bad_exception;
      class nested_exception;
    
      using terminate_handler = void (*)();
      terminate_handler get_terminate() noexcept;
      terminate_handler set_terminate(terminate_handler f) noexcept;
      [[noreturn]] void terminate() noexcept;
    
      int uncaught_exceptions() noexcept;
    
      using exception_ptr = /* unspecified */;
    
      exception_ptr current_exception() noexcept;
      [[noreturn]] void rethrow_exception(exception_ptr p);
      template<class E> exception_ptr make_exception_ptr(E e) noexcept;
    
      template<class T> [[noreturn]] void throw_with_nested(T&& t);
      template<class E> void rethrow_if_nested(const E& e);
    }
```

#### Classe [std::exception](<#/doc/error/exception>)
```cpp
    namespace std {
      class exception {
      public:
        exception() noexcept;
        exception(const exception&) noexcept;
        exception& operator=(const exception&) noexcept;
        virtual ~exception();
        virtual const char* what() const noexcept;
      };
    }
```

#### Classe [std::bad_exception](<#/doc/error/bad_exception>)
```cpp
    namespace std {
      class bad_exception : public exception {
      public:
        // veja [exception] para a especificação das funções membro especiais
        const char* what() const noexcept override;
      };
    }
```

#### Classe [std::nested_exception](<#/doc/error/nested_exception>)
```cpp
    namespace std {
      class nested_exception {
      public:
        nested_exception() noexcept;
        nested_exception(const nested_exception&) noexcept = default;
        nested_exception& operator=(const nested_exception&) noexcept = default;
        virtual ~nested_exception() = default;
    
        // funções de acesso
        [[noreturn]] void rethrow_nested() const;
        exception_ptr nested_ptr() const noexcept;
      };
    
      template<class T> [[noreturn]] void throw_with_nested(T&& t);
      template<class E> void rethrow_if_nested(const E& e);
    }
```

### Veja também

* [Tratamento de erros](<#/doc/error>)

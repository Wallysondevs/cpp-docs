# std::source_location::function_name

```cpp
constexpr const char* function_name() const noexcept;  // (desde C++20)
```

  
Retorna o nome da função associada à posição representada por este objeto, se houver.

### Parâmetros

(nenhum)

### Valor de retorno

Se este objeto representa uma posição no corpo de uma função, retorna uma string de bytes terminada em nulo, definida pela implementação, correspondente ao nome da função.

Caso contrário, uma string vazia é retornada.

### Exemplo

`std::source_location::function_name` pode ajudar a obter os nomes das funções (incluindo as funções especiais) juntamente com suas assinaturas.

Execute este código
```cpp
    #include <cstdio>
    #include <utility>
    #include <source_location>
    
    inline void print_function_name(
        const std::source_location& location = std::source_location::current())
    {
        std::puts(location.function_name()); // imprime o nome do chamador
    }
    
    void foo(double &&) { print_function_name(); }
    
    namespace bar { void baz() { print_function_name(); } }
    
    template <typename T> auto pub(T) { print_function_name(); return 42; }
    
    struct S {
        S() { print_function_name(); }
        S(int) { print_function_name(); }
        ~S() { print_function_name(); }
        S& operator=(S const&) { print_function_name(); return *this; }
        S& operator=(S&&) { print_function_name(); return *this; }
    };
    
    int main(int, char const* const[])
    {
        print_function_name();
        foo(3.14);
        bar::baz();
        pub(0xFULL);
        S p;
        S q{42};
        p = q;
        p = std::move(q);
        [] { print_function_name(); }();
    }
```

Saída possível: 
```
    int main(int, const char* const*)
    void foo(double&&)
    void bar::baz()
    auto pub(T) [with T = long long unsigned int]
    S::S()
    S::S(int)
    S& S::operator=(const S&)
    S& S::operator=(S&&)
    main(int, const char* const*)::<lambda()>
    S::~S()
    S::~S()
```

### Veja também

[ line](<#/doc/utility/source_location/line>) | retorna o número da linha representado por este objeto   
(função membro pública)  
[ column](<#/doc/utility/source_location/column>) | retorna o número da coluna representado por este objeto   
(função membro pública)  
[ file_name](<#/doc/utility/source_location/file_name>) | retorna o nome do arquivo representado por este objeto   
(função membro pública)
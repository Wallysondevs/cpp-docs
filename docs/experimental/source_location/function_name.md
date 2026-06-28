# std::experimental::source_location::function_name

constexpr const char* function_name() const noexcept; |  |  (library fundamentals TS v2)  

  
Retorna o nome da função associada à posição representada por este objeto, se houver.

### Parâmetros

(nenhum)

### Valor de retorno

Se este objeto representa uma posição no corpo de uma função, retorna uma string de bytes terminada em nulo definida pela implementação, correspondente ao nome da função.

Caso contrário, uma string vazia é retornada.

### Exemplo

O exemplo a seguir mostra como é possível usar `std::source_location::function_name()` para imprimir o nome de uma função, construtor, destrutor ou `operator()` sobrecarregado.

Execute este código
```
    #include <experimental/source_location>
    #include <iostream>
    #include <string_view>
     
    inline void function_name(
        const std::string_view signature = "()",
        const std::experimental::source_location& location
            = std::experimental::source_location::current())
    {
        std::cout
            << location.function_name() // <- name of the caller!
            << signature
            << '\n';
    }
     
    void foo() { function_name(); }
     
    struct S {
        S() { function_name(); }
        S(int) { function_name("(int)"); }
        S& operator=(S const&) { function_name("(const S&)"); return *this; }
        S& operator=(S&&) { function_name("(S&&)"); return *this; }
        ~S() { function_name(); }
    };
     
    int main()
    {
        foo();
        S p;
        S q{42};
        p = q;
        p = std::move(q);
    }
```

Saída possível: 
```
    foo()
    S()
    S(int)
    operator=(const S&)
    operator=(S&&)
    ~S()
    ~S()
```

### Veja também

[ line](<#/doc/experimental/source_location/line>) | retorna o número da linha representado por este objeto   
(função membro pública)  
[ column](<#/doc/experimental/source_location/column>) | retorna o número da coluna representado por este objeto   
(função membro pública)  
[ file_name](<#/doc/experimental/source_location/file_name>) | retorna o nome do arquivo representado por este objeto   
(função membro pública)  
[documentação C++](<#/doc/preprocessor/line>) para informações de nome de arquivo e linha
# std::source_location

Definido no header `[<source_location>](<#/doc/header/source_location>)`

```cpp
struct source_location;  // (desde C++20)
```

A classe `std::source_location` representa certas informações sobre o código-fonte, como nomes de arquivos, números de linha e nomes de funções. Anteriormente, funções que desejavam obter essas informações sobre o local da chamada (para fins de logging, teste ou depuração) precisavam usar macros para que [macros predefinidas](<#/doc/preprocessor/replace>) como __LINE__ e __FILE__ fossem expandidas no contexto do chamador. A classe `std::source_location` oferece uma alternativa melhor.

`std::source_location` atende aos requisitos [DefaultConstructible](<#/doc/named_req/DefaultConstructible>), [CopyConstructible](<#/doc/named_req/CopyConstructible>), [CopyAssignable](<#/doc/named_req/CopyAssignable>), [Destructible](<#/doc/named_req/Destructible>) e [Swappable](<#/doc/named_req/Swappable>).

Além disso, as seguintes condições são verdadeiras:

  * [std::is_nothrow_move_constructible_v](<#/doc/types/is_move_constructible>)<std::source_location>,
  * [std::is_nothrow_move_assignable_v](<#/doc/types/is_move_assignable>)<std::source_location>, e
  * [std::is_nothrow_swappable_v](<#/doc/types/is_swappable>)<std::source_location>.

É esperado que `std::source_location` tenha um tamanho pequeno e possa ser copiado eficientemente.

É não especificado se os construtores de cópia/movimentação e os operadores de atribuição de cópia/movimentação de `std::source_location` são triviais e/ou constexpr.

### Funções membro

##### Criação
---
[ (construtor)](<#/doc/utility/source_location/source_location>) | constrói um novo `source_location` com valores definidos pela implementação
(função membro pública)
[ current](<#/doc/utility/source_location/current>)[static] | constrói um novo `source_location` correspondente ao local da chamada
(função membro estática pública)

##### Acesso a campos

[ line](<#/doc/utility/source_location/line>) | retorna o número da linha representado por este objeto
(função membro pública)
[ column](<#/doc/utility/source_location/column>) | retorna o número da coluna representado por este objeto
(função membro pública)
[ file_name](<#/doc/utility/source_location/file_name>) | retorna o nome do arquivo representado por este objeto
(função membro pública)
[ function_name](<#/doc/utility/source_location/function_name>) | retorna o nome da função representado por este objeto, se houver
(função membro pública)

### Notas

Macro de [teste de recurso](<#/doc/utility/feature_test>) | Valor | Std | Recurso
---|---|---|---
[`__cpp_lib_source_location`](<#/doc/feature_test>) | [`201907L`](<#/>) | (C++20) | Captura de informações do código-fonte ([`std::source_location`](<#/doc/utility/source_location>))

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <source_location>
    #include <string_view>
    
    void log(const std::string_view message,
             const std::source_location location =
                   std::source_location::current())
    {
        std::clog << "file: "
                  << location.file_name() << '('
                  << location.line() << ':'
                  << location.column() << ") `"
                  << location.function_name() << "`: "
                  << message << '\n';
    }
    
    template<typename T>
    void fun(T x)
    {
        log(x); // line 20
    }
    
    int main(int, char*[])
    {
        log("Hello world!"); // line 25
        fun("Hello C++20!");
    }
```

Saída possível:
```
    file: main.cpp(25:8) `int main(int, char**)`: Hello world!
    file: main.cpp(20:8) `void fun(T) [with T = const char*]`: Hello C++20!
```

### Veja também

[ #line](<#/doc/preprocessor/line>) | altera o número da linha do código-fonte e, opcionalmente, o nome do arquivo atual
(diretiva de pré-processamento)
[ stacktrace_entry](<#/doc/utility/stacktrace_entry>)(C++23) | representação de uma avaliação em um stacktrace
(classe)
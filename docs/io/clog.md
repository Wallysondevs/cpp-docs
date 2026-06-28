# std::clog, std::wclog

Definido no cabeçalho `[<iostream>](<#/doc/header/iostream>)`

```c
extern std::ostream clog;
extern std::wostream wclog;
```

Os objetos globais `std::clog` e `std::wclog` controlam a saída para um stream buffer de tipo definido pela implementação (derivado de [std::streambuf](<#/doc/io/basic_streambuf>)), associado ao stream de saída C padrão [stderr](<#/doc/io/c/std_streams>), mas, ao contrário de [std::cerr](<#/doc/io/cerr>)/[std::wcerr](<#/doc/io/cerr>), esses streams não são automaticamente descarregados (flushed) e `cout` não é automaticamente `tie()`'d com esses streams.

Esses objetos têm garantia de serem inicializados durante ou antes da primeira vez que um objeto do tipo [std::ios_base::Init](<#/doc/io/ios_base/Init>) é construído e estão disponíveis para uso nos construtores e destrutores de objetos estáticos com [inicialização ordenada](<#/doc/language/initialization>) (desde que [`<iostream>`](<#/doc/header/iostream>) seja incluído antes que o objeto seja definido).

A menos que std::ios_base::sync_with_stdio(false) tenha sido invocado, é seguro acessar esses objetos concorrentemente de múltiplas threads tanto para saída formatada quanto não formatada.

### Notas

O 'c' no nome refere-se a "character" (caractere) ([stroustrup.com FAQ](<https://www.stroustrup.com/bs_faq2.html#cout>)); `clog` significa "character log" (log de caracteres) e `wclog` significa "wide character log" (log de caracteres largos).

### Exemplo

Execute este código
```cpp
    #include <iostream>
     
    struct Foo
    {
        int n;
        Foo()
        {
            std::clog << "static constructor\n";
        }
        ~Foo()
        {
            std::clog << "static destructor\n";
        }
    };
     
    Foo f; // static object
     
    int main()
    {
        std::clog << "main function\n";
    }
```

Saída:
```
    static constructor
    main function
    static destructor
```

### Veja também

[ Init](<#/doc/io/ios_base/Init>) | inicializa objetos de stream padrão
(classe membro pública de `std::ios_base`)
[ cerrwcerr](<#/doc/io/cerr>) | escreve para o stream de erro C padrão [stderr](<#/doc/io/c/std_streams>), sem buffer
(objeto global)
[ coutwcout](<#/doc/io/cout>) | escreve para o stream de saída C padrão [stdout](<#/doc/io/c/std_streams>)
(objeto global)
[ stdinstdoutstderr](<#/doc/io/c/std_streams>) | expressão do tipo FILE* associada ao stream de entrada
expressão do tipo FILE* associada ao stream de saída
expressão do tipo FILE* associada ao stream de saída de erro
(macro constante)
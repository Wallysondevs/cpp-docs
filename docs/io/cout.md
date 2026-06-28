# std::cout, std::wcout

Definido no cabeçalho `[<iostream>](<#/doc/header/iostream>)`

```c
extern std::ostream cout;
extern std::wostream wcout;
```

Os objetos globais `std::cout` e `std::wcout` controlam a saída para um stream buffer de tipo definido pela implementação (derivado de [std::streambuf](<#/doc/io/basic_streambuf>)), associado ao stream de saída C padrão [stdout](<#/doc/io/c/std_streams>).

Esses objetos têm garantia de serem inicializados durante ou antes da primeira vez que um objeto do tipo [std::ios_base::Init](<#/doc/io/ios_base/Init>) é construído e estão disponíveis para uso nos construtores e destrutores de objetos estáticos com [inicialização ordenada](<#/doc/language/initialization>) (desde que [`<iostream>`](<#/doc/header/iostream>) seja incluído antes que o objeto seja definido).

A menos que std::ios_base::sync_with_stdio(false) tenha sido invocado, é seguro acessar esses objetos concorrentemente a partir de múltiplas threads tanto para saída formatada quanto não formatada.

Pela especificação de [std::cin](<#/doc/io/cin>), [std::cin](<#/doc/io/cin>).tie() retorna &std::cout. Isso significa que qualquer operação de entrada em `std::cin` executa std::cout.flush() (através do construtor de [std::basic_istream::sentry](<#/doc/io/basic_istream/sentry>)). Similarmente, [std::wcin](<#/doc/io/cin>).tie() retorna &std::wcout.

Pela especificação de [std::cerr](<#/doc/io/cerr>), [std::cerr](<#/doc/io/cerr>).tie() retorna &std::cout. Isso significa que qualquer operação de saída em `std::cerr` executa std::cout.flush() (através do construtor de [std::basic_ostream::sentry](<#/doc/io/basic_ostream/sentry>)). Similarmente, [std::wcerr](<#/doc/io/cerr>).tie() retorna &std::wcout. (desde C++11)

### Notas

O 'c' no nome refere-se a "character" (caractere) ([stroustrup.com FAQ](<https://www.stroustrup.com/bs_faq2.html#cout>)); `cout` significa "character output" (saída de caractere) e `wcout` significa "wide character output" (saída de caractere largo).

Como a [inicialização dinâmica](<#/doc/language/initialization>) de variáveis [templated](<#/doc/language/templates>) é desordenada, não há garantia de que `std::cout` tenha sido inicializado para um estado utilizável antes do início da inicialização de tais variáveis, a menos que um objeto do tipo [std::ios_base::Init](<#/doc/io/ios_base/Init>) tenha sido construído.

### Exemplo

Execute este código
```
    #include <iostream>
    
    struct Foo
    {
        int n;
        Foo()
        {
            std::cout << "static constructor\n";
        }
        ~Foo()
        {
            std::cout << "static destructor\n";
        }
    };
    
    Foo f; // static object
    
    int main()
    {
        std::cout << "main function\n";
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
[ clogwclog](<#/doc/io/clog>) | escreve para o stream de erro C padrão [stderr](<#/doc/io/c/std_streams>)
(objeto global)
[ stdinstdoutstderr](<#/doc/io/c/std_streams>) | expressão do tipo FILE* associada ao stream de entrada
expressão do tipo FILE* associada ao stream de saída
expressão do tipo FILE* associada ao stream de saída de erro
(constante macro)
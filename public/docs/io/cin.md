# std::cin, std::wcin

Definido no cabeçalho `[<iostream>](<#/doc/header/iostream>)`

```c
extern std::istream cin;
extern std::wistream wcin;
```

Os objetos globais `std::cin` e `std::wcin` controlam a entrada de um stream buffer de tipo definido pela implementação (derivado de [std::streambuf](<#/doc/io/basic_streambuf>)), associado ao stream de entrada C padrão [stdin](<#/doc/io/c/std_streams>).

Esses objetos têm garantia de serem inicializados durante ou antes da primeira vez que um objeto do tipo [std::ios_base::Init](<#/doc/io/ios_base/Init>) é construído e estão disponíveis para uso nos construtores e destrutores de objetos estáticos com [inicialização ordenada](<#/doc/language/initialization>) (desde que `<iostream>` seja incluído antes que o objeto seja definido).

A menos que `sync_with_stdio(false)` tenha sido emitido, é seguro acessar esses objetos concorrentemente de múltiplas threads tanto para entrada formatada quanto não formatada.

Uma vez que `std::cin` é construído, `std::cin.tie()` retorna `&std::cout`, e da mesma forma, `std::wcin.tie()` retorna `&std::wcout`. Isso significa que qualquer operação de entrada formatada em `std::cin` força uma chamada a `std::cout.flush()` se houver caracteres pendentes para saída.

### Notas

O 'c' no nome refere-se a "caractere" ([stroustrup.com FAQ](<https://www.stroustrup.com/bs_faq2.html#cout>)); `cin` significa "entrada de caractere" e `wcin` significa "entrada de caractere largo".

### Exemplo

Execute este código
```cpp
    #include <iostream>
    
    struct Foo
    {
        int n;
        Foo()
        {
            std::cout << "Enter n: "; // no flush needed
            std::cin >> n;
        }
    };
    
    Foo f; // static object
    
    int main()
    {
        std::cout << "f.n is " << f.n << '\n';
    }
```

Saída possível:
```
    Enter n: 10
    f.n is 10
```

### Veja também

[ Init](<#/doc/io/ios_base/Init>) | inicializa objetos de stream padrão
(classe membro pública de `std::ios_base`)
[ coutwcout](<#/doc/io/cout>) | escreve para o stream de saída C padrão [stdout](<#/doc/io/c/std_streams>)
(objeto global)
[ stdinstdoutstderr](<#/doc/io/c/std_streams>) | expressão do tipo FILE* associada ao stream de entrada
expressão do tipo FILE* associada ao stream de saída
expressão do tipo FILE* associada ao stream de saída de erro
(macro constante)
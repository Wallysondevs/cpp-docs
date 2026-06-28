# std::cerr, std::wcerr

Definido no header `[<iostream>](<#/doc/header/iostream>)`

```cpp
extern std::ostream cerr;  // (1)
extern std::wostream wcerr;  // (2)
```

Os objetos globais `std::cerr` e `std::wcerr` controlam a saída para um buffer de stream de tipo definido pela implementação (derivado de [std::streambuf](<#/doc/io/basic_streambuf>) e [std::wstreambuf](<#/doc/io/basic_streambuf>), respectivamente), associado ao stream de saída de erro padrão C [stderr](<#/doc/io/c/std_streams>).

Esses objetos têm garantia de serem inicializados durante ou antes da primeira vez que um objeto do tipo [std::ios_base::Init](<#/doc/io/ios_base/Init>) é construído e estão disponíveis para uso nos construtores e destrutores de objetos estáticos com [inicialização ordenada](<#/doc/language/initialization>) (desde que [`<iostream>`](<#/doc/header/iostream>) seja incluído antes que o objeto seja definido).

A menos que std::ios_base::sync_with_stdio(false) tenha sido invocado, é seguro acessar esses objetos concorrentemente a partir de múltiplas threads para saída formatada e não formatada.

Uma vez inicializado, (std::cerr.flags() & unitbuf) != 0 (o mesmo para `std::wcerr`), o que significa que qualquer saída enviada a esses objetos de stream é imediatamente descarregada para o SO (através do destrutor de [std::basic_ostream::sentry](<#/doc/io/basic_ostream/sentry>)).

Além disso, std::cerr.tie() retorna &[std::cout](<#/doc/io/cout>) (o mesmo para `std::wcerr` e [std::wcout](<#/doc/io/cout>)), o que significa que qualquer operação de saída em `std::cerr` primeiro executa [std::cout](<#/doc/io/cout>).flush() (através do construtor de [std::basic_ostream::sentry](<#/doc/io/basic_ostream/sentry>)).

### Notas

O 'c' no nome refere-se a "caractere" ([stroustrup.com FAQ](<https://www.stroustrup.com/bs_faq2.html#cout>)); `cerr` significa "stream de erro de caractere" e `wcerr` significa "stream de erro de caractere largo".

### Exemplo

A saída para [stderr](<#/doc/io/c/std_streams>) via `std::cerr` descarrega a saída pendente em [std::cout](<#/doc/io/cout>), enquanto a saída para [stderr](<#/doc/io/c/std_streams>) via [std::clog](<#/doc/io/clog>) não o faz.

Run this code
```cpp
    #include <chrono>
    #include <iostream>
    #include <thread>
    using namespace std::chrono_literals;
    
    void f()
    {
        std::cout << "Output from thread...";
        std::this_thread::sleep_for(2s);
        std::cout << "...thread calls flush()" << std::endl;
    }
    
    int main()
    {
        std::jthread t1{f};
        std::this_thread::sleep_for(1000ms);
        std::clog << "This output from main is not tie()'d to cout\n";
        std::cerr << "This output is tie()'d to cout\n";
    }
```

Saída possível:
```
    This output from main is not tie()'d to cout
    Output from thread...This output is tie()'d to cout
    ...thread calls flush()
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR | Aplicado a | Comportamento como publicado | Comportamento correto
[LWG 455](<https://cplusplus.github.io/LWG/issue455>) | C++98 | std::cerr.tie() and
std::wcerr.tie() returned null pointers | they return &[std::cout](<#/doc/io/cout>) and
&[std::wcout](<#/doc/io/cout>) respectively

### Veja também

[ Init](<#/doc/io/ios_base/Init>) | inicializa objetos de stream padrão
(classe membro pública de `std::ios_base`)
[ clogwclog](<#/doc/io/clog>) | escreve para o stream de erro padrão C [stderr](<#/doc/io/c/std_streams>)
(objeto global)
[ coutwcout](<#/doc/io/cout>) | escreve para o stream de saída padrão C [stdout](<#/doc/io/c/std_streams>)
(objeto global)
[ stdinstdoutstderr](<#/doc/io/c/std_streams>) | expressão do tipo FILE* associada ao stream de entrada
expressão do tipo FILE* associada ao stream de saída
expressão do tipo FILE* associada ao stream de saída de erro
(constante macro)
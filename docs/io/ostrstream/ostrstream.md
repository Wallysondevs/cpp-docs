# std::ostrstream::ostrstream

ostrstream(); | (1) | (obsoleto em C++98)
(removido em C++26)
ostrstream( char* s, int n, [std::ios_base::openmode](<#/doc/io/ios_base/openmode>) mode = [std::ios_base::out](<#/doc/io/ios_base/openmode>) ); | (2) | (obsoleto em C++98)
(removido em C++26)

Constrói um novo strstream de saída e seu [std::strstreambuf](<#/doc/io/strstreambuf>) subjacente.

1) Constrói por padrão o [std::strstreambuf](<#/doc/io/strstreambuf>) subjacente, que cria um buffer de crescimento dinâmico, e inicializa a classe base com o endereço do membro `strstreambuf`.

2) Inicializa a classe base com o endereço do membro [std::strstreambuf](<#/doc/io/strstreambuf>) subjacente, que é inicializado de uma das duas maneiras possíveis, ambas escrevendo em um array de tamanho fixo fornecido pelo usuário:

a) se o bit `app` não estiver definido em mode, constrói o buffer chamando strstreambuf(s, n, s). O comportamento é indefinido se houver menos de n elementos no array cujo primeiro elemento é apontado por s

b) se o bit `app` estiver definido em mode, constrói o buffer chamando strstreambuf(s, n, s + [std::strlen](<#/doc/string/byte/strlen>)(s)). O comportamento é indefinido se houver menos de n elementos no array cujo primeiro elemento é apontado por s ou se o array não contiver uma sequência de caracteres válida terminada em nulo.

### Parâmetros

- **s** — array de char a ser usado como buffer de saída
- **n** — tamanho do array a ser usado como buffer de saída
- **mode** — especifica o modo de abertura do stream. É um tipo bitmask, as seguintes constantes são definidas (embora apenas `app` seja usado): | Constante | Explicação
---|---
[`app`](<#/doc/io/ios_base/openmode>) | busca o final do stream antes de cada escrita
[`binary`](<#/doc/io/ios_base/openmode>) | abre em [modo binário](<#/doc/io/c/FILE>)
[`in`](<#/doc/io/ios_base/openmode>) | abre para leitura
[`out`](<#/doc/io/ios_base/openmode>) | abre para escrita
[`trunc`](<#/doc/io/ios_base/openmode>) | descarta o conteúdo do stream ao abrir
[`ate`](<#/doc/io/ios_base/openmode>) | busca o final do stream imediatamente após a abertura
[`noreplace`](<#/doc/io/ios_base/openmode>) (C++23) | abre em modo exclusivo

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <strstream>
    
    int main()
    {
        std::ostrstream s1; // dynamic buffer
        s1 << 1 << ' ' << 3.14 << " example\n" << std::ends;
        std::cout << s1.str();
        s1.freeze(false);
    
        char arr[15] = "Hello";
    
        std::ostrstream s2(arr, sizeof arr, std::ios_base::app);
        s2 << ", world!" << std::ends;
        std::cout << s2.str() << '\n';
        std::cout << arr << '\n'; // streams use the provided arrays
    }
```

Saída:
```
    1 3.14 example
    Hello, world!
    Hello, world!
```

### Veja também

[ (constructor)](<#/doc/io/strstreambuf/strstreambuf>) | constrói um objeto `strstreambuf`
(função membro pública de `std::strstreambuf`)
[ (constructor)](<#/doc/io/istrstream/istrstream>) | constrói um objeto `istrstream`, opcionalmente alocando o buffer
(função membro pública de `std::istrstream`)
[ (constructor)](<#/doc/io/strstream/strstream>) | constrói um objeto `strstream`, opcionalmente alocando o buffer
(função membro pública de `std::strstream`)
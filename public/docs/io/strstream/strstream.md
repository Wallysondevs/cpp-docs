# std::strstream::strstream

strstream(); |  (1)  |  (obsoleto em C++98)   
(removido em C++26)  
strstream( char* s, int n, [std::ios_base::openmode](<#/doc/io/ios_base/openmode>) mode =  
[std::ios_base::in](<#/doc/io/ios_base/openmode>) | [std::ios_base::out](<#/doc/io/ios_base/openmode>) ); |  (2)  |  (obsoleto em C++98)   
(removido em C++26)  

  
Constrói um novo strstream de entrada/saída e seu [std::strstreambuf](<#/doc/io/strstreambuf>) subjacente.

1) Constrói por padrão o [std::strstreambuf](<#/doc/io/strstreambuf>) subjacente, que cria um buffer de crescimento dinâmico, e inicializa a classe base com o endereço do membro strstreambuf.

2) Inicializa a classe base com o endereço do membro [std::strstreambuf](<#/doc/io/strstreambuf>) subjacente, que é inicializado de uma das duas maneiras possíveis, ambas usando um array de tamanho fixo fornecido pelo usuário:

a) se (mode & app) == 0 (o bit app não está definido em mode), constrói o buffer chamando strstreambuf(s, n, s). O comportamento é indefinido se houver menos de n elementos no array cujo primeiro elemento é apontado por s.

b) se (mode & app) != 0 (o bit app está definido em mode), constrói o buffer chamando strstreambuf(s, n, s + [std::strlen](<#/doc/string/byte/strlen>)(s)). O comportamento é indefinido se houver menos de n elementos no array cujo primeiro elemento é apontado por s ou se o array não contiver uma sequência de caracteres válida terminada em nulo.

### Parâmetros

s  |  \-  |  array de char para usar como buffer de saída   
---|---
n  |  \-  |  tamanho do array a ser usado para saída   
mode  |  \-  |  especifica o modo de abertura do stream. É um tipo bitmask, as seguintes constantes são definidas (embora apenas app seja usado):  |  Constante  |  Explicação   
[`app`](<#/doc/io/ios_base/openmode>) |  busca o fim do stream antes de cada escrita   
[`binary`](<#/doc/io/ios_base/openmode>) |  abre em [modo binário](<#/doc/io/c/FILE>)  
[`in`](<#/doc/io/ios_base/openmode>) |  abre para leitura   
[`out`](<#/doc/io/ios_base/openmode>) |  abre para escrita   
[`trunc`](<#/doc/io/ios_base/openmode>) |  descarta o conteúdo do stream ao abrir   
[`ate`](<#/doc/io/ios_base/openmode>) |  busca o fim do stream imediatamente após abrir   
[`noreplace`](<#/doc/io/ios_base/openmode>) (C++23) |  abre em modo exclusivo   
  
### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <string>
    #include <strstream>
     
    int main()
    {
        // dynamic buffer
        std::strstream s1;
        s1 << 1 << ' ' << 3.14 << " example" << std::ends;
        std::cout << "Buffer holds: '" << s1.str() << "'\n";
        s1.freeze(false);
     
        int n;
        double d;
        std::string w;
        s1 >> n >> d >> w;
        std::cout << "Read back: n = " << n
                  << ", d = " << d
                  << ", w = '" << w << "'\n";
     
        // static buffer
        char arr[20] = "-1 -3.14 ";
        std::strstream s2(arr, sizeof arr, std::ios_base::app);
        s2 << "another" << std::ends;
        std::cout << "Buffer holds: '" << s2.str() << "'\n";
        s2 >> n >> d >> w;
        std::cout << "Read back: n = " << n
                  << ", d = " << d
                  << ", w = '" << w << "'\n";
    }
```

Saída: 
```
    Buffer holds: '1 3.14 example'
    Read back: n = 1, d = 3.14, w = 'example'
    Buffer holds: '-1 -3.14 another'
    Read back: n = -1, d = -3.14, w = 'another'
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 115](<https://cplusplus.github.io/LWG/issue115>) | C++98  | a sobrecarga (2) considerava apenas o caso  
mode & app == 0 (`==` tem precedência maior que `&`)  | considera os casos (mode & app) == 0  
e (mode & app) != 0  
  
### Ver também

[ (construtor)](<#/doc/io/strstreambuf/strstreambuf>) |  constrói um objeto `strstreambuf`   
(função membro pública de `std::strstreambuf`)  
[ (construtor)](<#/doc/io/istrstream/istrstream>) |  constrói um objeto `istrstream`, opcionalmente alocando o buffer   
(função membro pública de `std::istrstream`)  
[ (construtor)](<#/doc/io/ostrstream/ostrstream>) |  constrói um objeto `ostrstream`, opcionalmente alocando o buffer   
(função membro pública de `std::ostrstream`)
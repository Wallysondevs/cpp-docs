# std::basic_filebuf&lt;CharT,Traits&gt;::setbuf

protected:  
virtual [std::basic_streambuf](<#/doc/io/basic_streambuf>)<CharT, Traits>* setbuf( char_type* s, [std::streamsize](<#/doc/io/streamsize>) n )

  
Se `s` for um ponteiro nulo e `n` for zero, o filebuf se torna _sem buffer_ para saída, significando que `pbase()` e `pptr()` são nulos e qualquer saída é imediatamente enviada para o arquivo.

Caso contrário, uma chamada para `setbuf()` substitui o buffer interno (a sequência de caracteres controlada) pelo array de caracteres fornecido pelo usuário, cujo primeiro elemento é apontado por `s`, e permite que este objeto [std::basic_filebuf](<#/doc/io/basic_filebuf>) use até `n` bytes nesse array para bufferização.

Esta função é virtual protegida; ela só pode ser chamada através de `pubsetbuf()` ou de funções membro de uma classe definida pelo usuário derivada de `std::basic_filebuf`.

### Parâmetros

s  |  \-  |  ponteiro para o primeiro `CharT` no buffer fornecido pelo usuário ou nulo   
---|---|---
n  |  \-  |  o número de elementos `CharT` no buffer fornecido pelo usuário ou zero   
  
### Valor de retorno

this

### Notas

As condições em que esta função pode ser usada e a maneira como o buffer fornecido é usado são definidas pela implementação.

  * GCC 4.6 libstdc++ 

     `setbuf()` só pode ser chamado quando o [std::basic_filebuf](<#/doc/io/basic_filebuf>) não está associado a um arquivo (não tem efeito de outra forma). Com um buffer fornecido pelo usuário, a leitura do arquivo lê `n-1` bytes por vez. 

  * Clang++3.0 libc++ 

     `setbuf()` pode ser chamado após abrir o arquivo, mas antes de qualquer E/S (pode falhar de outra forma). Com um buffer fornecido pelo usuário, a leitura do arquivo lê os maiores múltiplos de 4096 que cabem no buffer. 

  * Visual Studio 2010 

     `setbuf()` pode ser chamado a qualquer momento, mesmo depois que alguma E/S ocorreu. O conteúdo atual do buffer, se houver, é perdido. 

O padrão não define nenhum comportamento para esta função, exceto que `setbuf(0, 0)` chamado antes que qualquer E/S tenha ocorrido é necessário para definir a saída sem buffer. 

### Exemplo

Fornece um buffer de 10k para leitura. No Linux, o utilitário strace pode ser usado para observar o número real de bytes lidos.

Run this code
```
    #include <fstream>
    #include <iostream>
    #include <string>
     
    int main()
    {
        int cnt = 0;
        std::ifstream file;
        char buf[10241];
     
        file.rdbuf()->pubsetbuf(buf, sizeof buf);
        file.open("/usr/share/dict/words");
     
        for (std::string line; getline(file, line);)
            ++cnt;
        std::cout << cnt << '\n';
    }
```

Possible output: 
```
    356010
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 173](<https://cplusplus.github.io/LWG/issue173>) | C++98  | o tipo de n foi especificado incorretamente como int | corrigido para [std::streamsize](<#/doc/io/streamsize>)  
  
### Veja também

[ pubsetbuf](<#/doc/io/basic_streambuf/pubsetbuf>) |  invoca setbuf()   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ setvbuf](<#/doc/io/c/setvbuf>) |  define o buffer e seu tamanho para um stream de arquivo   
(função)
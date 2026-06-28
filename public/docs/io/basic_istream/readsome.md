# std::basic_istream&lt;CharT,Traits&gt;::readsome

[std::streamsize](<#/doc/io/streamsize>) readsome( char_type* s, [std::streamsize](<#/doc/io/streamsize>) count );

  
Extrai até 'count' caracteres imediatamente disponíveis do fluxo de entrada. Os caracteres extraídos são armazenados no array de caracteres apontado por 's'.

Comporta-se como [UnformattedInputFunction](<#/doc/named_req/UnformattedInputFunction>). Após construir e verificar o objeto sentinela, 

  * Se rdbuf()->in_avail() == -1, chama setstate(eofbit) e não extrai caracteres. 

  * Se rdbuf()->in_avail() == 0, não extrai caracteres. 

  * Se rdbuf()->in_avail() > 0, extrai [std::min](<#/doc/algorithm/min>)(rdbuf()->in_avail(), count) caracteres e os armazena em locais sucessivos do array de caracteres cujo primeiro elemento é apontado por 's'. 

### Parâmetros

s  |  \-  |  ponteiro para o array de caracteres onde os caracteres serão armazenados   
---|---|---
count  |  \-  |  número máximo de caracteres a serem lidos   
  
### Valor de retorno

O número de caracteres realmente extraídos. 

### Exceções

[failure](<#/doc/io/ios_base/failure>) se um erro ocorreu (o flag de estado de erro não é [goodbit](<#/doc/io/ios_base/iostate>)) e [exceptions()](<#/doc/io/basic_ios/exceptions>) está configurado para lançar exceções para esse estado. 

Se uma operação interna lançar uma exceção, ela é capturada e [badbit](<#/doc/io/ios_base/iostate>) é definido. Se [exceptions()](<#/doc/io/basic_ios/exceptions>) estiver configurado para `badbit`, a exceção é relançada. 

### Notas

O comportamento desta função é altamente específico da implementação. Por exemplo, usar `readsome()` com [std::ifstream](<#/doc/io/basic_ifstream>) leva a resultados significativos e específicos da implementação. Algumas implementações de biblioteca preenchem o `filebuf` subjacente com dados assim que [std::ifstream](<#/doc/io/basic_ifstream>) abre um arquivo, o que significa que `readsome()` sempre lê dados e pode até ler o arquivo inteiro. Com outras implementações, [std::ifstream](<#/doc/io/basic_ifstream>) só lê de um arquivo quando uma operação de entrada é invocada, o que significa que chamar `readsome()` imediatamente após abrir o arquivo nunca extrai caracteres. Da mesma forma, chamar [std::cin](<#/doc/io/cin>).readsome() pode retornar toda a entrada pendente e não processada do console ou pode sempre retornar zero e não extrair caracteres. 

### Exemplo

Execute este código
```cpp
    #include <cassert>
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        char c[10] = "*********"; // c[9] == '\0'
     
        // std::stringbuf makes its entire buffer available for unblocking read
        std::istringstream input("This is sample text.");
     
        auto r = input.readsome(c, 5); // reads 'This ' and stores in c[0] .. c[4]
        assert(r == 5);
        std::cout << c << '\n';
     
        r = input.readsome(c, 9); // reads 'is sample' and stores in c[0] .. c[8]
        assert(r == 9);
        std::cout << c << '\n';
    }
```

Saída: 
```
    This ****
    is sample
```

### Veja também

[ read](<#/doc/io/basic_istream/read>) |  extrai blocos de caracteres   
(função membro pública)  
[ in_avail](<#/doc/io/basic_streambuf/in_avail>) |  obtém o número de caracteres imediatamente disponíveis na área de leitura   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
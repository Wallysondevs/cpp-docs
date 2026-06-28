# std::basic_istream&lt;CharT,Traits&gt;::putback

basic_istream& putback( char_type ch );

  
Coloca o caractere `ch` de volta no stream de entrada para que o próximo caractere extraído seja `ch`.

Primeiro limpa `eofbit`, então se comporta como [UnformattedInputFunction](<#/doc/named_req/UnformattedInputFunction>). Após construir e verificar o objeto sentinela, se [`rdbuf()`](<#/doc/io/basic_ios/rdbuf>) não for nulo, chama `rdbuf()->sputbackc(ch)`, que chama `rdbuf()->pbackfail(ch)` se `ch` não for igual ao caractere extraído mais recentemente.

Se `rdbuf()` for nulo ou se `rdbuf->sputbackc(ch)` retornar `Traits::eof()`, chama `setstate(badbit)`.

Em qualquer caso, define o contador [`gcount()`](<#/doc/io/basic_istream/gcount>) como zero.

### Parâmetros

ch  |  \-  |  caractere a ser colocado no stream de entrada   
  
### Valor de retorno

`*this`

### Exceções

[`failure`](<#/doc/io/ios_base/failure>) se um erro ocorreu (o flag de estado de erro não é [goodbit](<#/doc/io/ios_base/iostate>)) e [exceptions()](<#/doc/io/basic_ios/exceptions>) está configurado para lançar para esse estado.

Se uma operação interna lançar uma exceção, ela é capturada e [badbit](<#/doc/io/ios_base/iostate>) é definido. Se [exceptions()](<#/doc/io/basic_ios/exceptions>) estiver configurado para `badbit`, a exceção é relançada.

### Exemplo

Demonstra a diferença entre `putback()` modificador e não modificador.

Run this code
```
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::stringstream s1("Hello, world"); // IO stream
        s1.get();
        if (s1.putback('Y')) // modifies the buffer
            std::cout << s1.rdbuf() << '\n';
        else
            std::cout << "putback failed\n";
     
        std::cout << "--\n";
     
        std::istringstream s2("Hello, world"); // input-only stream
        s2.get();
        if (s2.putback('Y')) // cannot modify input-only buffer
            std::cout << s2.rdbuf() << '\n';
        else
            std::cout << "putback failed\n"; 
        s2.clear();
     
        std::cout << "--\n";
     
        if (s2.putback('H')) // non-modifying putback
            std::cout << s2.rdbuf() << '\n';
        else
            std::cout << "putback failed\n";
    }
```

Output: 
```
    Yello, world
    --
    putback failed
    --
    Hello, world
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento publicado  | Comportamento correto   
---|---|---|---
[LWG 2243](<https://cplusplus.github.io/LWG/issue2243>) | C++98  | `sputbackc()` foi chamado sem nenhum argumento  | chamado com ch  
  
### Veja também

[ sputbackc](<#/doc/io/basic_streambuf/sputbackc>) |  coloca um caractere de volta na sequência de entrada   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ unget](<#/doc/io/basic_istream/unget>) |  desextrai um caractere   
(função membro pública)  
[ peek](<#/doc/io/basic_istream/peek>) |  lê o próximo caractere sem extraí-lo   
(função membro pública)
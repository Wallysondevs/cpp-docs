# std::basic_istream&lt;CharT,Traits&gt;::unget

basic_istream& unget();

  
Torna o caractere extraído mais recentemente disponível novamente.

Primeiro, limpa [`eofbit`](<#/doc/io/ios_base/iostate>). Em seguida, (desde C++11) `unget` se comporta como [UnformattedInputFunction](<#/doc/named_req/UnformattedInputFunction>). Após construir e verificar o objeto sentinela, se quaisquer flags `ios_base::iostate` estiverem definidas, a função define `failbit` e retorna. Caso contrário, chama `rdbuf()->sungetc()`.

Se `rdbuf()->sungetc()` retornar `Traits::eof()`, chama `setstate(badbit)`.

Em qualquer caso, define o contador `gcount()` como zero.

### Parâmetros

(nenhum)

### Valor de retorno

`*this`

### Exceções

[failure](<#/doc/io/ios_base/failure>) se um erro ocorreu (a flag de estado de erro não é [goodbit](<#/doc/io/ios_base/iostate>)) e [exceptions()](<#/doc/io/basic_ios/exceptions>) está configurado para lançar para esse estado.

Se uma operação interna lançar uma exceção, ela é capturada e [badbit](<#/doc/io/ios_base/iostate>) é definido. Se [exceptions()](<#/doc/io/basic_ios/exceptions>) estiver configurado para `badbit`, a exceção é relançada.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::istringstream s1("Hello, world.");
        char c1 = s1.get();
        if (s1.unget())
        {
            char c2 = s1.get();
            std::cout << "Got: '" << c1 << "'. Got again: '" << c2 << "'.\n";
        }
    }
```

Saída: 
```
    Got: 'H'. Got again: 'H'.
```

### Veja também

[ sungetc](<#/doc/io/basic_streambuf/sungetc>) | move o próximo ponteiro na sequência de entrada para trás em uma posição   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ get](<#/doc/io/basic_istream/get>) | extrai caracteres   
(função membro pública)  
[ peek](<#/doc/io/basic_istream/peek>) | lê o próximo caractere sem extraí-lo   
(função membro pública)  
[ putback](<#/doc/io/basic_istream/putback>) | coloca um caractere no fluxo de entrada   
(função membro pública)
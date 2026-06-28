# std::basic_istream&lt;CharT,Traits&gt;::peek

int_type peek();

  
Comporta-se como [UnformattedInputFunction](<#/doc/named_req/UnformattedInputFunction>). Após construir e testar o objeto sentinela, lê o próximo caractere do fluxo de entrada sem extraí-lo. 

### Parâmetros

(nenhum) 

### Valor de retorno

Se good() == true, retorna o próximo caractere conforme obtido por rdbuf()->sgetc(). 

Caso contrário, retorna Traits::eof(). 

### Exceções

[failure](<#/doc/io/ios_base/failure>) se um erro ocorreu (o flag de estado de erro não é [goodbit](<#/doc/io/ios_base/iostate>)) e [exceptions()](<#/doc/io/basic_ios/exceptions>) está configurado para lançar exceção para esse estado. 

Se uma operação interna lançar uma exceção, ela é capturada e [badbit](<#/doc/io/ios_base/iostate>) é definido. Se [exceptions()](<#/doc/io/basic_ios/exceptions>) estiver configurado para `badbit`, a exceção é relançada. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::istringstream s1("Hello, world.");
        char c1 = s1.peek();
        char c2 = s1.get();
        std::cout << "Peeked: " << c1 << " got: " << c2 << '\n';
    }
```

Saída: 
```
    Peeked: H got: H
```

### Ver também

[ sgetc](<#/doc/io/basic_streambuf/sgetc>) | lê um caractere da sequência de entrada sem avançar a sequência   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ get](<#/doc/io/basic_istream/get>) | extrai caracteres   
(função membro pública)  
[ unget](<#/doc/io/basic_istream/unget>) | desextrai um caractere   
(função membro pública)
# std::basic_streambuf&lt;CharT,Traits&gt;::sgetc

int_type sgetc();

  
Lê um caractere da sequência de entrada. 

Se a posição de leitura da sequência de entrada não estiver disponível, retorna [underflow()](<#/doc/io/basic_streambuf/underflow>). Caso contrário, retorna Traits::to_int_type(*gptr()). 

### Parâmetros

(nenhum) 

### Valor de retorno

O valor do caractere apontado pelo _ponteiro de leitura_. 

### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <sstream>
     
    int main()
    {
        std::stringstream stream("Hello, world");
        std::cout << "sgetc() returned '" << (char)stream.rdbuf()->sgetc() << "'\n";
        std::cout << "peek() returned '" << (char)stream.peek() << "'\n";
        std::cout << "get() returned '" << (char)stream.get() << "'\n";
    }
```

Saída: 
```
    sgetc() returned 'H'
    peek() returned 'H'
    get() returned 'H'
```

### Veja também

[ sbumpc](<#/doc/io/basic_streambuf/sbumpc>)(removido em C++17) | lê um caractere da sequência de entrada e avança a sequência   
(função membro pública)  
[ snextc](<#/doc/io/basic_streambuf/snextc>) | avança a sequência de entrada, então lê um caractere sem avançar novamente   
(função membro pública)
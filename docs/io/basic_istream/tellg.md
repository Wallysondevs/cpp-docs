# std::basic_istream&lt;CharT,Traits&gt;::tellg

pos_type tellg();

  
Retorna o indicador de posição de entrada do objeto `streambuf` associado atual.

Comporta-se como [UnformattedInputFunction](<#/doc/named_req/UnformattedInputFunction>), exceto que [gcount()](<#/doc/io/basic_istream/gcount>) não é afetado. Após construir e verificar o objeto sentinela, se fail() == true, retorna pos_type(-1). Caso contrário, retorna rdbuf()->pubseekoff(0, [std::ios_base::cur](<#/doc/io/ios_base/seekdir>), [std::ios_base::in](<#/doc/io/ios_base/openmode>)).

### Parâmetros

(nenhum)

### Valor de retorno

A posição atual do ponteiro de leitura (get pointer) em caso de sucesso, pos_type(-1) em caso de falha.

### Exceções

[failure](<#/doc/io/ios_base/failure>) se um erro ocorreu (o flag de estado de erro não é [goodbit](<#/doc/io/ios_base/iostate>)) e [exceptions()](<#/doc/io/basic_ios/exceptions>) está configurado para lançar exceções para esse estado.

Se uma operação interna lança uma exceção, ela é capturada e [badbit](<#/doc/io/ios_base/iostate>) é definido. Se [exceptions()](<#/doc/io/basic_ios/exceptions>) está configurado para `badbit`, a exceção é relançada.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
    #include <string>
    
    int main()
    {
        std::string str = "Hello, world";
        std::istringstream in(str);
        std::string word;
        in >> word;
        std::cout << "After reading the word \"" << word
                  << "\" tellg() returns " << in.tellg() << '\n';
    }
```

Saída:
```
    After reading the word "Hello," tellg() returns 6
```

### Ver também

[ seekoff](<#/doc/io/basic_filebuf/seekoff>)[virtual] | reposiciona a posição do arquivo, usando endereçamento relativo   
(função membro virtual protegida de `std::basic_filebuf<CharT,Traits>`)  
[ seekoff](<#/doc/io/basic_stringbuf/seekoff>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas, usando endereçamento relativo   
(função membro virtual protegida de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ seekoff](<#/doc/io/strstreambuf/seekoff>)[virtual] | reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas, usando endereçamento relativo   
(função membro virtual protegida de `std::strstreambuf`)  
[ seekg](<#/doc/io/basic_istream/seekg>) | define o indicador de posição de entrada   
(função membro pública)  
[ tellp](<#/doc/io/basic_ostream/tellp>) | retorna o indicador de posição de saída   
(função membro pública de `std::basic_ostream<CharT,Traits>`)  
[ seekp](<#/doc/io/basic_ostream/seekp>) | define o indicador de posição de saída   
(função membro pública de `std::basic_ostream<CharT,Traits>`)
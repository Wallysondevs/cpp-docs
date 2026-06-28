# std::basic_ostream&lt;CharT,Traits&gt;::tellp

pos_type tellp();

  
Retorna o indicador de posição de saída do objeto `streambuf` associado atual.

Comporta-se como [UnformattedOutputFunction](<#/doc/named_req/UnformattedOutputFunction>) (exceto por não realizar saída de fato). Após construir e verificar o objeto sentinela,  | (desde C++11)  
  
Se fail()==true, retorna pos_type(-1). Caso contrário, retorna rdbuf()->pubseekoff(0, [std::ios_base::cur](<#/doc/io/ios_base/seekdir>), [std::ios_base::out](<#/doc/io/ios_base/openmode>)). 

### Parâmetros

(nenhum) 

### Valor de retorno

indicador de posição de saída atual em caso de sucesso, pos_type(-1) se ocorrer uma falha. 

### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <sstream>
    int main()
    {
        std::ostringstream s;
        std::cout << s.tellp() << '\n';
        s << 'h';
        std::cout << s.tellp() << '\n';
        s << "ello, world ";
        std::cout << s.tellp() << '\n';
        s << 3.14 << '\n';
        std::cout << s.tellp() << '\n' << s.str();
    }
```

Saída: 
```
    0
    1
    13
    18
    hello, world 3.14
```

### Veja também

[ seekp](<#/doc/io/basic_ostream/seekp>) |  define o indicador de posição de saída   
(função membro pública)  
[ tellg](<#/doc/io/basic_istream/tellg>) |  retorna o indicador de posição de entrada   
(função membro pública de `std::basic_istream<CharT,Traits>`)  
[ seekg](<#/doc/io/basic_istream/seekg>) |  define o indicador de posição de entrada   
(função membro pública de `std::basic_istream<CharT,Traits>`)
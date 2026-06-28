# std::ios_base::seekdir

typedef /*implementation defined*/ seekdir;
static constexpr seekdir beg = /*implementation defined*/  
static constexpr seekdir end = /*implementation defined*/  
static constexpr seekdir cur = /*implementation defined*/

  
Especifica o tipo de direção de busca em arquivo. As seguintes constantes são definidas: 

Constante  |  Explicação   
---|---
`beg` | o início de um stream   
`end` | o fim de um stream   
`cur` | a posição atual do indicador de posição do stream   
  
### Exemplo

Execute este código
```
    #include <iostream>
    #include <sstream>
    #include <string>
     
    int main()
    {
        std::istringstream in("Hello, World!");
        std::string word1, word2, word3, word4, word5;
     
        in >> word1;
        in.seekg(0, std::ios_base::beg); // <- rewind
        in >> word2;
        in.seekg(1, std::ios_base::cur); // -> seek from cur pos toward the end
        in >> word3;
        in.seekg(-6, std::ios_base::cur); // <- seek from cur pos (end) toward begin
        in >> word4;
        in.seekg(-6, std::ios_base::end); // <- seek from end toward begin
        in >> word5;
     
        std::cout << "word1 = " << word1 << '\n'
                  << "word2 = " << word2 << '\n'
                  << "word3 = " << word3 << '\n'
                  << "word4 = " << word4 << '\n'
                  << "word5 = " << word5 << '\n';
    }
```

Saída: 
```
    word1 = Hello,
    word2 = Hello,
    word3 = World!
    word4 = World!
    word5 = World!
```

### Veja também

[ seekg](<#/doc/io/basic_istream/seekg>) | define o indicador de posição de entrada   
(função membro pública de `std::basic_istream<CharT,Traits>`)  
[ seekp](<#/doc/io/basic_ostream/seekp>) | define o indicador de posição de saída   
(função membro pública de `std::basic_ostream<CharT,Traits>`)  
[ pubseekoff](<#/doc/io/basic_streambuf/pubseekoff>) | invoca seekoff()   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)
# std::strstreambuf::setbuf

protected:  
virtual streambuf* setbuf( char* s, [std::streamsize](<#/doc/io/streamsize>) n ); |  |  (obsoleto desde C++98)   
(removido em C++26)  

  
Se s for um ponteiro nulo e n for zero, esta função não tem efeito. 

Caso contrário, o efeito é definido pela implementação: algumas implementações não fazem nada, enquanto outras desalocam o array membro dinâmico usado como buffer e começam a usar o array de caracteres fornecido pelo usuário de tamanho n, cujo primeiro elemento é apontado por s. 

Esta função é virtual protegida, ela só pode ser chamada através de `pubsetbuf()` ou de funções membro de uma classe definida pelo usuário derivada de `std::strstreambuf`. 

### Parâmetros

s  |  \-  |  ponteiro para o primeiro byte no buffer fornecido pelo usuário   
---|---|---
n  |  \-  |  o número de bytes no buffer fornecido pelo usuário   
  
### Valor de retorno

this

### Exemplo

Teste de implementação para verificar se `setbuf()` é suportado em um strstream dinâmico (saída obtida com Sun Studio):

Execute este código
```cpp 
    #include <iostream>
    #include <strstream>
     
    int main()
    {
        char a[100] = {};
        std::strstream str;
        str.rdbuf()->pubsetbuf(a, sizeof a);
        str << "Test string" << std::ends;
        std::cout << "user-provided buffer holds \"" << a << "\"\n";
    }
```

Saída possível: 
```
    user-provided buffer holds "Test string"
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
[LWG 66](<https://cplusplus.github.io/LWG/issue66>) | C++98  | o efeito de `setbuf()` era "executa uma operação que é  
definida separadamente para cada classe derivada de `strstreambuf`",  
mas não há classes derivadas de `strstreambuf` | o efeito é  
definido pela implementação   
  
### Veja também

[ pubsetbuf](<#/doc/io/basic_streambuf/pubsetbuf>) |  invoca setbuf()   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ setbuf](<#/doc/io/basic_streambuf/pubsetbuf>)[virtual] |  substitui o buffer por um array definido pelo usuário, se permitido   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ setbuf](<#/doc/io/basic_stringbuf/setbuf>)[virtual] |  tenta substituir a sequência de caracteres controlada por um array   
(função membro virtual protegida de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ setbuf](<#/doc/io/basic_filebuf/setbuf>)[virtual] |  fornece buffer fornecido pelo usuário ou torna este filebuf sem buffer   
(função membro virtual protegida de `std::basic_filebuf<CharT,Traits>`)
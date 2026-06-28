# std::strstreambuf::strstreambuf

```cpp
  // (1)
explicit strstreambuf( std::streamsize alsize = 0 ); |  | (obsoleto desde C++98)
(ate C++11)
strstreambuf() : strstreambuf(0) {}
explicit strstreambuf( std::streamsize alsize ); |  |  (desde C++11)(removido em C++26)
strstreambuf( void* (*palloc)(std::size_t), void (*pfree)(void*) ); |  (2)  |  (obsoleto desde C++98)
(removido em C++26)
strstreambuf( char* gnext, std::streamsize n, char* pbeg = 0 ); |  (3)  |  (obsoleto desde C++98)
(removido em C++26)
strstreambuf( signed char* gnext, std::streamsize n, signed char* pbeg = 0 ); |  (4)  |  (obsoleto desde C++98)
(removido em C++26)
strstreambuf( unsigned char* gnext, std::streamsize n, unsigned char* pbeg = 0 ); |  (5)  |  (obsoleto desde C++98)
(removido em C++26)
strstreambuf( const char* gnext, std::streamsize n ); |  (6)  |  (obsoleto desde C++98)
(removido em C++26)
strstreambuf( const signed char* gnext, std::streamsize n ); |  (7)  |  (obsoleto desde C++98)
(removido em C++26)
strstreambuf( const unsigned char* gnext, std::streamsize n ); |  (8)  |  (obsoleto desde C++98)
(removido em C++26)
```

  
1) Constrói um objeto `std::strstreambuf`: inicializa a classe base chamando o construtor padrão de [std::streambuf](<#/doc/io/basic_streambuf>), inicializa o estado do buffer para "dinâmico" (o buffer será alocado conforme necessário), inicializa o tamanho alocado para o `alsize` fornecido, inicializa as funções de alocação e desalocação para nulas (usará `new[]` e `delete[]`).

2) Constrói um objeto `std::strstreambuf`: inicializa a classe base chamando o construtor padrão de [std::streambuf](<#/doc/io/basic_streambuf>), inicializa o estado do buffer para "dinâmico" (o buffer será alocado conforme necessário), inicializa o tamanho alocado para um valor não especificado, inicializa a função de alocação para `palloc` e a função de desalocação para `pfree`.

3-5) Constrói um objeto `std::strstreambuf` nas seguintes etapas:

a) Inicializa a classe base chamando o construtor padrão de [std::streambuf](<#/doc/io/basic_streambuf>).

b) Inicializa o estado do buffer para "constante" (o buffer é um buffer de tamanho fixo fornecido pelo usuário).

c) Determina o número de elementos no array fornecido pelo usuário da seguinte forma: se `n` for maior que zero, `n` é usado. Se `n` for zero, [std::strlen](<#/doc/string/byte/strlen>)(gnext) é executado para determinar o tamanho do buffer. Se `n` for negativo, [INT_MAX](<#/doc/types/climits>) é usado.

d) Configura os ponteiros de [std::basic_streambuf](<#/doc/io/basic_streambuf>) da seguinte forma: Se `pbeg` for um ponteiro nulo, chama `setg(gnext, gnext, gnext + N)`. Se `pbeg` não for um ponteiro nulo, executa `setg(gnext, gnext, pbeg)` e `setp(pbeg, pbeg + N)`, onde `N` é o número de elementos no array conforme determinado anteriormente.

6-8) O mesmo que `strstreambuf((char*)gnext, n)`, exceto que o bit "constante" é definido na máscara de bits do estado do buffer (saída para este buffer não é permitida).

### Parâmetros

alsize  |  \-  |  o tamanho inicial do buffer alocado dinamicamente   
---|---|---
palloc  |  \-  |  ponteiro para a função de alocação fornecida pelo usuário   
pfree  |  \-  |  ponteiro para a função de desalocação fornecida pelo usuário   
gnext  |  \-  |  ponteiro para o início da área de leitura (get area) no array fornecido pelo usuário   
pbeg  |  \-  |  ponteiro para o início da área de escrita (put area) no array fornecido pelo usuário   
n  |  \-  |  o número de bytes na área de leitura (se pbeg for nulo) ou na área de escrita (se pbeg não for nulo) do array fornecido pelo usuário   
  
### Observações

Esses construtores são tipicamente chamados pelos construtores de [std::strstream](<#/doc/io/strstream>). 

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[P0935R0](<https://wg21.link/P0935R0>) | C++11  | construtor padrão era explícito  | tornado implícito   
  
### Exemplo

Execute este código
```cpp 
    #include <iostream>
    #include <strstream>
    
    int main()
    {
        std::strstreambuf dyn; // dynamic
        std::strstream dyn_s; // equivalent stream
        dyn_s << 1.23 << std::ends;
        std::cout << dyn_s.str() << '\n';
        dyn_s.freeze(false);
    
        char buf[10];
        std::strstreambuf user(buf, 10, buf); // user-provided output buffer
        std::ostrstream user_s(buf, 10); // equivalent stream
        user_s << 1.23 << std::ends;
        std::cout << buf << '\n';
    
        std::strstreambuf lit("1 2 3", 5); // constant
        std::istrstream lit_s("1 2 3"); // equivalent stream
        int i, j, k;
        lit_s >> i >> j >> k;
        std::cout << i << ' ' << j << ' ' << k << '\n';
    }
```

Saída: 
```
    1.23
    1.23
    1 2 3
```

### Veja também

[ (construtor)](<#/doc/io/strstream/strstream>) |  constrói um objeto `strstream`, opcionalmente alocando o buffer   
(função membro pública de `std::strstream`)  
# std::strstreambuf::seekoff

protected:  
virtual pos_type seekoff( off_type off,  
ios_base::seekdir way,  
ios_base::openmode which = ios_base::in | ios_base::out ); |  |  (obsoleto em C++98)   
(removido em C++26)  

  
Reposiciona [std::basic_streambuf::gptr](<#/doc/io/basic_streambuf/gptr>) e/ou [std::basic_streambuf::pptr](<#/doc/io/basic_streambuf/pptr>), se possível, para a posição que corresponde a exatamente `off` caracteres a partir do início, fim ou posição atual da área de leitura (get) e/ou escrita (put) do buffer. 

  * Se `which` incluir `ios_base::in` e este buffer estiver aberto para leitura, então reposiciona o ponteiro de leitura [std::basic_streambuf::gptr](<#/doc/io/basic_streambuf/gptr>) dentro da área de leitura (get) conforme descrito abaixo. 
  * Se `which` incluir `ios_base::out` e este buffer estiver aberto para escrita, então reposiciona o ponteiro de escrita [std::basic_streambuf::pptr](<#/doc/io/basic_streambuf/pptr>) dentro da área de escrita (put) conforme descrito abaixo. 
  * Se `which` incluir ambos `ios_base::in` e `ios_base::out` e o buffer estiver aberto para leitura e escrita, e `way` for `ios_base::beg` ou `ios_base::end`, então reposiciona ambos os ponteiros de leitura e escrita conforme descrito abaixo. 
  * Caso contrário, esta função falha. 

Se o ponteiro (seja `gptr` ou `pptr` ou ambos) for reposicionado, isso é feito da seguinte forma: 

1) Se o ponteiro a ser reposicionado for um ponteiro nulo e o novo offset `newoff` for diferente de zero, esta função falha.

2) O novo offset do ponteiro `newoff` do tipo `off_type` é determinado

a) se `way == ios_base::beg`, então `newoff` é zero

b) se `way == ios_base::cur`, então `newoff` é a posição atual do ponteiro (`gptr() - eback()` ou `pptr() - pbase()`)

c) se `way == ios_base::end`, então `newoff` é o comprimento de toda a parte inicializada do buffer (se for usada superalocação, o ponteiro de marca d'água alta menos o ponteiro inicial)

3) Se `newoff + off` for negativo ou estiver fora dos limites da parte inicializada do buffer, a função falha

4) Caso contrário, o ponteiro é atribuído como se por `gptr() = eback() + newoff + off` ou `pptr() = pbase() + newoff + off`

### Parâmetros

off  |  \-  |  posição relativa para definir o(s) próximo(s) ponteiro(s)   
---|---
way  |  \-  |  define a posição base para aplicar o offset relativo. Pode ser uma das seguintes constantes:  |  Constante  |  Explicação   
[`beg`](<#/doc/io/ios_base/seekdir>) |  o início de um stream   
[`end`](<#/doc/io/ios_base/seekdir>) |  o fim de um stream   
[`cur`](<#/doc/io/ios_base/seekdir>) |  a posição atual do indicador de posição do stream   
which  |  \-  |  define se as sequências de entrada, a sequência de saída ou ambas são afetadas. Pode ser uma ou uma combinação das seguintes constantes:  |  Constante  |  Explicação   
[`in`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de entrada   
[`out`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de saída   
  
### Valor de retorno

`pos_type(newoff)` em caso de sucesso, `pos_type(off_type(-1))` em caso de falha e se `pos_type` não puder representar a posição resultante do stream. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <strstream>
     
    int main()
    {
        char a[] = "123";
        std::strstream ss(a, sizeof a); // entrada/saída
        std::cout << "put pos = " << ss.tellp()
                  << " get pos = " << ss.tellg() << '\n';
     
        // posicionamento absoluto de ambos os ponteiros
        ss.rdbuf()->pubseekoff(1, std::ios_base::beg); // move ambos para frente
        std::cout << "put pos = " << ss.tellp()
                  << " get pos = " << ss.tellg() << '\n';
     
        // tenta mover ambos os ponteiros 1 posição para frente a partir da posição atual
        if (-1 == ss.rdbuf()->pubseekoff(1, std::ios_base::cur))
            std::cout << "moving both pointers from current position failed\n";
        std::cout << "put pos = " << ss.tellp()
                  << " get pos = " << ss.tellg() << '\n';
     
        // move o ponteiro de escrita 1 posição para frente, mas não o ponteiro de leitura
        // can also be called as ss.seekp(1, std::ios_base::cur);
        ss.rdbuf()->pubseekoff(1, std::ios_base::cur, std::ios_base::out);
        std::cout << "put pos = " << ss.tellp()
                  << " get pos = " << ss.tellg() << '\n';
     
        ss << 'a'; // escreve na posição de escrita
        std::cout << "Escreveu 'a' na posição de escrita, o buffer agora é: '";
        std::cout.write(a, sizeof a);
        std::cout << "'\n";
     
        char ch;
        ss >> ch;
        std::cout << "a leitura na posição de leitura (get) resulta em '" << ch << "'\n";
    }
```

Saída: 
```
    put pos = 0 get pos = 0
    put pos = 1 get pos = 1
    moving both pointers from current position failed
    put pos = 1 get pos = 1
    put pos = 2 get pos = 1
    Wrote 'a' at put position, the buffer is now: '12a'
    reading at get position gives '2'
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 55](<https://cplusplus.github.io/LWG/issue55>) | C++98  | `seekoff` retornava uma posição de stream inválida indefinida em caso de falha  | `pos_type(off_type(-1))` é retornado em caso de falha   
  
### Ver também

[ seekpos](<#/doc/io/strstreambuf/seekpos>)[virtual] |  reposiciona o próximo ponteiro na sequência de entrada, sequência de saída ou ambas usando endereçamento absoluto   
(função membro virtual protegida)  
[ seekoff](<#/doc/io/basic_streambuf/pubseekoff>)[virtual] |  reposiciona o próximo ponteiro na sequência de entrada, sequência de saída ou ambas, usando endereçamento relativo   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ seekoff](<#/doc/io/basic_stringbuf/seekoff>)[virtual] |  reposiciona o próximo ponteiro na sequência de entrada, sequência de saída ou ambas, usando endereçamento relativo   
(função membro virtual protegida de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ seekoff](<#/doc/io/basic_filebuf/seekoff>)[virtual] |  reposiciona a posição do arquivo, usando endereçamento relativo   
(função membro virtual protegida de `std::basic_filebuf<CharT,Traits>`)
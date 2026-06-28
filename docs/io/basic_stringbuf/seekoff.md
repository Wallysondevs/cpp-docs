# std::basic_stringbuf&lt;CharT,Traits,Allocator&gt;::seekoff

protected:  
virtual pos_type seekoff( off_type off,  
[std::ios_base::seekdir](<#/doc/io/ios_base/seekdir>) dir,  
[std::ios_base::openmode](<#/doc/io/ios_base/openmode>) which = [std::ios_base::in](<#/doc/io/ios_base/openmode>) | [std::ios_base::out](<#/doc/io/ios_base/openmode>) );

  
Reposiciona [std::basic_streambuf::gptr](<#/doc/io/basic_streambuf/gptr>) e/ou [std::basic_streambuf::pptr](<#/doc/io/basic_streambuf/pptr>), se possível, para a posição que corresponde a exatamente `off` caracteres a partir do início, fim ou posição atual da área de leitura (get) e/ou escrita (put) do buffer. 

  * Se `which` incluir [std::ios_base::in](<#/doc/io/ios_base/openmode>) e este buffer estiver aberto para leitura (isto é, se `(which & std::ios_base::in) == std::ios_base::in`), então reposiciona o ponteiro de leitura [std::basic_streambuf::gptr](<#/doc/io/basic_streambuf/gptr>) dentro da área de leitura (get) conforme descrito abaixo 
  * Se `which` incluir [std::ios_base::out](<#/doc/io/ios_base/openmode>) e este buffer estiver aberto para escrita (isto é, `(which & std::ios_base::out) == std::ios_base::out`), então reposiciona o ponteiro de escrita [std::basic_streambuf::pptr](<#/doc/io/basic_streambuf/pptr>) dentro da área de escrita (put) conforme descrito abaixo 
  * Se `which` incluir tanto [std::ios_base::in](<#/doc/io/ios_base/openmode>) quanto [std::ios_base::out](<#/doc/io/ios_base/openmode>) e o buffer estiver aberto para leitura e escrita (isto é, `(which & (std::ios_base::in | std::ios_base::out)) == (std::ios_base::in | std::ios_base::out)`), e `dir` for [std::ios_base::beg](<#/doc/io/ios_base/seekdir>) ou [std::ios_base::end](<#/doc/io/ios_base/seekdir>), então reposiciona ambos os ponteiros de leitura e escrita conforme descrito abaixo. 
  * Caso contrário, esta função falha. 

Se [`gptr`](<#/doc/io/basic_streambuf>) e/ou [`pptr`](<#/doc/io/basic_streambuf>) for(em) reposicionado(s), isso é feito da seguinte forma: 

1) O novo deslocamento do ponteiro `newoff` do tipo `off_type` é determinado

a) se `dir == std::ios_base::beg`, então `newoff` é zero

b) se `dir == std::ios_base::cur`, então `newoff` é a posição atual do ponteiro (`gptr() - eback()` ou `pptr() - pbase()`)

c) se `dir == std::ios_base::end`, então `newoff` é o comprimento de toda a parte inicializada do buffer (se [over-allocation](<#/doc/io/basic_stringbuf/str>) for usada, o ponteiro de marca d'água alta menos o ponteiro inicial)

2) Se o ponteiro a ser reposicionado for um ponteiro nulo e `newoff` for diferente de zero, esta função falha.

3) Se `newoff + off < 0` (o reposicionamento moveria o ponteiro para antes do início do buffer) ou se `newoff + off` apontaria para além do fim do buffer (ou para além do último caractere inicializado no buffer se [over-allocation](<#/doc/io/basic_stringbuf/str>) for usada), a função falha.

4) Caso contrário, o ponteiro é atribuído como se por `gptr() = eback() + newoff + off` ou `pptr() = pbase() + newoff + off`.

### Parâmetros

off  |  \-  |  posição relativa para definir o(s) próximo(s) ponteiro(s)   
---|---
dir  |  \-  |  define a posição base para aplicar o deslocamento relativo. Pode ser uma das seguintes constantes:  |  Constante  |  Explicação   
[`beg`](<#/doc/io/ios_base/seekdir>) |  o início de um stream   
[`end`](<#/doc/io/ios_base/seekdir>) |  o fim de um stream   
[`cur`](<#/doc/io/ios_base/seekdir>) |  a posição atual do indicador de posição do stream   
which  |  \-  |  define se as sequências de entrada, a sequência de saída ou ambas são afetadas. Pode ser uma ou uma combinação das seguintes constantes:  |  Constante  |  Explicação   
[`in`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de entrada   
[`out`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de saída   
  
### Valor de retorno

`pos_type(newoff)` em caso de sucesso, `pos_type(off_type(-1))` em caso de falha ou se `pos_type` não puder representar a posição resultante do stream. 

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <sstream>
    
    int main()
    {
        std::stringstream ss("123"); // in/out
        std::cout << "put pos = " << ss.tellp()
                  << " get pos = " << ss.tellg() << '\n';
    
        // absolute positioning both pointers
        ss.rdbuf()->pubseekoff(1, std::ios_base::beg); // move both 1 forward
        std::cout << "put pos = " << ss.tellp()
                  << " get pos = " << ss.tellg() << '\n';
    
        // try to move both pointers 1 forward from current position
        if (-1 == ss.rdbuf()->pubseekoff(1, std::ios_base::cur))
            std::cout << "moving both pointers from current position failed\n";
        std::cout << "put pos = " << ss.tellp()
                  << " get pos = " << ss.tellg() << '\n';
    
        // move the write pointer 1 forward, but not the read pointer
        // can also be called as ss.seekp(1, std::ios_base::cur);
        ss.rdbuf()->pubseekoff(1, std::ios_base::cur, std::ios_base::out);
        std::cout << "put pos = " << ss.tellp()
                  << " get pos = " << ss.tellg() << '\n';
    
        ss << 'a'; // write at put position
        std::cout << "Wrote 'a' at put position, the buffer is now " << ss.str() << '\n';
    
        char ch;
        ss >> ch;
        std::cout << "reading at get position gives '" << ch << "'\n";
    }
```

Output: 
```
    put pos = 0 get pos = 0
    put pos = 1 get pos = 1
    moving both pointers from current position failed
    put pos = 1 get pos = 1
    put pos = 2 get pos = 1
    Wrote 'a' at put position, the buffer is now 12a
    reading at get position gives '2'
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 55](<https://cplusplus.github.io/LWG/issue55>) | C++98  | `seekoff` retornava uma posição de stream inválida indefinida em caso de falha  | `pos_type(off_type(-1))` é retornado em caso de falha   
[LWG 375](<https://cplusplus.github.io/LWG/issue375>) | C++98  | membros constantes estáticos de [std::ios_base](<#/doc/io/ios_base>) foram especificados incorretamente como membros de [std::basic_ios](<#/doc/io/basic_ios>) | corrigido   
[LWG 432](<https://cplusplus.github.io/LWG/issue432>) | C++98  | `seekoff` poderia ter sucesso mesmo que `newoff + off` apontasse para além do último caractere inicializado  | `seekoff` falha neste caso   
[LWG 453](<https://cplusplus.github.io/LWG/issue453>) | C++98  | reposicionar `gptr()` nulo e/ou `pptr()` nulo com um novo deslocamento de zero sempre falhava  | pode ter sucesso neste caso   
[LWG 563](<https://cplusplus.github.io/LWG/issue563>) | C++98  | o ponteiro final não podia ser usado para calcular `newoff` porque não podia ser precisamente controlado pelo programa após resolver o problema [LWG 432](<https://cplusplus.github.io/LWG/issue432>) | usar o ponteiro de marca d'água alta em vez disso   
  
### Ver também

[ pubseekoff](<#/doc/io/basic_streambuf/pubseekoff>) |  invoca `seekoff()`   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ seekpos](<#/doc/io/basic_stringbuf/seekpos>)[virtual] |  reposiciona o próximo ponteiro na sequência de entrada, sequência de saída ou ambas usando endereçamento absoluto   
(função membro protegida virtual)  
[ seekoff](<#/doc/io/basic_filebuf/seekoff>)[virtual] |  reposiciona a posição do arquivo, usando endereçamento relativo   
(função membro protegida virtual de `std::basic_filebuf<CharT,Traits>`)  
[ seekoff](<#/doc/io/strstreambuf/seekoff>)[virtual] |  reposiciona o próximo ponteiro na sequência de entrada, sequência de saída ou ambas, usando endereçamento relativo   
(função membro protegida virtual de `std::strstreambuf`)
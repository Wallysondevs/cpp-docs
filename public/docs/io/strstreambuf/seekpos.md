# std::strstreambuf::seekpos

protected:  
virtual pos_type seekpos( pos_type sp,  
[std::ios_base::openmode](<#/doc/io/ios_base/openmode>) which =  
[std::ios_base::in](<#/doc/io/ios_base/openmode>) | [std::ios_base::out](<#/doc/io/ios_base/openmode>) ); |  |  (obsoleto desde C++98)   
(removido em C++26)  

  
Reposiciona [std::basic_streambuf::gptr](<#/doc/io/basic_streambuf/gptr>) e/ou [std::basic_streambuf::pptr](<#/doc/io/basic_streambuf/pptr>), se possível, para a posição indicada por sp. 

Se [std::ios_base::in](<#/doc/io/ios_base/openmode>) estiver definido em which, tenta reposicionar `gptr()` (o próximo ponteiro na área de leitura). Se [std::ios_base::out](<#/doc/io/ios_base/openmode>) estiver definido em which, tenta reposicionar `pptr()` (o próximo ponteiro na área de escrita). Se nenhum dos bits estiver definido em which, a operação falha. 

Cada próximo ponteiro é reposicionado da seguinte forma: 

  * Se o próximo ponteiro for nulo, a operação falha. 
  * Caso contrário, o novo offset newoff (do tipo `off_type`) é determinado chamando sp.offset(). Se newoff for negativo, fora dos limites do buffer, ou inválido, a operação falha. 
  * Caso contrário, o próximo ponteiro é atribuído como se por gptr() = eback() + newoff ou pptr() = pbase() + newoff. 

### Parâmetros

sp  |  \-  |  posição do stream, como uma obtida por [seekoff()](<#/doc/io/strstreambuf/seekoff>) ou `seekpos()` which  |  \-  |  define se as sequências de entrada, a sequência de saída, ou ambas são afetadas. Pode ser uma ou uma combinação das seguintes constantes:  |  Constante  |  Explicação [`in`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de entrada
---|---
[`out`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de saída   
  
### Valor de retorno

O offset resultante convertido para `pos_type` em caso de sucesso ou pos_type(off_type(-1)) em caso de falha. 

### Notas

`seekpos()` é chamado por [std::basic_streambuf::pubseekpos()](<#/doc/io/basic_streambuf/pubseekpos>), que é chamado pelas versões de argumento único de [std::basic_istream::seekg()](<#/doc/io/basic_istream/seekg>) e [std::basic_ostream::seekp()](<#/doc/io/basic_ostream/seekp>). 

### Exemplo

Execute este código
```cpp
    #include <cstring>
    #include <iostream>
    #include <strstream>
    
    struct mybuf : std::strstreambuf
    {
        mybuf(const char* str) : std::strstreambuf(str, std::strlen(str)) {}
    
        pos_type seekpos(pos_type sp, std::ios_base::openmode which)
        {
            std::cout << "Before seekpos(" << sp << "), size of the get area is "
                      << egptr() - eback() << " with "
                      << egptr() - gptr() << " read positions available.\n";
    
            pos_type rc = std::strstreambuf::seekpos(sp, which);
    
            std::cout << "seekpos() returns " << rc << ".\nAfter the call, "
                      << "size of the get area is "
                      << egptr() - eback() << " with "
                      << egptr() - gptr() << " read positions available.\n";
    
            return rc;
        }
    };
    
    int main()
    {
        mybuf buf("12345");
        std::iostream stream(&buf);
        stream.seekg(2);
    }
```

Saída: 
```
    Before seekpos(2), size of the get area is 5 with 5 read positions available.
    seekpos() returns 2.
    After the call, size of the get area is 5 with 3 read positions available.
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 55](<https://cplusplus.github.io/LWG/issue55>) | C++98  | `seekpos` retornava uma posição de stream inválida indefinida em caso de falha  | pos_type(off_type(-1))  
é retornado em caso de falha   
  
### Veja também

[ seekoff](<#/doc/io/strstreambuf/seekoff>)[virtual] |  reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas, usando endereçamento relativo   
(função membro virtual protegida)  
[ seekpos](<#/doc/io/basic_streambuf/pubseekpos>)[virtual] |  reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas usando endereçamento absoluto   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ seekpos](<#/doc/io/basic_stringbuf/seekpos>)[virtual] |  reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas usando endereçamento absoluto   
(função membro virtual protegida de `std::basic_stringbuf<CharT,Traits,Allocator>`)  
[ seekpos](<#/doc/io/basic_filebuf/seekpos>)[virtual] |  reposiciona a posição do arquivo, usando endereçamento absoluto   
(função membro virtual protegida de `std::basic_filebuf<CharT,Traits>`)
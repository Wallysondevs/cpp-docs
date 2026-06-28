# std::basic_stringbuf&lt;CharT,Traits,Allocator&gt;::seekpos

protected:  
virtual pos_type seekpos( pos_type sp,  
[std::ios_base::openmode](<#/doc/io/ios_base/openmode>) which = [std::ios_base::in](<#/doc/io/ios_base/openmode>) | [std::ios_base::out](<#/doc/io/ios_base/openmode>) );

  
Reposiciona [std::basic_streambuf::gptr](<#/doc/io/basic_streambuf/gptr>) e/ou [std::basic_streambuf::pptr](<#/doc/io/basic_streambuf/pptr>), se possível, para a posição indicada por `sp`.

Executa efetivamente `seekoff(off_type(sp), std::ios_base::beg, which)`.

### Parâmetros

sp  |  \-  |  posição do stream, como uma obtida por [seekoff()](<#/doc/io/basic_stringbuf/seekoff>) ou `seekpos()` which  |  \-  |  define se as sequências de entrada, a sequência de saída, ou ambas são afetadas. Pode ser uma ou uma combinação das seguintes constantes:  |  Constante  |  Explicação [`in`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de entrada
---|---
[`out`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de saída   
  
### Valor de retorno

`sp` em caso de sucesso ou `pos_type(off_type(-1))` em caso de falha.

### Notas

`seekpos()` é chamado por [std::basic_streambuf::pubseekpos()](<#/doc/io/basic_streambuf/pubseekpos>), que é chamado pelas versões de argumento único de [std::basic_istream::seekg()](<#/doc/io/basic_istream/seekg>) e [std::basic_ostream::seekp()](<#/doc/io/basic_ostream/seekp>).

### Exemplo

Execute este código
```
    #include <sstream>
    #include <iostream>
     
    struct mybuf : std::stringbuf
    {
        mybuf(const std::string& str) : std::stringbuf(str) {}
     
        pos_type seekpos(pos_type sp, std::ios_base::openmode which)
        {
            std::cout << "Before seekpos(" << sp << "), size of the get area is "
                      << egptr() - eback() << " with "
                      << egptr() - gptr() << " read positions available.\n";
     
            pos_type rc = std::stringbuf::seekpos(sp, which);
     
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

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 375](<https://cplusplus.github.io/LWG/issue375>) | C++98  | membros constantes estáticos de [std::ios_base](<#/doc/io/ios_base>) foram especificados incorretamente como membros de [std::basic_ios](<#/doc/io/basic_ios>) | corrigido   
[LWG 564](<https://cplusplus.github.io/LWG/issue564>) | C++98  | não estava claro como reposicionar `gptr` e/ou `pptr` | eles são reposicionados por [seekoff()](<#/doc/io/basic_stringbuf/seekoff>)  
  
### Ver também

[ pubseekpos](<#/doc/io/basic_streambuf/pubseekpos>) |  invoca `seekpos()`   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ seekoff](<#/doc/io/basic_stringbuf/seekoff>)[virtual] |  reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas, usando endereçamento relativo   
(função membro protegida virtual)  
[ seekpos](<#/doc/io/basic_filebuf/seekpos>)[virtual] |  reposiciona a posição do arquivo, usando endereçamento absoluto   
(função membro protegida virtual de `std::basic_filebuf<CharT,Traits>`)  
[ seekpos](<#/doc/io/strstreambuf/seekpos>)[virtual] |  reposiciona o próximo ponteiro na sequência de entrada, sequência de saída, ou ambas usando endereçamento absoluto   
(função membro protegida virtual de `std::strstreambuf`)
# std::basic_filebuf&lt;CharT,Traits&gt;::seekpos

protected:  
virtual pos_type seekpos( pos_type sp,  
[std::ios_base::openmode](<#/doc/io/ios_base/openmode>) which = [std::ios_base::in](<#/doc/io/ios_base/openmode>) | [std::ios_base::out](<#/doc/io/ios_base/openmode>) );

  
Reposiciona o ponteiro do arquivo, se possível, para a posição indicada por `sp`. Se o arquivo associado não estiver aberto (`is_open() == false`), falha imediatamente.

O reposicionamento é realizado da seguinte forma:

1) Se o arquivo estiver aberto para escrita, escreve a área de put e quaisquer sequências de unshift exigidas pela locale atualmente imbuída, usando [overflow()](<#/doc/io/basic_streambuf/overflow>).

2) Reposiciona o ponteiro do arquivo, como se chamasse [std::fsetpos()](<#/doc/io/c/fsetpos>).

3) Se o arquivo estiver aberto para leitura, atualiza a área de get se necessário.

Se `sp` não foi obtido chamando [seekoff()](<#/doc/io/basic_streambuf/pubseekoff>) ou `seekpos()` no mesmo arquivo, o comportamento é indefinido.

### Parâmetros

sp  |  \-  |  posição do arquivo obtida por [seekoff()](<#/doc/io/basic_streambuf/pubseekoff>) ou `seekpos()` chamados anteriormente no mesmo arquivo which  |  \-  |  define quais das sequências de entrada e/ou saída serão afetadas. Pode ser uma ou uma combinação das seguintes constantes:  |  Constante  |  Explicação [`in`](<#/doc/io/ios_base/openmode>) |  afeta a sequência de entrada
---|---
[`out`](<#/>) |  afeta a sequência de saída   
  
### Valor de retorno

`sp` em caso de sucesso ou `pos_type(off_type(-1))` em caso de falha.

### Notas

`seekpos()` é chamado por [std::basic_streambuf::pubseekpos()](<#/doc/io/basic_streambuf/pubseekpos>), que é chamado pelas versões de argumento único de [std::basic_istream::seekg()](<#/doc/io/basic_istream/seekg>) e [std::basic_ostream::seekp()](<#/doc/io/basic_ostream/seekp>).

Muitas implementações não atualizam a área de get em `seekpos()`, delegando a [underflow()](<#/doc/io/basic_streambuf/underflow>) que é chamado pelo próximo [sgetc()](<#/doc/io/basic_streambuf/sgetc>).

### Exemplo

Em algumas implementações, a área de get é esvaziada por `seekpos()` e o segundo `underflow()` é necessário para observar os efeitos.

Execute este código
```cpp
    #include <fstream>
    #include <iostream>
     
    struct mybuf : std::filebuf
    {
        pos_type seekpos(pos_type sp, std::ios_base::openmode which)
        {
            std::cout << "Before seekpos(" << sp << "), size of the get area is "
                      << egptr() - eback() << " with "
                      << egptr() - gptr() << " read positions available.\n";
     
            pos_type rc = std::filebuf::seekpos(sp, which);
     
            std::cout << "seekpos() returns " << rc << ".\nAfter the call, "
                      << "size of the get area is "
                      << egptr() - eback() << " with "
                      << egptr() - gptr() << " read positions available.\n";
    // uncomment if get area is emptied by seekpos()
    //        std::filebuf::underflow();
    //        std::cout << "after forced underflow(), size of the get area is "
    //                  << egptr() - eback() << " with "
    //                  << egptr() - gptr() << " read positions available.\n";
     
            return rc;
        }
    };
     
    int main()
    {
        mybuf buf;
        buf.open("test.txt", std::ios_base::in);
        std::istream stream(&buf);
        stream.get(); // read one char to force underflow()
        stream.seekg(2);
    }
```

Saída possível:
```
    Before seekpos(2), size of the get area is 110 with 109 read positions available.
    seekpos() returns 2.
    After the call, size of the get area is 110 with 108 read positions available.
```

### Relatórios de Defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 55](<https://cplusplus.github.io/LWG/issue55>) | C++98  | `seekpos` retornava uma posição de stream inválida indefinida em caso de falha  | `pos_type(off_type(-1))` é retornado em caso de falha   
[LWG 171](<https://cplusplus.github.io/LWG/issue171>) | C++98  | a sequência das operações de reposicionamento não era clara  | tornada clara   
  
### Veja também

[ pubseekpos](<#/doc/io/basic_streambuf/pubseekpos>) |  invoca `seekpos()`   
(função membro pública de `std::basic_streambuf<CharT,Traits>`)  
[ seekoff](<#/doc/io/basic_filebuf/seekoff>)[virtual] |  reposiciona a posição do arquivo, usando endereçamento relativo   
(função membro protegida virtual)  
[ fseek](<#/doc/io/c/fseek>) |  move o indicador de posição do arquivo para um local específico em um arquivo   
(função)
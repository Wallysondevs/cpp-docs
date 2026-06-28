# std::basic_stringbuf&lt;CharT,Traits,Allocator&gt;::overflow

protected:  
virtual int_type overflow( int_type c = Traits::eof() );

  
Anexa o caractere c à sequência de caracteres de saída.

Se c for o indicador de fim de arquivo (traits::eq_int_type(c, traits::eof()) == true), então não há caractere para anexar. A função não faz nada e retorna um valor não especificado diferente de traits::eof().

Caso contrário, se a sequência de saída tiver uma posição de escrita disponível ou se esta função puder tornar uma posição de escrita disponível com sucesso, então chama sputc(c) e retorna c.

Esta função pode tornar uma posição de escrita disponível se o [std::stringbuf](<#/doc/io/basic_stringbuf>) estiver aberto para saída ((mode & ios_base::out) != 0): neste caso, ele realoca (ou aloca inicialmente) o buffer grande o suficiente para conter todo o buffer atual mais pelo menos um caractere adicional. Se o [std::stringbuf](<#/doc/io/basic_stringbuf>) também estiver aberto para entrada ((mode & ios_base::in) != 0), então `overflow` também aumenta o tamanho da área de leitura (get area) movendo [egptr()](<#/doc/io/basic_streambuf/gptr>) para apontar logo após a nova posição de escrita.

### Parameters

c  |  \-  |  o caractere a ser armazenado na área de escrita (put area)   
  
### Return value

Traits::eof() para indicar falha, c se o caractere c foi anexado com sucesso, ou algum valor diferente de Traits::eof() se chamado com Traits::eof() como argumento.

### Notes

Esta função é diferente de um `overflow()` típico que move o conteúdo do buffer para a sequência de caracteres associada, porque para um [std::basic_stringbuf](<#/doc/io/basic_stringbuf>), o buffer e a sequência associada são um e o mesmo.

### Example

Na implementação usada para executar este exemplo (e.g. GCC-4.9), `overflow()` super-aloca a área de escrita (put area) para 512 bytes: uma chamada para [str()](<#/doc/io/basic_stringbuf/str>) retornaria apenas os quatro bytes inicializados, mas as próximas 508 chamadas para [sputc()](<#/doc/io/basic_streambuf/sputc>) não exigiriam novas chamadas para `overflow()`.

Execute este código
```
    #include <sstream>
    #include <iostream>
     
    struct mybuf : std::stringbuf
    {
        mybuf(const std::string& new_str,
              std::ios_base::openmode which = std::ios_base::in | std::ios_base::out)
            : std::stringbuf(new_str, which) {}
     
        int_type overflow(int_type c = EOF) override
        {
            std::cout << "stringbuf::overflow('" << char(c) << "') called\n"
                      << "Before: size of get area: " << egptr() - eback() << '\n'
                      << "        size of put area: " << epptr() - pbase() << '\n';
     
            int_type ret = std::stringbuf::overflow(c);
     
            std::cout << "After : size of get area: " << egptr() - eback() << '\n'
                      << "        size of put area: " << epptr() - pbase() << '\n';
     
            return ret;
        }
    };
     
    int main()
    {
        std::cout << "read-write stream:\n";
        mybuf sbuf("   "); // read-write stream
        std::iostream stream(&sbuf);
        stream << 1234;
        std::cout << sbuf.str() << '\n';
     
        std::cout << "\nread-only stream:\n";
        mybuf ro_buf("   ", std::ios_base::in); // read-only stream
        std::iostream ro_stream(&ro_buf);
        ro_stream << 1234;
     
        std::cout << "\nwrite-only stream:\n";
        mybuf wr_buf("   ", std::ios_base::out); // write-only stream
        std::iostream wr_stream(&wr_buf);
        wr_stream << 1234;
    }
```

Saída possível: 
```
    read-write stream:
    stringbuf::overflow('4') called
    Before: size of get area: 3
            size of put area: 3
    After : size of get area: 4
            size of put area: 512
    1234
     
    read-only stream:
    stringbuf::overflow('1') called
    Before: size of get area: 3
            size of put area: 0
    After : size of get area: 3
            size of put area: 0
     
    write-only stream:
    stringbuf::overflow('4') called
    Before: size of get area: 0
            size of put area: 3
    After : size of get area: 0
            size of put area: 512
```

### Defect reports

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Applied to  | Behavior as published  | Correct behavior   
---|---|---|---
[LWG 169](<https://cplusplus.github.io/LWG/issue169>) | C++98  | o buffer (re)alocado podia conter apenas um caractere extra  | permite mais caracteres extras   
[LWG 432](<https://cplusplus.github.io/LWG/issue432>) | C++98  | `overflow` movia [epptr()](<#/doc/io/basic_streambuf/pptr>) para apontar logo após a nova posição de escrita se o `std::stringbuf` estivesse aberto para entrada  | ele não é movido   
  
### See also

[ overflow](<#/doc/io/basic_streambuf/overflow>)[virtual] |  escreve caracteres para a sequência de saída associada a partir da área de escrita (put area)   
(função membro virtual protegida de `std::basic_streambuf<CharT,Traits>`)  
[ underflow](<#/doc/io/basic_stringbuf/underflow>)[virtual] |  retorna o próximo caractere disponível na sequência de entrada   
(função membro virtual protegida)
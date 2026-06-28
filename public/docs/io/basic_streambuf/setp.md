# std::basic_streambuf&lt;CharT,Traits&gt;::setp

protected:  
void setp( char_type* pbeg, char_type* pend );

  
Define os valores dos ponteiros que definem a área de escrita (put area).

Após a chamada, pbase() == pbeg, pptr() == pbeg e epptr() == pend são todos verdadeiros.

Se qualquer parte de `[`pbeg`, `pend`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

### Parâmetros

pbeg  |  \-  |  ponteiro para o novo início da área de escrita (put area)   
---|---|---
pend  |  \-  |  ponteiro para o novo fim da área de escrita (put area)   
  
### Exemplo

Run this code
```
    #include <array>
    #include <cstddef>
    #include <iostream>
     
    // Buffer for std::ostream implemented by std::array
    template<std::size_t size, class CharT = char>
    struct ArrayedStreamBuffer : std::basic_streambuf<CharT>
    {
        using Base = std::basic_streambuf<CharT>;
        using char_type = typename Base::char_type;
     
        ArrayedStreamBuffer()
        {
            // put area pointers to work with “buffer”
            Base::setp(buffer.data(), buffer.data() + size);
        }
     
        void print_buffer()
        {
            for (char_type i : buffer)
            {
                if (i == 0)
                    std::cout << "\\0";
                else
                    std::cout << i;
                std::cout << ' ';
            }
            std::cout << '\n';
        }
     
    private:
        std::array<char_type, size> buffer{}; // value-initialize “buffer”
    };
     
    int main()
    {
        ArrayedStreamBuffer<10> streambuf;
        std::ostream stream(&streambuf);
     
        stream << "hello";
        stream << ",";
     
        streambuf.print_buffer();
    }
```

Saída: 
```
    h e l l o , \0 \0 \0 \0
```

### Relatórios de defeito

Os seguintes relatórios de defeito que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 4023](<https://cplusplus.github.io/LWG/issue4023>) | C++98  | `setp` não exigia que a sequência de saída fosse um range válido  | exige   
  
### Veja também

[ setg](<#/doc/io/basic_streambuf/setg>) |  reposiciona os ponteiros de início, próximo e fim da sequência de entrada   
(função membro protegida)  
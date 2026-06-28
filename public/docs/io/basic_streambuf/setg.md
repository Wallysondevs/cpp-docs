# std::basic_streambuf&lt;CharT,Traits&gt;::setg

protected:  
void setg( char_type* gbeg, char_type* gcurr, char_type* gend );

  
Define os valores dos ponteiros que delimitam a área de leitura (get area).

Após a chamada, eback() == gbeg, gptr() == gcurr e egptr() == gend são todos verdadeiros.

Se qualquer um de `[`gbeg`, `gend`)`, `[`gbeg`, `gcurr`)` e `[`gcurr`, `gend`)` não for um [range válido](<#/doc/iterator>), o comportamento é indefinido.

### Parâmetros

gbeg  |  \-  |  ponteiro para o novo início da área de leitura (get area)   
---|---|---
gcurr  |  \-  |  ponteiro para o novo caractere atual (_get pointer_) na área de leitura (get area)   
gend  |  \-  |  ponteiro para o novo fim da área de leitura (get area)   
  
### Exemplo

Run this code
```cpp
    #include <iostream>
    #include <sstream>
     
    class null_filter_buf : public std::streambuf
    {
        std::streambuf* src;
        char ch; // single-byte buffer
    protected:
        int underflow()
        {
            traits_type::int_type i;
            while ((i = src->sbumpc()) == '\0')
                ; // skip zeroes
            if (!traits_type::eq_int_type(i, traits_type::eof()))
            {
                ch = traits_type::to_char_type(i);
                setg(&ch, &ch, &ch+1); // make one read position available
            }
            return i;
        }
    public:
        null_filter_buf(std::streambuf* buf) : src(buf)
        {
            setg(&ch, &ch + 1, &ch + 1); // buffer is initially full
        }
    };
     
    void filtered_read(std::istream& in)
    {
        std::streambuf* orig = in.rdbuf();
        null_filter_buf buf(orig);
        in.rdbuf(&buf);
        for (char c; in.get(c);)
            std::cout << c;
        in.rdbuf(orig);
    }
     
    int main()
    {
        char a[] = "This i\0s \0an e\0\0\0xample";
        std::istringstream in(std::string(std::begin(a), std::end(a)));
        filtered_read(in);
    }
```

Saída: 
```
    This is an example
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente.

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 4023](<https://cplusplus.github.io/LWG/issue4023>) | C++98  | `setg` não exigia que a sequência de entrada fosse um range válido  | exige   
  
### Ver também

[ setp](<#/doc/io/basic_streambuf/setp>) |  reposiciona os ponteiros de início, próximo e fim da sequência de saída   
(função membro protegida)  
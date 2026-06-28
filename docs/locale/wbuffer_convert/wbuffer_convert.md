# std::wbuffer_convert&lt;Codecvt,Elem,Tr&gt;::wbuffer_convert

```cpp
wbuffer_convert() : wbuffer_convert(nullptr) {}  // (1)
explicit wbuffer_convert( std::streambuf* bytebuf,
Codecvt* pcvt = new Codecvt,
state_type state = state_type() );  // (2)
wbuffer_convert( const std::wbuffer_convert& ) = delete;  // (3) (desde C++14)
```

Sobrecarga  | [Membros de dados](<#/doc/locale/wbuffer_convert>) `_bufptr_` | `_cvtptr_` | `_cvtstate_` (1) |  nullptr |  new Codecvt |  state_type()
---|---|---|---
(2) | bytebuf | pcvt | state  
  
2) Se pcvt for um ponteiro nulo, o comportamento é indefinido.

3) O construtor de cópia é deletado, `wbuffer_convert` não é [CopyConstructible](<#/doc/named_req/CopyConstructible>).

### Parâmetros

bytebuf  |  \-  |  ponteiro para o buffer subjacente   
---|---|---
pcvt  |  \-  |  ponteiro para uma facet autônoma (não gerenciada por uma locale)   
state  |  \-  |  o valor inicial do estado de conversão de caracteres   
  
### Exemplo

Execute este código
```
    #include <codecvt>
    #include <iostream>
    #include <locale>
    #include <sstream>
     
    int main()
    {
        // Wrap a UTF-8 string stream in a UCS4 wbuffer_convert
        std::stringbuf utf8buf("z\u00df\u6c34\U0001f34c");
                           // or "\x7a\xc3\x9f\xe6\xb0\xb4\xf0\x9f\x8d\x8c"
                           // or u8"zß水🍌"
        std::wbuffer_convert<std::codecvt_utf8<wchar_t>> conv_in(&utf8buf);
        std::wistream ucsbuf(&conv_in);
        std::cout << "Reading from a UTF-8 stringbuf via wbuffer_convert: "
                  << std::hex << std::showbase;
        for (wchar_t c; ucsbuf.get(c);)
            std::cout << static_cast<std::wint_t>(c) << ' ';
     
        // Wrap a UTF-8 aware std::cout in a UCS4 wbuffer_convert to output UCS4
        std::wbuffer_convert<std::codecvt_utf8<wchar_t>> conv_out(std::cout.rdbuf());
        std::wostream out(&conv_out);
        std::cout << "\nSending UCS4 data to std::cout via wbuffer_convert: ";
        out << L"z\u00df\u6c34\U0001f34c\n";
    }
```

Saída: 
```
    Reading from a UTF-8 stringbuf via wbuffer_convert: 0x7a 0xdf 0x6c34 0x1f34c 
    Sending UCS4 data to std::cout via wbuffer_convert: zß水🍌
```

### Relatórios de defeitos

Os seguintes relatórios de defeitos que alteram o comportamento foram aplicados retroativamente a padrões C++ publicados anteriormente. 

DR  | Aplicado a  | Comportamento conforme publicado  | Comportamento correto   
---|---|---|---
[LWG 2175](<https://cplusplus.github.io/LWG/issue2175>) | C++11  | pcvt poderia ser um ponteiro nulo  | o comportamento é indefinido neste caso   
[LWG 2176](<https://cplusplus.github.io/LWG/issue2176>) | C++11  | construtores que aceitavam um único argumento eram implícitos  | tornados explícitos   
[P0935R0](<https://wg21.link/P0935R0>) | C++11  | o construtor padrão era explícito  | tornado implícito 
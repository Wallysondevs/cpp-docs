# std::wbuffer_convert&lt;Codecvt,Elem,Tr&gt;::rdbuf

[std::streambuf](<#/doc/io/basic_streambuf>)* rdbuf() const; |  (1)  |   
---|---|---
[std::streambuf](<#/doc/io/basic_streambuf>)* rdbuf( [std::streambuf](<#/doc/io/basic_streambuf>)* bytebuf ); |  (2)  |   

  
1) Retorna o ponteiro para o fluxo de bytes subjacente.

2) Substitui o fluxo de bytes associado por `bytebuf`.

### Valor de retorno

1) `_[bufptr](<#/doc/locale/wbuffer_convert>)_`

2) o valor anterior de `_[bufptr](<#/doc/locale/wbuffer_convert>)_`

### Exemplo

Execute este código
```
    #include <codecvt>
    #include <iostream>
    #include <locale>
    #include <sstream>
     
    int main()
    {
        // Convert UTF-8 to UCS4
        std::stringbuf utf8buf("z\u00df\u6c34\U0001d10b");
                           // or "\x7a\xc3\x9f\xe6\xb0\xb4\xf0\x9d\x84\x8b"
                           // or u8"zß水𝄋"
        std::wbuffer_convert<std::codecvt_utf8<wchar_t>> conv(&utf8buf);
        std::wistream ucsbuf(&conv);
        std::cout << "Reading from a UTF-8 stringbuf via wbuffer_convert: "
                  << std::hex << std::showbase;
        for (wchar_t c; ucsbuf.get(c);)
            std::cout << static_cast<std::wint_t>(c) << ' ';
     
        // Reuse the same wbuffer_convert to handle UCS4 to UTF-8 output
        conv.rdbuf(std::cout.rdbuf());
        std::wostream out(&conv);
        std::cout << "\nSending UCS4 data to std::cout via wbuffer_convert: ";
        out << L"z\u00df\u6c34\U0001d10b\n";
    }
```

Saída: 
```
    Reading from a UTF-8 stringbuf via wbuffer_convert: 0x7a 0xdf 0x6c34 0x1d10b 
    Sending UCS4 data to std::cout via wbuffer_convert: zß水𝄋
```

### Veja também

[ (constructor)](<#/doc/locale/wbuffer_convert/wbuffer_convert>) |  constrói um novo `wbuffer_convert`   
(função membro pública)  
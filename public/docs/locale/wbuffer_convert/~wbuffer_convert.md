# std::wbuffer_convert&lt;Codecvt,Elem,Tr&gt;::~wbuffer_convert

~wbuffer_convert();

  
Destrói o objeto `wbuffer_convert` e deleta `_[cvtptr](<#/doc/locale/wbuffer_convert>)_` .

### Notas

Algumas implementações são capazes de deletar qualquer facet, incluindo os facets específicos de locale com destrutores protegidos. Outras implementações exigem que o facet tenha um destrutor público, semelhante aos facets independentes de locale de [`<codecvt>`](<#/doc/header/codecvt>).

### Exemplo

Execute este código
```cpp
    #include <codecvt>
    #include <iostream>
    #include <locale>
    #include <utility>
    
    // Utility wrapper to adapt locale-bound facets for wstring/wbuffer convert
    template<class Facet>
    struct deletable_facet : Facet
    {
        template<class... Args>
        deletable_facet(Args&&... args) : Facet(std::forward<Args>(args)...) {}
        ~deletable_facet() {}
    };
    
    int main()
    {
    // GB18030 / UCS4 conversion, using locale-based facet directly
    //  typedef std::codecvt_byname<char32_t, char, std::mbstate_t> gbfacet_t;
    // Compiler error: "calling a protected destructor of codecvt_byname<> in ~wbuffer_convert"
    //  std::wbuffer_convert<gbfacet_t, char32_t>
    //      gbto32(std::cout.rdbuf(), new gbfacet_t("zh_CN.gb18030"));
    
    // GB18030 / UCS4 conversion facet using a facet with public destructor
        typedef deletable_facet<std::codecvt_byname<char32_t, char, std::mbstate_t>> gbfacet_t;
        std::wbuffer_convert<gbfacet_t, char32_t>
            gbto32(std::cout.rdbuf(), new gbfacet_t("zh_CN.gb18030"));
    } // destructor called here
```

### Veja também

[ (destructor)](<#/doc/locale/wstring_convert/~wstring_convert>) | destrói o `wstring_convert` e seu facet de conversão   
(função membro pública de `std::wstring_convert<Codecvt,Elem,Wide_alloc,Byte_alloc>`)  
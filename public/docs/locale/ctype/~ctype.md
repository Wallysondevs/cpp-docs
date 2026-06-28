# std::ctype&lt;CharT&gt;::~ctype

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
protected: ~ctype();
```

  
Destrói um facet [std::ctype](<#/doc/locale/ctype>). Este destrutor é protegido e virtual (devido ao destrutor da [classe base](<#/doc/locale/locale/facet>) ser virtual). Um objeto do tipo [std::ctype](<#/doc/locale/ctype>), como a maioria dos facets, só pode ser destruído quando o último objeto [std::locale](<#/doc/locale/locale>) que implementa este facet sai do escopo ou se uma classe definida pelo usuário é derivada de [std::ctype](<#/doc/locale/ctype>) e implementa um destrutor público. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <locale>
     
    struct Destructible_ctype : public std::ctype<wchar_t>
    {
        Destructible_ctype(std::size_t refs = 0) : ctype(refs) {}
        // note: the implicit destructor is public
    };
     
    int main()
    {
        Destructible_ctype dc;
        // std::ctype<wchar_t> c; // compile error: protected destructor
    }
```
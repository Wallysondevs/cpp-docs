# std::numpunct&lt;CharT&gt;::~numpunct

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
protected: ~numpunct();
```

  
Destrói um facet [std::numpunct](<#/doc/locale/numpunct>). Este destrutor é protegido e virtual (devido ao destrutor da [classe base](<#/doc/locale/locale/facet>) ser virtual). Um objeto do tipo [std::numpunct](<#/doc/locale/numpunct>), como a maioria dos facets, só pode ser destruído quando o último objeto [std::locale](<#/doc/locale/locale>) que implementa este facet sai do escopo ou se uma classe definida pelo usuário é derivada de [std::numpunct](<#/doc/locale/numpunct>) e implementa um destrutor público. 

### Exemplo

Execute este código
```
    #include <iostream>
    #include <locale>
     
    struct Destructible_numpunct : public std::numpunct<wchar_t>
    {
        Destructible_numpunct(std::size_t refs = 0) : numpunct(refs) {}
        // note: the implicit destructor is public
    };
     
    int main()
    {
        Destructible_numpunct dc;
        // std::numpunct<wchar_t> c; // compile error: protected destructor
    }
```
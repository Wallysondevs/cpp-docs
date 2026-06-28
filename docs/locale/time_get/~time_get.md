# std::time_get&lt;CharT,InputIt&gt;::~time_get

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
protected: ~time_get();
```

  
Destrói um facet `[std::time_get](<#/doc/locale/time_get>)`. Este destrutor é protegido e virtual (devido ao destrutor da `[classe base](<#/doc/locale/locale/facet>)` ser virtual). Um objeto do tipo `[std::time_get](<#/doc/locale/time_get>)`, como a maioria dos facets, só pode ser destruído quando o último objeto `[std::locale](<#/doc/locale/locale>)` que implementa este facet sai do escopo ou se uma classe definida pelo usuário é derivada de `[std::time_get](<#/doc/locale/time_get>)` e implementa um destrutor público.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <locale>
     
    struct Destructible_time_get : public std::time_get<wchar_t>
    {
        Destructible_time_get(std::size_t refs = 0) : time_get(refs) {}
        // note: the implicit destructor is public
    };
     
    int main()
    {
        Destructible_time_get dc;
        // std::time_get<wchar_t> c; // compile error: protected destructor
    }
```
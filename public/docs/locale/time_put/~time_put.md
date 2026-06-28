# std::time_put&lt;CharT,OutputIt&gt;::~time_put

Definido no header `[<locale>](<#/doc/header/locale>)`

```cpp
protected: ~time_put();
```

Destrói um facet [std::time_put](<#/doc/locale/time_put>). Este destrutor é protegido e virtual (devido ao destrutor da [classe base](<#/doc/locale/locale/facet>) ser virtual). Um objeto do tipo [std::time_put](<#/doc/locale/time_put>), como a maioria dos facets, só pode ser destruído quando o último objeto [std::locale](<#/doc/locale/locale>) que implementa este facet sai do escopo ou se uma classe definida pelo usuário é derivada de [std::time_put](<#/doc/locale/time_put>) e implementa um destrutor público.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <locale>
     
    struct Destructible_time_put : public std::time_put<wchar_t>
    {
        Destructible_time_put(std::size_t refs = 0) : time_put(refs) {}
        // nota: o destrutor implícito é público
    };
     
    int main()
    {
        Destructible_time_put dc;
        // std::time_put<wchar_t> c; // erro de compilação: destrutor protegido
    }
```
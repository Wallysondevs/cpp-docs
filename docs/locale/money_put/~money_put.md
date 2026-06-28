# std::money_put&lt;CharT,OutputIt&gt;::~money_put

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
protected: ~money_put();
```

Destrói um facet [std::money_put](<#/doc/locale/money_put>). Este destrutor é protegido e virtual (devido ao destrutor da [classe base](<#/doc/locale/locale/facet>) ser virtual). Um objeto do tipo [std::money_put](<#/doc/locale/money_put>), como a maioria dos facets, só pode ser destruído quando o último objeto [std::locale](<#/doc/locale/locale>) que implementa este facet sai do escopo ou se uma classe definida pelo usuário é derivada de [std::money_put](<#/doc/locale/money_put>) e implementa um destrutor público.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
     
    struct Destructible_money_put : public std::money_put<wchar_t>
    {
        Destructible_money_put(std::size_t refs = 0) : money_put(refs) {}
        // note: the implicit destructor is public
    };
     
    int main()
    {
        Destructible_money_put dc;
        // std::money_put<wchar_t> c; // compile error: protected destructor
    }
```
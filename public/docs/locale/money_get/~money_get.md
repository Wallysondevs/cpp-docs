# std::money_get&lt;CharT,InputIt&gt;::~money_get

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
protected: ~money_get();
```

Destrói um facet [std::money_get](<#/doc/locale/money_get>). Este destrutor é protegido e virtual (devido ao destrutor da [classe base](<#/doc/locale/locale/facet>) ser virtual). Um objeto do tipo [std::money_get](<#/doc/locale/money_get>), como a maioria dos facets, só pode ser destruído quando o último objeto [std::locale](<#/doc/locale/locale>) que implementa este facet sai do escopo ou se uma classe definida pelo usuário é derivada de [std::money_get](<#/doc/locale/money_get>) e implementa um destrutor público.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
     
    struct Destructible_money_get : public std::money_get<wchar_t>
    {
        Destructible_money_get(std::size_t refs = 0) : money_get(refs) {}
        // nota: o destrutor implícito é público
    };
     
    int main()
    {
        Destructible_money_get dc;
        // std::money_get<wchar_t> c; // erro de compilação: destrutor protegido
    }
```
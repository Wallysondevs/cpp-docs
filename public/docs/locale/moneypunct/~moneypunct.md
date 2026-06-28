# std::moneypunct&lt;CharT,International&gt;::~moneypunct

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
protected: ~moneypunct();
```

Destrói um facet [std::moneypunct](<#/doc/locale/moneypunct>). Este destrutor é protegido e virtual (devido ao destrutor da [classe base](<#/doc/locale/locale/facet>) ser virtual). Um objeto do tipo [std::moneypunct](<#/doc/locale/moneypunct>), como a maioria dos facets, só pode ser destruído quando o último objeto [std::locale](<#/doc/locale/locale>) que implementa este facet sai do escopo ou se uma classe definida pelo usuário é derivada de [std::moneypunct](<#/doc/locale/moneypunct>) e implementa um destrutor público.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    struct Destructible_moneypunct : public std::moneypunct<wchar_t>
    {
        Destructible_moneypunct(std::size_t refs = 0) : moneypunct(refs) {}
        // nota: o destrutor implícito é público
    };
    
    int main()
    {
        Destructible_moneypunct dc;
        // std::moneypunct<wchar_t> c; // erro de compilação: destrutor protegido
    }
```
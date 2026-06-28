# std::collate&lt;CharT&gt;::~collate

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
protected: ~collate();
```

Destrói um facet [std::collate](<#/doc/locale/collate>). Este destrutor é protegido e virtual (devido ao destrutor da [classe base](<#/doc/locale/locale/facet>) ser virtual). Um objeto do tipo [std::collate](<#/doc/locale/collate>), como a maioria dos facets, só pode ser destruído quando o último objeto [std::locale](<#/doc/locale/locale>) que implementa este facet sai do escopo ou se uma classe definida pelo usuário é derivada de [std::collate](<#/doc/locale/collate>) e implementa um destrutor público.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <locale>
    
    struct Destructible_collate : public std::collate<wchar_t>
    {
        Destructible_collate(std::size_t refs = 0) : collate(refs) {}
        // nota: o destrutor implícito é público
    };
    
    int main()
    {
        Destructible_collate dc;
        // std::collate<wchar_t> c; // erro de compilação: destrutor protegido
    }
```
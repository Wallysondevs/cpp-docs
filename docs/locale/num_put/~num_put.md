# std::num_put&lt;CharT,OutputIt&gt;::~num_put

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
protected: ~num_put();
```

Destrói um facet [std::num_put](<#/doc/locale/num_put>). Este destrutor é protegido e virtual (devido ao destrutor da [classe base](<#/doc/locale/locale/facet>) ser virtual). Um objeto do tipo [std::num_put](<#/doc/locale/num_put>), como a maioria dos facets, só pode ser destruído quando o último objeto [std::locale](<#/doc/locale/locale>) que implementa este facet sai do escopo ou se uma classe definida pelo usuário é derivada de [std::num_put](<#/doc/locale/num_put>) e implementa um destrutor público.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
     
    struct Destructible_num_put : public std::num_put<wchar_t>
    {
        Destructible_num_put(std::size_t refs = 0) : num_put(refs) {}
        // nota: o destrutor implícito é público
    };
     
    int main()
    {
        Destructible_num_put dc;
        // erro de compilação: destrutor protegido
    }
```
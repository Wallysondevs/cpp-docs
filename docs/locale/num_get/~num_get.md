# std::num_get&lt;CharT,InputIt&gt;::~num_get

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
protected: ~num_get();
```

Destrói uma faceta [std::num_get](<#/doc/locale/num_get>). Este destrutor é protegido e virtual (devido ao destrutor da [classe base](<#/doc/locale/locale/facet>) ser virtual). Um objeto do tipo [std::num_get](<#/doc/locale/num_get>), como a maioria das facetas, só pode ser destruído quando o último objeto [std::locale](<#/doc/locale/locale>) que implementa esta faceta sai do escopo ou se uma classe definida pelo usuário é derivada de [std::num_get](<#/doc/locale/num_get>) e implementa um destrutor público.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    struct Destructible_num_get : public std::num_get<wchar_t>
    {
        Destructible_num_get(std::size_t refs = 0) : num_get(refs) {}
        // note: the implicit destructor is public
    };
    
    int main()
    {
        Destructible_num_get dc;
        // std::num_get<wchar_t> c; // compile error: protected destructor
    }
```
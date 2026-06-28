# std::codecvt&lt;InternT,ExternT,StateT&gt;::~codecvt

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
protected: ~codecvt();
```

Destrói uma faceta [std::codecvt](<#/doc/locale/codecvt>). Este destrutor é protegido e virtual (devido ao destrutor da [classe base](<#/doc/locale/locale/facet>) ser virtual). Um objeto do tipo [std::codecvt](<#/doc/locale/codecvt>), como a maioria das facetas, só pode ser destruído quando o último objeto [std::locale](<#/doc/locale/locale>) que implementa esta faceta sai do escopo ou se uma classe definida pelo usuário é derivada de [std::codecvt](<#/doc/locale/codecvt>) e implementa um destrutor público.

### Exemplo

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    struct Destructible_codecvt : public std::codecvt<wchar_t, char, std::mbstate_t>
    {
        Destructible_codecvt(std::size_t refs = 0) : codecvt(refs) {}
        // nota: o destrutor implícito é público
    };
    
    int main()
    {
        Destructible_codecvt dc;
        // std::codecvt<wchar_t> c; // erro de compilação: destrutor protegido
    }
```
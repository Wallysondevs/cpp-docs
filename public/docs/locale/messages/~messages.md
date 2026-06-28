# std::messages&lt;CharT&gt;::~messages

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
protected: ~messages();
```

  
Destrói uma faceta [std::messages](<#/doc/locale/messages>). Este destrutor é `protected` e `virtual` (devido ao destrutor da [classe base](<#/>) ser `virtual`). Um objeto do tipo [std::messages](<#/doc/locale/messages>), como a maioria das facetas, só pode ser destruído quando o último objeto [std::locale](<#/doc/locale/locale>) que implementa esta faceta sai do escopo ou se uma classe definida pelo usuário é derivada de [std::messages](<#/doc/locale/messages>) e implementa um destrutor `public`.

### Exemplo

Execute este código
```
    #include <iostream>
    #include <locale>
     
    struct Destructible_messages : public std::messages<wchar_t>
    {
        Destructible_messages(std::size_t refs = 0) : messages(refs) {}
        // nota: o destrutor implícito é public
    };
     
    int main()
    {
        Destructible_messages dc;
        // std::messages<wchar_t> c; // erro de compilação: destrutor protected
    }
```
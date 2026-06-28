# std::messages&lt;CharT&gt;::get, std::messages&lt;CharT&gt;::do_get

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
string_type get( catalog cat, int set, int msgid, const string_type& dfault ) const;
protected:
virtual string_type do_get( catalog cat, int set, int msgid, const string_type& dfault ) const;
```

1) Função membro pública, chama a função membro virtual protegida `do_get` da classe mais derivada.

2) Obtém uma mensagem do catálogo de mensagens aberto `cat` usando os valores `set`, `msgid` e `dfault` de maneira definida pela implementação. Se a mensagem esperada não for encontrada no catálogo, retorna uma cópia de `dfault`.

### Parâmetros

- **cat** — identificador do catálogo de mensagens obtido de [open()](<#/doc/locale/messages/open>) e ainda não passado para [close()](<#/doc/locale/messages/close>)
- **set** — argumento definido pela implementação, conjunto de mensagens no POSIX
- **msgid** — argumento definido pela implementação, id da mensagem no POSIX
- **dfault** — a string a ser procurada no catálogo (se o catálogo usar pesquisa por string) e também a string a ser retornada em caso de falha

### Valor de retorno

A mensagem do catálogo ou uma cópia de `dfault` se nenhuma for encontrada.

### Notas

Em sistemas POSIX, esta chamada de função geralmente se traduz em uma chamada para `[catgets()](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/catgets.html>)`, e os parâmetros `set`, `msgid` e `dfault` são passados para `catgets()` como estão. No GNU libstdc++, esta função ignora `set` e `msgid` e simplesmente chama `GNU gettext(dfault)` na locale necessária.

### Exemplo

O exemplo a seguir demonstra a recuperação de mensagens: em um sistema GNU/Linux típico, ele lê de `/usr/share/locale/de/LC_MESSAGES/sed.mo`.

Execute este código
```cpp
    #include <iostream>
    #include <locale>
    
    int main()
    {
        std::locale loc("de_DE.utf8");
        std::cout.imbue(loc);
        auto& facet = std::use_facet<std::messages<char>>(loc);
        auto cat = facet.open("sed", loc);
        if (cat < 0)
            std::cout << "Could not open german \"sed\" message catalog\n";
        else
            std::cout << "\"No match\" in German: "
                      << facet.get(cat, 0, 0, "No match") << '\n'
                      << "\"Memory exhausted\" in German: "
                      << facet.get(cat, 0, 0, "Memory exhausted") << '\n';
        facet.close(cat);
    }
```

Saída possível:
```
    "No match" in German: Keine Übereinstimmung
    "Memory exhausted" in German: Speicher erschöpft
```

### Veja também

---
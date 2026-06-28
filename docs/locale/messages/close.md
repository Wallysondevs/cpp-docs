# std::messages&lt;CharT&gt;::close, std::messages&lt;CharT&gt;::do_close

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
void close( catalog c ) const;
protected:
virtual void do_close( catalog c ) const;
```

1) Função membro pública, chama a função membro virtual protegida `do_close` da classe mais derivada.

2) Libera os recursos definidos pela implementação associados a um catálogo aberto que é designado pelo valor c do tipo `catalog` (herdado de [std::messages_base](<#/doc/locale/messages_base>)), que foi obtido de [open()](<#/doc/locale/messages/open>).

### Parâmetros

- **c** — um identificador de catálogo aberto válido, no qual `close()` ainda não foi chamado

### Valor de retorno

(nenhum)

### Notas

Em sistemas POSIX, esta chamada de função geralmente se traduz em uma chamada para `[catclose()](<https://pubs.opengroup.org/online/9699919799/functions/catclose.html>)`. No GNU libstdc++, que é implementado em termos de GNU `gettext()`, ela não faz nada.

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
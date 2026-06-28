# std::messages&lt;CharT&gt;::open, std::messages&lt;CharT&gt;::do_open

Definido no cabeçalho `[<locale>](<#/doc/header/locale>)`

```c
public:
catalog open( const std::string& name, const std::locale& loc ) const;
protected:
virtual catalog do_open( const std::string& name, const std::locale& loc ) const;
```

1) Função membro pública, chama a função membro virtual protegida `do_open` da classe mais derivada.

2) Obtém um valor do tipo `catalog` (herdado de [std::messages_base](<#/doc/locale/messages_base>)), que pode ser passado para [get()](<#/doc/locale/messages/get>) para recuperar mensagens do catálogo de mensagens nomeado por `name`. Este valor é utilizável até ser passado para [close()](<#/doc/locale/messages/close>).

### Parâmetros

- **name** — nome do catálogo de mensagens a ser aberto
- **loc** — um objeto locale que fornece facets adicionais que podem ser necessários para ler mensagens do catálogo, como [std::codecvt](<#/doc/locale/codecvt>) para realizar conversões wide/multibyte

### Valor de retorno

O valor não negativo do tipo `catalog` que pode ser usado com [get()](<#/doc/locale/messages/get>) e [close()](<#/doc/locale/messages/close>). Retorna um valor negativo se o catálogo não pôde ser aberto.

### Notas

Em sistemas POSIX, esta chamada de função geralmente se traduz em uma chamada para `[catopen()](<https://pubs.opengroup.org/onlinepubs/9699919799/functions/catopen.html>)`. No GNU libstdc++, ela chama `[textdomain](<https://gcc.gnu.org/onlinedocs/libstdc++/manual/facets.html>)`.

A localização real do catálogo é definida pela implementação: para o catálogo "sed" (catálogos de mensagens instalados com o utilitário Unix 'sed') no locale alemão, por exemplo, o arquivo aberto por esta chamada de função pode ser `/usr/lib/nls/msg/de_DE/sed.cat`, `/usr/lib/locale/de_DE/LC_MESSAGES/sed.cat`, ou `/usr/share/locale/de/LC_MESSAGES/sed.mo`.

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